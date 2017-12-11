import queryCommented from '../src2/queryCommented'
import isCommentedQuerier from '../src2/isCommentedQuerier'

describe('queryCommented()', ()=> {
  let username = 'the-username'
  let token = 'the-token'

  beforeEach(()=> {
    jest.spyOn(isCommentedQuerier, 'querier').mockImplementation(({ number })=> {
      if (number == 1) {
        return Promise.resolve({ number, commented: true })
      } else {
        return Promise.resolve({ number, commented: false })
      }
    })
  })

  it('sends request to github to search commented', (done)=> {
    let poolPromise = Promise.resolve([
      { number: 1, pull_request: { title: "title-1" } },
      { number: 2, pull_request: { title: "title-2" } },
      { number: 3, pull_request: { title: "title-3" } }
    ])

    let res = queryCommented({ username, token, poolPromise })

    res.then((values)=> {
      expect(values).toEqual([ { number: 1, pull_request: { title: "title-1" } } ])
      done()
    })
  })
})
