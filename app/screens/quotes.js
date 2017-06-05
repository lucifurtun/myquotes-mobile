import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  ListView,
  Button
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Color from '../styles';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';

class Quote extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={style.cell}>
        <Text style={style.title}>{this.props.title}</Text>
        <Text style={style.author}>{this.props.author}</Text>
        <HTMLView
          value={this.props.text}
          stylesheet={htmlStyle}
        />
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

  quotes = []
  categories = [];
  authors = [];

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const self = this;

    this.state = {
      dataSource: ds.cloneWithRows(self.quotes),
    };

    let authorization = 'JWT ' + this.props.token;
    let api = axios.create({
      baseURL: 'https://myquotes.io/api/',
      timeout: 1000,
      headers: {'Authorization': authorization}
    });

    api.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    });

    api.get('quotes/')
      .then( function(response) {
        var quotes = response.data.results;
        console.log(quotes);
        self.setState({
          dataSource: ds.cloneWithRows(quotes),
        });
        self.quotes = quotes
      })
      .catch(function (error) {
        console.log(error);
      });

    api.get('authors/')
      .then( function(response) {
        self.authors = response.data
      })
      .catch( function(error) {
        console.log(error);
      })

      api.get('categories/')
        .then( function(response) {
          self.categories = response.data
        })
        .catch( function(error) {
          console.log(error);
        })

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
          enableEmptySections={true}
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
        properties: this.categories,
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
        properties: this.authors,
        callback: (param) => this.modalDidClose(param)
      },
    });
  }

  modalDidClose(selected) {
    let self = this

    let filteredQuotes = this.quotes.filter( function(quote) {
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
    color: Color.primary,
    paddingBottom: 8
  },
  filterCell: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const htmlStyle = StyleSheet.create({
  p: {
    fontSize: 16
  },
  strong: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  em: {
    fontSize: 16,
    fontStyle: 'italic'
  },
  u: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  s: {
    fontSize: 16,
    textDecorationLine: 'line-through'
  }
});
