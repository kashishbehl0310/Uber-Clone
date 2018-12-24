import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import Fare from "./Fare";
import Fab from "./Fab";
import FindDriver from './FindDriver';

const taxiLogo = require("../../../assets/img/taxi_logo_white.png")
const carMarker = require("../../../assets/img/carMarker.png");
class TrackDriver extends React.Component{
    componentDidMount() {
		this.props.getCurrentLocation();
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
                <HeaderComponent logo={taxiLogo} />        
            </Container>
        );
    }
}

export default Home;