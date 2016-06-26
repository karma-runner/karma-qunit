var path = require('path')

function createPattern (pattern) {
  return {
    pattern: pattern,
    included: true,
    served: true,
    watched: false
  }
}

function initQUnit (files, qunit) {
  files.unshift(createPattern(path.join(__dirname, 'adapter.js')))
  files.unshift(createPattern(require.resolve('qunitjs')))
  if (qunit && qunit.showUI) {
    files.unshift(createPattern(require.resolve('qunitjs/qunit/qunit.css')))
  }
}

initQUnit.$inject = ['config.files', 'config.client.qunit']

module.exports = {
  'framework:qunit': ['factory', initQUnit]
}
