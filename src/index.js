import searcher from './searcher'
import queries from './queries'
import logger from './logger'

import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

const { username, token, repoOwner } = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, '..', '.credentials.yml'), 'utf8'))

let searchPr = searcher({ username, token })

let promises = queries({ username, repoOwner }).map((q)=> {
  return searchPr(q)
})

Promise.all(promises)
  .then((values)=> {
    values.forEach((r)=> logger(r))
  })
