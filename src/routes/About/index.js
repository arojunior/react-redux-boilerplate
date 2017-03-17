
module.exports = {
  path: 'about',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/About').default)
    })
  }
}
