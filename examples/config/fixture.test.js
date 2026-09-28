QUnit.test('verify fixture [initial]', function (assert) {
  assert.equal(document.querySelector('#qunit-fixture').innerHTML, 'foobar')

  document.querySelector('#qunit-fixture').innerHTML = 'quux'
})

QUnit.test('verify fixture [reset]', function (assert) {
  assert.equal(document.querySelector('#qunit-fixture').innerHTML, 'foobar')
})
