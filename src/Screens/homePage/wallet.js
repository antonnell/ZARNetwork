import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { getFirstCharOfString } from '../../utility/index';
import Styles from './styles';
// import styles from '../../common/Button/styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.handleWallet = this.handleWallet.bind(this);
  }

  /**
   * @method handleWallet :  To handle onPress event on feature.
   */
  handleWallet() {
    const { handleWallet } = this.props;
    if (handleWallet) {
      handleWallet();
    }
  }

  renderIcon() {
    const { text, icon } = this.props;
    const iconAltText = getFirstCharOfString(text);
    if (icon) {
      return <Image source={icon} style={Styles.walletIconImgStyle} resizeMode="contain" />;
    }
    return <Text style={Styles.walletIconTextStyle}>{iconAltText}</Text>;
  }

  render() {
    const { text } = this.props;
    return (
      <TouchableOpacity style={Styles.walletOptionContainerStyle} onPress={this.handleWallet}>
        <View style={Styles.walletOptionIconViewStyle}>{this.renderIcon()}</View>
        <Text style={Styles.walletOptionTextStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
Wallet.defaultProps = {
  text: '',
  handleWallet: () => {},
};

Wallet.propTypes = {
  text: PropTypes.string,
  handleWallet: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  icon: PropTypes.number,
};
