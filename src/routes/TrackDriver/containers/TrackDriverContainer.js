import { connect } from "react-redux";
import Home from "../components/Home";

import { 
        setName, 
        getCurrentLocation
    } from '../modules/home';

const mapStateToProps = (state) => ({
    name: state.home.name,
    region: state.trckDriver.region,
    selectedAddress: state.home.selectedAddress || {}
})

const mapActionCreators = {
    setName,
    getCurrentLocation
};

export default connect(mapStateToProps, mapActionCreators)(Home);