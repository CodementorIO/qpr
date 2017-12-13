#!/usr/bin/env node

import runner from './runner'
import logger from './logger'

import queryCommented from './queryCommented'
import searchProxy from './searchProxy'

import yaml from 'js-yaml'
import fs from 'fs'
import os from 'os'
import path from 'path'

const { username, token, repoOwner } = yaml.safeLoad(
  fs.readFileSync(path.join(os.homedir(), '.qpr.credentials.yml'), 'utf8'))

let nonReviewedPrsPool = searchProxy({
  username,
  token,
  condition: `user:${repoOwner} author:${username} type:pr state:open review:none`
})

runner({
  logger,
  searchers: [
    searchProxy({
      username,
      token,
      queryName: 'To Review',
      condition: `user:${repoOwner} type:pr state:open review-requested:${username}`
    }),
    searchProxy({
      username,
      token,
      queryName: 'To Be Merged',
      condition: `user:${repoOwner} author:${username} type:pr state:open review:approved`
    }),
    searchProxy({
      username,
      token,
      queryName: 'Requested Change',
      condition: `user:${repoOwner} author:${username} type:pr state:open review:changes_requested`

    }),
    queryCommented({
      username,
      token,
      queryName: 'Commented',
      poolPromise: nonReviewedPrsPool
    })
  ]
})
