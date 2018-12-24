import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// eslint-disable-next-line react/prefer-stateless-function
export default class TitleCard extends Component {
  render() {
    const {
      icon,
      text,
      titleCardMainViewStyle,
      titleCardImageStyle,
      titleCardTextStyle,
    } = this.props;
    return (
      <View style={titleCardMainViewStyle}>
        <Image source={icon} style={titleCardImageStyle} />
        <Text style={titleCardTextStyle}>{text}</Text>
        <TouchableOpacity>
          <MaterialIcons
            color="#fff"
            size={24}
            style={{ marginLeft: deviceHeight * 0.1 }}
            name="keyboard-arrow-right"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
