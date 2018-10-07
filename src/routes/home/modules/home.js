import update from 'react-addons-update'
import constants from './actionConstants'

const {GET_CURRENT_LOCATION } = constants;

// export function setName(){
//     return{
//         type: SET_NAME,
//         payload: "Kashish "
//     }
// }

// function handleSetName(state, action){
//     return update(state, {
//         name: {
//             $set: action.payload
//         }
//     })
// }

export function getCurrentLocation(){
    return(dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                })
            },
            (error) => {
                console.log(`An error occured ${error} `)
            },
            {enableHighAccuracy: true, timout:20000, maximumAge: 1000}
        )
    }
}

function handleGetCurrentLocation(state, action){
    return update(state, {
        region: {
            $set: action.payload
        }
    })
}

const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation
}
const initalState = {}

export function HomeReducer (state =initalState, action){
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}