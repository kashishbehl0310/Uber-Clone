import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import MapTrack from './MapTrack';
import DriverFound from './DriverFound';
import DriverFooterProfile from './DriverFooterProfile';
import DriverOnTheWayFooter from './DriverOnTheWayFooter';
import HeaderComponent from "../../../components/HeaderComponent";
const carMarker = require("../../../assets/img/carMarker.png");
class TrackDriver extends React.Component{
    componentDidMount() {
        this.props.getCurrentLocation();
        this.props.getDriverInfo();
	}
    render(){
        const region = {
            latitude: 12.9718915,
            longitude: 77.6411545,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.0421
        }
        return(
            <Container>
                <HeaderComponent/>  
                {
                    this.props.region.latitude &&
                    <MapTrack 
                        region={this.props.region.latitude}
                        selectedAddress={this.props.selectedAddress}
                        driverLocation={this.props.driverLocation}
                        showCarMarker={this.props.showCarMarker}
                        carMarker={carMarker}
                    />   
                }   
                <DriverOnTheWayFooter 
                    driverInfo={this.props.driverInfo}
                />
                <DriverFooterProfile 
                    driverInfo={this.props.driverInfo}
                /> 
                {
                    this.props.showDriverFound &&
                    <DriverFound 
                        driverInfo={this.props.driverInfo}
                    />
                }
            </Container>
        );
    }
}

export default TrackDriver;