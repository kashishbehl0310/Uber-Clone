/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
let {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width/height
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class Taxi extends Component {
  constructor(){
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            longitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          
        });
      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider = {PROVIDER_GOOGLE}
          style= {styles.map}
          showUserLocation = {true}
          region = {{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
          onRegionChange = {region => this.setState({region})}
          onRegionChangeComplete = {region => this.setState({region})}
        >
          <MapView.Marker
              coordinate = {{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta
              }}
            />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map:{
    flex: 1,
    height: '100%',
    width: '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Taxi', () => Taxi);
