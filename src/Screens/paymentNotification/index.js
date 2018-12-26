/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import TitleText from '../../common/TitleText';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class PaymentNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader iconName="keyboard-arrow-left" title="PAYMENT NOTIFICATION" />
        <TitleText
          titleText="Beneficiary Notification"
          mainStyle={styles.mainStyle}
          textStyle={styles.textStyle}
        />

        <View style={{ marginTop: deviceHeight * 0.08, alignSelf: 'center' }}>
          <DesignButton name="DONE" callMethod={this.handleUserLogin} isClickable />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // authDetail: state.userAuthReducer,
  // errDetail: state.errorHandlerReducer,
});

export default connect(mapStateToProps)(PaymentNotification);
