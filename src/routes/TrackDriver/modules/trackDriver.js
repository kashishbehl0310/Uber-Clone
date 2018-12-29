import { Dimensions } from "react-native";
import update from "react-addons-update";
import RNGooglePlaces from "react-native-google-places";
import constants from "./actionConstants";
import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator";


let {width , height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const {
			GET_CURRENT_LOCATION,
			GET_DRIVER_INFORMATION,
			GET_DRIVER_LOCATION
      } = constants;

/***********************Actions*********************/

export function getCurrentLocation(){
	return(dispatch)=>{
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:GET_CURRENT_LOCATION,
					payload:position
				});
			},
			(error)=> console.log(error.message),
			{enableHighAccuracy: true, timeout: 20000}
		);
	}
}

export function getDriverInfo(){
	return(dispatch, store) => {
			let id = store().home.booking.driverId;
			request.get("https://taxiap.herokuapp.com/api/driver/" + id)
				.finish((error,res) => {
					dispatch({
						type: GET_DRIVER_INFORMATION,
						payload:res.body
					})
				})
	}
}

export function getDriverLocation(){
	return(dispatch, store) => {
		let id = store().home.booking.driverId;
		request.get("https://taxiap.herokuapp.com/api/driverLocation/"+id)
			.finish((error, res)=> {
				dispatch({
					type: GET_DRIVER_LOCATION,
					payload: res.body
				})
			})
	}
}

export function getDistanceFromDriver(){
	return (dispatch, store) => {
		if(store().trackDriver.driverLocation){
			request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
				.query({
					origins: store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
                	destinations: store().trackDriver.driverLocation.coordinate.coordinates[1] + "," + store().trackDriver.driverLocation.coordinate.coordinates[0],
                	mode: "driving",
                	key: "AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM"
				})
				.finish((error, res) => {
					dispatch({
					  type: GET_DISTANCE_FROM_DRIVER,
					  payload: res.body
					})
				  })
		}
	}
}

/****************Action Handlers****************/

function handleGetCurrentLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set:action.payload.coords.latitude
			},
			longitude:{
				$set:action.payload.coords.longitude
			},
			latitudeDelta:{
				$set:LATITUDE_DELTA
			},
			longitudeDelta:{
				$set:LONGITUDE_DELTA
			}
		}
	})
}

function handleGetDriverInfo(state, action){
	return update(state, {
		driverInfo: {
			$set: action.payload
		}
	})
}

function handleUpdateDriverLocation(state, action){
	return update(state, {
		driverLocation: {
			$set: action.payload
		}
	})
}

function handleGetDriverLocation(state, action){
	return update(state, {
		driverLocation: {
			$set: action.payload
		},
		showDriverFound: {
			$set: false
		},
		showCarMarker: {
			$set: true
		}
	})
}

function handleGetDistanceFromDriver(state, action){
	return update(state, {
		distanceFromDriver: {
			$set: action.payload
		}
	})
}

const ACTION_HANDLERS = {
	GET_CURRENT_LOCATION: handleGetCurrentLocation,
	GET_DRIVER_INFORMATION: handleGetDriverInfo,
	UPDATE_DRIVER_LOCATION: handleUpdateDriverLocation,
	GET_DRIVER_LOCATION: handleGetDriverLocation,
	GET_DISTANCE_FROM_DRIVER: handleGetDistanceFromDriver
};
const initialState = {
  region: {},
  showDriverFound: true
};

export function TrackDriverReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;   
}