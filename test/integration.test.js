const cp = require('child_process')
const path = require('path')

QUnit.module('integration')

function normalize (str) {
  return str
    .replace(/^.*:INFO/gm, 'INFO')
    .replace(/(Karma|Firefox) \S+/g, '$1')
    .replace(/(Firefox) \([^)]*\)/g, '$1')
    .replace(/(server started|on socket|Finished in) .*$/gm, '$1')
    .replace(/^\s+/gm, '  ')
}

QUnit.test.each('examples', {
  simple: ['examples/simple/karma.conf.js', 0, `
    START:
INFO [karma-server]: Karma server started
INFO [launcher]: Launching browsers FirefoxHeadless with concurrency unlimited
INFO [launcher]: Starting browser FirefoxHeadless
INFO [Firefox]: Connected on socket
  ✔ it works
  ✔ set innerHTML
  ✔ verify that innerHTML is reset
  ✔ verify the styles
  Finished in
  SUMMARY:
✔ 4 tests completed`],
  fail: ['examples/fail/karma.conf.js', 1, `
    START:
INFO [karma-server]: Karma server started
INFO [launcher]: Launching browsers FirefoxHeadless with concurrency unlimited
INFO [launcher]: Starting browser FirefoxHeadless
INFO [Firefox]: Connected on socket
  ✖ example
  ✔ it works
  Finished in
  SUMMARY:
✔ 1 test completed
✖ 1 test failed
  FAILED TESTS:
  ✖ example
  Firefox
  some message
  Expected: true
  Actual: false
  @test.js:2:10`],
  todo: ['examples/todo/karma.conf.js', 0, `
    START:
INFO [karma-server]: Karma server started
INFO [launcher]: Launching browsers FirefoxHeadless with concurrency unlimited
INFO [launcher]: Starting browser FirefoxHeadless
INFO [Firefox]: Connected on socket
  ✔ it works
  ✔ not yet
  Finished in
  SUMMARY:
✔ 2 tests completed`],
  config_autostart: ['examples/config/autostart_false.karma.conf.js', 0, `
    START:
INFO [karma-server]: Karma server started
INFO [launcher]: Launching browsers FirefoxHeadless with concurrency unlimited
INFO [launcher]: Starting browser FirefoxHeadless
INFO [Firefox]: Connected on socket
  ✔ verify controlled start
  Finished in
  SUMMARY:
✔ 1 test completed`],
  config_fixture: ['examples/config/fixture.karma.conf.js', 0, `
    START:
INFO [karma-server]: Karma server started
INFO [launcher]: Launching browsers FirefoxHeadless with concurrency unlimited
INFO [launcher]: Starting browser FirefoxHeadless
INFO [Firefox]: Connected on socket
  ✔ verify fixture [initial]
  ✔ verify fixture [reset]
  Finished in
  SUMMARY:
✔ 2 tests completed`]
}, (assert, [file, exitCode, expected]) => {
  assert.timeout(10_000)
  expected = expected.trim()
  let actual, actualStatus
  try {
    const ret = cp.execSync(`npx karma start ${file} --no-colors`, {
      cwd: path.dirname(__dirname),
      encoding: 'utf8'
    })
    actual = normalize(ret)
    actualStatus = 0
  } catch (e) {
    actual = normalize(e.stdout || String(e))
    actualStatus = e.status
  }
  assert.pushResult({ result: actual.includes(expected), actual, expected })
  assert.strictEqual(actualStatus, exitCode, 'exit code')
})
