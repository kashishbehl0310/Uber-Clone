import { connect } from "react-redux";
import Home from "../components/Home";

import { 
        getCurrentLocation,
        getDriverInfo
    } from '../modules/trackDriver';

const mapStateToProps = (state) => ({
    region: state.trckDriver.region,
    selectedAddress: state.home.selectedAddress || {},
    driverInfo: state.home.driverInfo || {}
})

const mapActionCreators = {
    getCurrentLocation,
    getDriverInfo
};

export default connect(mapStateToProps, mapActionCreators)(Home);