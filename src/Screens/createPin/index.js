/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Alert, View, Text, Dimensions, StatusBar, TouchableHighlight } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TouchID from 'react-native-touch-id';
import DesignButton from '../../common/Button';
import styles from './styles';
import GeneratePinCode from '../../common/PinCode';
import { register } from '../../controllers/api/auth';

const deviceHeight = Dimensions.get('window').height;
// const deviceWidth = Dimensions.get('window').width;

class CreatePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouchId: false,
    };
    TouchID.isSupported()
      .then(res => {
        console.log('res is', res); /*eslint-disable-line */
        if (res === 'TouchID') {
          this.setState({
            isTouchId: true,
          });
        }
      })
      .catch(err => {
        console.log('err is', err); /*eslint-disable-line */
      });

    this.handleUserRegister = this.handleUserRegister.bind(this);
  }

  _pressHandler() {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS
    };
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        Alert.alert('Authenticated Successfully');
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
  }

  /**
   * ******************************************************************************
   * @method handleUserRegister : To perform action register user.
   * ******************************************************************************
   * @method register : To call register api to register user.
   * @param payload : Payload for register .
   * ******************************************************************************
   */
  handleUserRegister() {
    // const { email, password, pin, fingerPrint, mobileNumber } = this.props;
    const email = 'testuser16293@gmail.com';
    const password = '12345678';
    const pin = '1234';
    const fingerPrint = 'pqr';
    const mobileNumber = '1234567890';

    if (
      email &&
      email !== '' &&
      password &&
      password !== '' &&
      pin &&
      pin !== '' &&
      fingerPrint &&
      fingerPrint !== '' &&
      mobileNumber &&
      mobileNumber !== ''
    ) {
      const payload = {
        email,
        password,
        pin,
        fingerprint: fingerPrint,
        mobile_number: mobileNumber,
      };

      if (register) {
        register(payload)
          .then(result => {
            console.log('result register : ', result);
          })
          .catch(error => {
            console.log('error register : ', error);
          });
      }
    }
  }

  render() {
    const { isTouchId } = this.state;
    return !isTouchId ? (
      <View style={styles.Container}>
        <TouchableHighlight onPress={this._pressHandler}>
          <Text>Authenticate with Touch ID</Text>
        </TouchableHighlight>
      </View>
    ) : (
      <View style={styles.Container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={{ marginTop: deviceHeight * 0.06 }}>
          <Text style={styles.textStyle}>CREATE PIN</Text>
        </View>

        <View style={styles.dialerView}>
          <View style={{ marginTop: deviceHeight * 0.06 }}>
            <EvilIcons name="lock" size={48} />
          </View>
          <GeneratePinCode />
        </View>

        <View style={styles.loginButtonView}>
          <DesignButton name="Log In" callMethod={this.handleUserRegister} isClickable />
          <Text style={styles.termTextStyle}>Term & Condition</Text>
        </View>
      </View>
    );
  }
}

export default CreatePin;
