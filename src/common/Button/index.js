/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class DesignButton extends Component {
  render() {
    const { isClickable, callMethod, name } = this.props;
    let setButtonStyle = {
      ...styles.loginBtn,
    };
    if (!isClickable) {
      setButtonStyle = {
        ...styles.loginBtn,
        backgroundColor: '#70c5ef',
      };
    }

    return (
      <TouchableOpacity style={setButtonStyle} onPress={callMethod} disabled={!isClickable}>
        <Text style={styles.loginBtnText}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
