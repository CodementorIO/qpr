import _colors from 'colors'
import getObj from 'lodash.get'

export default ({ queryName, items })=> {
  if (items.length === 0) {
    return
  }
  console.log(`=== ${queryName} ===`.bold)
  items.forEach(item => {
    let title = item.title
    let url = getObj(item, ['pull_request', 'html_url'])
    console.log(` ${'*'.red} ${title}`)
    console.log(`   ${url}`)
  })
}
