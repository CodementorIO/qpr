import searcher from './searcher'
import logger from './logger'

export default ({ username, token, queries })=> {
  let searchPr = searcher({ username, token })
  let promises = queries.map((q)=> searchPr(q))

  return Promise.all(promises)
                .then((values)=> {
                  values.forEach((v)=> logger(v))
                })
}
