const fs = require('fs')
const path = require('path')
const vm = require('vm')
const sinon = require('sinon')

const adapterJs = fs.readFileSync(path.join(__dirname, '../src/adapter.js'), 'utf8')
const context = {
  setTimeout () {},
  window: {}
}
vm.runInNewContext(adapterJs, context)
const { createQUnitStartFn } = context

const { MockRunner } = require('./adapter-mocks.js')

QUnit.module('adapter', function (hooks) {
  var runner
  var karma
  hooks.beforeEach(function () {
    runner = new MockRunner()
    karma = {
      result () {},
      info () {},
      complete () {}
    }
    karma.start = createQUnitStartFn(karma, runner)
  })
  hooks.afterEach(function () {
    sinon.restore()
  })

  QUnit.test('report passing result', function (assert) {
    sinon.spy(karma, 'result')
    sinon.spy(karma, 'info')
    sinon.spy(karma, 'complete')
    karma.start()

    var mockQUnitResult = {
      name: 'should do something',
      suiteName: 'desc1',
      status: 'passed',
      runtime: 0,
      errors: []
    }

    runner.emit('begin', { totalTests: 1 })
    runner.emit('testEnd', mockQUnitResult)
    runner.emit('done')

    assert.true(karma.result.called, 'result called')
    assert.propEqual(karma.result.args[0][0], {
      description: 'should do something',
      suite: ['desc1'],
      success: true,
      skipped: false,
      log: [],
      time: 0
    })
    assert.true(karma.info.called, 'info called')
    assert.propContains(karma.info.args[0][0], {
      total: 1
    })
    assert.true(karma.complete.called, 'complete called')
  })

  QUnit.test('report failing result', function (assert) {
    sinon.spy(karma, 'result')
    sinon.spy(karma, 'info')
    sinon.spy(karma, 'complete')
    karma.start()

    var mockQUnitResult = {
      name: 'should do something',
      suiteName: 'desc1',
      status: 'failed',
      runtime: 0,
      errors: [{
        passed: false,
        message: 'Big trouble.',
        expected: {
          foo: 'bar',
          baz: [1, 2, 3]
        },
        stack: 'bar@example.js:42'
      }]
    }
    runner.emit('begin', { totalTests: 1 })
    runner.emit('testEnd', mockQUnitResult)
    runner.emit('done')

    assert.true(karma.result.called, 'result called')
    assert.propContains(karma.result.args[0][0], {
      description: 'should do something',
      log: [
        'Big trouble.\nExpected: {"foo":"bar","baz":[1,2,3]}\nActual: undefined\nbar@example.js:42\n'
      ],
      success: false
    })
    assert.true(karma.info.called, 'info called')
    assert.propContains(karma.info.args[0][0], {
      total: 1
    })
    assert.true(karma.complete.called, 'complete called')
  })
})
