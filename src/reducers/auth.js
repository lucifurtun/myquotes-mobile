const initialState = {
    'token': null
}

export const auth = (state = initialState, action) => {
    if (action.type === 'SET_TOKEN') {
        return {token: action.value}
    }
    if (action.type === 'UNSET_TOKEN') {
        return {token: null}
    }

    return state
}

