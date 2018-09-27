import React from 'react'

export default class Root extends React.Component{
    renderApp(){
        const initialState = window.__INITIAL_STATE__;
        const store = createStore(initialState)

        return  ();
    }
    render(){
        return this.renderApp()
    }
}
