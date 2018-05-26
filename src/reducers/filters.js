export const STORE_AUTHORS = 'STORE_AUTHORS'
export const STORE_CATEGORIES = 'STORE_CATEGORIES'
export const STORE_TAGS = 'STORE_TAGS'

const initialState = {
    authors: [],
    categories: [],
    tags: [],
    selectedFilter: null
}


export const filters = (state = initialState, action) => {
    switch (action.type) {
        case STORE_AUTHORS:
            return {
                ...state,
                authors: action.authors
            }
        case STORE_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case STORE_TAGS:
            return {
                ...state,
                tags: action.tags
            }
    }

    return state
}
