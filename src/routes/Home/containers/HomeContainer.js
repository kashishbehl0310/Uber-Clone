import { connect } from "react-redux";
import Home from "../components/Home";

import { 
        setName, 
        getCurrentLocation, 
        getInputData, 
        toggleSearchResult,
        getAddressPredictions,
        getSelectedAddress
    } from '../modules/home';

const mapStateToProps = (state) => ({
    name: state.home.name,
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || [],
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare
})

const mapActionCreators = {
    setName,
    getCurrentLocation,
    getInputData, 
    toggleSearchResult,
    getAddressPredictions,
    getSelectedAddress
};

export default connect(mapStateToProps, mapActionCreators)(Home);