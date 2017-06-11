import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Color from '../styles';

export default class FilterQuotes extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const properties = JSON.parse(JSON.stringify(this.props.properties))

    properties.forEach( function(property) {
      property.isSelected = 0
    });

    this.state = {
      dataSource: ds,
      selected: {},
      properties: properties
    };

  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.properties)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Filter by {this.props.filter}
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />

        <TouchableOpacity onPress={() => this.onDismissPress()}>
          <Text style={styles.button}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderRow (property, sectionIndex, rowIndex) {
    return (
      <TouchableOpacity onPress={() => this.onRowPress(property, rowIndex)}>
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

  onRowPress(property, rowIndex) {
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
    newProperties[rowIndex] = property;

    this.setState({
      properties: newProperties
    })

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
