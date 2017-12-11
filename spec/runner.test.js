import runner from '../src2/runner'

describe('Runner', ()=> {
  let mockLogger
  let createMockSearcher = (name) => {
    return Promise.resolve({
      name,
      pullRequests: {
        title: `PR with title ${name}`,
        url: `url-with-${name}`
      }
    })
  }
  beforeEach(()=> {
    mockLogger = jest.fn()
  })

  it('takes searchers and pipes them into logger', (done)=> {
    let searchers = [
      createMockSearcher('pr1'),
      createMockSearcher('pr2')
    ]
    let resultPromise = runner({
      searchers,
      logger: mockLogger
    })

    resultPromise.then(()=> {
      expect(mockLogger).toBeCalledWith([
        {
          name: 'pr1',
          pullRequests: {
            title: `PR with title pr1`,
            url: `url-with-pr1`
          }
        },
        {
          name: 'pr2',
          pullRequests: {
            title: `PR with title pr2`,
            url: `url-with-pr2`
          }
        }
      ])
      done()
    })
  })
})
