import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import styles from './styles';
import FloatLabelTextField from '../../../common/FloatLabelTextField';
import TitleHeader from '../../../common/TitleHeader';
import TitleCard from '../../../common/titleCard';
import AccountType from '../../../images/AccountType.png';
import ProfileInfo from '../../../common/profileInfo';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class PayBeneficiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      reference: '',
    };
    this.updateForm = this.updateForm.bind(this);
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validate(type) {
    if (type === 'account') {
      this.setState({
        accountNumber: '',
      });
    }
    if (type === 'reference') {
      this.setState({
        reference: '',
      });
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { accountNumber, reference } = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader iconName="keyboard-arrow-left" title="PAY BENEFICIARY" />
        {/* header */}
        <ScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <ProfileInfo
            circularAvatarTextStyle={styles.circularAvatarTextStyle}
            profileInfoMainViewStyle={styles.profileInfoMainViewStyle}
            profileInfoTitleStyle={styles.profileInfoTitleStyle}
            profileInfoSubTitleStyle={styles.profileInfoSubTitleStyle}
            subTitleText="ABSA BANK | 1342567896"
            titleText="Jane Smith"
            circularAvatarText="JS"
          />
          <TitleCard
            icon={AccountType}
            titleCardMainViewStyle={styles.titleCardMainViewStyle}
            titleCardImageStyle={styles.titleCardImageStyle}
            titleCardTextStyle={styles.titleCardTextStyle}
            titleMaterialIconStyle={styles.titleMaterialIconStyle}
            text="ETH Wallet"
          />
          <View
            style={{
              alignSelf: 'center',
              width: deviceWidth * 0.8,
            }}
          >
            <FloatLabelTextField
              type="account"
              placeholder="Amount"
              autoCorrect={false}
              value={accountNumber}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validate={type => this.validate(type)}
            />
            <View>
              <Text style={{ color: 'rgb(0, 177, 251)', textAlign: 'right' }}>
                ETH 12.0987 available
              </Text>
            </View>
            <FloatLabelTextField
              type="reference"
              placeholder="Reference"
              autoCorrect={false}
              value={reference}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validate={type => this.validate(type)}
            />
          </View>
          <TitleCard
            icon={AccountType}
            titleCardMainViewStyle={styles.titleCardMainViewStyle}
            titleCardImageStyle={styles.notificationImageStyle}
            titleCardTextStyle={styles.notificationTextStyle}
            titleMaterialIconStyle={styles.notificationMaterialIconStyle}
            text="Payment Notification: none"
          />
          <View
            style={{
              marginTop: deviceHeight * 0.05,
              backgroundColor: 'rgba(127,127,127,0.15)',
              alignSelf: 'center',
              width: deviceWidth * 0.8,
            }}
          />
          <View style={{ height: deviceHeight * 0.1 }} />
        </ScrollView>
      </View>
    );
  }
}
