import {takeEvery, put} from "redux-saga/effects"


function* submitForm(action) {
    console.log(action)
}

export function* saga() {
    yield takeEvery('QUOTES_FORM_SUBMITTED', submitForm)
}
