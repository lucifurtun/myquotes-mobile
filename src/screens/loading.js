import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image
} from 'react-native'

import Color from '../styles'
import axios from 'axios'
import {store} from "../store"

export default class Loading extends Component {
    constructor(props) {
        super(props)

        this.login()
    }

    render() {
        return (
            <View style={style.container}>
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../../img/logo.png')}
                />
            </View>
        )
    }

    login() {
        let self = this

        let token = store.getState().auth.token
        if (token) {
            axios.post('https://myquotes.io/api/token/verify/', {token: token})
                .then(function (response) {
                    axios.defaults.headers.common['Authorization'] = `JWT ${token}`

                    self.goToQuotes()
                })
                .catch(function (error) {
                    self.goToLogin()
                })
        } else {
            this.goToLogin()
        }
    }

    goToLogin() {
        this.props.navigation.navigate('login')
    }

    goToQuotes() {
        this.props.navigation.navigate('quotes')
    }

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
