import React, { Component } from "react";
import styles from "./styles";
import { Text, TouchableOpacity } from "react-native";

export default class DesignButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.loginBtn} onPress={this.props.callMethod}>
        <Text style={styles.loginBtnText}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}
