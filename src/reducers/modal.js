export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'

const initialState = {
    'opened': false
}


export const modal = (state = initialState, action) => {
    console.log(state)
    console.log(action)

    if (action.type === MODAL_OPEN) {
        return {opened: true}
    }
    if (action.type === MODAL_CLOSE) {
        return {opened: false}
    }

    return state
}
