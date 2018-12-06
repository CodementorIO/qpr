#!/usr/bin/env node

import runner from './runner'
import logger from './logger'

import createQueryCommented from './queryCommented'
import createSearchProxy from './searchProxy'

import yaml from 'js-yaml'
import fs from 'fs'
import os from 'os'
import path from 'path'

const { username, token, repoOwner } = yaml.safeLoad(
  fs.readFileSync(path.join(os.homedir(), '.qpr.credentials.yml'), 'utf8'))

const searchProxy = createSearchProxy({ username, token })
const queryCommented = createQueryCommented({ username, token })

let nonReviewedPrsPool = searchProxy({
  queryName: '_',
  condition: `user:${repoOwner} author:${username} type:pr state:open review:none`
})

runner({
  logger,
  searchers: [
    searchProxy({
      queryName: 'To Review',
      condition: `user:${repoOwner} type:pr state:open review-requested:${username}`
    }),
    searchProxy({
      queryName: 'To Be Merged',
      condition: `user:${repoOwner} author:${username} type:pr state:open review:approved`
    }),
    searchProxy({
      queryName: 'Requested Change',
      condition: `user:${repoOwner} author:${username} type:pr state:open review:changes_requested`
    }),
    searchProxy({
      queryName: 'Needs QA',
      condition: `user:${repoOwner} assignee:${username} type:pr state:open NOT shipit`,
    }),
    queryCommented({
      queryName: 'Commented',
      poolPromise: nonReviewedPrsPool
    })
  ]
})
