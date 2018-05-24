import {AppRegistry} from 'react-native'
import {YellowBox} from 'react-native'

import React from "react"

import {createDrawerNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {PersistGate} from 'redux-persist/integration/react'


import AddQuote from "./src/screens/addQuote"
import FilterQuotes from "./src/screens/filterQuotes"
import Loading from "./src/screens/loading"
import Quotes from "./src/screens/quotes"
import Login from "./src/screens/login"

import {Provider} from "react-redux"
import {store, persistor} from "./src/store"
import SideMenu from "./src/components/SideMenu"
import ModalScreen from "./src/screens/test"
import FilterModal from "./src/components/FilterModal"


const QuotesNavigator = createStackNavigator({
    quotes: {screen: Quotes},
    addQuote: {screen: AddQuote},
    filterQuotes: {screen: FilterQuotes},
    test: {screen: ModalScreen}
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
                    <FilterModal />
                </PersistGate>
            </Provider>
        )
    }
}


AppRegistry.registerComponent('MyQuotes', () => App)

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])