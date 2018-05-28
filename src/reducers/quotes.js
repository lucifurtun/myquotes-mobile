import {keyBy} from 'lodash'


export const STORE_QUOTES = 'STORE_QUOTES'
export const RESET_QUOTES = 'RESET_QUOTES'
export const SET_NEXT_PAGE = 'SET_NEXT_PAGE'


const initialState = {
    results: [],
    currentPage: 1
}


export const quotes = (state = initialState, action) => {
    switch (action.type) {
        case STORE_QUOTES:
            let data = keyBy([...state.results, ...action.quotes], 'id')

            return {
                ...state,
                results: {...state.results, ...data},
                currentPage: action.page
            }
        case RESET_QUOTES:
            return {
                ...state,
                results: [],
                currentPage: 1,
            }
        case SET_NEXT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
    }

    return state
}
