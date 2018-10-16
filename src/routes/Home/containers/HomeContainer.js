import { connect } from "react-redux";
import Home from "../components/Home";

import { setName, getCurrentLocation, getInputData, toggleSearchResult } from '../modules/home';

const mapStateToProps = (state) => ({
    name: state.home.name,
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {}
})

const mapActionCreators = {
    setName,
    getCurrentLocation,
    getInputData, 
    toggleSearchResult
};

export default connect(mapStateToProps, mapActionCreators)(Home);