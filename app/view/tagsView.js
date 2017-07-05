import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import HTMLView from 'react-native-htmlview';
import Color from '../styles';

export default class TagsView extends Component {
  constructor() {
    super();
  }

  renderTag = (tag, index) => {
    return (
      <TouchableOpacity
      key={index}
      ref={'tag' + index}>
        <Tag text={tag.name}/>
      </TouchableOpacity>
    );
  }

  render() {
    const tags = this.props.tags || defaults.tags
    return (
      <View style={style.container}>
        {tags.map((tag, index) => this.renderTag(tag, index))}
      </View>
    );
  }

}

const defaults = {
  tags: [{id: 1, name: 'these'}, {id: 2, name: 'are'}, {id: 3, name: 'some'}, {id: 4, name: 'test tags'}],
  color: Color.lightBackground,
  textColor: Color.lightText,
  selectedColor: Color.primary,
  selectedTextColor: Color.lightText,
  fontSize: 15,
  paddingTop: 1,
  paddingRight: 4,
  paddingBottom: 1,
  paddingLeft: 4,
  borderRadius: 3.5,
  verticalSpace: 3,
  horizontalSpace: 3
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0
  }
});

class Tag extends Component {
  constructor() {
    super();
  }

  render() {
    const tagStyle = {
      backgroundColor: this.props.backgroundColor || defaults.color,
      borderWidth: 1,
      borderColor: this.props.backgroundColor || defaults.color,
      borderRadius: this.props.borderRadius || defaults.borderRadius,
      marginRight: this.props.verticalSpace || defaults.verticalSpace,
      marginBottom: this.props.horizontalSpace || defaults.horizontalSpace
    }
    const textStyle = {
      color: this.props.textColor || defaults.textColor,
      fontSize: this.props.fontSize || defaults.fontSize,
      paddingTop: this.props.paddingTop || defaults.paddingTop,
      paddingRight: this.props.paddingRight || defaults.paddingRight,
      paddingBottom: this.props.paddingBottom || defaults.paddingBottom,
      paddingLeft: this.props.paddingLeft || defaults.paddingLeft
    }
    return (
      <View style={tagStyle}>
        <Text style={textStyle}>{this.props.text}</Text>
      </View>
    )
  }
}
