import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import {BlurView} from 'react-native-blur';
import Color from '../styles';
import Constants from '../constants';
import axios from 'axios';
import Quote from '../view/quote';
import URL from '../services/url';

const filterButtonWidth = Dimensions.get("window").width * 0.3;

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

  categories = [];
  authors = [];
  tags = [];
  activeFilters = [];

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    const self = this;

    let url = new URL()

    this.state = {
      quotes: [],
      url: url,
      nextPage: 1
    };

    let authorization = 'JWT ' + this.props.token;
    this.api = axios.create({
      timeout: 1000,
      headers: {'Authorization': authorization}
    });

    this.api.interceptors.request.use(request => {
      // console.log('Starting Request', request)
      return request
    });

    this.api.get(URL.authorsUrl)
      .then( function(response) {
        self.authors = self.addSelectedKey(response.data)
      })
      .catch( function(error) {
        console.log(error);
      })

    this.api.get(URL.categoriesUrl)
      .then( function(response) {
        self.categories = self.addSelectedKey(response.data)
      })
      .catch( function(error) {
        console.log(error);
      })

    this.api.get(URL.tagsUrl)
      .then( function(response) {
        self.tags = self.addSelectedKey(response.data)
      })
      .catch( function(error) {
        console.log(error);
      })

  }

  componentDidMount() {
    this.fetchNextPage(null)
  }

  fetchNextPage(nextPage) {
    let self = this
    let page = nextPage ? nextPage : this.state.nextPage

    if (page) {
      this.api.get(this.state.url.quotes(page))
        .then( function(response) {
          var quotes = response.data.results;
          self.setState({
            quotes: [...self.state.quotes, ...quotes],
            nextPage: response.data.pages.next
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
          onEndReached={() => this.fetchNextPage(null)}
          renderSectionHeader={() => this.renderHeader() }
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={style.filterCell}>
        <BlurView
          style={style.blurView}
          blurType="xlight"
          blurAmount={10}
        />
        <TouchableOpacity onPress={this.categoriesButtonPress.bind(this)}>
          <View style={style.buttonContainer}>
            <Text style={[this.isFilterBy('Categories')]}>Categories</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.authorsButtonPress.bind(this)}>
          <View style={style.buttonContainer}>
            <Text style={[this.isFilterBy('Authors')]}>Authors</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.tagsButtonPress.bind(this)}>
          <View style={style.buttonContainer}>
            <Text style={[this.isFilterBy('Tags')]}>Tags</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
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

  modalDidClose(properties) {
    let filterUrl = null
    this.state.url.filter = null

    this.setState({
      quotes: []
    })

    console.log(this.state.nextPage);
    switch (this.filterBy) {
      case 'Categories':
        this.categories = properties
        break;
      case 'Authors':
        this.authors = properties
        break;
      case 'Tags':
        this.tags = properties
        break;
      default:
        break;
    }

    filterUrl = this.getFilterUrl(this.categories, 'category')
    if (filterUrl) {
      this.state.url.updateFilter(filterUrl)
      if (this.activeFilters.indexOf('Categories') != -1) {
        this.activeFilters.push('Categories')
      }
    } else {
      var i = this.activeFilters.indexOf('Categories')
      if (i != -1) {
        array.splice(i, 1);
      }
    }
    filterUrl = this.getFilterUrl(this.authors, 'author')
    if (filterUrl) {
      this.state.url.updateFilter(filterUrl)
      if (this.activeFilters.indexOf('Authors') != -1) {
        this.activeFilters.push('Authors')
      }
    } else {
      var i = this.activeFilters.indexOf('Authors')
      if (i != -1) {
        array.splice(i, 1);
      }
    }
    filterUrl = this.getFilterUrl(this.tags, 'tags')
    if (filterUrl) {
      this.state.url.updateFilter(filterUrl)
      if (this.activeFilters.indexOf('Tags') != -1) {
        this.activeFilters.push('Tags')
      }
    } else {
      var i = this.activeFilters.indexOf('Tags')
      if (i != -1) {
        array.splice(i, 1);
      }
    }

    this.fetchNextPage(1)

  }

  addSelectedKey(param) {
    let properties = JSON.parse(JSON.stringify(param))

    properties.forEach( function(property) {
      property.isSelected = 0
    });

    return properties
  }

  getFilterUrl(properties, propertyType) {
    let returnValue = ''

    properties.forEach( function(property) {
      if (property.isSelected) {
        returnValue += '&' + propertyType + '=' + property.id
      }
    });

    return returnValue !== '' ? returnValue : null
  }

  isFilterBy(filter) {
    if (this.filterBy === filter) {
      return style.buttonTextFilter
    } else {
      return style.buttonText
    }
  }

}

const style = StyleSheet.create({
  blurView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  filterCell: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    backgroundColor: Color.lightBackground
  },
  buttonContainer: {
    flex: 1,
    width: filterButtonWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000000'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Color.primary
  },
  buttonTextFilter: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.primary
  }
});
