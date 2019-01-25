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
        <TouchableOpacity onPress={this.handleLogin}>
          <Text style={{ width: 50 }}>Forgot Pin?</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderButtons = () => {
    const { pinCodeObj } = this.props;
    const totalNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (totalNumber) {
      return totalNumber.map(btn => (
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(0,177,251)',
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 15,
          }}
          onPress={() => this.updateValue(btn, pinCodeObj.type)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{btn}</Text>
        </TouchableOpacity>
      ));
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
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', marginTop: 15, marginBottom: 15 }}>
          {pinCodeObj.title}
        </Text>
        <View
          style={{
            width: 100,
            flexDirection: 'row',
            height: 30,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: deviceWidth * 0.25,
          }}
        >
          <OcticonsIcons name="primitive-dot" size={20} color={colorData.firstDot} />
          <OcticonsIcons name="primitive-dot" size={20} color={colorData.secondDot} />
          <OcticonsIcons name="primitive-dot" size={20} color={colorData.thirdDot} />
          <OcticonsIcons name="primitive-dot" size={20} color={colorData.fourthDot} />
        </View>
        <View
          style={{
            width: deviceWidth * 0.8,
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
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              flexDirection: 'row',
              width: deviceWidth * 0.6,
              paddingLeft: 0,
              justifyContent: justifiyContentStyle,
              bottom: 20,
              paddingRight: 0,
              alignItems: 'flex-end',
            }}
          >
            {this.renderForgotPin()}
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={event => this.removePin(event, pinCodeObj.type)}
            >
              <MaterialIcons name="backspace" size={18} />
              <Text style={{ fontSize: 16 }}>Remove</Text>
            </TouchableOpacity>
          </View>
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
