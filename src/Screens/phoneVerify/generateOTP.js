/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DesignButton from '../../common/Button';
import styles from './styles';

import { deviceWidth, deviceHeight } from '../../common/constants';

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

  onChangePhoneNumber(number) {
    this.phoneNumber = number;
    this.updateInfo();
  }

  selectedCountry(country) {
    this.flagValue = country;
    return this.flagValue;
  }

  updateInfo() {
    const { updateForm } = this.props;
    const valid = this.phone.isValidNumber();

    // const type = this.phone.getNumberType();

    const value = this.phone.getValue();
    updateForm(value, 'phoneNumber', valid);
    this.setState({
      phoneValid: valid,
    });
  }

  renderPhoneInputField() {
    return (
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
    );
  }

  renderView() {
    const { phoneValid } = this.state;
    const { navigation, signIn, navigationFrom } = this.props;
    if (!navigationFrom) {
      return (
        <View style={styles.Container}>
          <StatusBar backgroundColor="black" />
          <View
            style={{
              width: deviceWidth,
              alignItems: 'center',
              marginTop: deviceHeight * 0.1,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
              Enter your mobile number and tap next to enter the code we send you via SMS
            </Text>
          </View>
          {/* <View style={styles.mobileTextFieldStyle}>
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
          </View> */}
          {this.renderPhoneInputField()}
          <View style={{ marginTop: deviceHeight * 0.04 }}>
            <DesignButton name="Next " callMethod={signIn} isClickable={phoneValid} />
          </View>
        </View>
      );
    }
    return this.renderPhoneInputField();
  }

  render() {
    return this.renderView();
  }
}
