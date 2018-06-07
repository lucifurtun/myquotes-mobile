import React, {Component} from 'react'
import {
    Text,
    TextInput,
    View,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native'

import Color from '../styles'
import MultiSelect from 'react-native-multiple-select'
import {reduxForm, Field} from "redux-form"
import Input from "../components/Input"
import Select from "../components/Select"
import {connect} from "react-redux"
import {values, map, assign, toString} from 'lodash'


let QuoteForm = (props) => {
    console.log(props)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Field
                style={styles.title}
                label='Title'
                name='title'
                multiline={true}
                numberOfLines={0}
                component={Input}
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
        </ScrollView>

    )
}

QuoteForm = reduxForm({form: 'quotes'})(QuoteForm)

function mapStateToProps(state) {
    return {
        authors: map(state.filters.authors, (item) => assign(item, {key: toString(item.id)})),
        categories: map(state.filters.categories, (item) => assign(item, {key: toString(item.id)})),
        tags: map(state.filters.tags, (item) => assign(item, {key: toString(item.id)})),
    }
}

QuoteForm = connect(mapStateToProps)(QuoteForm)


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

    tags = [
        {
            id: "1",
            name: "one"
        },
        {
            id: "2",
            name: "two"
        }
    ]

    constructor(props) {
        super(props)
        // if you want to listen on navigator events, set this up
        this.state = {
            title: "",
            author: "",
            selectedItems: []
        }

        // this.tags = this.props.tags
    }

    render() {
        return (
            <QuoteForm initialValues={{tags: []}}/>
        )

        return (
            <ScrollView contentContainerStyle={styles.container}>

                <TextInput
                    style={styles.title}
                    placeholder='title'
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    multiline={true}
                    numberOfLines={0}
                />

                <TextInput
                    style={styles.author}
                    placeholder='author'
                    onChangeText={(author) => this.setState({author})}
                    value={this.state.author}
                    multiline={true}
                    numberOfLines={0}
                />

                <View style={{flex: 1}}>
                    <MultiSelect
                        items={this.tags}
                        canAddItems
                        uniqueKey="id"
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Tags"
                        searchInputPlaceholderText="Search Items..."
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        single={false}

                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#D12345"
                        searchInputStyle={{color: '#CCC'}}
                        submitButtonColor="#CCC"
                        submitButtonText="Select"
                    />
                </View>

            </ScrollView>
        )
    }

    onSelectedItemsChange = selectedItems => {
        console.log(selectedItems)
        this.setState({selectedItems})
    }

    onNavigatorEvent(event) {
        if (event.id == 'cancel') {
            this.props.navigator.dismissModal()
        } else if (event.id == 'add') {
            // do something
            Alert.alert("Alert", this.state.title)
            Alert.alert("Alert", this.state.author)
        }
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
        height: 40,
        color: 'blue'
    },
    author: {
        height: 40,
        width: '100%',
        color: 'red'
    }
})
