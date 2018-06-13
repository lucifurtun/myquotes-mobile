import React, {Component} from 'react'
import {Alert, Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'

import Color from '../styles'
import {connect} from "react-redux"
import {assign, map, values} from 'lodash'
import QuoteForm from "../components/forms/QuoteForm"


export default class AddQuote extends Component {
    static navigatorButtons = {
        leftButtons: [{
            title: 'Cancel',
            id: 'cancel'
        }],
        rightButtons: [{
            title: 'Add',
            id: 'add'
        }]
    }

    static navigatorStyle = {
        navBarTextColor: 'black',
        navBarButtonColor: Color.primary
    }

    constructor(props) {
        super(props)
        // if you want to listen on navigator events, set this up
        this.state = {
            title: "",
            author: "",
            selectedItems: []
        }
    }

    render() {
        return (
            <QuoteForm initialValues={{tags: [], private: false}}/>
        )
    }
}
