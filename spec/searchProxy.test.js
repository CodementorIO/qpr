import searchProxy from '../src2/searchProxy'
import nock from 'nock'

describe('toMerged', ()=> {
  let username = 'the-username'
  let token = 'the-token'
  let condition = 'the-condition'

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
    let res = searchProxy({ username, token, condition })

    res.then((items)=> {
      expect(items).toEqual(body.items)
      done()
    })
  })
})
