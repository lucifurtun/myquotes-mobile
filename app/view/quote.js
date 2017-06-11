import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import HTMLView from 'react-native-htmlview';
import Color from '../styles';
import TagsView from '../view/tagsView';

export default class Quote extends Component {
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
        <View style={{paddingTop: 4}}></View>
        <TagsView tags={this.props.tags}/>
      </View>
    );
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
