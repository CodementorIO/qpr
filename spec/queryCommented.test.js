import queryCommented from '../src2/queryCommented'
import isCommentedQuerier from '../src2/isCommentedQuerier'

describe('queryCommented()', ()=> {
  let username = 'the-username'
  let token = 'the-token'
  let queryName = 'Commented'

  beforeEach(()=> {
    jest.spyOn(isCommentedQuerier, 'querier').mockImplementation(({ number })=> {
      if (number == 1) {
        return Promise.resolve(mockCommentedResolver(number, true))
      } else {
        return Promise.resolve(mockCommentedResolver(number, false))
      }
    })
  })

  function mockCommentedResolver (number, commented) {
    return {
      number,
      commented,
      repoFullName: `owner-${number}/the-repo-${number}`
    }
  }

  function mockIssueResp (number) {
    return {
      number,
      repository_url: `https://api.github.com/repos/owner-${number}/the-repo-${number}`,
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
    let poolPromise = Promise.resolve({
      items: [
        mockIssueResp(1),
        mockIssueResp(2),
        mockIssueResp(3)
      ]
    })

    let res = queryCommented({ username, token, poolPromise, queryName })

    res.then((values)=> {
      expect(values).toEqual({ queryName, items: [ mockIssueResp(1) ]})
      done()
    })
  })
})
