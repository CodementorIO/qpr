import isCommentedQuerier from './isCommentedQuerier'

export default ({username, token}) => async ({queryName, poolPromise}) => {
  let isCommented = isCommentedQuerier.querier

  let { items } = await poolPromise
  let nonReviewedPrs = items
  let commentedPrs = []

  let isCommentedPromises = nonReviewedPrs.map((pr)=> {
    return isCommented({
      username,
      token,
      number: pr.number,
      repoFullName: extractRepoFullName(pr)
    })
  })

  let results = await Promise.all(isCommentedPromises)

  results.forEach(({ repoFullName, number, commented }) => {
    if (commented) {
      commentedPrs.push(nonReviewedPrs.find(pr => {
        return pr.number === number &&
          extractRepoFullName(pr) === repoFullName
      }))
    }
  })

  return { queryName, items: commentedPrs}
}

function extractRepoFullName (pr) {
  return pr.repository_url.replace('https://api.github.com/repos/', '')
}
