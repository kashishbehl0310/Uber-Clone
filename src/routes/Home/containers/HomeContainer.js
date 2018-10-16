import { connect } from "react-redux";
import Home from "../components/Home";

import { setName, getCurrentLocation, getInputData } from '../modules/home';

const mapStateToProps = (state) => ({
    name: state.home.name,
    region: state.home.region,
    inputData: state.home.inputData || {}
})

const mapActionCreators = {
    setName,
    getCurrentLocation,
    getInputData
};

export default connect(mapStateToProps, mapActionCreators)(Home);