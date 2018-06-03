import {AppRegistry} from 'react-native'
import {YellowBox} from 'react-native'

import React from "react"

import {createDrawerNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {PersistGate} from 'redux-persist/integration/react'


import AddQuote from "./src/screens/addQuote"
import Loading from "./src/screens/loading"
import Quotes from "./src/screens/quotes"
import Login from "./src/screens/login"

import {Provider} from "react-redux"
import {store, persistor} from "./src/store"
import SideMenu from "./src/components/SideMenu"
import FilterModal from "./src/components/FilterModal"
import {BackHandler} from "react-native"
import {modal} from "./src/reducers"


const QuotesNavigator = createStackNavigator({
    quotes: {screen: Quotes},
    addQuote: {screen: AddQuote},
}, {
    mode: 'modal',
    headerMode: 'none',
})

const AppNavigator = createDrawerNavigator({
    quotes: QuotesNavigator
}, {
    contentComponent: SideMenu
})

const RootNavigator = createSwitchNavigator({
    loading: {screen: Loading},
    login: {screen: Login},
    app: AppNavigator
}, {
    initialRouteName: 'loading'
})


store.subscribe(() => {
    console.log(store.getState())
})

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootNavigator/>
                    <FilterModal/>
                </PersistGate>
            </Provider>
        )
    }
}

BackHandler.addEventListener('hardwareBackPress', function () {
    console.log('Back Happened')
    store.dispatch({type: modal.MODAL_CLOSE})
})


AppRegistry.registerComponent('MyQuotes', () => App)

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])