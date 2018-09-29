import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import {createLogger } from 'redux-logger'

const log = createLogger({diff: true, collapsed: true})

export default (initialState = {}) => {
    const middleware = [thunk, log]
    const enhancers = []

    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    return store
}