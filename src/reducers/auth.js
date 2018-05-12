const initialState = {
    'token': null
}

const auth = (state = initialState, action) => {
    console.log(state)
    console.log(action)

    if (action.type === 'SET_TOKEN') {
        return {token: action.value}
    }

    return state
}

export default auth
