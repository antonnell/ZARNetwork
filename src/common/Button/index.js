import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class DesignButton extends React.PureComponent {
  render() {
    const { isClickable, callMethod, name, btnMainStyle, btnTextColor } = this.props;

    let setButtonStyle = {
      ...styles.loginBtn,
    };
    if (btnMainStyle) {
      setButtonStyle = {
        ...styles.loginBtn,
        ...btnMainStyle,
      };
    }
    if (!isClickable) {
      setButtonStyle = {
        ...styles.loginBtn,
        backgroundColor: '#70c5ef',
      };
    }

    let loginBtnTextStyling = {
      ...styles.loginBtnText,
    };
    if (btnTextColor) {
      loginBtnTextStyling = {
        ...styles.loginBtnText,
        ...btnTextColor,
      };
    }

    return (
      <TouchableOpacity style={setButtonStyle} onPress={callMethod} disabled={!isClickable}>
        <Text style={loginBtnTextStyling}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
DesignButton.defaultProps = {
  isClickable: false,
  name: 'DONE',
  btnMainStyle: null,
  callMethod: () => {},
  btnTextColor: null,
};
DesignButton.propTypes = {
  isClickable: PropTypes.bool,
  callMethod: PropTypes.func,
  name: PropTypes.string,
  btnMainStyle: PropTypes.objectOf(PropTypes.any),
  btnTextColor: PropTypes.objectOf(PropTypes.any),
};
