/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  StatusBar,
  // TouchableHighlight,
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
import { deviceHeight } from '../../common/constants';

class CreatePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouchId: false,
      biometryType: '',
      pinCode: '',
      confirmPinCode: '',
      isClicked: false,
      //  userFingerPrint:false,
    };
    this.handleUserRegister = this.handleUserRegister.bind(this);
  }

  componentDidMount() {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'TouchID') {
          this.setState({
            isTouchId: true,
            biometryType: 'TouchID',
          });
        } else if (biometryType === 'FaceID') {
          this.setState({
            isTouchId: true,
            biometryType: 'FaceID',
          });
        }
      })
      .catch(err => {
        console.log('TouchID.isSupported err is', err);
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
  // eslint-disable-next-line react/sort-comp
  handleUserRegister(firstname, surname, email, password, mobileNumber, pin, fingerPrint) {
    const { navigation } = this.props;

    if (
      firstname &&
      firstname !== '' &&
      surname &&
      surname !== '' &&
      email &&
      email !== '' &&
      password &&
      password !== '' &&
      mobileNumber &&
      mobileNumber !== ''
    ) {
      const payload = {
        firstname,
        surname,
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
          .then(res => {
            this.setState({
              isLoading: false,
            });
            if (res.payload && res.payload.data && res.payload.data.status === 200) {
              navigation.navigate('RegistrationSuccess');
            } else if (
              res &&
              res.error &&
              res.error.response &&
              res.error.response.data &&
              res.error.response.data.result
            ) {
              const { result } = res.error.response.data;
              Alert.alert('Error', result);
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
    const { pinCode, confirmPinCode } = this.state;
    event.preventDefault();
    const { isTouchId } = this.state;
    if (pinCodeObj.btnText === 'Next') {
      this.setState({
        isClicked: true,
      });
    } else if (
      pinCodeObj.btnText === 'Done' &&
      pinCode === confirmPinCode &&
      pinCode.length === confirmPinCode.length
    ) {
      if (isTouchId) {
        this._pressHandler();
      } else {
        this.onRegistrationRequest('');
      }
    } else {
      Alert.alert('Alert', ' 4 digit PIN you have entered do not match.');
    }
  };

  onRegistrationRequest(userFingerPrint) {
    const { pinCode } = this.state;
    const { navigation } = this.props;
    const userFirstName = navigation.state.params.firstName;
    const userLastName = navigation.state.params.lastName;
    const userEmailId = navigation.state.params.emailId;
    const userPasssword = navigation.state.params.password;
    const userPhoneNumber = navigation.state.params.phoneNumber;

    this.handleUserRegister(
      userFirstName,
      userLastName,
      userEmailId,
      userPasssword,
      userPhoneNumber,
      pinCode,
      userFingerPrint
    );
  }

  updateForm = (value, type) => {
    this.setState({ [type]: value });
  };

  _pressHandler = () => {
    const { biometryType } = this.state;
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
    TouchID.authenticate(`Please authenticate using your  ${biometryType}`, optionalConfigObject)
      .then(() => {
        this.onRegistrationRequest(true);
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
    const { isClicked, confirmPinCode, pinCode } = this.state;
    const { navigation } = this.props;
    let pinCodeObj = {};
    let colorData = {};
    if (!isClicked && confirmPinCode === '') {
      colorData = checkPinLength(isClicked, confirmPinCode, pinCode);
      pinCodeObj = {
        title: 'Enter a 4 digit PIN to login with',
        btnText: 'Next',
        type: 'pinCode',
        text: pinCode,
        isBtnEnabled: pinCode.length === 4,
      };
    } else {
      colorData = checkPinLength(isClicked, confirmPinCode, pinCode);
      pinCodeObj = {
        title: 'Confirm your 4 digit PIN ',
        btnText: 'Done',
        type: 'confirmPinCode',
        text: confirmPinCode,
        isBtnEnabled: confirmPinCode.length === 4,
      };
    }

    return (
      <View style={styles.Container}>
        <StatusBar barStyle="dark-content" />
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
