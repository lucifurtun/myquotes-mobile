import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Color from '../styles';

export default class FilterQuotes extends Component {

  constructor(props) {
    super(props);

    const properties = JSON.parse(JSON.stringify(this.props.properties))

    properties.forEach( function(property) {
      property.isSelected = 0
    });

    this.state = {
      selected: {},
      properties: properties
    };

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
          keyExtractor={(item) => {return item.id}}
        />

        <TouchableOpacity onPress={() => this.onDismissPress()}>
          <Text style={styles.button}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderRow (property, index) {
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

    var newProperties = this.state.properties;
    newProperties[index] = property;

    this.setState({
      properties: newProperties
    })

  }

  getProperties() {
    return this.state.properties
  }

  onDismissPress() {
    this.props.callback(this.state.selected)
    this.props.navigator.dismissLightBox();
  }
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 260,
    backgroundColor: 'white',
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  button: {
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
});
