/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DesignButton from '../../common/Button';
import styles from './styles';
import StatusBar from '../../common/StatusBar';
import { deviceWidth, deviceHeight } from '../../common/constants';
import TitleHeader from '../../common/TitleHeader';
import StartScreenIcon from '../../images/ZARNetwork_Logo.png';

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
          <StatusBar />
          <TitleHeader
            iconName="keyboard-arrow-left"
            title="REQUEST OTP"
            isBackArrow
            onBtnPress={() => navigation.goBack()}
          />
          <Image source={StartScreenIcon} style={styles.imageStyle} resizeMode="contain" />
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.7,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>Enter your</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> mobile number</Text>
              <Text> below to receive an</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> OTP</Text>
              <Text> via</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> SMS.</Text>
            </Text>
          </View>
          {this.renderPhoneInputField()}
          <View style={{ marginTop: deviceHeight * 0.05, width: deviceWidth * 0.7 }}>
            <DesignButton name="Next" callMethod={signIn} isClickable={phoneValid} />
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
