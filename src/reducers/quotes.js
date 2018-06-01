import {includes, isEmpty, keyBy, pickBy, toString, map, some} from 'lodash'
import {createSelector} from 'reselect'


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

export const getQuotesSelector = (filters) => createSelector(
    (state) => state.quotes.results,
    (quotes) => pickBy(quotes, (item) => {
        let eligible = true

        if (!isEmpty(filters.author)) {
            if (includes(filters.author, toString(item.author.id))) {
                return true
            }
            else {
                eligible &= false
            }
        }

        if (!isEmpty(filters.category)) {
            if (includes(filters.author, toString(item.author.id))) {
                return true
            }
            else {
                eligible &= false
            }
        }

        if (!isEmpty(filters.tag)) {
            let tagIds = map(item.tags, (tag) => tag.id)

            if (some(tagIds, (item) => includes(filters.tag, toString(item)))) {
                return true
            }
            else {
                eligible &= false
            }
        }

        return eligible
    })
)
