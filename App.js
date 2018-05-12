import {AppRegistry} from 'react-native'
import React from "react"

import {createStackNavigator} from 'react-navigation'
import {PersistGate} from 'redux-persist/integration/react'


import AddQuote from "./src/screens/addQuote"
import FilterQuotes from "./src/screens/filterQuotes"
import SideMenu from "./src/screens/sideMenu"
import Loading from "./src/screens/loading"
import Quotes from "./src/screens/quotes"
import Login from "./src/screens/login"
import {Provider} from "react-redux"
import {store, persistor} from "./src/store"

const Navigator = createStackNavigator({
    // loading: {screen: Loading},
    login: {screen: Login},
    quotes: {screen: Quotes},
    sideMenu: {screen: SideMenu},
    addQuote: {screen: AddQuote},
    filterQuotes: {screen: FilterQuotes},
})


store.subscribe(() => {
    console.log(store.getState())
})

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Navigator/>
                </PersistGate>
            </Provider>
        )
    }
}


AppRegistry.registerComponent('myquotes', () => App)
