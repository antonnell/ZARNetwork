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
    const { text, icon } = this.props;
    return (
      <View style={{ flexDirection: 'row', margin: deviceWidth * 0.05 }}>
        <Image source={icon} style={{ resizeMode: 'contain', height: deviceHeight * 0.03 }} />
        <Text style={styles.cardTextStyle}>{text}</Text>
        <TouchableOpacity>
          <MaterialIcons
            color="#fff"
            size={24}
            style={{ marginLeft: deviceHeight * 0.08 }}
            name="keyboard-arrow-right"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
/*eslint-disable*/
Card.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
