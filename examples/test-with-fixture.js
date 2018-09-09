QUnit.test('set innerHTML', function (assert) {
  document.querySelector('#qunit-fixture').innerHTML = 'foo'
  assert.ok(true)
})

QUnit.test('verify that innerHTML is reset', function (assert) {
  assert.equal(document.querySelector('#qunit-fixture').innerHTML, '')
})

QUnit.test('verify the styles', function (assert) {
  var rect = document.querySelector('#qunit-fixture').getBoundingClientRect()
  assert.strictEqual(rect.bottom, -9000)
  assert.strictEqual(rect.left, -10000)
  assert.strictEqual(rect.right, -9000)
  assert.strictEqual(rect.top, -10000)
})
