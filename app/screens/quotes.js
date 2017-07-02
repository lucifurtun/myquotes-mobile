import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  Text,
  Button
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Color from '../styles';
import axios from 'axios';
import Quote from '../view/quote';

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

  api = null;

  quotes = [];
  categories = [];
  authors = [];
  tags = [];

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    const self = this;

    this.state = {
      quotes: [],
      refreshing: false,
      currentPage: 1
    };

    let authorization = 'JWT ' + this.props.token;
    this.api = axios.create({
      baseURL: 'https://myquotes.io/api/',
      timeout: 1000,
      headers: {'Authorization': authorization}
    });

    this.api.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    });

    this.api.get('authors/')
      .then( function(response) {
        self.authors = response.data
      })
      .catch( function(error) {
        console.log(error);
      })

    this.api.get('categories/')
      .then( function(response) {
        self.categories = response.data
      })
      .catch( function(error) {
        console.log(error);
      })

    this.api.get('tags/')
      .then( function(response) {
        self.tags = response.data
      })
      .catch( function(error) {
        console.log(error);
      })

  }

  componentDidMount() {
    this.fetchNextPage()
  }

  fetchNextPage() {
    let self = this
    this.api.get('quotes/?page=' + this.state.currentPage)
      .then( function(response) {
        var quotes = response.data.results;
        self.quotes = quotes
        self.setState({
          quotes: quotes,
          refreshing: false,
          currentPage: self.state.currentPage + 1
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={style.container}>
        <SectionList
          sections={this.getQuotes()}
          renderItem={({item}) =>
            this.renderRow(item)
          }
          keyExtractor={(item) => {return item.id}}
          renderSectionHeader={() =>
            <View style={style.filterCell}>
              <TouchableOpacity onPress={this.categoriesButtonPress.bind(this)}>
                <View style={style.buttonContainer}>
                  <Text style={style.buttonText}>Categories</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.authorsButtonPress.bind(this)}>
                <View style={style.buttonContainer}>
                  <Text style={style.buttonText}>Authors</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.tagsButtonPress.bind(this)}>
                <View style={style.buttonContainer}>
                  <Text style={style.buttonText}>Tags</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }

  getQuotes() {
    let sections = [
      {data: this.state.quotes, key: "myQuotes"}
    ];
    return sections
  }

  _keyExtractor(item, index) {
    return item.id
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

  tagsButtonPress() {
    this.filterBy = 'Tags'

    this.props.navigator.showLightBox({
      screen: "filterQuotes",
      style: {
        backgroundBlur: "dark"
      },
      passProps: {
        filter: this.filterBy,
        properties: this.tags,
        callback: (param) => this.modalDidClose(param)
      },
    });
  }

  modalDidClose(selected) {
    let self = this
    let selectedArray = Object.keys(selected)
    let filteredQuotes = []

    if (self.filterBy === 'Authors') {
      filteredQuotes = this.quotes.filter( function(quote) {
        return selected[quote.author_id]
      })
    } else if (self.filterBy === 'Categories') {
      filteredQuotes = this.quotes.filter( function(quote) {
        return selected[quote.category_id]
      })
    } else if (self.filterBy === 'Tags') {
      filteredQuotes = this.quotes.filter( function(quote) {
        let tagsArray = []
        quote.tags.forEach( function(tag) {
          tagsArray.push("" + tag.id)
        })
        let intersection = tagsArray.filter( function(element) {
          return selectedArray.indexOf(element) > -1
        })

        return intersection.length === selectedArray.length
      })
    }

    if (selectedArray.length === 0) {
      newQuotes = this.quotes
    } else {
      newQuotes = filteredQuotes
    }

    this.setState({
      quotes: newQuotes,
    });
  }

}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightBackground
  },
  filterCell: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Color.primary
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: 'white'
  }
});
