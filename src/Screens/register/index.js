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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import TitleHeader from '../../common/TitleHeader';
import DesignButton from '../../common/Button';
import FantomPayLogo from '../../images/FantomPay.png';
import FloatLabelTextField from '../../common/FloatLabelTextField';

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
  }

  checkConstraints(passwordVal) {
    const regOneCapital = /^(?=.*[A-Z]).{1,}$/;
    const regOneLower = /^(?=.*[a-z]).{1,}$/;
    const regOneNumber = /^(?=.*\d).{1,}$/;
    if (passwordVal !== '') {
      if (passwordVal.length > 8) {
        this.setState({ eightPlusCharacter: true });
      } else {
        this.setState({ eightPlusCharacter: false });
      }

      if (regOneCapital.test(passwordVal)) {
        this.setState({ moreThanOneCapital: true });
      } else {
        this.setState({ moreThanOneCapital: false });
      }

      if (regOneLower.test(passwordVal)) {
        this.setState({ moreThanOneLower: true });
      } else {
        this.setState({ moreThanOneLower: false });
      }

      if (regOneNumber.test(passwordVal)) {
        this.setState({ moreThanOneNumber: true });
      } else {
        this.setState({ moreThanOneNumber: false });
      }
    } else {
      // if password length is 0
      this.setState({
        moreThanOneNumber: false,
        moreThanOneLower: false,
        moreThanOneCapital: false,
        eightPlusCharacter: false,
      });
    }
  }

  updateForm(value, type) {
    if (type === 'password') {
      this.setState({ confirmPassword: '' });
      this.checkConstraints(value);
    }
    this.setState({ [type]: value });
  }

  validate(type) {
    const { email, password, confirmPassword } = this.state;
    if (type === 'email') {
      this.setState({
        email: '',
      });
    } else if (type === 'password') {
      if (email === '') {
        Alert.alert('Error', 'Enter Email first');
        this.setState({
          password: '',
        });
      }
    } else if (type === 'confirmPassword') {
      if (email === '') {
        Alert.alert('Error', 'Enter Email first');
        this.setState({
          confirmPassword: '',
        });
      } else if (password === '') {
        Alert.alert('Error', 'Enter Password first');
        this.setState({ confirmPassword: '' });
      } else if (password !== confirmPassword) {
        Alert.alert('Error', 'Password does not match..');
        this.setState({
          confirmPassword: '',
        });
      }
    }
  }

  nextBtnPressed() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    navigation.navigate('Phone', { emailId: email, password });
  }

  renderPasswordContraintsContainer() {
    return (
      <View style={{ marginTop: deviceHeight * 0.06 }}>
        <View style={styles.passwordConstraints}>
          {this.renderConstraintText('8+ characters')}
          <View style={{ width: deviceWidth * 0.03 }} />
          {this.renderConstraintText('1+ Capital letter')}
        </View>

        <View style={[styles.passwordConstraints, { marginTop: deviceHeight * 0.03 }]}>
          {this.renderConstraintText('1+ Lower case letter')}
          <View style={{ width: deviceWidth * 0.03 }} />
          {this.renderConstraintText('1+ Number')}
        </View>
      </View>
    );
  }

  renderConstraintText(textVal) {
    const {
      eightPlusCharacter,
      moreThanOneCapital,
      moreThanOneLower,
      moreThanOneNumber,
    } = this.state;
    let iconName = 'close';

    let iconColor = 'rgb(245,0,0)';

    let textColor = 'rgba(3,3,3,0.5)';
    if (textVal === '8+ characters' && eightPlusCharacter) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    } else if (textVal === '1+ Capital letter' && moreThanOneCapital) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    } else if (textVal === '1+ Lower case letter' && moreThanOneLower) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    } else if (textVal === '1+ Number' && moreThanOneNumber) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons name={iconName} color={iconColor} size={deviceWidth < 375 ? 14 : 18} />
        <Text style={[styles.constraintsTextStyle, { color: textColor }]}>{textVal}</Text>
      </View>
    );
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
          onBtnPress={() => navigation.goBack()}
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
              placeholder="Email"
              autoCorrect={false}
              value={email}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validate={type => this.validate(type)}
            />
          </View>
          {/* Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="password"
              placeholder="Password"
              autoCorrect={false}
              value={password}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validate={type => this.validate(type)}
            />
          </View>
          {/* confirm Password field */}
          <View style={styles.textFieldStyle}>
            <FloatLabelTextField
              type="confirmPassword"
              placeholder="Confirm Password"
              autoCorrect={false}
              value={confirmPassword}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validate={type => this.validate(type)}
            />
          </View>
          {/* Password Match */}
          {this.renderPasswordContraintsContainer()}
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
              <Text style={styles.textStyle}> Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: deviceHeight * 0.05 }} />
        </ScrollView>
      </View>
    );
  }
}
Register.defaultProps = {
  navigation: {},
};
Register.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};
