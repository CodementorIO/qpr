import axios from 'axios'

const GITHUB_BASE = 'https://api.github.com'

async function querier({ username, token, owner, repo, number }) {
  let reviewsPromise = axios.get(
    `${GITHUB_BASE}/repos/${owner}/${repo}/pulls/${number}/reviews`, {
      auth: {
        username,
        password: token
      }
    })
  let reviewersPromise = axios.get(
    `${GITHUB_BASE}/repos/${owner}/${repo}/pulls/${number}/requested_reviewers`, {
      auth: {
        username,
        password: token
      }
    })

  let reviewsResp = await reviewsPromise
  let reviewersResp = await reviewersPromise

  let reviewGivers = reviewsResp.data.map( r => r.user.login)
  let reviewers = reviewersResp.data.map( r => r.login)

  let commented = !included(reviewGivers, reviewers)

  return { repo, owner, number, commented }
}

function included (sub, container) {
  return !sub.some(e => !container.includes(e))
}
export default { querier }
