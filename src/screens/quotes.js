import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    SectionList,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native'

import qs from 'qs'

import Color from '../styles'
import axios from 'axios'
import Quote from '../view/quote'
import URL from '../services/url'
import {store} from "../store"
import {modal} from "../reducers"
import {filters} from "../reducers"
import {connect} from "react-redux"
import {orderBy, pickBy, keys, assign, map} from 'lodash'
import {STORE_QUOTES, getQuotesSelector} from "../reducers/quotes"

const filterButtonWidth = Dimensions.get("window").width * 0.3

class Quotes extends Component {

    static navigatorButtons = {
        leftButtons: [{
            icon: require('../../img/navicon_menu.png'),
            id: 'menu'
        }],
        rightButtons: [
            {
                icon: require('../../img/navicon_add.png'),
                id: 'add'
            }
        ]
    }

    static navigatorStyle = {
        navBarTextColor: Color.primary,
        navBarButtonColor: Color.primary,
        statusBarTextColorScheme: 'dark',
    }

    api = null

    constructor(props) {
        super(props)

        let token = store.getState().auth.token

        let authorization = 'JWT ' + token
        this.api = axios.create({
            timeout: 1000,
            headers: {'Authorization': authorization}
        })

        this.api.get(URL.authorsUrl)
            .then(function (response) {
                let authors = map(response.data, (item) => assign(item, {isSelected: 0}))
                store.dispatch({type: filters.STORE_AUTHORS, items: authors})
            })
            .catch(function (error) {
                console.log(error)
            })

        this.api.get(URL.categoriesUrl)
            .then(function (response) {
                let categories = map(response.data, (item) => assign(item, {isSelected: 0}))
                store.dispatch({type: filters.STORE_CATEGORIES, items: categories})
            })
            .catch(function (error) {
                console.log(error)
            })

        this.api.get(URL.tagsUrl)
            .then(function (response) {
                let tags = map(response.data, (item) => assign(item, {isSelected: 0}))
                store.dispatch({type: filters.STORE_TAGS, items: tags})
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    fetchNextPage(nextPage) {
        dispatch = this.props.dispatch

        let page = nextPage ? nextPage : this.props.currentPage

        let params = {
            ...this.props.filters,
            page: page,
            page_size: 200
        }

        let config = {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, {indices: false})
        }

        if (page) {
            this.api.get(URL.quotesUrl, config)
                .then(function (response) {
                    let quotes = response.data.results
                    dispatch({type: STORE_QUOTES, quotes: quotes, page: response.data.pages.next})
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <View style={style.container}>
                <SectionList
                    sections={[{data: orderBy(this.props.quotes, 'id', 'desc'), key: "myQuotes"}]}
                    renderItem={({item}) =>
                        this.renderRow(item)
                    }
                    keyExtractor={(item) => {
                        return item.id
                    }}
                    onEndReached={() => this.fetchNextPage(null)}
                    renderSectionHeader={() => this.renderHeader()}
                />
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={style.filterCell}>
                <TouchableOpacity onPress={() => this.filterButtonPress('Categories')}>
                    <View style={style.buttonContainer}>
                        <Text>Categories</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.filterButtonPress('Authors')}>
                    <View style={style.buttonContainer}>
                        <Text>Authors</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.filterButtonPress('Tags')}>
                    <View style={style.buttonContainer}>
                        <Text>Tags</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderRow(quote) {
        let title = quote.title ? quote.title : ''
        let text = quote.text ? quote.text : ''
        let author = quote.author ? (quote.author.name ? quote.author.name : '') : ''

        let date = new Date(quote.created)
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        let month = date.getMonth() + 1
        month = month < 10 ? "0" + month : month
        let shortDate = "" + day + "." + month + "." + date.getFullYear()

        return (<Quote title={title} text={text} author={author} date={shortDate}/>)
    }

    onNavigatorEvent(event) {
        if (event.id === 'menu') {
            this.props.navigator.toggleDrawer({
                side: 'left',
                animated: true
            })
        }
        if (event.id === 'add') {
            this.props.navigator.showModal({
                title: "Add Quote",
                screen: "addQuote",
                // passProps: {
                //   tags: ["tag1", "tag2"]
                // }
            })
        }
    }

    filterButtonPress(buttonName) {
        this.filterBy = buttonName

        switch (this.filterBy) {
            case 'Categories':
                store.dispatch({type: modal.SET_FILTER, selectedFilterType: modal.FILTER_CATEGORIES})
                break
            case 'Authors':
                store.dispatch({type: modal.SET_FILTER, selectedFilterType: modal.FILTER_AUTHORS})
                break
            case 'Tags':
                store.dispatch({type: modal.SET_FILTER, selectedFilterType: modal.FILTER_TAGS})
                break
        }

        store.dispatch({type: modal.MODAL_OPEN})
    }
}

const style = StyleSheet.create({
    blurView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    filterCell: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    container: {
        flex: 1,
        backgroundColor: Color.lightBackground
    },
    buttonContainer: {
        flex: 1,
        width: filterButtonWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '200',
        color: Color.darkText
    },
    buttonTextFilter: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.primary
    }
})

function mapStateToProps(state) {
    let authorIds = keys(pickBy(state.filters.authors, (item) => item.isSelected))
    let categoryIds = keys(pickBy(state.filters.categories, (item) => item.isSelected))
    let tagIds = keys(pickBy(state.filters.tags, (item) => item.isSelected))

    let filters = {author: authorIds, category: categoryIds, tag: tagIds}

    return {
        quotes: getQuotesSelector(filters)(state),
        currentPage: state.quotes.currentPage,
        filters: filters
    }
}

export default connect(mapStateToProps)(Quotes)
