import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Color from '../styles';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEmail: '',
      textPassword: ''
    };

    AsyncStorage.getItem('email', (error, result) => {
      if (result !== null) {
        this.state.textEmail = result
      }
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={loginStyles.container}>
        <TextInput
          autoCapitalize='none'
          clearButtonMode='while-editing'
          style={loginStyles.textField}
          onChangeText={(textEmail) => this.setState({textEmail})}
          placeholder= 'email'
          value={this.state.textEmail}
        />
        <TextInput
          autoCapitalize='none'
          clearButtonMode='while-editing'
          style={loginStyles.textField}
          onChangeText={(textPassword) => this.setState({textPassword})}
          placeholder= 'password'
          value={this.state.textPassword}
          secureTextEntry={true}
        />
        <Button
          onPress={this.loginButtonPress.bind(this)}
          title="Log In"
          color={Color.primary}
        />
        <Button
          onPress={signupButtonPress}
          title="Sign Up"
          color={Color.primary}
        />
      </ScrollView>
    );
  }

  loginButtonPress() {
    let self = this

    axios.post('https://myquotes.io/api/token/new/', {
      email: this.state.textEmail,
      password: this.state.textPassword
    })
    .then(function (response) {
      let token = response.data.token;
      let email = self.state.textEmail

      AsyncStorage.setItem('token', token, () => {
        // nothing to be done
      });
      AsyncStorage.setItem('email', email, () => {
        // nothing to be done
      });
      self.goToQuotes(token)
    })
    .catch(function (error) {
      Alert.alert('Unable to log in');
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

const signupButtonPress = () => {
  Alert.alert('Sign up');
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    height: 40,
    width: 300,
    paddingLeft: 24,
    paddingRight: 24,
  }
});
