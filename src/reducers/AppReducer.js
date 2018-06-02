import {api} from "./api"
import {auth} from "./auth"
import {modal} from "./modal"
import {filters} from "./filters"
import {quotes} from "./quotes"


const AppReducer = (state = {}, action) => {
    return {
        api: api(state.api, action, state),
        auth: auth(state.auth, action, state),
        modal: modal(state.modal, action, state),
        filters: filters(state.filters, action, state),
        quotes: quotes(state.quotes, action, state)
    }
}

export default AppReducer
