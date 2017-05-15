import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  Button,
  ScrollView
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Color from '../styles';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEmail: '',
      textPassword: ''
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={loginStyles.container}>
        <TextInput
          style={loginStyles.textField}
          onChangeText={(textEmail) => this.setState({textEmail})}
          placeholder= 'email'
          value={this.state.textEmail}
        />
        <TextInput
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
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'quotes',
        title: 'myQuote'
      },
      drawer: {
        left: {
          screen: 'sideMenu'
        },
        disableOpenGesture: true
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
    paddingLeft: 24,
    paddingRight: 24,
  }
});
