import {combineReducers}          from 'redux'
import {reducer as formReducer}   from 'redux-form'

import {createStore, applyMiddleware, compose} from 'redux'
import promiseMiddleware                       from 'redux-promise'

const combineReducer = combineReducers({
    form : formReducer,
})

/*
* Store
*/
export const store = createStore(combineReducer, {}, compose(
    applyMiddleware(promiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
