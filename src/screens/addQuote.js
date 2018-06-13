import React, {Component} from 'react'
import {
    Text,
    TextInput,
    View,
    ScrollView,
    StyleSheet,
    Alert,
    Button
} from 'react-native'

import Color from '../styles'
import {reduxForm, Field} from "redux-form"
import Input from "../components/Input"
import Switch from "../components/Switch"
import Select from "../components/Select"
import {connect} from "react-redux"
import {values, map, assign} from 'lodash'
import {quotes} from "../reducers"


let QuoteForm = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Field
                style={styles.title}
                label='Title'
                name='title'
                component={Input}
            />

            <Field
                label='Private'
                name='private'
                component={Switch}
            />

            <Field
                name='author'
                label='Author'
                component={Select}
                items={props.authors}
                single={true}
            />

            <Field
                name='category'
                label='Category'
                component={Select}
                items={props.categories}
                single={true}
            />

            <Field
                name='tags'
                label='Tags'
                component={Select}
                items={props.tags}
                single={false}
            />

            <Field
                name='text'
                label='Text'
                multiline={true}
                numberOfLines={5}
                component={Input}
            />

            <Button
                title="Submit"
                onPress={props.handleSubmit(props.submitForm)}
                color={Color.primary}
            />

        </ScrollView>
    )
}

QuoteForm = reduxForm({form: 'quotes'})(QuoteForm)

function mapStateToProps(state) {
    return {
        authors: map(state.filters.authors, (item) => assign(item, {key: item.name})),
        categories: map(state.filters.categories, (item) => assign(item, {key: item.name})),
        tags: map(state.filters.tags, (item) => assign(item, {key: item.name})),
    }
}

const mapDispatchToProps = {
    submitForm: (payload) => {
        return {type: quotes.QUOTES_FORM_SUBMITTED, payload}
    }
}

QuoteForm = connect(mapStateToProps, mapDispatchToProps)(QuoteForm)


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start'
    },
    title: {
        width: '100%',
        height: 60,
        color: 'blue'
    }
})
