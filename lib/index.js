var path = require('path')

function createPattern (pattern) {
  return {
    pattern: pattern,
    included: true,
    served: true,
    watched: false
  }
}

function initQUnit (files, config) {
  var qunit = require.resolve('qunit')
  var qunitModule = qunit
  var qunitPath = 'qunit'

  // Use old qunitjs package
  if (config && config.QUnitJS) {
    qunitModule = require.resolve('qunitjs')
    qunitPath = 'qunitjs'
  }

  files.unshift(createPattern(path.join(__dirname, 'adapter.js')))
  files.unshift(createPattern(qunitModule))
  files.unshift(createPattern(require.resolve(qunitPath + '/qunit/qunit.css')))
}

initQUnit.$inject = ['config.files', 'config.client.qunit']

module.exports = {
  'framework:qunit': ['factory', initQUnit]
}
