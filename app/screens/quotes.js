import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  ListView,
  Alert,
  Button
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Color from '../styles';
import axios from 'axios';

class Quote extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={style.cell}>
        <Text style={style.title}>{this.props.title}</Text>
        <Text style={style.author}>{this.props.author}</Text>
        <Text style={style.body}>{this.props.text}</Text>
      </View>
    );
  }
}

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

  localQuotes = []

  localCategories = [
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

  localAuthors = [
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

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var quotes = [
      {
        title: "title 1",
        author: "author 1",
        body: "body 1",
        author_id: '1',
        category_id: '2'
      },
      {
        title: "title 2",
        author: "author 2",
        body: "body 2",
        author_id: '2',
        category_id: '2'
      }
    ];

    const self = this;

    this.state = {
      dataSource: ds.cloneWithRows(quotes),
    };

    axios.get('https://myquotes.io/api/quotes/?user_id=0')
        .then(function (response) {
            var data = response.data;
            self.setState({
                dataSource: ds.cloneWithRows(data.results),
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    this.localQuotes = quotes


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
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }

  renderRow(quote) {
    let title = quote.title ? quote.title : ''
    let text = quote.text ? quote.text : ''
    let author = quote.author ? (quote.author.name ? quote.author.name : '') : ''

    return (<Quote title={title} text={text} author={author} />)
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

    this.filterBy = 'Categories'

    this.props.navigator.showLightBox({
      screen: "filterQuotes",
      style: {
        backgroundBlur: "dark"
      },
      passProps: {
        filter: this.filterBy,
        properties: this.localCategories,
        callback: (param) => this.modalDidClose(param)
      },
    });
  }

  authorsButtonPress() {

    this.filterBy = 'Authors'

    this.props.navigator.showLightBox({
      screen: "filterQuotes",
      style: {
        backgroundBlur: "dark"
      },
      passProps: {
        filter: this.filterBy,
        properties: this.localAuthors,
        callback: (param) => this.modalDidClose(param)
      },
    });
  }

  modalDidClose(selected) {
    let self = this

    let filteredQuotes = this.localQuotes.filter( function(quote) {
      if (self.filterBy === 'Authors') {
        return selected[quote.author_id]
      } else if (self.filterBy === 'Categories') {
        return selected[quote.category_id]
      }
    })
    console.log(filteredQuotes);
  }

}

const style = StyleSheet.create({
  cell: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: Color.lightBackground
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  author: {
    fontSize: 16,
    color: Color.primary
  },
  body: {
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  filterCell: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
