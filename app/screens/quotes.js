import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Alert,
  Button
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
      <View style={{flex: 1}}>
        <View style={style.filterCell}>
          <Button
            onPress={this.categoriesButtonPress.bind(this)}
            color={Color.primary}
            title="Categories"
          />
          <Button
            onPress={this.authorsButtonPress.bind(this)}
            color={Color.primary}
            title="Authors"
          />
        </View>
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
      </View>
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
      this.props.navigator.showModal({
        title: "Add Quote",
        screen: "addQuote"
      });
    }
  }

  categoriesButtonPress() {

    var categories = [
      {
        id: "1",
        name: "category1"
      },
      {
        id: "2",
        name: "category2"
      },
      {
        id: "3",
        name: "category3"
      }
    ];

    this.props.navigator.showLightBox({
      screen: "filterQuotes",
      style: {
        backgroundBlur: "dark"
      },
      passProps: {
        filter: 'Categories',
        properties: categories
      },
    });
  }

  authorsButtonPress() {

    var authors = [
      {
        id: "1",
        name: "author1"
      },
      {
        id: "2",
        name: "author2"
      },
      {
        id: "3",
        name: "author3"
      },
      {
        id: "4",
        name: "author4"
      }
    ];

    this.props.navigator.showLightBox({
      screen: "filterQuotes",
      style: {
        backgroundBlur: "dark"
      },
      passProps: {
        filter: 'Authors',
        properties: authors
      },
    });
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
  },
  filterCell: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
