import queries from './queries'
import runner from './runner'
import yaml from 'js-yaml'
import fs from 'fs'
import os from 'os'
import path from 'path'

const { username, token, repoOwner } = yaml.safeLoad(
  fs.readFileSync(path.join(os.homedir(), '.qpr.credentials.yml'), 'utf8'))

runner({ username, token, queries: queries({ username, repoOwner }) })
