import React, { Component } from 'react';
import { View, StatusBar, Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import Card from './card';
import TitleText from '../../common/TitleText';
import PayNewBeneficiary from '../../images/PayNewBeneficiaryBlack.png';
import TitleHeader from '../../common/TitleHeader';
import { getBeneficiaryDetail } from '../../controllers/api/beneficiary';
import { getTransactionDetail } from '../../controllers/api/transactions';
import RecentCard from './recentCard';
import { noWalletAccount } from '../../common/constants';
import { getFirstCharOfString } from '../../utility/index';

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
    this.handleAccountPay = this.handleAccountPay.bind(this);
  }

  componentDidMount() {
    if (getBeneficiaryDetail) {
      this.setState({
        isLoading: true,
      });

      getBeneficiaryDetail();

      getTransactionDetail()
        .then(() => {
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
      Alert.alert('No Wallet Account Found', noWalletAccount);
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

  renderNoBeneficiaryMessage() {
    const { beneficiaries } = this.props;
    const { isLoading } = this.state;
    if (isLoading === true) {
      return null;
    }

    const beneficiariesLength = beneficiaries.length;
    if (beneficiariesLength === 0) {
      return (
        <View style={styles.emptyDetilViewStyle}>
          <Text style={styles.emptyDetilTextStyle}>No beneficiaries found.</Text>
        </View>
      );
    }

    return null;
  }

  renderBeneficiaryList() {
    const { beneficiaries } = this.props;
    const beneficiaryList = [];
    const beneficiariesLength = beneficiaries.length;
    if (beneficiariesLength > 0) {
      for (let i = 0; i < beneficiariesLength; i += 1) {
        const header = getFirstCharOfString(beneficiaries[i].name);
        const bankDetail = beneficiaries[i].bank_uuid ? beneficiaries[i].bank_uuid : '--';
        beneficiaryList.push(
          <RecentCard
            key={Math.random()}
            header={header}
            title={beneficiaries[i].name}
            subtitle={bankDetail}
            beneficiary={beneficiaries[i]}
            onPress={this.handleAccountPay}
          />
        );
      }
      return beneficiaryList;
    }
    return null;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    const { isBackArrowPresent } = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => navigation.goBack()}
          title="Pay"
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
        </View>
        <TitleText
          titleText="All Transactions"
          mainStyle={styles.mainStyle}
          textStyle={styles.recentTextStyle}
        />
        <View style={styles.detailViewStyle}>
          {this.renderNoBeneficiaryMessage()}
          <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
            {this.renderBeneficiaryList()}
            <View style={styles.bottomViewStyle} />
          </ScrollView>
        </View>
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
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
  beneficiaries: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  transactions: state.userTransactionReducer.transactions,
  userWalletDetail: state.userWalletReducer.wallets,
  beneficiaries: state.userBeneficiaryReducer.beneficiaries,
});
export default connect(mapStateToProps)(Pay);
