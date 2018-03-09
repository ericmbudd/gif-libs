let expect = require('chai').expect
let getSearchTerm = require('../src/main').getSearchTerm

describe('getSearchTerm', function() {
  it('is defined', function() {
    expect(getSearchTerm).to.be.an('object')
  })
})