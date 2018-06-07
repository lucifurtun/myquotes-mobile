import {reducer as formReducer} from 'redux-form'


import {api} from "./api"
import {auth} from "./auth"
import {modal} from "./modal"
import {filters} from "./filters"
import {quotes} from "./quotes"
import {combineReducers} from "redux"


const AppReducer = combineReducers({
    form: formReducer,
    api: api,
    auth: auth,
    modal: modal,
    filters: filters,
    quotes: quotes
})

export default AppReducer
