import Layout from './../layouts'

import Home from './Home'
import About from './About'

export default {
  path: '/',
  component: Layout,
  indexRoute: Home,
  childRoutes: [
    About
  ]
}
