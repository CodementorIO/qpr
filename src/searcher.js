import URL from 'url'
import fetch from 'node-fetch'
import flatMap from 'lodash.flatmap'
import getObj from 'lodash.get'

const GITHUB_ENDPOINT = 'https://api.github.com/search/issues'
export default ({ username, token })=> ({ name, conditions }) => {
  let promises = conditions.map((condition)=> {
    return fetch(generateUrl({ username, token, condition })).then((res)=> res.json())
  })

  return Promise.all(promises)
    .then((values)=> {
      let repos = values.map((v)=> {
        return v.items.map((i)=> {
          return {
            title: i.title,
            url: getObj(i, ['pull_request', 'html_url'])
          }
        })
      })

      return {
        name,
        repos: flatMap(repos)
      }
    })
}

function generateUrl ({ username, token, condition }) {
  let urlObj = URL.parse(GITHUB_ENDPOINT)
  urlObj.auth = `${username}:${token}`
  urlObj.query = { q: condition }

  return URL.format(urlObj)
}
