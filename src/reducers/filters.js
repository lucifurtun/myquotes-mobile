import {keyBy, uniqBy} from 'lodash'

export const STORE_AUTHORS = 'STORE_AUTHORS'
export const STORE_CATEGORIES = 'STORE_CATEGORIES'
export const STORE_TAGS = 'STORE_TAGS'


const initialState = {
    authors: [],
    categories: [],
    tags: [],
    selectedFilters: {
        authors: [],
        categories: [],
        tags: []
    }
}


export const filters = (state = initialState, action) => {
    console.log(state)
    console.log(action)
    let data = null

    switch (action.type) {
        case STORE_AUTHORS:
            data = keyBy(action.items, 'id')

            return {
                ...state,
                authors: data
            }
        case STORE_CATEGORIES:
            data = keyBy(action.items, 'id')

            return {
                ...state,
                categories: data
            }
        case STORE_TAGS:
            data = keyBy(action.items, 'id')

            return {
                ...state,
                tags: data
            }
    }

    return state
}
