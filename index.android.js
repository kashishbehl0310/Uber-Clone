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

import Root from "./src/main";

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
        <Root {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
