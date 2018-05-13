import {combineReducers} from 'redux'
import auth from "./auth"


const AppReducer = combineReducers({
    auth: auth
})

export default AppReducer
