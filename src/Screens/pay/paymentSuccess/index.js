/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import success from '../../../images/success.png';
import DesignButton from '../../../common/Button';

import styles from './styles';

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletType: '',
      amount: '',
      beneficiaryName: '',
      accountNumber: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const walletType = navigation.state.params.data.walletType;
    const amount = navigation.state.params.data.amount;
    const beneficiaryName = navigation.state.params.data.beneficiaryName;
    const accountNumber = navigation.state.params.data.accountNumber;
    this.setState({
      walletType,
      amount,
      beneficiaryName,
      accountNumber,
    });
  }

  render() {
    const { navigation } = this.props;
    const { walletType, amount, beneficiaryName, accountNumber } = this.state;
    return (
      <View style={styles.Container}>
        <Image source={success} style={styles.imageStyle} resizeMode="cover" />
        <Text style={styles.registrationText}>Payment Success!</Text>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            {walletType} {amount} paid to {beneficiaryName}
          </Text>
          <Text style={styles.accountTextStyle}>Account {accountNumber}</Text>
        </View>
        <View style={styles.buttonViewStyle}>
          <DesignButton
            name="Done"
            callMethod={() => navigation.navigate('PayBeneficiary')}
            isClickable
          />
        </View>
      </View>
    );
  }
}
PaymentSuccess.defaultProps = {
  navigation: null,
};

PaymentSuccess.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};
