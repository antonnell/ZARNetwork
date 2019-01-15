import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import FantomPayLogo from '../../images/FantomPay.png';
import FloatLabelTextField from '../../common/updatedFloatLabel';
import Loader from '../../common/Loader';
import { isEmailValid } from '../../utility/index';
import { deviceHeight, deviceWidth, invalid, valid, invalidEmail } from '../../common/constants';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  /**
   * ******************************************************************************
   * @method handleResetPassword : To perform action for email verification.
   * ******************************************************************************
   */
  handleResetPassword() {
    const { email } = this.state;
    const { navigation } = this.props;

    if (email && email !== '') {
      if (isEmailValid(email) === false) {
        Alert.alert('Invalid email', invalidEmail);
        return;
      }
      this.setState({
        isLoading: true,
      });
      setTimeout(() => {
        this.setState({
          isLoading: false,
        });
        Alert.alert('Information', 'Check your email box to confirm reset password.');
        if (navigation) {
          navigation.navigate('UpdatePassword');
        }
      }, 1000);
    }
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  /**
   * @method validateFields : To validate email.
   */
  validateFields(type) {
    const { email } = this.state;
    if (type === 'email') {
      if (email !== '' && email !== undefined) {
        if (isEmailValid(email) === false) {
          Alert.alert('Invalid Email', invalidEmail);
          this.setState({
            email: '',
          });
          return invalid;
        }
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
    const { email } = this.state;
    let isClickable = false;
    if (email !== '') {
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
            <Text style={styles.mainTextStyle}>Forgot your password?</Text>
            <View style={styles.subTextViewStyle}>
              <Text style={styles.subTextStyle}>
                Enter your email below to receive your password reset instructions
              </Text>
            </View>
          </View>

          <View style={styles.emailTextFieldStyle}>
            <FloatLabelTextField
              type="email"
              inputType="email"
              valueType="email"
              placeholder="Email"
              autoCorrect={false}
              value={email}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>

          <View style={{ marginTop: deviceHeight * 0.08 }}>
            <DesignButton
              name="RESET PASSWORD"
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
ResetPassword.defaultProps = {
  navigation: null,
};

ResetPassword.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

export default ResetPassword;
