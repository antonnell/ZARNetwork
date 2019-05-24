import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  AsyncStorage,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DesignButton from '../../../common/Button';
import TitleHeader from '../../../common/TitleHeader';
import styles from './styles';
import GeneratePinCode from '../../../common/PinCode';
import { login } from '../../../controllers/api/auth';
import { checkPinLength } from '../../../utility/index';
import Loader from '../../../common/Loader';
import { deviceHeight } from '../../../common/constants';
import StatusBar from '../../../common/StatusBar';

class LoginWithPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouchId: false,
      biometryType: '',
      pinCode: '',
      isClicked: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.loginBtnClicked = this.loginBtnClicked.bind(this);
  }

  async componentDidMount() {
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
      .catch(() => {});

    const pushRequestString = await AsyncStorage.getItem('pushRequest');
    if (pushRequestString && pushRequestString != '' && pushRequestString != null) {
      const pushRequest = JSON.parse(pushRequestString);
      this.setState({ pushRequest });
    }
  }

  /**
   * ******************************************************************************
   * @method loginBtnClicked : To perform action login user.
   * ******************************************************************************
   * @method login : To call Login api to login user.
   * @param payload : Payload for login .
   * ******************************************************************************
   */

  loginBtnClicked = () => {
    const { pinCode } = this.state;
    const { authDetail, navigation } = this.props;

    if (authDetail && authDetail !== null) {
      const { email } = authDetail;
      if (email && email !== '' && pinCode && pinCode !== '') {
        const payload = {
          email,
          pin: pinCode,
        };
        this.setState({
          isLoading: true,
        });

        login(payload)
          .then(res => {
            this.setState({
              isLoading: false,
            });
            if (res && res.payload && res.payload.status === 200) {
              if (this.state.pushRequest != null) {
                navigation.navigate('Request');
              } else {
                navigation.navigate('Home');
              }
            } else if (
              res &&
              res.error &&
              res.error.response &&
              res.error.response.data &&
              res.error.response.data.result
            ) {
              const { result } = res.error.response.data;
              Alert.alert('Authentication failed', result);
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
  };

  updateForm = (value, type) => {
    this.setState({ [type]: value });
  };

  _pressHandler = () => {
    const { biometryType } = this.state;
    const { navigation } = this.props;
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: '', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS
    };
    TouchID.authenticate(`Please authenticate using your  ${biometryType}`, optionalConfigObject)
      .then(() => {
        // this.state({
        //   isTouchId: false,
        // });
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error) {
          if (
            Platform.OS === 'ios' &&
            error.details &&
            error.details.name &&
            error.details.name === 'LAErrorUserCancel'
          ) {
            this.setState({
              isTouchId: false,
              biometryType: '',
            });
          } else if (
            Platform.OS === 'android' &&
            error.code &&
            error.code === 'AUTHENTICATION_CANCELED'
          ) {
            this.setState({
              isTouchId: false,
              biometryType: '',
            });
          } else {
            Alert.alert('Authentication Failed');
          }
        }
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

  renderPinCodeView() {
    const { isClicked, pinCode, isTouchId } = this.state;
    const { navigation } = this.props;
    let pinCodeObj = {};
    let colorData = {};
    if (!isClicked) {
      colorData = checkPinLength(isClicked, '', pinCode);
      pinCodeObj = {
        title: 'Enter your 4 digit PIN ',
        btnText: 'Sign In',
        type: 'pinCode',
        text: pinCode,
        isBtnEnabled: pinCode.length === 4,
      };
    }

    if (isTouchId) {
      this._pressHandler();
    }

    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader title="SIGN IN" />

        <ScrollView
          style={styles.dialerView}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <GeneratePinCode
              navigation={navigation}
              updateForm={this.updateForm}
              pinCodeObj={pinCodeObj}
              colorData={colorData}
              isLogin
            />
          </View>
          <View style={styles.loginButtonView}>
            <DesignButton
              name={pinCodeObj.btnText}
              isClickable={pinCodeObj.isBtnEnabled}
              callMethod={this.loginBtnClicked}
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

  render() {
    return this.renderPinCodeView();
  }
}
LoginWithPin.defaultProps = {
  navigation: null,
  authDetail: null,
};
LoginWithPin.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  authDetail: PropTypes.objectOf(PropTypes.any),
};

const mapSateToProps = state => ({
  authDetail: state.userAuthReducer.userDetail,
});

export default connect(mapSateToProps)(LoginWithPin);
