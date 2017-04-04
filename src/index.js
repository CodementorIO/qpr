import queries from './queries'
import runner from './runner'
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

const { username, token, repoOwner } = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, '..', '.credentials.yml'), 'utf8'))

runner({ username, token, queries: queries({ username, repoOwner }) })
