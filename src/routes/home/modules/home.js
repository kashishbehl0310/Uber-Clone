import update from 'react-addons-update'
import constants from './actionConstants'

const {} = constants

const ACTION_HANDLERS = {

}
const initalState = {}

export function HomeReducer (state =initalState, action){
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}