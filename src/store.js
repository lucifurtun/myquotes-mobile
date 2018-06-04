import AppReducer from "./reducers/AppReducer"
import {applyMiddleware, createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import {AsyncStorage} from 'react-native'
import createSagaMiddleware from 'redux-saga'
import {fork, all} from 'redux-saga/effects'
import {map, reduce, compact, has} from 'lodash'
import * as reduxModules from './reducers'


const persistConfig = {
    key: 'root',
    whitelist: ['auth'],
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, AppReducer)
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
)
export const persistor = persistStore(store)


const sagas = compact(map(reduxModules, 'saga'))

function* rootSaga() {
    yield all(map(sagas, (saga) => fork(saga)))
}

sagaMiddleware.run(rootSaga)
