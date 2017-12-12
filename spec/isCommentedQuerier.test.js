import isCommentedQuerier from '../src2/isCommentedQuerier'
import nock from 'nock'

describe('isCommentedQuerier({ username, token, owner, repo, number })', ()=> {
  let reviewsNock, reviewersNock
  let reviewsBody, reviewersBody

  let username = 'the-username'
  let token = 'the-token'
  let owner = 'repo-owner'
  let repo = 'repo-name'
  let number = 26

  function nockReviews (ownerUsernames) {
    let body = ownerUsernames.map((n)=> {
      return {
        user: { login: n }
      }
    })
    return nock('https://api.github.com')
      .get(`/repos/${owner}/${repo}/pulls/${number}/reviews`)
      .basicAuth({
        user: username,
        pass: token
      })
      .reply(200, body)
  }
  function nockReviewers (reviewerUsernames) {
    let body = reviewerUsernames.map((u)=> {
      return { login: u }
    })
    return nock('https://api.github.com')
      .get(`/repos/${owner}/${repo}/pulls/${number}/requested_reviewers`)
      .basicAuth({
        user: username,
        pass: token
      })
      .reply(200, body)
  }

  it('sends request to github to fetch reveiws and requested_reviewers', (done)=> {
    reviewsNock = nockReviews([ 'username1', 'username2' ])
    reviewersNock = nockReviewers([ 'username1' ])

    isCommentedQuerier.querier({ username, token, owner, repo, number })
      .then((result)=> {
        reviewsNock.done()
        reviewersNock.done()
        expect(result).toEqual({
          repo,
          owner,
          number,
          commented: true
        })
        done()
      })
  })
  it('resolved with `commented` false if all the review owners are requested review', (done)=> {
    reviewsNock = nockReviews([ 'username1' ])
    reviewersNock = nockReviewers([ 'username1', 'username2' ])

    isCommentedQuerier.querier({ username, token, owner, repo, number })
      .then((result)=> {
        reviewsNock.done()
        reviewersNock.done()
        expect(result).toEqual({
          repo,
          owner,
          number,
          commented: false
        })
        done()
      })
  })
})