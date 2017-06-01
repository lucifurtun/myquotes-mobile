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

    this.state = {
      dataSource: ds.cloneWithRows(this.props.properties)
    };

    var selected = {}

    let properties = this.props.properties
    properties.forEach(function (property) {
      selected[property.name] = false
    })

    this.state.selected = selected
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Filter by {this.props.filter}
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(property) =>
            <TouchableOpacity onPress={() => this.onRowPress(property)}>
              <View style={styles.cell}>
                <Text style={styles.property}> {property.name} </Text>
                <Image
                  style={styles.image}
                  resizeMode='cover'
                  opacity={1}
                  source={require('../../img/checkmark.png')}
                />
              </View>
            </TouchableOpacity>

          }
        />

        <TouchableOpacity onPress={() => this.onDismissPress()}>
          <Text style={styles.button}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onRowPress(property) {
    let name = property.name

    this.state.selected[name] = this.state.selected[name] == true ? false : true
  }

  onDismissPress() {
    console.log(this.state.selected)
    this.props.navigator.dismissLightBox();
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.5,
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
