import React, { Component } from "React";
import styles from "./styles";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from "react-native";
import DesignButton from "../../common/Button";
import PhoneInput from "react-native-phone-input";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

 this.flagValue = '';
 this.phoneNumber = '';
export default class GenerateOTP extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      phoneValid: false,
    };
  }
  selectedCountry(country) {
    return (this.flagValue = country);
  }

  onChangePhoneNumber(number) {
    this.phoneNumber = number;
    this.updateInfo();
  }

  updateInfo() {
    const { updateForm } = this.props;
    const valid = this.phone.isValidNumber(),
      type = this.phone.getNumberType(),
      value = this.phone.getValue();
      updateForm(value, 'phoneNumber');
    this.setState({
      phoneValid: valid
    });
  }
  render() {
    const { phoneValid } = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <View
          style={{
            width: deviceWidth,
            alignItems: "center",
            marginTop: deviceHeight * 0.1,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <MaterialIcons
              color="#000"
              size={24}
              style={{ marginLeft: 10 }}
              name="keyboard-arrow-left"
            />
          </TouchableOpacity>
          <Text style={styles.textStyle}>GENERATE OTP</Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.1 }}>
          <Text style={styles.infoTextStyle}>
            Enter your mobile number and tap next to enter the code we send you
            via SMS
          </Text>
        </View>
        <View style={styles.mobileTextFieldStyle}>
        <PhoneInput
              ref={ref => {
                this.phone = ref;
              }}
              style={styles.phoneInputStyle}
              onSelectCountry={country => this.selectedCountry(country)}
              onChangePhoneNumber={number => {
                this.onChangePhoneNumber(number);
              }}
            />
        </View>
        <View style={{ marginTop: deviceHeight * 0.04 }}>
          <DesignButton name="Next " callMethod={this.props.signIn} isClickable={phoneValid}/>
        </View>
      </View>
    );
  }
}
