export default ({ searchers, logger })=> {
  return Promise.all(searchers)
    .then((values)=> {
      logger(values)
    })
}
