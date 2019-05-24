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
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> KYC Level 2</Text>
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
              <Text>You can now also</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> withdraw cash</Text>
              <Text>
                {' '}
                from your ZAR wallet, but not yet withdraw Rands from to a linked South African bank
                account in your name
              </Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> (Level 3)</Text>
            </Text>
          </View>

          <View
            style={{
              width: deviceWidth * 0.9,
              marginTop: deviceHeight * 0.1,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: '#046dc2',
                fontFamily: 'Montserrat-Bold',
              }}
            >
              Upgrade to KYC Level 3
            </Text>
            <View
              style={{
                marginTop: 6,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              }}
            />
          </View>

          <View
            style={{
              marginTop: deviceHeight * 0.025,
              width: deviceWidth * 0.8,
              alignSelf: 'center',
            }}
          >
            <DesignButton
              btnTextColor={styles.btnTextColor}
              name="Add Proof of Bank"
              isClickable
              callMethod={this.props.onIdentificationBtnClick}
              btnMainStyle={styles.btnStyle}
            />
          </View>

          <View
            style={{
              marginTop: deviceHeight * 0.05,
              width: deviceWidth * 0.7,
              alignSelf: 'center',
            }}
          >
            <DesignButton
              btnTextColor={{}}
              name="SUBMIT"
              isClickable
              callMethod={this.onSubmitBtnClick}
              btnMainStyle={{}}
            />
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
