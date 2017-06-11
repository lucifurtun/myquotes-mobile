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
      <View style={style.container}>
      <View style={style.cell}>
        <Text style={style.title}>{this.props.title}</Text>
        <View style={style.secondRow}>
          <View style={style.authorContainer}>
          <Text style={style.authorText}>{this.props.author}</Text>
          </View>
          <Text style={style.date}>{this.props.date}</Text>
        </View>
        <View style={style.text}>
          <HTMLView
            value={this.props.text}
            stylesheet={htmlStyle}
          />
        </View>
      </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#00000000'
  },
  cell: {
    marginBottom: 12,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  title: {
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16
  },
  text: {
    marginRight: 4,
    marginLeft: 8,
    paddingBottom: 4
  },
  secondRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 4
  },
  authorContainer: {
    backgroundColor: Color.primary,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4
  },
  authorText: {
    fontSize: 14,
    color: 'white'
  },
  date: {
    paddingLeft: 4,
    fontSize: 14,
    fontWeight: '300',
    color: Color.lightText
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
