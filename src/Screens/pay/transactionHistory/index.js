import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import styles from './styles';
import RecentCard from '../recentCard';
import Loader from '../../../common/Loader';

import { getFirstCharOfString } from '../../../utility/index';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.handleAccountPay = this.handleAccountPay.bind(this);
  }

  /**
   * @method handleAccountPay : To open account payment screen
   */
  handleAccountPay(beneficiary) {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('PayBeneficiary', { isBackArrow, selectedBeneficiary: beneficiary });
    }
  }

  /**
   * @method renderLoader : To display loader indicator.
   */
  renderLoader() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <Loader isLoading={isLoading} loaderStyle={0.25} containerStyle={styles.loaderStyle} />
      );
    }
    return null;
  }

  renderNoTransactionMessage() {
    const { transactions, isLoading } = this.props;
    if (isLoading === true) {
      return null;
    }

    const transactionsLength = transactions.length;
    if (transactionsLength === 0) {
      return (
        <View style={styles.emptyDetilViewStyle}>
          <Text style={styles.emptyDetilTextStyle}>No transaction history.</Text>
        </View>
      );
    }

    return null;
  }

  renderTransactionList() {
    const { transactions } = this.props;

    const transactionsList = [];
    const transactionsLength = transactions.length;
    if (transactionsLength > 0) {
      for (let i = 0; i < transactionsLength; i += 1) {
        const header = getFirstCharOfString(transactions[i].beneficiary_name);
        const toAddress = transactions[i].to ? `To : ${transactions[i].to}` : `To : --}`;
        const value =
          transactions[i].value !== null ? `Amount : ${transactions[i].value}` : `Amount : --`;
        transactionsList.push(
          <RecentCard
            key={Math.random()}
            header={header}
            title={toAddress}
            subtitle={value}
            transaction={transactions[i]}
          />
        );
      }
      return transactionsList;
    }
    return null;
  }

  render() {
    return (
      <View style={styles.detailViewStyle}>
        {this.renderNoTransactionMessage()}
        <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
          {this.renderTransactionList()}
          <View style={styles.bottomViewStyle} />
        </ScrollView>
        {this.renderLoader()}
      </View>
    );
  }
}
TransactionHistory.defaultProps = {
  navigation: null,
  transactions: [],
  isLoading: false,
};

TransactionHistory.propTypes = {
  navigation: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  transactions: PropTypes.arrayOf(PropTypes.any),
};

export default TransactionHistory;
