/*eslint-disable */
import React, { Component } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import Card from './card';
import TitleText from '../../common/TitleText';
import AllBeneficiary from '../../images/AllBeneficiary.png';
import PayNewBeneficiary from '../../images/PayNewBeneficiary.png';
import TitleHeader from '../../common/TitleHeader';
import { getBeneficiaryDetail } from '../../controllers/api/beneficiary';
import { getTransactionDetail } from '../../controllers/api/transactions';
import TransactionHistory from './transactionHistory';

class Pay extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let isBackArrowPresent = false;
    if (navigation && navigation.state && navigation.state.params) {
      isBackArrowPresent = navigation.state.params.isBackArrow;
    }
    this.state = {
      isBackArrowPresent,
      isLoading: false,
    };
    this.handleNewBeneficiary = this.handleNewBeneficiary.bind(this);
    this.handleShowAllBeneficiary = this.handleShowAllBeneficiary.bind(this);
  }

  componentDidMount() {
    if (getBeneficiaryDetail) {
      this.setState({
        isLoading: true,
      });

      getBeneficiaryDetail();

      getTransactionDetail()
        .then(res => {
          console.log('getTransactionDetail : ', res);
          this.setState({
            isLoading: false,
          });
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          });
          Alert.alert('Error', error);
        });
    }
  }

  /**
   * @method handleNewBeneficiary :To render pay screen.
   */
  handleNewBeneficiary() {
    const isBackArrow = true;
    const { navigation, userWalletDetail } = this.props;
    if (userWalletDetail && userWalletDetail.length === 0) {
      Alert.alert('Information', 'You must have, atleast one account to pay to beneficiary!');
      return;
    }
    if (navigation && navigation.navigate) {
      navigation.navigate('BeneficiaryDetails', { isBackArrow });
    }
  }

  /**
   * @method handleShowAllBeneficiary : To display list of all beneficiaries for accounts of user.
   */
  handleShowAllBeneficiary() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('ViewBeneficiaryList', { isBackArrow });
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation, transactions } = this.props;
    const { isBackArrowPresent, isLoading } = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => navigation.goBack()}
          title="PAYMENT"
          rightIconName="search"
          isBackArrow={isBackArrowPresent}
          onRightBtnPress={() => {
            // console.log('search');
          }}
        />
        <View style={styles.cardStyle}>
          <Card
            navigation={navigation}
            text="Pay New Beneficiary"
            icon={PayNewBeneficiary}
            onPress={this.handleNewBeneficiary}
          />
          <View style={styles.seperaterStyle} />
          <Card
            navigation={navigation}
            text="View all Beneficiary"
            icon={AllBeneficiary}
            onPress={this.handleShowAllBeneficiary}
          />
        </View>
        <TitleText
          titleText="All Transactions"
          mainStyle={styles.mainStyle}
          textStyle={styles.recentTextStyle}
        />
        <TransactionHistory transactions={transactions} isLoading={isLoading} />
      </View>
    );
  }
}
Pay.defaultProps = {
  navigation: null,
  userWalletDetail: [],
  beneficiaries: [],
};

Pay.propTypes = {
  navigation: PropTypes.shape({}),
  beneficiaries: PropTypes.arrayOf(PropTypes.any),
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  beneficiaries: state.userBeneficiaryReducer.beneficiaries,
  transactions: state.userTransactionReducer.transactions,
  userWalletDetail: state.userWalletReducer.wallets,
});
export default connect(mapStateToProps)(Pay);
