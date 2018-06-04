import {api} from "./api"
import {auth} from "./auth"
import {modal} from "./modal"
import {filters} from "./filters"
import {quotes} from "./quotes"
import {combineReducers} from "redux"


const AppReducer = combineReducers({
    api: api,
    auth: auth,
    modal: modal,
    filters: filters,
    quotes: quotes
})

export default AppReducer
