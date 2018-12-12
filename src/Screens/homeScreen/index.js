import React, { Component } from "react";
import { Alert, View, Text, TouchableHighlight } from "react-native";
import styles from "./styles";
import TouchID from "react-native-touch-id";
import PINCode from '@haskkor/react-native-pincode'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      isTouchId:false
    }
   TouchID.isSupported()
   .then((res)=>{
     console.log('res is', res);
    if(res === 'TouchID'){
      this.setState({
        isTouchId:true  
      })
    }
   })
   .catch((err) => {
     console.log('err is', err);
   });
 ;
  }

  _pressHandler() {
    const optionalConfigObject = {
      title: "Authentication Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    };
    TouchID.authenticate(
      "to demo this react-native component",
      optionalConfigObject
    )
      .then(success => {
        Alert.alert("Authenticated Successfully");
      })
      .catch(error => {
        Alert.alert("Authentication Failed");
      });
  }
  render() {
    console.log('isTouchIdisTouchId', this.state.isTouchId);
    return (
      !this.state.isTouchId ? <View style={styles.Container}>
        <TouchableHighlight onPress={this._pressHandler}>
          <Text>Authenticate with Touch ID</Text>
        </TouchableHighlight> 
        </View>: <PINCode status={'choose'}/>
    );
  }
}

export default HomeScreen;
