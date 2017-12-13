import axios from 'axios'

const GITHUB_ENDPOINT = 'https://api.github.com/search/issues'

export default ({ username, token }) => async ({ queryName, condition }) => {
  let res = await axios.get(GITHUB_ENDPOINT, {
    auth: {
      username,
      password: token
    },
    params: { q: condition }
  })

  return { queryName, items: res.data.items }
}
