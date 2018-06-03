import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native'

import {values} from 'lodash'

import Color from '../styles'
import {connect} from "react-redux"
import {modal} from "../reducers"
import {filters} from "../reducers"
import {quotes} from "../reducers"

class FilterQuotes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected: this.isSelected(this.props.properties)
        }
    }

    render() {
        return (
            <FlatList
                data={this.props.properties}
                extraData={this.state}
                renderItem={({item, index}) => this.renderRow(item, index)}
                keyExtractor={(item) => {
                    return `${item.id}`
                }}
            />
        )
    }

    renderRow(property, index) {
        return (
            <TouchableOpacity onPress={() => this.onRowPress(property, index)}>
                <View style={styles.cell}>
                    <Text style={styles.property}> {property.name} </Text>
                    <Image
                        style={styles.image}
                        resizeMode='cover'
                        opacity={property.isSelected}
                        source={require('../../img/checkmark.png')}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    onRowPress(property, index) {
        let id = property.id
        let selected = this.state.selected
        if (selected[id]) {
            delete selected[id]
            property.isSelected = 0
        } else {
            selected[id] = true
            property.isSelected = 1
        }

        let newProperties = this.props.properties
        newProperties[index] = property

        this.props.dispatch({type: quotes.SET_NEXT_PAGE, payload: {page: 1}})
        this.props.dispatch({type: this.props.dispatcherType, items: newProperties})

        this.setState({
            selected: this.isSelected(newProperties)
        })
    }

    isSelected(properties) {
        let selected = {}
        properties.forEach(function (property) {
            if (property.isSelected) {
                selected[property.id] = true
            }
        })

        return selected
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        width: 240,
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        color: Color.primary
    },
    cell: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 4,
        paddingRight: 8,
        borderBottomWidth: 1,
        borderColor: Color.lightBackground,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    property: {
        fontWeight: '200',
    },
    image: {
        width: 14,
        height: 14
    }
})

function mapStateToProps(state) {
    let properties = []
    let dispatcherType = null

    switch (state.modal.selectedFilterType) {
        case modal.FILTER_AUTHORS:
            properties = state.filters.authors
            dispatcherType = filters.STORE_AUTHORS
            break
        case modal.FILTER_CATEGORIES:
            properties = state.filters.categories
            dispatcherType = filters.STORE_CATEGORIES
            break
        case modal.FILTER_TAGS:
            properties = state.filters.tags
            dispatcherType = filters.STORE_TAGS
            break
    }

    return {
        properties: values(properties),
        dispatcherType: dispatcherType
    }
}

export default connect(mapStateToProps)(FilterQuotes)
