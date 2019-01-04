import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// eslint-disable-next-line react/prefer-stateless-function
export default class Card extends Component {
  render() {
    const { text, icon, onPress } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: deviceWidth * 0.05,
          alignItems: 'center',
          width: deviceWidth * 0.78,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={icon}
            style={{
              height: deviceHeight * 0.03,
              width: deviceHeight * 0.03,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flex: 10 }}>
          <Text style={styles.cardTextStyle}>{text}</Text>
        </View>

        <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
          <MaterialIcons color="#fff" size={24} name="keyboard-arrow-right" />
        </TouchableOpacity>
      </View>
    );
  }
}
/*eslint-disable*/
Card.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
};
