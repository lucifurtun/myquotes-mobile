import {keyBy, uniqBy} from 'lodash'

export const STORE_AUTHORS = 'STORE_AUTHORS'
export const STORE_CATEGORIES = 'STORE_CATEGORIES'
export const STORE_TAGS = 'STORE_TAGS'


const initialState = {
    authors: [],
    categories: [],
    tags: []
}


export const filters = (state = initialState, action, rootState) => {
    switch (action.type) {
        case STORE_AUTHORS:
            return {
                ...state,
                authors: keyBy(action.items, 'id')
            }
        case STORE_CATEGORIES:
            return {
                ...state,
                categories: keyBy(action.items, 'id')
            }
        case STORE_TAGS:
            return {
                ...state,
                tags: keyBy(action.items, 'id')
            }
    }

    return state
}
