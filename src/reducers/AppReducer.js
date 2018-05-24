import {combineReducers} from 'redux'
import {auth} from "./auth"
import {modal} from "./modal"
import {filters} from "./filters"


const AppReducer = combineReducers({
    auth: auth,
    modal: modal,
    filters: filters
})

export default AppReducer
