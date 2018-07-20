var initQunit = require('../../lib')['framework:qunit'][1]
var expect = require('chai').expect

describe('framework:qunit', function () {
  var files

  beforeEach(function () {
    files = []
  })

  it('should add qunit.css', function () {
    initQunit(files)

    expect(files[0].pattern).to.contain('qunit.css')
  })

  it('should add qunit.js', function () {
    initQunit(files)

    expect(files[1].pattern).to.contain('qunit.js')
  })

  it('should add adapter.js', function () {
    initQunit(files)

    expect(files[2].pattern).to.contain('adapter.js')
  })
})
