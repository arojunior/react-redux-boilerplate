# React/Redux Boilerplate

### Main packages

* React
* React-router
* React-redux
* Redux
* Redux-actions
* Redux-promise
* Redux-form

### Default configuration

* Generate a vendor.js file with main libs (because clients do not need to download all of libs every time you change something in you project)
* Generate bundle filename with chunks to prevent cached file
* The router configuration makes webpack generate one file per route, so the clients will download just what they need and not the whole application
