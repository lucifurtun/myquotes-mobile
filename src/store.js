import AppReducer from "./reducers/AppReducer"
import {createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
