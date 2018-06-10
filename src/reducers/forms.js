import {takeEvery, put} from "redux-saga/effects"


function* submitForm(action) {
    console.log(action)
    const payload = {
        resource: 'quotes',
        method: 'POST',
        data: action.payload
    }

    yield put({type: 'REQUEST', payload: payload})
}

export function* saga() {
    yield takeEvery('QUOTES_FORM_SUBMITTED', submitForm)
}
