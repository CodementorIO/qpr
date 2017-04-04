import searcher from '../searcher'
import nock from 'nock'

describe('searcher({ username, token })', ()=> {
  const username = 'mz026'
  const token = 'the-token'

  it('takes username and token to create the searcher function', ()=> {
    let searchPr = searcher({ username, token })
    expect(searchPr instanceof Function).toBe(true)
  })

  describe('searchPr(query)', ()=> {
    let searchPr
    const query = {
      name: 'Requested Change',
      conditions: [
        'author:mz026 type:pr state:open review:changes_requested',
        'author:mz026 type:pr state:open comments:>1 review:none'
      ]
    }
    const mockGithubRequest = (condition, body)=> {
      return nock('https://api.github.com')
        .get('/search/issues')
        .query({ q: condition })
        .basicAuth({
          user: username,
          pass: token
        })
        .reply(200, body)
    }
    const mockGithubBody = (name)=> {
      return {
        items: [
          {
            title: `repo ${name}`,
            pull_request: {
              html_url: `url-${name}`
            }
          }
        ]
      }
    }
    beforeEach(()=> {
      searchPr = searcher({ username, token })
    })
    it('sends requests to github according to `conditions`', (done)=> {
      let nockScopes = query.conditions.map((c, index)=> {
        return mockGithubRequest(c, mockGithubBody(`name-${index}`))
      })

      searchPr(query)
        .then(()=> {
          nockScopes.forEach((s)=> s.done())
          done()
        })
    })
    it('resolves the returned objects with desired format', (done)=> {
      let nockScopes = query.conditions.map((c, index)=> {
        return mockGithubRequest(c, mockGithubBody(`name-${index}`))
      })
      let promise = searchPr(query).then((value)=> {
        expect(value).toEqual({
          name: query.name,
          repos: [
            {
              title: 'repo name-0',
              url: 'url-name-0'
            },
            {
              title: 'repo name-1',
              url: 'url-name-1'
            }
          ]
        })
        done()
      })
    })
  })

})
