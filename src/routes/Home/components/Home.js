import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import MapContainer from "./MapContainer";

class Home extends React.Component{
    componentDidMount(){
        this.props.setName();
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
                <MapContainer region={region} />
            </Container>
        );
    }
}

export default Home;