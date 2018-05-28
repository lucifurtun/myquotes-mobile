import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    SectionList,
    RefreshControl,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native'

import Color from '../styles'
import Constants from '../constants'
import axios from 'axios'
import Quote from '../view/quote'
import URL from '../services/url'
import {store} from "../store"
import {modal} from "../reducers"
import {filters} from "../reducers"
import {connect} from "react-redux"
import {orderBy} from 'lodash'
import {SET_NEXT_PAGE, STORE_QUOTES} from "../reducers/quotes"

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

    categories = []
    authors = []
    tags = []
    activeFilters = []

    constructor(props) {
        super(props)

        const self = this

        let url = new URL()

        this.state = {
            quotes: [],
            url: url,
            nextPage: 1
        }

        let token = store.getState().auth.token

        let authorization = 'JWT ' + token
        this.api = axios.create({
            timeout: 1000,
            headers: {'Authorization': authorization}
        })

        this.api.get(URL.authorsUrl)
            .then(function (response) {
                self.authors = self.addSelectedKey(response.data)
                store.dispatch({type: filters.STORE_AUTHORS, authors: self.authors})
            })
            .catch(function (error) {
                console.log(error)
            })

        this.api.get(URL.categoriesUrl)
            .then(function (response) {
                self.categories = self.addSelectedKey(response.data)
                store.dispatch({type: filters.STORE_CATEGORIES, categories: self.categories})
            })
            .catch(function (error) {
                console.log(error)
            })

        this.api.get(URL.tagsUrl)
            .then(function (response) {
                self.tags = self.addSelectedKey(response.data)
                store.dispatch({type: filters.STORE_TAGS, tags: self.tags})
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    fetchNextPage(nextPage) {
        let self = this
        let page = nextPage ? nextPage : this.state.nextPage
        // let page = nextPage ? nextPage : this.props.currentPage
        console.log(page)

        if (page) {
            this.api.get(this.state.url.quotes(page))
                .then(function (response) {
                    var quotes = response.data.results
                    self.props.dispatch({type: STORE_QUOTES, quotes: quotes})
                    self.props.dispatch({type: SET_NEXT_PAGE, page: response.data.pages.next})

                    self.setState({
                        nextPage: response.data.pages.next
                    })
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
                        <Text style={[this.isFilterBy('Categories')]}>Categories</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.filterButtonPress('Authors')}>
                    <View style={style.buttonContainer}>
                        <Text style={[this.isFilterBy('Authors')]}>Authors</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.filterButtonPress('Tags')}>
                    <View style={style.buttonContainer}>
                        <Text style={[this.isFilterBy('Tags')]}>Tags</Text>
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
        let properties = []

        switch (this.filterBy) {
            case 'Categories':
                properties = this.categories
                store.dispatch({type: modal.SET_FILTER, selectedFilter: modal.FILTER_CATEGORIES})
                break
            case 'Authors':
                properties = this.authors
                store.dispatch({type: modal.SET_FILTER, selectedFilter: modal.FILTER_AUTHORS})
                break
            case 'Tags':
                properties = this.tags
                store.dispatch({type: modal.SET_FILTER, selectedFilter: modal.FILTER_TAGS})
                break
            default:
                break
        }

        store.dispatch({type: modal.MODAL_OPEN})
    }

    modalDidClose(properties) {
        this.activeFilters = []
        this.state.url.filter = null

        this.setState({
            quotes: []
        })

        switch (this.filterBy) {
            case 'Categories':
                this.categories = properties
                break
            case 'Authors':
                this.authors = properties
                break
            case 'Tags':
                this.tags = properties
                break
            default:
                break
        }

        if (this.state.url.updateFilterUrl(this.categories, 'category')) {
            this.activeFilters.push('Categories')
        }
        if (this.state.url.updateFilterUrl(this.authors, 'author')) {
            this.activeFilters.push('Authors')
        }
        if (this.state.url.updateFilterUrl(this.tags, 'tags')) {
            this.activeFilters.push('Tags')
        }

        this.fetchNextPage(1)

    }

    addSelectedKey(param) {
        let properties = JSON.parse(JSON.stringify(param))

        properties.forEach(function (property) {
            property.isSelected = 0
        })

        return properties
    }

    isFilterBy(filter) {
        if (this.activeFilters.includes(filter)) {
            return style.buttonTextFilter
        } else {
            return style.buttonText
        }
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
    return {
        quotes: state.quotes.results,
        currentPage: state.quotes.currentPage
    }
}

export default connect(mapStateToProps)(Quotes)
