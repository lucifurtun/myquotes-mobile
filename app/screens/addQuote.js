import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import Color from '../styles';
import TagInput from 'react-native-tag-input';

export default class AddQuote extends Component {

  static navigatorButtons = {
    leftButtons: [{
      title: 'Cancel',
      id: 'cancel'
    }],
    rightButtons: [{
      title: 'Add',
      id: 'add'
    }]
  };

  static navigatorStyle = {
    navBarTextColor: 'black',
    navBarButtonColor: Color.primary
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      tags: [
        'tag1',
        'tag2'
      ]
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <TextInput
          style={styles.title}
          placeholder= 'title'
          // onChangeText={(textEmail) => this.setState({textEmail})}
          // value={this.state.textEmail}
          multiline = {true}
          numberOfLines = {0}
        />

        <TextInput
          style={styles.author}
          placeholder= 'author'
          // onChangeText={(textEmail) => this.setState({textEmail})}
          // value={this.state.textEmail}
          multiline = {true}
          numberOfLines = {0}
        />

        <Text style={styles.date}>some date</Text>

        <TagInput
          value={this.state.tags}
          onChange={(tags) => this.onTagsChange(tags)}
        />

      </ScrollView>
    );
  }

  onTagsChange(tags) {
    this.setState({
      tags,
    });
  }

  onNavigatorEvent(event) {
    if (event.id == 'cancel') {
      this.props.navigator.dismissModal();
    } else if (event.id == 'add') {
      // do something
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    height: 40,
    color: 'blue'
  },
  author: {
    height: 40,
    color: 'red'
  },
  date: {
    color: 'green'
  }
});
