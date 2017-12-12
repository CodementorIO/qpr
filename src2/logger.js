import _colors from 'colors'

export default ({ queryName, items })=> {
  if (items.length === 0) {
    return
  }
  console.log(`=== ${queryName} ===`.bold)
  items.forEach(({ title, url })=> {
    console.log(` ${'*'.red} ${title}`)
    console.log(`   ${url}`)
  })
}
