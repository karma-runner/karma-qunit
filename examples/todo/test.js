QUnit.test('it works', function (assert) {
  assert.expect(1)
  assert.strictEqual(1 + 1, 2)
})

QUnit.test.todo('not yet', function (assert) {
  assert.true(false, 'some message')
})
