/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TouchID from 'react-native-touch-id';
import PropTypes from 'prop-types';
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import styles from './styles';
import GeneratePinCode from '../../common/PinCode';
import { register } from '../../controllers/api/auth';
import { checkPinLength } from '../../utility/index';
import Loader from '../../common/Loader';

const deviceHeight = Dimensions.get('window').height;

class CreatePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouchId: false,
      pinCode: '',
      confirmPinCode: '',
      isClicked: false,
      //  userFingerPrint:false,
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
      this.setState({
        isLoading: true,
      });
      if (register) {
        register(payload)
          .then(result => {
            console.log('Result', result);
            this.setState({
              isLoading: false,
            });
            if (result.payload && result.payload.data && result.payload.data.status === 200) {
              navigation.navigate('RegistrationSuccess');
            } else if (
              result &&
              result.error &&
              result.error.response &&
              result.error.response.data &&
              result.error.response.data.message
            ) {
              const { message } = result.error.response.data;
              Alert.alert('Error', message);
            }
          })
          .catch(error => {
            this.setState({
              isLoading: false,
            });
            Alert.alert('Error', error);
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
      .then(() => {
        const { pinCode } = this.state;
        const { navigation } = this.props;
        console.log(navigation.state.params.emailId);
        const userEmailId = navigation.state.params.emailId;
        const userPasssword = navigation.state.params.password;
        const userPhoneNumber = navigation.state.params.phoneNumber;
        const userFingerPrint = true;
        this.handleUserRegister(
          userEmailId,
          userPasssword,
          userPhoneNumber,
          pinCode,
          userFingerPrint
        );
      })
      .catch(() => {
        Alert.alert('Authentication Failed');
      });
  };

  /**
   * @method renderLoader : To display loader indicator.
   */
  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader isLoading={isLoading} loaderStyle={0.25} />;
    }
    return null;
  }

  render() {
    const { isClicked, confirmPinCode, pinCode, isTouchId } = this.state;
    console.log('isTouchId : ', isTouchId);
    const { navigation } = this.props;
    let pinCodeObj = {};
    let colorData = {};
    if (!isClicked && confirmPinCode === '') {
      colorData = checkPinLength(isClicked, confirmPinCode, pinCode);
      console.log('colorData pinCode', colorData);
      pinCodeObj = {
        title: 'Enter a 4 digit PIN to login with',
        btnText: 'Next',
        type: 'pinCode',
        text: pinCode,
        isBtnEnabled: pinCode.length === 4,
      };
    } else {
      colorData = checkPinLength(isClicked, confirmPinCode, pinCode);
      console.log('colorData', colorData);
      pinCodeObj = {
        title: 'Confirm 4 digit PIN Code',
        btnText: 'Done',
        type: 'confirmPinCode',
        text: confirmPinCode,
        isBtnEnabled: confirmPinCode.length === 4,
      };
    }
    return isTouchId ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableHighlight
          style={{ width: 200, alignSelf: 'center' }}
          underlayColor="#ffffff"
          onPress={this._pressHandler}
        >
          <Text style={{ textAlign: 'center' }}>Authenticate with Touch ID</Text>
        </TouchableHighlight>
      </View>
    ) : (
      <View style={styles.Container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <TitleHeader title="CREATE PIN" />

        <ScrollView
          style={styles.dialerView}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <EvilIcons name="lock" size={48} />
          </View>
          <View style={{ flex: 1 }}>
            <GeneratePinCode
              navigation={navigation}
              updateForm={this.updateForm}
              pinCodeObj={pinCodeObj}
              colorData={colorData}
            />
          </View>
          <View style={styles.loginButtonView}>
            <DesignButton
              name={pinCodeObj.btnText}
              isClickable={pinCodeObj.isBtnEnabled}
              callMethod={event => this.nextBtnClicked(event, pinCodeObj)}
            />
          </View>
          <TouchableOpacity
            style={{ marginTop: deviceHeight * 0.03 }}
            onPress={() => navigation.navigate('TermsConditions')}
          >
            <Text style={styles.textStyle}>Terms & Conditions</Text>
          </TouchableOpacity>
          <View style={{ height: deviceHeight * 0.08 }} />
        </ScrollView>

        {this.renderLoader()}
      </View>
    );
  }
}
CreatePin.defaultProps = {
  navigation: null,
};
CreatePin.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

export default CreatePin;
