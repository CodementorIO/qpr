describe('runner({ username, token, queries })', ()=> {
  let runner
  let mockLogger
  let mockSearcher
  let searchPr
  const username = 'the-username'
  const token = 'the-token'
  const queries = [
    {
      name: 'query name',
      conditions: [
        'the-condition-str'
      ]
    }
  ]

  beforeEach(()=> {
    mockLogger = jest.fn()
    jest.mock('../logger', ()=> mockLogger)
  })

  beforeEach(()=> {
    searchPr = jest.fn()
    searchPr.mockImplementation(()=> Promise.resolve({ key: 'val' }))
    mockSearcher = jest.fn(()=> searchPr)
    jest.mock('../searcher', ()=> mockSearcher)

    runner = require('../runner').default
  })
  afterEach(()=> {
    jest.resetModules()
  })
  it('searches all the queries given', ()=> {
    runner({ username, token, queries })
    expect(mockSearcher).toHaveBeenCalledWith({ username, token })
  })
  it('searches each query', ()=> {
    runner({ username, token, queries })
    queries.forEach((q)=> {
      expect(searchPr).toHaveBeenCalledWith(q)
    })
  })
  it('waits for all the resolved promises and passes it to logger', (done)=> {
    runner({ username, token, queries })
      .then(()=> {
        queries.forEach(()=> {
          expect(mockLogger).toHaveBeenCalledWith({ key: 'val' })
        })
        done()
      })
  })
})
