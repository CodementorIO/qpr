import searchProxy from '../src/searchProxy'
import nock from 'nock'

describe('toMerged', ()=> {
  let username = 'the-username'
  let token = 'the-token'
  let condition = 'the-condition'
  let queryName = 'the-query-name'

  function mockGithubAPI (condition, body) {
    return nock('https://api.github.com')
      .get('/search/issues')
      .query({ q: condition })
      .basicAuth({
        user: username,
        pass: token
      })
      .reply(200, body)
  }

  it('sends request to github', (done)=> {
    let body = {
      items: [
        {
          title: 'the-title',
          pull_request: {
            html_url: 'the-url'
          }
        }
      ]
    }
    let nockScope = mockGithubAPI(condition, body)
    let res = searchProxy({ username, token })({ condition, queryName })

    res.then((items)=> {
      expect(items).toEqual({ items: body.items, queryName })
      nockScope.done()
      done()
    })
  })
})
