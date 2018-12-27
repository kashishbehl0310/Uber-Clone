import { connect } from "react-redux";
import Home from "../components/Home";

import { 
        getCurrentLocation,
        getDriverInfo
    } from '../modules/trackDriver';

const mapStateToProps = (state) => ({
    region: state.trackDriver.region,
    selectedAddress: state.trackDriver.selectedAddress || {},
    driverInfo: state.trackDriver.driverInfo || {},
    driverLocation: state.trackDriver.driverLocation || {}
})

const mapActionCreators = {
    getCurrentLocation,
    getDriverInfo
};

export default connect(mapStateToProps, mapActionCreators)(Home);