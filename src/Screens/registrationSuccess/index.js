import React, { Component } from "react";
import { View, Text, StatusBar, Dimensions, Image } from "react-native";
import styles from "./styles";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class RegistrationSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      //this.props.navigation.navigate('')
    }, 3000);
  }

  render() {
    return (
      <View style={styles.Container}>
        <Image
          source={require("../../images/success.png")}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
        />
        <Text style={styles.registrationText}>Registration Success!</Text>
      </View>
    );
  }
}
