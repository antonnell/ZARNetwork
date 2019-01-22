import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TitleHeader from '../../common/TitleHeader';
import { deviceHeight, deviceWidth } from '../../common/constants';

export default class AccountDetail extends Component {
  renderDetail = (heading, desc) => (
    <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
      <Text style={{ flex: 1 }}>{heading}:</Text>
      <Text style={{ flex: 2, paddingLeft: 10 }}>{desc}</Text>
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
          scrollEnabled={deviceHeight > 730}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View
            style={{
              marginTop: deviceHeight * 0.1,
              width: deviceWidth * 0.8,
              // backgroundColor: 'red',
            }}
          >
            {this.renderDetail('Description', account.description)}
            {this.renderDetail('Uuid', account.uuid)}
            {this.renderDetail('User_uuid', account.user_uuid)}
            {this.renderDetail('Type_uuid', account.type_uuid)}
            {this.renderDetail('Number', account.number)}
            {this.renderDetail('Block', account.block)}
            {this.renderDetail('Balance', account.balance)}
            {this.renderDetail('Bank_uuid', bankUuid)}
            {this.renderDetail('Branch_uuid', branchUuid)}
            {this.renderDetail('Modified', modified)}
            {this.renderDetail('Sepa_code', sepaCode)}
            {this.renderDetail('Swift_code', swiftCode)}
            {this.renderDetail('Created', account.created)}
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
