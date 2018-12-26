/* eslint-disable no-console */
// Library
import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// styles
import styles from './styles';

// Components
import DesignButton from '../../common/Button';
import TitleHeader from '../../common/TitleHeader';
import TitleText from '../../common/TitleText';
import ToggleCard from '../../common/ToggleCard';

// constants
const deviceHeight = Dimensions.get('window').height;

class PaymentNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noBeneficiaryNotification: false,
      emailBeneficiaryNotification: false,
      smsBeneficiaryNotification: false,
      noMyNotification: false,
      emailMyNotification: false,
      smsMyNotification: false,
    };
  }

  updateToggleValue(type) {
    const {
      noBeneficiaryNotification,
      emailBeneficiaryNotification,
      smsBeneficiaryNotification,
      noMyNotification,
      emailMyNotification,
      smsMyNotification,
    } = this.state;
    if (type === 'noBeneficiaryNotification') {
      this.setState({ noBeneficiaryNotification: !noBeneficiaryNotification });
    } else if (type === 'emailBeneficiaryNotification') {
      this.setState({ emailBeneficiaryNotification: !emailBeneficiaryNotification });
    } else if (type === 'smsBeneficiaryNotification') {
      this.setState({ smsBeneficiaryNotification: !smsBeneficiaryNotification });
    } else if (type === 'noMyNotification') {
      this.setState({ noMyNotification: !noMyNotification });
    } else if (type === 'emailMyNotification') {
      this.setState({ emailMyNotification: !emailMyNotification });
    } else if (type === 'smsMyNotification') {
      this.setState({ smsMyNotification: !smsMyNotification });
    }
  }

  toggleContainer(text, status, type) {
    return (
      <ToggleCard
        textVal={text}
        textStyle={styles.toggleTextStyle}
        toggleState={status}
        updateToggleClick={() => {
          this.updateToggleValue(type);
        }}
      />
    );
  }

  render() {
    const {
      noBeneficiaryNotification,
      emailBeneficiaryNotification,
      smsBeneficiaryNotification,
      noMyNotification,
      emailMyNotification,
      smsMyNotification,
    } = this.state;

    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader iconName="keyboard-arrow-left" title="PAYMENT NOTIFICATION" />
        <ScrollView style={{ height: deviceHeight }} showsVerticalScrollIndicator={false}>
          {/* Beneficiary Notification */}
          <TitleText
            titleText="Beneficiary Notification"
            mainStyle={styles.mainStyle}
            textStyle={styles.textStyle}
          />
          <View style={styles.toggleContainerStyle}>
            {this.toggleContainer('None', noBeneficiaryNotification, 'noBeneficiaryNotification')}
            <View style={styles.separatorStyle} />
            {this.toggleContainer(
              'Email',
              emailBeneficiaryNotification,
              'emailBeneficiaryNotification'
            )}
            <View style={styles.separatorStyle} />
            {this.toggleContainer('SMS', smsBeneficiaryNotification, 'smsBeneficiaryNotification')}
          </View>

          {/* My Notification Toggle container */}
          <TitleText
            titleText="My Notification"
            mainStyle={styles.mainStyle}
            textStyle={styles.textStyle}
          />
          <View style={styles.toggleContainerStyle}>
            {this.toggleContainer('None', noMyNotification, 'noMyNotification')}
            <View style={styles.separatorStyle} />
            {this.toggleContainer('Email', emailMyNotification, 'emailMyNotification')}
            <View style={styles.separatorStyle} />
            {this.toggleContainer('SMS', smsMyNotification, 'smsMyNotification')}
          </View>

          <View style={{ marginTop: deviceHeight * 0.08, alignSelf: 'center' }}>
            <DesignButton name="DONE" callMethod={this.handleUserLogin} isClickable />
          </View>
          <View style={{ height: deviceHeight * 0.1 }} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({
  // authDetail: state.userAuthReducer,
  // errDetail: state.errorHandlerReducer,
});

export default connect(mapStateToProps)(PaymentNotification);
