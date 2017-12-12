export default ({ searchers, logger })=> {
  return Promise.all(searchers)
    .then((values)=> {
      values.forEach(vs => logger(vs))
    })
}
