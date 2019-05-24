/* eslint-disable */
import React, { Component } from 'react';
import { Text, Dimensions, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcons from 'react-native-vector-icons/Octicons';

const deviceWidth = Dimensions.get('window').width;

export default class GeneratePinCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCode: '',
      confirmPincode: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  removePin = (event, type) => {
    const { pinCodeObj, updateForm } = this.props;
    event.preventDefault();
    const updateData = pinCodeObj.text.slice(-pinCodeObj.text.length, -1);
    this.setState({
      [type]: updateData,
    });
    updateForm(updateData, type);
  };

  updateValue(btn, type) {
    const { pinCodeObj, updateForm } = this.props;
    if (pinCodeObj.text.length < 4) {
      const value = pinCodeObj.text + btn;
      this.setState({
        [type]: value,
      });
      updateForm(value, type);
    }
  }
  handleLogin() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('Login');
    }
  }

  renderForgotPin() {
    const { isLogin } = this.props;
    if (isLogin) {
      return (
        <TouchableOpacity key='forgotPin' onPress={this.handleLogin}>
          <Text style={{ width: 90, textAlign: 'center' }}>Forgot Passcode?</Text>
        </TouchableOpacity>
      );
    } else {
      return (<Text key='forgotPin' style={{ width: 90, textAlign: 'center' }}></Text>)
    }
    return null;
  }

  renderButtons = () => {
    const { pinCodeObj } = this.props;
    const totalNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'forgotPin', 0, 'backspace'];
    if (totalNumber) {
      return totalNumber.map((btn) => {

        if(btn == 'forgotPin') {
          return this.renderForgotPin()
        }
        if(btn == 'backspace') {
          return (<TouchableOpacity
            key={btn}
            style={{
              backgroundColor: '#212c41',
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 15,
            }}
            onPress={(event) => this.removePin(event, pinCodeObj.type)}
          >
            <MaterialIcons name="backspace" size={18} color='#FFFFFF' />
          </TouchableOpacity>)
        }

        return (<TouchableOpacity
          key={btn}
          style={{
            backgroundColor: '#212c41',
            width: 66,
            height: 66,
            borderRadius: 33,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 15,
          }}
          onPress={() => this.updateValue(btn, pinCodeObj.type)}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 22 }}>{btn}</Text>
        </TouchableOpacity>)
      });
    }
    return null;
  };

  render() {
    const { pinCodeObj, colorData } = this.props;
    const { isLogin } = this.props;
    let justifiyContentStyle = 'flex-end';
    if (isLogin) {
      justifiyContentStyle = 'space-between';
    }
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text
          style={{
            textAlign: 'center',
            width: deviceWidth * 0.7,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            marginTop: 15,
            marginBottom: 15
          }}
        >
          {pinCodeObj.title}
        </Text>
        <View
          style={{
            width: 150,
            flexDirection: 'row',
            height: 30,
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center'
          }}
        >
          <OcticonsIcons name="primitive-dot" size={30} color={colorData.firstDot} />
          <OcticonsIcons name="primitive-dot" size={30} color={colorData.secondDot} />
          <OcticonsIcons name="primitive-dot" size={30} color={colorData.thirdDot} />
          <OcticonsIcons name="primitive-dot" size={30} color={colorData.fourthDot} />
        </View>
        <View
          style={{
            width: deviceWidth * 0.9,
            maxWidth: 300,

            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}
        >
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}
GeneratePinCode.defaultProps = {
  colorData: null,
  pinCodeObj: null,
  updateForm: () => {},
};
GeneratePinCode.propTypes = {
  colorData: PropTypes.objectOf(PropTypes.any),
  pinCodeObj: PropTypes.objectOf(PropTypes.any),
  updateForm: PropTypes.func,
};
