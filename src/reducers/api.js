import {takeEvery, select, call, put} from "redux-saga/effects"

import URL from '../services/url'
import axios from "axios"
import qs from "qs"
import {STORE_QUOTES} from "./quotes"

export const RESOURCE_QUOTES = 'quotes'

export const REQUEST = 'REQUEST'


const initialState = {}

const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const resources = {}
resources[RESOURCE_QUOTES] = {
    endpoint: 'quotes',
    dispatcher: {
        'GET': STORE_QUOTES
    }
}


export const api = (state = initialState, action, rootState) => {
    switch (action.type) {
        case REQUEST:
            return state
    }

    return state
}

function* performRequest({payload}) {
    const {resource, params} = payload
    const endpoint = resources[resource].endpoint
    const method = 'GET'

    const dispatcher = resources[resource].dispatcher[method]
    console.log(resources)


    let config = {
        url: `${URL.base}${endpoint}`,
        method: method,
        params: params,
        paramsSerializer: (query) => qs.stringify(query, {indices: false})
    }

    try {
        let response = yield call(http.request, config)
        let quotes = response.data.results
        yield put({type: dispatcher, quotes: quotes})
        console.log(quotes)
    }
    catch (exception) {
        console.error(exception)
    }


}

export function* saga() {
    yield takeEvery(REQUEST, performRequest)
}