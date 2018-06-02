import {takeEvery, put} from "redux-saga/effects"
import {quotes} from "."

export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
export const SET_FILTER = 'SET_FILTER'

export const FILTER_AUTHORS = 'authors'
export const FILTER_CATEGORIES = 'categories'
export const FILTER_TAGS = 'tags'


const initialState = {
    opened: false,
    selectedFilterType: null
}


function* resetQuotes(action) {
    yield put({type: quotes.RESET_QUOTES})
}

export function* saga() {
    // yield takeEvery(MODAL_CLOSE, resetQuotes)
}


export const modal = (state = initialState, action, rootState) => {
    if (action.type === MODAL_OPEN) {
        return {
            ...state,
            opened: true
        }
    }
    if (action.type === MODAL_CLOSE) {
        return {
            ...state,
            opened: false
        }
    }
    if (action.type === SET_FILTER) {
        return {
            ...state,
            selectedFilterType: action.selectedFilterType
        }
    }

    return state
}
