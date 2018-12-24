/* eslint-disable no-console */
import React, { Component } from 'react';
import { Alert, View, Text, Dimensions, StatusBar, TouchableHighlight } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TouchID from 'react-native-touch-id';
import DesignButton from '../../common/Button';
import styles from './styles';
import GeneratePinCode from '../../common/PinCode';
import { register } from '../../controllers/api/auth';

const deviceHeight = Dimensions.get('window').height;

class CreatePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouchId: false,
      pinCode: '',
      confirmPinCode: '',
      isClicked: false,
    };
    this.handleUserRegister = this.handleUserRegister.bind(this);
    TouchID.isSupported()
      .then(res => {
        console.log('res is', res);
        if (res === 'TouchID') {
          this.setState({
            isTouchId: true,
          });
        }
      })
      .catch(err => {
        console.log('err is', err);
      });
  }

  updateForm = (value, type) => {
    this.setState({ [type]: value });
  };

  /**
   * ******************************************************************************
   * @method handleUserRegister : To perform action register user.
   * ******************************************************************************
   * @method register : To call register api to register user.
   * @param payload : Payload for register .
   * ******************************************************************************
   */
  // eslint-disable-next-line react/sort-comp
  handleUserRegister(email, password, mobileNumber, pin, fingerPrint) {
    const { navigation } = this.props;
    if (
      email &&
      email !== '' &&
      password &&
      password !== '' &&
      pin &&
      pin !== '' &&
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
          .then(response => {
            if (response.payload && response.payload.data && response.payload.data.status === 200) {
              navigation.navigate('RegistrationSuccess');
            } else {
              console.log('Registeration unsuccessfull ');
            }
          })
          .catch(error => {
            console.log('error register : ', error);
          });
      }
    }
  }

  nextBtnClicked = (event, pinCodeObj) => {
    event.preventDefault();
    console.log('pinCode oBj', pinCodeObj);
    if (pinCodeObj.btnText === 'Next') {
      this.setState({
        isClicked: true,
      });
    } else {
      const { pinCode, confirmPinCode } = this.state;
      const { navigation } = this.props;
      console.log(navigation.state.params.emailId);
      const userEmailId = navigation.state.params.emailId;
      const userPasssword = navigation.state.params.password;
      const userPhoneNumber = navigation.state.params.phoneNumber;
      let userFingerPrint = navigation.state.params.fingerPrint;
      if (pinCode === confirmPinCode && pinCode.length === confirmPinCode.length) {
        if (!userFingerPrint) {
          userFingerPrint = '';
        }
        this.handleUserRegister(
          userEmailId,
          userPasssword,
          userPhoneNumber,
          pinCode,
          userFingerPrint
        );
      } else {
        Alert.alert('Failed');
      }
      // this.setState({
      //   isClicked: false
      // });
    }
  };

  _pressHandler = () => {
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
  };

  render() {
    console.log('isClicked', this.state.isClicked);

    let pinCodeObj = {};
    if (!this.state.isClicked && this.state.confirmPinCode === '') {
      pinCodeObj = {
        title: 'Enter a 4 digit PIN to login with',
        btnText: 'Next',
        type: 'pinCode',
        text: this.state.pinCode,
        isBtnEnabled: this.state.pinCode.length === 4,
      };
    } else {
      pinCodeObj = {
        title: 'Confirm 4 digit PIN Code',
        btnText: 'Done',
        type: 'confirmPinCode',
        text: this.state.confirmPinCode,
        isBtnEnabled: this.state.confirmPinCode.length === 4,
      };
    }
    return this.state.isTouchId ? (
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
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <EvilIcons name="lock" size={48} />
          </View>
          <GeneratePinCode
            navigation={this.props.navigation}
            updateForm={this.updateForm}
            pinCodeObj={pinCodeObj}
          />
        </View>

        <View style={styles.loginButtonView}>
          <DesignButton
            name={pinCodeObj.btnText}
            isClickable={pinCodeObj.isBtnEnabled}
            callMethod={event => this.nextBtnClicked(event, pinCodeObj)}
          />
        </View>
      </View>
    );
  }
}

export default CreatePin;
