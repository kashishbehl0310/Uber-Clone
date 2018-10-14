import { Dimensions } from "react-native";
import update from "react-addons-update";
import constants from "./actionConstants";


let {width , height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const {
      SET_NAME,
      GET_CURRENT_LOCATION
      } = constants;

export function setName(){
  return{
    type: SET_NAME,
    payload: "Kashish"
  }
}

export function getCurrentLocation(){
  return(dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: "GET_CURRENT_LOCATION",
          payload: position
        });
      },
      (error) => console.log('An error occured ' + error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

function handleGetCurrentLocation(state, action){
  return update(state, {
    region: {
      latitude:{
        $set: action.payload.coords.latitude
      },
      longitude: {
        $set: action.payload.coords.longitude
      },
      latitudeDelta:{
        $set: LATITUDE_DELTA
      },
      longitudeDelta:{
        $set: LONGITUDE_DELTA
      }
    }
  })
}

function handleSetName(state, action){
  return update(state, {
    name: {
      $set: action.payload
    }
  })
}

const ACTION_HANDLERS = {
  SET_NAME:handleSetName ,
  GET_CURRENT_LOCATION: handleGetCurrentLocation
};
const initialState = {
  region: {}
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;   
}