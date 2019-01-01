import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import { Actions } from "react-native-router-flux";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import Fare from "./Fare";
import Fab from "./Fab";
import FindDriver from './FindDriver';

const taxiLogo = require("../../../assets/img/taxi_logo_white.png")
const carMarker = require("../../../assets/img/carMarker.png");
class Home extends React.Component{
    componentDidMount() {
		var rx = this;
		this.props.getCurrentLocation();
		setTimeout(function(){
			rx.props.getNearByDrivers();

		}, 1000);
    }
    componentDidUpdate(prevProps, prevState) {
        // this.props.getBookingStatus()
        if (this.props.booking.status === "confirmed" ){
            Actions.trackDriver({type: "reset"});
        }
	}
    render(){
        const region = {
            latitude: 12.9718915,
            longitude: 77.6411545,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.0421
        }
        const { status } = this.props.booking;
        return(
            // <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            //     <Text>Hello {this.props.name}</Text>
            // </View> 
            <Container>
                { (status !== 'pending') && 
                    <View style={{flex:1}}>
                        <HeaderComponent logo={taxiLogo} />
                        {this.props.region.latitude &&
                            <MapContainer 
                                region={this.props.region} 
                                getInputData={this.props.getInputData} 
                                toggleSearchResult={this.props.toggleSearchResult} 
                                getAddressPredictions={this.props.getAddressPredictions}
                                resultTypes = {this.props.resultTypes}
                                predictions = {this.props.predictions}
                                getSelectedAddress = {this.props.getSelectedAddress}
                                selectedAddress={this.props.selectedAddress}
                                carMarker={carMarker}
                                nearByDrivers={this.props.nearByDrivers}
                                />
                        }
                        <Fab onPressACtion={() => this.props.bookCar()} />
                        {
                            this.props.fare &&
                            <Fare fare={this.props.fare} />
                        }
        
                        <FooterComponent />
                    </View>
                    ||
                    <FindDriver selectedAddress={this.props.selectedAddress} />
                }
                
            </Container>
        );
    }
}

export default Home;