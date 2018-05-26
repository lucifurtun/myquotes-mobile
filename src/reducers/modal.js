export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
export const SET_FILTER = 'SET_FILTER'

export const FILTER_AUTHORS = 'authors'
export const FILTER_CATEGORIES = 'categories'
export const FILTER_TAGS = 'tags'


const initialState = {
    opened: false,
    selectedFilter: null
}


export const modal = (state = initialState, action) => {
    console.log(action)
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
            selectedFilter: action.selectedFilter
        }
    }

    return state
}
