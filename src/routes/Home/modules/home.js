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
      SET_NAME,
      GET_CURRENT_LOCATION,
      GET_INPUT,
      TOGGLE_SEARCH_RESULT,
      GET_ADDRESS_PREDICTIONS,
      GET_SELECTED_ADDRESS,
      GET_DISTANCE_MATRIX,
      GET_FARE,
      BOOK_CAR,
      GET_NEARBY_DRIVERS
      } = constants;

/***********************Actions*********************/

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
          type: GET_CURRENT_LOCATION,
          payload: position
        });
      },
      (error) => console.log('An error occured ' + error.message),
      {enableHighAccuracy: true, timeout: 20000}
    );
  }
}

export function getInputData(payload){
  return{
    type: GET_INPUT,
    payload
  }
}

export function toggleSearchResult(payload){
  return{
    type: TOGGLE_SEARCH_RESULT,
    payload
  }
}

export function getAddressPredictions(){
	return(dispatch, store)=>{
		let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
		RNGooglePlaces.getAutocompletePredictions(userInput,
			{
				country:"IN"
			}
		)
		.then((results)=>
			dispatch({
				type:GET_ADDRESS_PREDICTIONS,
				payload:results
			})
		)
		.catch((error)=> console.log(error.message));
	};
}

export function getSelectedAddress(payload){
  const dummyNumbers = {
    baseFare: 0.4,
    timeRate: 0.14,
    surge: 1,
    distanceRate: 0.97 
  }
  return(dispatch, store) => {
    RNGooglePlaces.lookUpPlaceByID(payload)
      .then((results) => {
        dispatch({
          type: GET_SELECTED_ADDRESS,
          payload: results
        })
      })
      .then(() => {
        if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
            request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
              .query({
                origins: store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
                destinations: store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
                mode: "driving",
                key: "AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM"
              })
              .finish((error, res) => {
                dispatch({
                  type: GET_DISTANCE_MATRIX,
                  payload: res.body
                })
              })
        }
        setTimeout(function(){
          if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
            const fare = calculateFare(
              dummyNumbers.baseFare,
              dummyNumbers.timeRate,
              store().home.distanceMatrix.rows[0].elements[0].duration.value,
              dummyNumbers.distanceRate,
              store().home.distanceMatrix.rows[0].elements[0].distance.value,
              dummyNumbers.surge               
            )
            dispatch({
              type: GET_FARE,
              payload: fare
            })
          }
        }, 1000)
      })
      .catch((error)=> console.log(error.message))
  }
}


export function bookCar(){
	return (dispatch, store)=>{
    const nearByDrivers = store().home.nearByDrivers;
    console.log("drivers", nearByDrivers)
    const nearByDriver = nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];
    console.log("nearByDriver" + nearByDriver)
		const payload = {
			data:{
				userName:"Kashish",
				pickUp:{
					address:store().home.selectedAddress.selectedPickUp.address,
					name:store().home.selectedAddress.selectedPickUp.name,
					latitude:store().home.selectedAddress.selectedPickUp.latitude,
					longitude:store().home.selectedAddress.selectedPickUp.latitude
				},
				dropOff:{
					address:store().home.selectedAddress.selectedDropOff.address,
					name:store().home.selectedAddress.selectedDropOff.name,
					latitude:store().home.selectedAddress.selectedDropOff.latitude,
					longitude:store().home.selectedAddress.selectedDropOff.latitude
				},
				fare:store().home.fare,
				status:"pending"
      },
      nearByDriver:{
				socketId:nearByDriver.socketId,
				driverId:nearByDriver.driverId,
				latitude:nearByDriver.coordinate.coordinates[1],
				longitude:nearByDriver.coordinate.coordinates[0]
			}
    };
  
		request.post("https://taxiap.herokuapp.com/api/bookings")
		.send(payload)
		.finish((error, res)=>{
          dispatch({
          type:BOOK_CAR,
          payload:res.body
        });
			
		});

	};
}

export function getNearByDrivers(){
	return(dispatch, store)=>{
		request.get("https://taxiap.herokuapp.com/api/driversLocationService")
		.query({
			latitude:store().home.region.latitude,
			longitude:store().home.region.longitude	
		})
		.finish((error, res)=>{
			if(res){
				dispatch({
					type:GET_NEARBY_DRIVERS,
					payload:res.body
				});
			}else{
        console.log(`An error occured ${error}`)
      }

		});
	};
}



/****************Action Handlers****************/

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

function handleGetInputData(state, action){
  const { key, value } = action.payload;
  return update(state, {
    inputData: {
      [key]: {
        $set: value
      }
    }
  });
}

function handleToggleSearchResult(state, action){
  if(action.payload === 'pickUp'){
    return update(state, {
      resultTypes:{
        pickUp: {
          $set: true
        },
        dropOff:{
          $set: false
        }
      },
      predictions:{
        $set: {}
      }
    });
  }
  if(action.payload === "dropOff"){
    return update(state, {
      resultTypes:{
        pickUp: {
          $set: false
        },
        dropOff:{
          $set: true
        }
      },
      predictions:{
        $set: {}
      }
    })
  }
}

function handleGetAddressPredictions(state, action){
	return update(state, {
		predictions:{
			$set:action.payload
		}
	})
}

function handleGetSelectedAddress(state, action){
  let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff";
  return update(state, {
    selectedAddress: {
      [selectedTitle]: {
        $set: action.payload
      }
    },
    resultTypes: {
      pickUp: {
        $set: false
      },
      dropOff: {
        $set: false
      }
    }
  })
}

function handleGetDistanceMatrix(state, action){
  return update(state, {
    distanceMatrix: {
      $set: action.payload
    }
  })
}

function handelGetFare(state, action){
  return update(state, {
    fare: {
      $set: action.payload
    }
  })
}

function handleBookCar(state, action){
  return update(state, {
    booking: {
      $set:action.payload
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

function handleGetNearbyDrivers(state,action){
  return update(state, {
    nearByDrivers: {
      $set: action.payload
    }
  })
}


const ACTION_HANDLERS = {
  SET_NAME:handleSetName ,
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
  GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_FARE: handelGetFare,
  BOOK_CAR: handleBookCar,
  GET_NEARBY_DRIVERS: handleGetNearbyDrivers
};
const initialState = {
  region: {},
  inputData: {},
  resultTypes: {},
  selectedAddress: {}
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;   
}