/* eslint-disable no-console */
// Library
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// styles
import styles from './styles';

// Components
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import TitleText from '../../common/TitleText';
import ToggleCard from '../../common/ToggleCard';
import StatusBar from '../../common/StatusBar';
// constants
import { deviceHeight } from '../../common/constants';

class PaymentNotification extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let isBackArrowPresent = false;
    let beneficiaryNotification = {
      email: false,
      none: true,
      sms: false,
    };
    let myNotification = {
      email: false,
      none: true,
      sms: false,
    };
    if (navigation && navigation.state && navigation.state.params) {
      const navigationProps = navigation.state.params;
      isBackArrowPresent = navigationProps.isBackArrow;
      if (navigationProps.beneficiaryNotification) {
        // eslint-disable-next-line prefer-destructuring
        beneficiaryNotification = navigationProps.beneficiaryNotification;
      }
      if (navigationProps.myNotification) {
        // eslint-disable-next-line prefer-destructuring
        myNotification = navigationProps.myNotification;
      }
    }

    this.state = {
      isBackArrowPresent,
      myNotification,
      beneficiaryNotification,
    };
    this.updateNotification = this.updateNotification.bind(this);
  }

  updateNotification() {
    const { navigation } = this.props;
    const { myNotification, beneficiaryNotification } = this.state;
    if (
      navigation &&
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.updateNotification
    ) {
      const { updateNotification } = navigation.state.params;
      updateNotification(myNotification, beneficiaryNotification);
      navigation.goBack();
    }
  }

  /**
   * @method updateToggleValue : To update state of notifications
   * @param {*} type : Type of notification categoey
   * @param {*} key : Type of notification channel
   * @param {*} value : Status of notification channel
   */
  updateToggleValue(value, type, key) {
    const { state } = this;
    const categoeyType = state[type];
    let status = {};
    if (key === 'none' && value === false) {
      status = {
        [key]: value,
        email: true,
        sms: true,
      };
    } else if (key === 'none' && value === true) {
      status = {
        [key]: value,
        email: false,
        sms: false,
      };
    } else {
      status = {
        [key]: value,
      };
    }

    const updatedCategoeyState = {
      ...categoeyType,
      ...status,
    };

    this.setState({
      [type]: updatedCategoeyState,
    });
  }

  toggleContainer(text, status, categoryType, key) {
    return (
      <ToggleCard
        textVal={text}
        textStyle={styles.toggleTextStyle}
        toggleState={status}
        updateToggleClick={e => {
          this.updateToggleValue(e, categoryType, key);
        }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { isBackArrowPresent, beneficiaryNotification, myNotification } = this.state;

    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="PAYMENT NOTIFICATION"
          isBackArrow={isBackArrowPresent}
          onBtnPress={() => navigation.goBack()}
        />
        <ScrollView style={{ height: deviceHeight }} showsVerticalScrollIndicator={false}>
          {/* Beneficiary Notification */}
          <TitleText
            titleText="Beneficiary Notification"
            mainStyle={styles.mainStyle}
            textStyle={styles.textStyle}
          />
          <View style={styles.toggleContainerStyle}>
            {this.toggleContainer(
              'None',
              beneficiaryNotification.none,
              'beneficiaryNotification',
              'none'
            )}
            <View style={styles.separatorStyle} />
            {this.toggleContainer(
              'Email',
              beneficiaryNotification.email,
              'beneficiaryNotification',
              'email'
            )}
            <View style={styles.separatorStyle} />
            {this.toggleContainer(
              'SMS',
              beneficiaryNotification.sms,
              'beneficiaryNotification',
              'sms'
            )}
          </View>

          {/* My Notification Toggle container */}
          <TitleText
            titleText="My Notification"
            mainStyle={styles.mainStyle}
            textStyle={styles.textStyle}
          />
          <View style={styles.toggleContainerStyle}>
            {this.toggleContainer('None', myNotification.none, 'myNotification', 'none')}
            <View style={styles.separatorStyle} />
            {this.toggleContainer('Email', myNotification.email, 'myNotification', 'email')}
            <View style={styles.separatorStyle} />
            {this.toggleContainer('SMS', myNotification.sms, 'myNotification', 'sms')}
          </View>

          <View style={{ marginTop: deviceHeight * 0.08, alignSelf: 'center' }}>
            <DesignButton name="DONE" callMethod={this.updateNotification} isClickable />
          </View>
          <View style={{ height: deviceHeight * 0.1 }} />
        </ScrollView>
      </View>
    );
  }
}

PaymentNotification.defaultProps = {
  navigation: null,
};
PaymentNotification.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = () => ({
  // authDetail: state.userAuthReducer,
  // errDetail: state.errorHandlerReducer,
});

export default connect(mapStateToProps)(PaymentNotification);
