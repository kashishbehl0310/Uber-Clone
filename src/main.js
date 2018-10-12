import  React  from "react";
import createStore from "./store/createStore";
import AppContainer from "./AppContainer";
export default class Root extends React.Component{
    renderApp(){
        const intialState = window.__INITIAL_STATE__;
        const store = createStore(intialState)
        return(
            <AppContainer store={store} />
        );
    }
    render(){
        return this.renderApp()
    }
}