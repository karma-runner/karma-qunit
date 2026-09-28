var control = 10

QUnit.test('verify controlled start', function (assert) {
  assert.equal(control, '20')
})

setTimeout(function () {
  control = 20
  QUnit.start()
}, 1000)
