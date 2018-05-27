import {combineReducers} from 'redux'
import {auth} from "./auth"
import {modal} from "./modal"
import {filters} from "./filters"
import {quotes} from "./quotes"


const AppReducer = combineReducers({
    auth: auth,
    modal: modal,
    filters: filters,
    quotes: quotes
})

export default AppReducer
