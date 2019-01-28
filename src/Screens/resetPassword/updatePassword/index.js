import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import DesignButton from '../../../common/Button';
import TitleHeader from '../../../common/TitleHeader';
import FantomPayLogo from '../../../images/FantomPay.png';
import FloatLabelTextField from '../../../common/updatedFloatLabel';
import Loader from '../../../common/Loader';
import {
  deviceHeight,
  deviceWidth,
  invalid,
  valid,
  invalidPassword,
  invalidConfirmPassword,
} from '../../../common/constants';
import PasswordConstraints from '../../../common/PasswordConstraints';
import { isPasswordValid } from '../../../utility';
import { forgotPasswordApi } from '../../../controllers/api/forgotPassword';

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // oldPassword: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      eightPlusCharacter: false,
      moreThanOneCapital: false,
      moreThanOneLower: false,
      moreThanOneNumber: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  updateForm(value, type) {
    if (type === 'password') {
      isPasswordValid(value, (key, updatedState) => {
        this.setState({
          [key]: updatedState,
        });
      });
    }
    this.setState({ [type]: value });
  }

  /**
   * ******************************************************************************
   * @method handleResetPassword : To perform action for change password.
   * ******************************************************************************
   */
  handleResetPassword() {
    const { navigation } = this.props;
    const { confirmPassword } = this.state;
    const payload = {
      validation_uuid: navigation.state.params.uuid,
      new_password: confirmPassword,
    };
    forgotPasswordApi(payload)
      .then(res => {
        this.setState({
          isLoading: false,
        });
        if (res && res.payload && res.payload.status === 200) {
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        Alert.alert('Error', error);
      });
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  /**
   * @method validateFields : To validate text input.
   */
  validateFields(type) {
    const {
      password,
      confirmPassword,
      eightPlusCharacter,
      moreThanOneCapital,
      moreThanOneLower,
      moreThanOneNumber,
    } = this.state;

    if (type === 'password') {
      if (
        (password && !eightPlusCharacter) ||
        !moreThanOneCapital ||
        !moreThanOneLower ||
        !moreThanOneNumber
      ) {
        Alert.alert('Invalid Password', invalidPassword);
        this.setState({
          password: '',
        });
        return invalid;
      }
    } else if (type === 'confirmPassword') {
      if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
        Alert.alert('Invalid Password', invalidConfirmPassword);
        this.setState({
          confirmPassword: '',
        });
        return invalid;
      }
    }
    return valid;
  }

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
    const {
      password,
      confirmPassword,
      eightPlusCharacter,
      moreThanOneCapital,
      moreThanOneLower,
      moreThanOneNumber,
    } = this.state;
    let isClickable = false;
    if (password && password !== '' && confirmPassword && confirmPassword !== '') {
      isClickable = true;
    }
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          // title="RESET PASSWORD"
          isBackArrow
          iconName="keyboard-arrow-left"
          onBtnPress={this.handleGoBack}
        />
        <KeyboardAwareScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={styles.fantomPayLogoContainer}>
            <Image
              source={FantomPayLogo}
              style={styles.fantomPayLogoImageStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.mainTextViewStyle}>
            <Text style={styles.mainTextStyle}>Change Password</Text>
          </View>

          <View style={styles.textFieldStyle} />
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="password"
              inputType="text"
              valueType="password"
              placeholder="New Password"
              autoCorrect={false}
              value={password}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="confirmPassword"
              inputType="text"
              valueType="password"
              placeholder="Confirm Password"
              autoCorrect={false}
              value={confirmPassword}
              passwordValue={password}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          <PasswordConstraints
            eightPlusCharacter={eightPlusCharacter}
            moreThanOneCapital={moreThanOneCapital}
            moreThanOneLower={moreThanOneLower}
            moreThanOneNumber={moreThanOneNumber}
          />

          <View style={{ marginTop: deviceHeight * 0.08 }}>
            <DesignButton
              name="SAVE"
              callMethod={this.handleResetPassword}
              isClickable={isClickable}
            />
          </View>

          {this.renderLoader()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
UpdatePassword.defaultProps = {
  navigation: null,
};

UpdatePassword.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

export default UpdatePassword;
