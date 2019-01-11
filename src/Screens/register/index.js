import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TitleHeader from '../../common/TitleHeader';
import DesignButton from '../../common/Button';
import FantomPayLogo from '../../images/FantomPay.png';
// import FloatLabelTextField from '../../common/FloatLabelTextField';
import FloatLabelTextField from '../../common/updatedFloatLabel';
import { isEmailValid, isPasswordValid } from '../../utility/index';
import PasswordConstraints from '../../common/PasswordConstraints';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      eightPlusCharacter: false,
      moreThanOneCapital: false,
      moreThanOneLower: false,
      moreThanOneNumber: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  updateForm(value, type) {
    if (type === 'password') {
      this.setState({ confirmPassword: '' });
      isPasswordValid(value, (key, updatedState) => {
        this.setState({
          [key]: updatedState,
        });
      });
    }
    this.setState({ [type]: value });
  }

  // validate(type) {
  //   const { password, confirmPassword } = this.state;
  //   if (type === 'email') {
  //     this.setState({
  //       email: '',
  //     });
  //   } else if (type === 'password') {
  //     // if (email === '') {
  //     //   Alert.alert('Error', 'Enter Email first');
  //     //   this.setState({
  //     //     password: '',
  //     //   });
  //     // }
  //     if (password === '') {
  //       // Alert.alert('Error', 'Enter Password first.');
  //       this.setState({ confirmPassword: '' });
  //     }
  //   } else if (type === 'confirmPassword') {
  //     // if (email === '') {
  //     //   Alert.alert('Error', 'Enter Email first');
  //     //   this.setState({
  //     //     confirmPassword: '',
  //     //   });
  //     // } else
  //     if (password === '') {
  //      // Alert.alert('Error', 'Enter Password first.');
  //       this.setState({ confirmPassword: '' });
  //     } else if (confirmPassword !== '' && password !== confirmPassword) {
  //       Alert.alert('Error', 'Password does not matched.');
  //       this.setState({
  //         confirmPassword: '',
  //       });
  //     }
  //   }
  // }
  validateFields(type) {
    const { email, password, confirmPassword } = this.state;
    if (type === 'email') {
      if (email !== '' && email !== undefined) {
        if (isEmailValid(email) === false) {
          Alert.alert('Error', 'Invalid Email');
        }
      }
    } else if (type === 'confirmPassword') {
      if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
        Alert.alert('Error', 'Password does not matched.');
        this.setState({
          confirmPassword: '',
        });
      }
    }
  }

  checkEmptyFields(type) {
    const { email, password } = this.state;
    if (type === 'email') {
      Alert.alert('Error', 'Enter email!');
    } else if (type === 'password') {
      if (email !== '' && isEmailValid(email)) {
        Alert.alert('Error', 'Enter password!');
      }
    } else if (type === 'confirmPassword') {
      if (password !== '') {
        Alert.alert('Error', 'Enter confirm password!');
      }
    }
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  nextBtnPressed() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    navigation.navigate('Phone', { emailId: email, password });
  }

  render() {
    let isNextBtnClickable = false;
    const { navigation } = this.props;
    const {
      email,
      password,
      confirmPassword,
      eightPlusCharacter,
      moreThanOneCapital,
      moreThanOneLower,
      moreThanOneNumber,
    } = this.state;
    if (
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      eightPlusCharacter &&
      moreThanOneCapital &&
      moreThanOneLower &&
      moreThanOneNumber
    ) {
      isNextBtnClickable = true;
    }

    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        {/* header */}

        <TitleHeader
          iconName="keyboard-arrow-left"
          title="REGISTER"
          isBackArrow
          onBtnPress={this.handleGoBack}
        />

        <ScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {/* Fantom Pay icon */}
          <View style={styles.FantomPayLogoContainer}>
            <Image
              source={FantomPayLogo}
              style={styles.FantomPayLogoImageStyle}
              resizeMode="contain"
            />
          </View>

          {/* EMAIL field */}
          <View style={styles.textFieldStyle}>
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
              // validate={type => this.validate(type)}
              validateFields={type => this.validateFields(type)}
              checkEmptyFields={type => this.checkEmptyFields(type)}
            />
          </View>
          {/* Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="password"
              inputType="password"
              valueType="password"
              placeholder="Password"
              autoCorrect={false}
              value={password}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              // validate={type => this.validate(type)}
              validateFields={type => this.validateFields(type)}
              checkEmptyFields={type => this.checkEmptyFields(type)}
            />
          </View>
          {/* confirm Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="confirmPassword"
              inputType="password"
              valueType="password"
              placeholder="Confirm Password"
              autoCorrect={false}
              value={confirmPassword}
              passwordValue={password}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              // validate={type => this.validate(type)}
              validateFields={type => this.validateFields(type)}
              checkEmptyFields={type => this.checkEmptyFields(type)}
            />
          </View>
          {/* Password Match */}
          <PasswordConstraints
            eightPlusCharacter={eightPlusCharacter}
            moreThanOneCapital={moreThanOneCapital}
            moreThanOneLower={moreThanOneLower}
            moreThanOneNumber={moreThanOneNumber}
          />
          {/* Next button */}
          <View style={{ marginTop: deviceHeight * 0.08 }}>
            <DesignButton
              name="Next"
              callMethod={() => this.nextBtnPressed()}
              isClickable={isNextBtnClickable}
            />
          </View>
          {/* Login text */}
          <View style={styles.loginButtonContainer}>
            <Text style={[styles.textStyle, { color: 'rgb(3,3,3)' }]}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.textStyle}> Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: deviceHeight * 0.05 }} />
        </ScrollView>
      </View>
    );
  }
}
Register.defaultProps = {
  navigation: null,
};
Register.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};
