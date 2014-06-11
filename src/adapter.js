var createQUnitStartFn = function (tc, runnerPassedIn) {
  return function () {
    var runner = runnerPassedIn || window.QUnit;
    var totalNumberOfTest = 0;
    var timer = null;
    var testResult = {};
    var supportsTestTracking = false;

    if ( runner.begin ) {
      runner.begin(function( args ) {
        if ( args && typeof args.totalTests === 'number' ) {
          tc.info({ total: args.totalTests });
          supportsTestTracking = true;
        }
      });
    }

    runner.done(function () {
      if ( !supportsTestTracking ) {
        tc.info({ total: totalNumberOfTest });
      }

      tc.complete({
       coverage: window.__coverage__
      });
    });

    runner.testStart(function (test) {
      totalNumberOfTest += 1;
      timer = new Date().getTime();
      testResult = { success: true, errors: [] };
    });

    runner.log(function (details) {
      if (!details.result) {
        var msg = '';

        if (details.message) {
          msg += details.message + '\n';
        }

        if (typeof details.expected !== 'undefined') {
          msg += 'Expected: ' + details.expected + '\n' + 'Actual: ' + details.actual + '\n';
        }

        if (details.source) {
          msg += details.source + '\n';
        }

        testResult.success = false;
        testResult.errors.push(msg);
      }
    });

    runner.testDone(function (test) {
      var result = {
        description: test.name,
        suite: test.module && [test.module] || [],
        success: testResult.success,
        log: testResult.errors || [],
        time: new Date().getTime() - timer
      };

      tc.result(result);
    });

    runner.load();
    runner.start();
  };
};
