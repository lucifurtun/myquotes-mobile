import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import Color from '../styles'
import {connect} from "react-redux"
import {modal} from "../reducers"

class FilterQuotes extends Component {

    constructor(props) {
        super(props)

        let properties = JSON.parse(JSON.stringify(this.props.properties))

        this.state = {
            selected: this.isSelected(properties),
            properties: properties
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Filter by {this.props.filter}
                </Text>

                <FlatList
                    data={this.getProperties()}
                    extraData={this.state}
                    renderItem={({item, index}) => this.renderRow(item, index)}
                    keyExtractor={(item) => {
                        return `${item.id}`
                    }}
                />
            </View>
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

        var newProperties = this.state.properties
        newProperties[index] = property

        this.setState({
            properties: newProperties
        })

    }

    getProperties() {
        return this.state.properties
    }

    onDismissPress() {
        this.props.callback(this.state.properties)
        this.props.navigator.dismissLightBox()
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
    container: {
        // width: 240,
        // height: 320,
        backgroundColor: 'white',
        borderRadius: 10
    },
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

    switch (state.modal.selectedFilter) {
        case modal.FILTER_AUTHORS:
            properties = state.filters.authors
            break
        case modal.FILTER_CATEGORIES:
            properties = state.filters.categories
            break
        case modal.FILTER_TAGS:
            properties = state.filters.tags
            break
    }

    return {
        properties: properties
    }
}

export default connect(mapStateToProps)(FilterQuotes)
