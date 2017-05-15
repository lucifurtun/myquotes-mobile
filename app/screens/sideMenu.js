import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

import Color from '../styles.js'

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Side Menu</Text>

        <Button
          onPress={this.buttonPress.bind(this)}
          title="Button"
          color={Color.primary}
        />

    </View>
    );
  }

  buttonPress() {
    this._toggleDrawer();
    // push/pop navigator actions affect the navigation stack of the current screen only.
    // since side menu actions are normally directed at sibling tabs, push/pop will
    // not help us. the recommended alternative is to use deep links for this purpose
    this.props.navigator.handleDeepLink({
      link: "/quotes"
    });
  }

  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 300
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    fontWeight: '500'
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});
