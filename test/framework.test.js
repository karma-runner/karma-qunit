var initQunit = require('../lib')['framework:qunit'][1]

QUnit.module('framework', function (hooks) {
  var files

  hooks.beforeEach(function () {
    files = []
  })

  QUnit.test('should add qunit.css', function (assert) {
    initQunit(files)

    assert.true(files[0].pattern.includes('qunit.css'))
  })

  QUnit.test('should add qunit.js', function (assert) {
    initQunit(files)

    assert.true(files[1].pattern.includes('qunit.js'))
  })

  QUnit.test('should add adapter.js', function (assert) {
    initQunit(files)

    assert.true(files[2].pattern.includes('adapter.js'))
  })
})
