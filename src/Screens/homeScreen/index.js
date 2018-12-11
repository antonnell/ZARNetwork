import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.Container}>
        <Text>Fantom-Pay</Text>
      </View>
    );
  }
}

export default HomeScreen;
