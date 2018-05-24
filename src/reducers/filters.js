const initialState = {
    authors: [],
    categories: [],
    tags: []
}

export const filters = (state = initialState, action) => {
    if (action.type === 'SET_AUTHORS') {
        return {
            ...state,
            authors: action.authors
        }
    }
    if (action.type === 'SET_CATEGORIES') {
        return {
            ...state,
            categories: action.categories
        }
    }
    if (action.type === 'SET_TAGS') {
        return {
            ...state,
            tags: action.tags
        }
    }

    return state
}
