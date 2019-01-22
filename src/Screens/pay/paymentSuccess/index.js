import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import success from '../../../images/success.png';
import DesignButton from '../../../common/Button';

import styles from './styles';

import { deviceHeight } from '../../../common/constants';

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      // this.props.navigation.navigate('')
    }, 3000);
  }

  render() {
    return (
      <View style={styles.Container}>
        <Image source={success} style={styles.imageStyle} resizeMode="cover" />
        <Text style={styles.registrationText}>Payment Success!</Text>
        <View style={{ marginTop: deviceHeight * 0.04 }}>
          <Text style={styles.textStyle}>ETH 1.0897 paid to Jacob E. Miller</Text>
          <Text style={styles.accountTextStyle}>Account: 4356879809079</Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.2 }}>
          <DesignButton
            name="Done"
            // callMethod={() => this.nextBtnPressed()}
            isClickable={false}
          />
        </View>
      </View>
    );
  }
}
