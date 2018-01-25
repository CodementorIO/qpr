import axios from 'axios'

const GITHUB_BASE = 'https://api.github.com'

async function querier({ username, token, prOwner, repoFullName, number }) {
  let reviewsPromise = axios.get(
    `${GITHUB_BASE}/repos/${repoFullName}/pulls/${number}/reviews`, {
      auth: {
        username,
        password: token
      }
    })
  let reviewersPromise = axios.get(
    `${GITHUB_BASE}/repos/${repoFullName}/pulls/${number}/requested_reviewers`, {
      auth: {
        username,
        password: token
      }
    })

  let reviewsResp = await reviewsPromise
  let reviewersResp = await reviewersPromise

  let reviewGivers = reviewsResp.data.map( r => r.user.login)
  let reviewers = reviewersResp.data.users.map( r => r.login)

  let commented = !included(
    reviewGivers.filter(r => r !== prOwner),
    reviewers
  )

  return { repoFullName, number, commented }
}

function included (sub, container) {
  return !sub.some(e => !container.includes(e))
}
export default { querier }
