import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import DesignButton from '../../../common/Button';

import { deviceWidth, deviceHeight } from '../../../common/constants';

import styles from './styles';

class KYCStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {}

  render() {
    const { navigation, goBack } = this.props;

    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => goBack()}
          title="KYC Level 1"
          isBackArrow
        />

        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={{ marginTop: deviceHeight * 0.1 }}>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.75,
                fontSize: 18,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>You are currently</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> KYC Level 3</Text>
            </Text>
          </View>

          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.75,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>Congratulations you are currently at the </Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> highest KYC level</Text>
            </Text>
          </View>
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.75,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>You are able to deplosit, withdraw or transact an </Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> unlimited</Text>
              <Text> total of</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> ZAR per day,</Text>
              <Text> and hold an </Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> unlimited</Text>
              <Text> total maximum value of ZAR in your wallet. </Text>
            </Text>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.75,
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>You can also</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> withdraw cash</Text>
              <Text> from your ZAR wallet, and can now</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}>
                {' '}
                withdraw Rands to a linked South African bank account
              </Text>
              <Text> in your name.</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
KYCStatus.defaultProps = {
  navigation: null,
};
KYCStatus.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(KYCStatus);
