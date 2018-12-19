import React, { Component } from "react";
import styles from "./styles";
import { Text, TouchableOpacity } from "react-native";

export default class DesignButton extends Component {
  render() {

    const {isClickable}= this.props;
    let setButtonStyle={
      ...styles.loginBtn
    }
    if(!isClickable){
      setButtonStyle={
        ...styles.loginBtn,
        backgroundColor:'#70c5ef'
      }
    }

    return (
      <TouchableOpacity style={setButtonStyle} onPress={this.props.callMethod} disabled={!this.props.isClickable}>
        <Text style={styles.loginBtnText}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}
