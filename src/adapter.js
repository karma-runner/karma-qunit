'use strict'

function createQUnitConfig (karma) { // eslint-disable-line no-unused-vars
  var config = {
    autostart: false
  }

  if (karma.config && karma.config.qunit) {
    for (var key in karma.config.qunit) {
      config[key] = karma.config.qunit[key]
    }
  }

  return config
}

function createQUnitStartFn (tc, runnerPassedIn) { // eslint-disable-line no-unused-vars
  return function () {
    var FIXTURE_ID = 'qunit-fixture'
    var runner = runnerPassedIn || window.QUnit
    var config = (tc.config && tc.config.qunit) || {}
    var qunitOldTimeout = 13

    if (config.showUI) {
      var ui = document.createElement('div')
      ui.id = 'qunit'
      document.body.appendChild(ui)
    }

    runner.begin(function (args) {
      tc.info({ total: args.totalTests })

      if (typeof document !== 'undefined' && document.getElementById && document.createElement && document.body) {
        // Create a qunit-fixture element to match behaviour of regular qunit runner.
        // The fixture is only created once when the runner begins.
        // Resetting is handled by qunit
        var fixture = document.getElementById(FIXTURE_ID)
        if (!fixture) {
          fixture = document.createElement('div')
          fixture.id = FIXTURE_ID
          document.body.appendChild(fixture)
          if (typeof runner.config.fixture === 'undefined') {
            runner.config.fixture = ''
          }
        }
      }
    })

    runner.done(function () {
      tc.complete({
        coverage: window.__coverage__
      })
    })

    runner.on('testEnd', function (test) {
      var result = {
        description: test.name,
        suite: (test.suiteName && [test.suiteName]) || [],
        success: test.status === 'passed' || test.status === 'skipped' || test.status === 'todo',
        skipped: test.status === 'skipped',
        log: (test.errors || []).map(function (details) {
          var msg = details.message + '\n'
          if (details.expected !== undefined) {
            msg += 'Expected: ' + runner.dump.parse(details.expected) + '\n' + 'Actual: ' + runner.dump.parse(details.actual) + '\n'
          }
          if (details.stack) {
            msg += details.stack + '\n'
          }
          return msg
        }),
        time: test.runtime
      }

      tc.result(result)
    })

    // karma-qunit uses `QUnit.config.autostart = false` internally
    // so window.__karma__.start (points to here) controls QUnit.start
    // and thus naturally waits for any file-loading karma plugins
    // (especially async like AMD/RequireJS).
    //
    // ensure the the option to turn off QUnit autostart is also
    // available to end-users, by letting them set `qunit.autostart: false`
    // in karma.config.js. The end-user may then call QUnit.start() when
    // they are ready.
    //
    // https://github.com/karma-runner/karma-qunit/issues/27
    if (config.autostart !== false) {
      // If config.autostart is undefined (default) or explicitly true,
      // start when Karma is ready. Otherwise, if the user explicitly
      // sets it to false (instead of merely karma-qunit setting it to false),
      // then we step out of the way and let the user call QUnit.start.
      setTimeout(function () {
        runner.start()
      }, qunitOldTimeout)
    }
  }
}
