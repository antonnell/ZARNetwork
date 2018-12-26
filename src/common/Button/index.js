/* eslint-disable react/prop-types */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class DesignButton extends React.PureComponent {
  render() {
    const { isClickable, callMethod, name, btnMainStyle } = this.props;
    let setButtonStyle = {
      ...styles.loginBtn,
      btnMainStyle,
    };
    if (!isClickable) {
      setButtonStyle = {
        ...styles.loginBtn,
        backgroundColor: '#70c5ef',
        btnMainStyle,
      };
    }

    return (
      <TouchableOpacity style={setButtonStyle} onPress={callMethod} disabled={!isClickable}>
        <Text style={styles.loginBtnText}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
