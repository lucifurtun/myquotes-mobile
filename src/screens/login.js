import React from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView,
  View
} from 'react-native';

import store from '../store'

import Color from '../styles';
import axios from 'axios';

export default class Login extends React.Component {

  static navigatorStyle = {
    navBarHidden: true
  };

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
        <View>
        <TextInput
          autoCapitalize='none'
          clearButtonMode='while-editing'
          selectionColor={Color.primary}
          style={loginStyles.textField}
          onChangeText={(textEmail) => this.setState({textEmail})}
          placeholder= 'email'
          value={this.state.textEmail}
        />
        </View>
        <View>
        <TextInput
          autoCapitalize='none'
          clearButtonMode='while-editing'
          selectionColor={Color.primary}
          style={loginStyles.textField}
          onChangeText={(textPassword) => this.setState({textPassword})}
          placeholder= 'password'
          value={this.state.textPassword}
          secureTextEntry={true}
        />
        </View>
        <Button
          style={loginStyles.button}
          onPress={this.loginButtonPress.bind(this)}
          title="Log In"
          color={Color.primary}
        />
        <Button
          style={loginStyles.button}
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

        console.log(token)
      store.dispatch({type: 'SET_TOKEN', value: token})

      AsyncStorage.setItem('token', token, () => {
        // nothing to be done
      });
      AsyncStorage.setItem('email', email, () => {
        // nothing to be done
      });
      self.goToQuotes(token)
    })
    .catch(function (error) {
      console.log(error)
      Alert.alert('Unable to log in');
    });
  }

  goToQuotes(token) {
    this.props.navigation.navigate('quotes')
  }

}

const signupButtonPress = () => {
  Alert.alert('Sign up');
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    height: 40,
    width: 300
  },
  button: {
    padding: 16
  }
});
