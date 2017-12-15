import isCommentedQuerier from '../src/isCommentedQuerier'
import nock from 'nock'

describe('isCommentedQuerier({ username, token, prOwner, repoFullName, number })', ()=> {
  let reviewsNock, reviewersNock
  let reviewsBody, reviewersBody

  let username = 'the-username'
  let token = 'the-token'
  let repoFullName = 'repo-owner/repo-name'
  let prOwner = 'the-prOwner'
  let number = 26

  function nockReviews (ownerUsernames) {
    let body = ownerUsernames.map((n)=> {
      return {
        user: { login: n }
      }
    })
    return nock('https://api.github.com')
      .get(`/repos/${repoFullName}/pulls/${number}/reviews`)
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
      .get(`/repos/${repoFullName}/pulls/${number}/requested_reviewers`)
      .basicAuth({
        user: username,
        pass: token
      })
      .reply(200, body)
  }

  it('sends request to github to fetch reveiws and requested_reviewers', (done)=> {
    reviewsNock = nockReviews([ 'username1', 'username2' ])
    reviewersNock = nockReviewers([ 'username1' ])

    isCommentedQuerier.querier({ username, token, prOwner, repoFullName, number })
      .then((result)=> {
        reviewsNock.done()
        reviewersNock.done()
        expect(result).toEqual({
          repoFullName,
          number,
          commented: true
        })
        done()
      })
  })
  it('resolved with `commented` false if all the review owners are requested review', (done)=> {
    reviewsNock = nockReviews([ 'username1' ])
    reviewersNock = nockReviewers([ 'username1', 'username2' ])

    isCommentedQuerier.querier({ username, token, prOwner, repoFullName, number })
      .then((result)=> {
        reviewsNock.done()
        reviewersNock.done()
        expect(result).toEqual({
          repoFullName,
          number,
          commented: false
        })
        done()
      })
  })
  it('excludes the prOwner when resolving the review givers', (done)=> {
    reviewsNock = nockReviews([ 'username1', prOwner ])
    reviewersNock = nockReviewers([ 'username1', 'username2' ])

    isCommentedQuerier.querier({ username, token, prOwner, repoFullName, number })
      .then((result)=> {
        reviewsNock.done()
        reviewersNock.done()
        expect(result).toEqual({
          repoFullName,
          number,
          commented: false
        })
        done()
      })
  })
})
