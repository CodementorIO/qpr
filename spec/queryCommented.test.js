import queryCommented from '../src2/queryCommented'
import isCommentedQuerier from '../src2/isCommentedQuerier'

describe('queryCommented()', ()=> {
  let username = 'the-username'
  let token = 'the-token'

  beforeEach(()=> {
    jest.spyOn(isCommentedQuerier, 'querier').mockImplementation(({ number })=> {
      if (number == 1) {
        return Promise.resolve(mockCommentedResolver(number, true))
        // return Promise.resolve({
        //   number,
        //   owner: 'owner-1',
        //   repo: ,
        //   commented: true
        // })
      } else {
        return Promise.resolve(mockCommentedResolver(number, false))
        // return Promise.resolve({ number, commented: false })
      }
    })
  })

  function mockCommentedResolver (number, commented) {
    return {
      number,
      commented,
      repo: `the-repo-${number}`,
      owner: `owner-${number}`
    }
  }

  function mockIssueResp (number) {
    return {
      number,
      pull_request: {
        title: `title-${number}`
      },
      repo: {
        name: `the-repo-${number}`,
        owner: {
          login: `owner-${number}`
        }
      }
    }
  }

  it('sends request to github to search commented', (done)=> {
    let poolPromise = Promise.resolve([
      mockIssueResp(1),
      mockIssueResp(2),
      mockIssueResp(3)
    ])

    let res = queryCommented({ username, token, poolPromise })

    res.then((values)=> {
      expect(values).toEqual([ mockIssueResp(1) ])
      done()
    })
  })
})
