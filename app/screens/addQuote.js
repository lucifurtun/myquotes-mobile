import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

import Color from '../styles';
import MultiSelect from 'react-native-multiple-select';

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

  tags = [
    {
      id: 1,
      name: "one"
    },
    {
      id: 2,
      name: "two"
    }
  ];

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      title: "",
      author: "",
      selectedItems: []
    }

    this.tags = this.props.tags;
    Alert.alert("Tags", this.tags)
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <TextInput
          style={styles.title}
          placeholder= 'title'
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          multiline = {true}
          numberOfLines = {0}
        />

        <TextInput
          style={styles.author}
          placeholder= 'author'
          onChangeText={(author) => this.setState({author})}
          value={this.state.author}
          multiline = {true}
          numberOfLines = {0}
        />

        <Text style={styles.date}>some date</Text>

        <MultiSelect
          items={this.tags}
          uniqueKey="id"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#D12345"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />

      </ScrollView>
    );
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  onNavigatorEvent(event) {
    if (event.id == 'cancel') {
      this.props.navigator.dismissModal();
    } else if (event.id == 'add') {
      // do something
      Alert.alert("Alert", this.state.title);
      Alert.alert("Alert", this.state.author);
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
