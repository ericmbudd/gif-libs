const expect = chai.expect


describe('getSearchTerm', function() {
  it('is a function', function() {
    expect(getSearchTerm).to.be.a('function')
  })
})

it('savedSearch is an object', function() {
  expect(savedSearch).to.be.a('object')
})

describe('Shuffle Story Data', function() {
  it('Shuffled array does not equal original array', function() {
    let shuffledStoryData = []
    for (let i = 0; i < storyData.length; i++) {
      shuffledStoryData.push(storyData[i])
    }
    shuffledStoryData.shuffle()
    expect(shuffledStoryData).to.not.equal(storyData)
  })
})