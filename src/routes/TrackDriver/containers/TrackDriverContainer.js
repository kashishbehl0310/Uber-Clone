import { connect } from "react-redux";
import TrackDriver from '../components/TrackDriver'

import { 
        getCurrentLocation,
        getDriverInfo,
        getDriverLocation
    } from '../modules/trackDriver';

const mapStateToProps = (state) => ({
    region: state.trackDriver.region,
    selectedAddress: state.trackDriver.selectedAddress || {},
    driverInfo: state.trackDriver.driverInfo || {},
    driverLocation: state.trackDriver.driverLocation || {},
    showDriverFound: state.trackDriver.showDriverFound,
    showCarMarker: state.trackDriver.showCarMarker
})

const mapActionCreators = {
    getCurrentLocation,
    getDriverInfo,
    getDriverLocation
};

export default connect(mapStateToProps, mapActionCreators)(TrackDriver);