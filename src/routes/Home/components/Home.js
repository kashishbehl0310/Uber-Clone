import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import MapContainer from "./MapContainer";

class Home extends React.Component{
    componentDidMount(){
        this.props.setName();
        this.props.getCurrentLocation();
    }
    render(){
        const region = {
            latitude: 12.9718915,
            longitude: 77.6411545,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.0421
        }
        return(
            // <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            //     <Text>Hello {this.props.name}</Text>
            // </View>
            <Container>
                {this.props.region.latitude &&
                    <MapContainer 
                        region={this.props.region} 
                        getInputData={this.props.getInputData} 
                        toggleSearchResult={this.props.toggleSearchResult} 
                        getAddressPredictions={this.props.getAddressPredictions}
                        resultTypes = {this.props.resultTypes}
                        predictions = {this.props.predictions}
                        />
                }
            </Container>
        );
    }
}

export default Home;