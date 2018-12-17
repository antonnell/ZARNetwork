import React, { Component } from "react";
import styles from "./styles";
import { Text, TouchableOpacity } from "react-native";

export default class DesignButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Log In</Text>
      </TouchableOpacity>
    );
  }
}
