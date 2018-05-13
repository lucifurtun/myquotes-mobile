import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Image
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Color from '../styles';
import axios from 'axios';

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.login();
  }

  render() {
    return (
      <View style={style.container}>
        <Image
          style={{width: 100, height: 100}}
          source={require('../../img/logo.png')}
        />
      </View>
    );
  }

  login() {
    let self = this
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        axios.post('https://myquotes.io/api/token/verify/', {
          token: result
        })
        .then(function (response) {
          self.goToQuotes(result);
        })
        .catch(function (error) {
          self.goToLogin();
        });
      } else {
        this.goToLogin();
      }
    });

  }

  goToLogin() {
    Navigation.startSingleScreenApp({
     screen: {
       screen: 'login',
       title: undefined
     }
    });
  }

  goToQuotes(token) {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'quotes',
        title: 'myQuotes'
      },
      drawer: {
        left: {
          screen: 'sideMenu'
        },
        disableOpenGesture: true
      },
      passProps: {
        token: token
      }
    });
  }

}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
