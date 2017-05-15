import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Alert
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Color from '../styles';

export default class Quotes extends Component {

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
  };

  static navigatorStyle = {
    navBarTextColor: Color.primary,
    navBarButtonColor: Color.primary,
    statusBarTextColorScheme: 'dark',
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var quotes = [
      {
        title: "title 1",
        author: "author 1",
        body: "body 1"
      },
      {
        title: "title 2",
        author: "author 2",
        body: "body 2"
      }
    ];

    this.state = {
      dataSource: ds.cloneWithRows(quotes)
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(quote) =>
          <View style={style.cell}>
            <Text style={style.title}> {quote.title} </Text>
            <Text style={style.author}> {quote.author} </Text>
            <Text style={style.body}> {quote.body} </Text>
          </View>
        }
      />
    );
  }

  onNavigatorEvent(event) {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      });
    }
    if (event.id === 'add') {
      Alert.alert('NavBar', 'Add button pressed');
    }
  }
}

const style = StyleSheet.create({
  cell: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 4,
    borderBottomWidth: 1,
    borderColor: Color.lightBackground
  },
  title: {
    fontWeight: 'bold'
  },
  author: {
    color: Color.primary
  },
  body: {
    paddingTop: 8,
    paddingBottom: 8
  }
});
