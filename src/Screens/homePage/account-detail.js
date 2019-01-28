import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TitleHeader from '../../common/TitleHeader';
import { deviceHeight, deviceWidth } from '../../common/constants';

export default class AccountDetail extends Component {
  renderDetail = (heading, desc, itemStyle) => (
    <View style={[itemStyle, { flexDirection: 'row', padding: 5 }]}>
      <Text style={{ flex: 1, fontFamily: 'Roboto-Medium' }}>{heading}:</Text>
      <Text style={{ flex: 2, paddingLeft: 10, fontFamily: 'Roboto-Regular' }}>{desc}</Text>
    </View>
  );

  render() {
    const { navigation } = this.props;
    const { account, isBackArrow } = navigation.state.params;
    // const account = navigation.state.params.account;
    // const isBackArrow = navigation.state.params.isBackArrow;
    const bankUuid = account.bank_uuid !== null ? account.bank_uuid : '-';
    const branchUuid = account.branch_uuid !== null ? account.branch_uuid : '-';
    const sepaCode = account.sepa_code !== null ? account.sepa_code : '-';
    const swiftCode = account.swift_code !== null ? account.swift_code : '-';
    const modified = account.modified !== null ? account.modified : '-';
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          title="ACCOUNT DETAIL"
          isBackArrow={isBackArrow}
          iconName="keyboard-arrow-left"
          onBtnPress={() => navigation.goBack()}
        />
        <ScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View
            style={{
              marginTop: 30,
              width: deviceWidth * 0.8,
            }}
          >
            {this.renderDetail(
              'Description',
              account.description,
              styles.accountCardListItemOneStyle
            )}
            {this.renderDetail('Uuid', account.uuid, styles.accountCardListItemTwoStyle)}
            {this.renderDetail('User_uuid', account.user_uuid, styles.accountCardListItemOneStyle)}
            {this.renderDetail('Type_uuid', account.type_uuid, styles.accountCardListItemTwoStyle)}
            {this.renderDetail('Number', account.number, styles.accountCardListItemOneStyle)}
            {this.renderDetail('Block', account.block, styles.accountCardListItemTwoStyle)}
            {this.renderDetail('Balance', account.balance, styles.accountCardListItemOneStyle)}
            {this.renderDetail('Bank_uuid', bankUuid, styles.accountCardListItemTwoStyle)}
            {this.renderDetail('Branch_uuid', branchUuid, styles.accountCardListItemOneStyle)}
            {this.renderDetail('Modified', modified, styles.accountCardListItemTwoStyle)}
            {this.renderDetail('Sepa_code', sepaCode, styles.accountCardListItemOneStyle)}
            {this.renderDetail('Swift_code', swiftCode, styles.accountCardListItemTwoStyle)}
            {this.renderDetail('Created', account.created, styles.accountCardListItemOneStyle)}
          </View>
          <View style={{ height: deviceHeight * 0.05 }} />
        </ScrollView>
      </View>
    );
  }
}
/*eslint-disable*/
AccountDetail.propTypes = {
  navigation: PropTypes.object,
};
