import _colors from 'colors'

export default ({ name, repos })=> {
  if (repos.length === 0) {
    return
  }
  console.log(`=== ${name} ===`.bold)
  repos.forEach(({ title, url })=> {
    console.log(` ${'*'.red} ${title}`)
    console.log(`   ${url}`)
  })
}
