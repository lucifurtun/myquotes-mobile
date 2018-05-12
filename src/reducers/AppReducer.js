import {combineReducers} from 'redux'
import auth from "./auth"

const initialState = {
    quotes: []
}

const AppReducer = combineReducers({
    nav: (state = initialState, action) => state,
    auth: auth
})

export default AppReducer
