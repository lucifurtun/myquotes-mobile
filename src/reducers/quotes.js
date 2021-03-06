import {includes, isEmpty, keyBy, pickBy, toString, map, some} from 'lodash'
import {createSelector} from 'reselect'


export const STORE_QUOTES = 'STORE_QUOTES'
export const SET_NEXT_PAGE = 'SET_NEXT_PAGE'

export const QUOTES_FORM_SUBMITTED = 'QUOTES_FORM_SUBMITTED'

const initialState = {
    results: [],
    currentPage: 1
}


export const quotes = (state = initialState, action, rootState) => {
    switch (action.type) {
        case STORE_QUOTES:
            let data = keyBy([...state.results, ...action.quotes], 'id')

            return {
                ...state,
                results: {...state.results, ...data},
                currentPage: action.page
            }
        case SET_NEXT_PAGE:
            return {
                ...state,
                currentPage: action.payload.page
            }
    }

    return state
}

export const getQuotesSelector = (filters) => createSelector(
    (state) => state.quotes.results,
    (quotes) => pickBy(quotes, (item) => {
        let eligible = true

        if (!isEmpty(filters.author)) {
            if (!isEmpty(item.author) && includes(filters.author, toString(item.author.id))) {
                return true
            }
            else {
                eligible &= false
            }
        }

        if (!isEmpty(filters.category)) {
            if (!isEmpty(item.category) && includes(filters.category, toString(item.category.id))) {
                return true
            }
            else {
                eligible &= false
            }
        }

        if (!isEmpty(filters.tag)) {
            let tagIds = map(item.tags, (tag) => tag.id)

            if (!isEmpty(item.tags) && some(tagIds, (item) => includes(filters.tag, toString(item)))) {
                return true
            }
            else {
                eligible &= false
            }
        }

        return eligible
    })
)
