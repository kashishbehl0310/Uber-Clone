import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";
import { createLogger } from "redux-logger";
import createSocketIoMiddleware from 'redux-socket.io'
// import io from 'socket.io';

let socket = io('http://localhost:7777', {jsonp: false})
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const log = createLogger({diff: true, collapsed: true});

export default (initialState = {}) =>{
    const middleware = [thunk, log, SocketIoMiddleware];

    const enhancers = [];

    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    return store;
};