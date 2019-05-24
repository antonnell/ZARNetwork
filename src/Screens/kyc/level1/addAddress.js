import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import DesignButton from '../../../common/Button';

import { deviceWidth, deviceHeight } from '../../../common/constants';

import styles from './styles';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {}

  render() {
    const { navigation, onAddressTypeBtnClick, goBack } = this.props;

    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => goBack()}
          title="Add Proof Of Address"
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
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>Select the</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> document</Text>
              <Text> you'd like to upload for</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> KYC Level 2.</Text>
            </Text>
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
              name="Bank Statement"
              isClickable
              callMethod={() => {
                onAddressTypeBtnClick('Bank Statement');
              }}
              btnMainStyle={styles.btnStyle}
            />
            <DesignButton
              btnTextColor={styles.btnTextColor}
              name="Utility Bill"
              isClickable
              callMethod={() => {
                onAddressTypeBtnClick('Utility Bill');
              }}
              btnMainStyle={styles.btnStyle}
            />
            <DesignButton
              btnTextColor={styles.btnTextColor}
              name="Other"
              isClickable
              callMethod={() => {
                onAddressTypeBtnClick('Other');
              }}
              btnMainStyle={styles.btnStyle}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
AddAddress.defaultProps = {
  navigation: null,
};
AddAddress.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(AddAddress);
