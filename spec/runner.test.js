import runner from '../src2/runner'

describe('Runner', ()=> {
  let mockLogger
  function mockSearchResult (name) {
    return {
      queryName: name,
      items: {
        title: `PR with title ${name}`,
        url: `url-with-${name}`
      }
    }
  }
  beforeEach(()=> {
    mockLogger = jest.fn()
  })

  it('takes searchers and pipes them into logger', (done)=> {
    let searchers = [
      Promise.resolve(mockSearchResult('pr1')),
      Promise.resolve(mockSearchResult('pr2'))
    ]
    let resultPromise = runner({
      searchers,
      logger: mockLogger
    })

    resultPromise.then(()=> {
      [
        mockSearchResult('pr1'), mockSearchResult('pr2')
      ].forEach(item => {
        expect(mockLogger).toBeCalledWith(item)
      })

      done()
    })
  })
})
