/* global MockSocket, MockRunner, createQUnitStartFn, createQUnitConfig reporter:true */

// Tests for adapter/qunit.src.js
// These tests are executed in browser.

describe('adapter qunit', function () {
  var Karma = window.__karma__.constructor

  describe('config', function () {
    var config
    var tc

    beforeEach(function () {
      tc = new Karma(new MockSocket(), null, null, null, {search: ''})
    })

    it('should return the default configuration passed', function () {
      tc.config = {}
      tc.config.qunit = {}
      config = createQUnitConfig(tc, {autostart: false})
      expect(config.autostart).toBe(false)
    })

    it('should return the configuration defined on the runner', function () {
      tc.config = {}
      tc.config.qunit = {
        autostart: false
      }
      config = createQUnitConfig(tc)
      expect(config.autostart).toBe(false)
    })

    it('should prefer configuration on the runner', function () {
      tc.config = {}
      tc.config.qunit = {
        autostart: true
      }
      config = createQUnitConfig(tc, {autostart: false})
      expect(config.autostart).toBe(true)
    })

    it('should return the default config for no client config', function () {
      config = createQUnitConfig(tc, {autostart: false})
      expect(config).toEqual({autostart: false})
    })
  })

  describe('runner', function () {
    var tc
    var runner

    beforeEach(function () {
      tc = new Karma(new MockSocket(), null, null, null, {search: ''})
      runner = new MockRunner()
    })

    describe('start', function () {
      it('should auto start on __karma__.start by default', function () {
        spyOn(runner, 'start')

        createQUnitStartFn(tc, runner)()
        expect(runner.start).toHaveBeenCalled()
      })

      it('should honor runner config "autostart"', function () {
        tc.config = {}
        tc.config.qunit = {
          autostart: false
        }

        spyOn(runner, 'start')

        createQUnitStartFn(tc, runner)()
        expect(runner.start).not.toHaveBeenCalled()
      })
    })
  })

  describe('reporter', function () {
    var runner
    var tc

    beforeEach(function () {
      tc = new Karma(new MockSocket(), null, null, null, {search: ''})
      runner = new MockRunner()
      reporter = new (createQUnitStartFn(tc, runner))()
    })

    describe('done', function () {
      it('should report complete', function () {
        spyOn(tc, 'complete')
        spyOn(tc, 'info')

        runner.emit('done')
        expect(tc.info).toHaveBeenCalled()
        expect(tc.complete).toHaveBeenCalled()
      })
    })

    describe('total number of tests', function () {
      it('should use the tracking in qunit if available', function () {
        spyOn(tc, 'info').and.callFake(function (result) {
          expect(result.total).toBe(1)
        })

        var mockQUnitResult = {
          totalTests: 1
        }

        runner.emit('begin', mockQUnitResult)
        expect(tc.info).toHaveBeenCalled()
      })

      it('should use our own tracking if none is available', function () {
        spyOn(tc, 'result').and.callFake(function (result) {
          expect(result.description).toBe('should do something')
        })

        spyOn(tc, 'info')
        spyOn(tc, 'complete')

        var mockQUnitResult = {
          name: 'should do something',
          module: 'desc1',
          failed: 0
        }

        runner.emit('testStart', mockQUnitResult)
        runner.emit('testDone', mockQUnitResult)
        runner.emit('done')

        expect(tc.result).toHaveBeenCalled()
        expect(tc.info).toHaveBeenCalled()
        expect(tc.complete).toHaveBeenCalled()
      })
    })

    describe('test start', function () {
      it('should create a qunit-fixture element if none exists', function () {
        var fixture = document.getElementById('qunit-fixture')
        if (fixture) {
          fixture.parentNode.removeChild(fixture)
          fixture = document.getElementById('qunit-fixture')
        }
        expect(fixture).toBe(null)

        runner.emit('begin', {})
        runner.emit('testStart', {})

        fixture = document.getElementById('qunit-fixture')
        expect(fixture).toBeDefined()
      })

      it('should preserve any existing qunit-fixture element', function () {
        var fixture = document.getElementById('qunit-fixture')
        if (!fixture) {
          fixture = document.createElement('div')
          fixture.id = 'qunit-fixture'
          document.body.appendChild(fixture)
        }
        fixture.className = 'marker'

        runner.emit('begin', {})
        runner.emit('testStart', {})

        fixture = document.getElementById('qunit-fixture')
        expect(fixture.className).toBe('marker')
      })
    })

    describe('test end', function () {
      it('should report result', function () {
        spyOn(tc, 'result').and.callFake(function (result) {
          expect(result.description).toBe('should do something')
          expect(result.suite instanceof Array).toBe(true)
          expect(result.success).toBe(true)
          expect(result.log instanceof Array).toBe(true)
        })

        var mockQUnitResult = {
          name: 'should do something',
          module: 'desc1',
          failed: 0
        }

        runner.emit('testStart', mockQUnitResult)
        runner.emit('testDone', mockQUnitResult)

        expect(tc.result).toHaveBeenCalled()
      })

      it('should report failed result', function () {
        spyOn(tc, 'result').and.callFake(function (result) {
          expect(result.success).toBe(false)
          expect(result.log).toEqual(['Big trouble.\nExpected: ' + JSON.stringify(expected) + '\nActual: undefined' + '\n'])
        })

        var mockQUnitResult = {
          module: 'desc1',
          failed: 1,
          name: 'should do something'
        }

        var expected = {foo: 'bar', baz: [1, 2, 3]}

        var mockQUnitLog = {
          result: false,
          message: 'Big trouble.',
          expected: expected
        }

        runner.emit('testStart', mockQUnitResult)
        runner.emit('log', mockQUnitLog)
        runner.emit('testDone', mockQUnitResult)

        expect(tc.result).toHaveBeenCalled()
      })
    })
  })
})
