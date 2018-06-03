import {takeEvery, throttle, select, call, put} from "redux-saga/effects"

import URL from '../services/url'
import axios from "axios"
import qs from "qs"
import {STORE_QUOTES} from "./quotes"
import {keys, pickBy} from "lodash"

export const RESOURCE_QUOTES = 'quotes'

export const REQUEST = 'REQUEST'
export const REQUEST_QUOTES = 'REQUEST_QUOTES'


const initialState = {}

const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const resources = {
    [RESOURCE_QUOTES]: {
        endpoint: 'quotes',
        dispatcher: {
            'GET': STORE_QUOTES
        }
    }
}


export const api = (state = initialState, action, rootState) => {
    switch (action.type) {
        case REQUEST:
            return state

        case REQUEST_QUOTES:
            return state
    }

    return state
}

function* performRequest({payload}) {
    console.log(payload)
    const {resource, params} = payload
    const endpoint = resources[resource].endpoint
    const method = 'GET'

    const dispatcher = resources[resource].dispatcher[method]
    console.log(resources)


    let config = {
        url: `${URL.base}${endpoint}/`,
        method: method,
        params: params,
        paramsSerializer: (query) => qs.stringify(query, {indices: false})
    }

    try {
        let response = yield call(http.request, config)
        let quotes = response.data.results
        yield put({type: dispatcher, quotes: quotes, page: response.data.pages.next})
        console.log(quotes)
    }
    catch (exception) {
        console.error(exception)
    }
}

function* requestQuotes() {
    let currentPage = yield select((state) => state.quotes.currentPage)
    let filters = yield select((state) => state.filters)

    if (currentPage) {
        let authorIds = keys(pickBy(filters.authors, (item) => item.isSelected))
        let categoryIds = keys(pickBy(filters.categories, (item) => item.isSelected))
        let tagIds = keys(pickBy(filters.tags, (item) => item.isSelected))

        let params = {
            author: authorIds, category: categoryIds, tag: tagIds,
            page: currentPage,
            page_size: 10
        }

        yield put({type: REQUEST, payload: {resource: RESOURCE_QUOTES, params: params}})
    }

}

export function* saga() {
    yield throttle(200, REQUEST_QUOTES, requestQuotes)
    yield takeEvery(REQUEST, performRequest)
}
