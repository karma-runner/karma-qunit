function createQUnitConfig (karma, defaultConfig) { // eslint-disable-line no-unused-vars
  var config = defaultConfig || {}

  if (!karma.config || !karma.config.qunit) {
    return config
  }

  for (var key in karma.config.qunit) {
    config[key] = karma.config.qunit[key]
  }

  return config
}

function createQUnitStartFn (tc, runnerPassedIn) { // eslint-disable-line no-unused-vars
  return function () {
    var FIXTURE_ID = 'qunit-fixture'
    var runner = runnerPassedIn || window.QUnit
    var totalNumberOfTest = 0
    var timer = null
    var testResult = {}
    var supportsTestTracking = false
    var config = (tc.config && tc.config.qunit) || {}

    if (config.showUI) {
      var ui = document.createElement('div')
      ui.id = 'qunit'
      document.body.appendChild(ui)
    }

    if (runner.begin) {
      runner.begin(function (args) {
        if (args && typeof args.totalTests === 'number') {
          tc.info({ total: args.totalTests })
          supportsTestTracking = true
        }
      })
    }

    runner.done(function () {
      if (!supportsTestTracking) {
        tc.info({ total: totalNumberOfTest })
      }

      tc.complete({
        coverage: window.__coverage__
      })
    })

    runner.testStart(function (test) {
      totalNumberOfTest += 1
      timer = new Date().getTime()
      testResult = { success: true, errors: [] }

      if (typeof document !== 'undefined' && document.getElementById && document.createElement && document.body) {
        // create a qunit-fixture element to match behaviour of regular qunit
        // runner. The fixture is only removed at the start of a subsequent test
        // so it can be inspected after a test run.
        var fixture = document.getElementById(FIXTURE_ID)
        if (fixture) {
          fixture.parentNode.removeChild(fixture)
        }
        fixture = document.createElement('div')
        fixture.id = FIXTURE_ID
        // style to match qunit runner's CSS
        fixture.style.position = 'absolute'
        fixture.style.left = '-10000px'
        fixture.style.top = '-10000px'
        fixture.style.width = '1000px'
        fixture.style.height = '1000px'
        document.body.appendChild(fixture)
      }
    })

    runner.log(function (details) {
      if (!details.result) {
        var msg = ''

        if (details.message) {
          msg += details.message + '\n'
        }

        if (typeof details.expected !== 'undefined') {
          msg += 'Expected: ' + runner.dump.parse(details.expected) + '\n' + 'Actual: ' + runner.dump.parse(details.actual) + '\n'
        }

        if (details.source) {
          msg += details.source + '\n'
        }

        testResult.success = false
        testResult.errors.push(msg)
      }
    })

    runner.testDone(function (test) {
      var result = {
        description: test.name,
        suite: test.module && [test.module] || [],
        success: testResult.success,
        skipped: test.skipped,
        log: testResult.errors || [],
        time: new Date().getTime() - timer
      }

      tc.result(result)
    })

    runner.load()
    runner.start()
  }
}
