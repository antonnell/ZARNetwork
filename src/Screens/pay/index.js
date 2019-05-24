import React, { Component } from 'react';
import { View, Alert, ScrollView, Text } from 'react-native';
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
import StatusBar from '../../common/StatusBar';
import { getFirstCharOfString } from '../../utility/index';
import { deviceWidth, deviceHeight } from '../../common/constants';
import DesignButton from '../../common/Button';

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

    this.onPayNewBeneficiaryBtnClick = this.onPayNewBeneficiaryBtnClick.bind(this);
    this.onViewAllBeneficiariesBtnClick = this.onViewAllBeneficiariesBtnClick.bind(this);
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

  onPayNewBeneficiaryBtnClick() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('NewBeneficiary', { isBackArrow });
    }
  }

  onViewAllBeneficiariesBtnClick() {}

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    const { isBackArrowPresent } = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => navigation.goBack()}
          title="Pay"
          isBackArrow={isBackArrowPresent}
        />

        <View style={{ marginTop: deviceHeight * 0.1 }}>
          <Text
            style={{
              textAlign: 'center',
              width: deviceWidth * 0.75,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            }}
          >
            <Text>Who would you like to pay?</Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              width: deviceWidth * 0.75,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            }}
          >
            <Text>Easily create a</Text>
            <Text style={{ fontFamily: 'Montserrat-Bold' }}> New Beneficiary</Text>
            <Text> or view</Text>
            <Text style={{ fontFamily: 'Montserrat-Bold' }}> All Beneficiaries.</Text>
          </Text>
        </View>

        <View style={styles.cardStyle}>
          <DesignButton
            btnTextColor={styles.btnTextColor}
            name="Pay New Beneficiary"
            isClickable
            callMethod={() => {
              this.onPayNewBeneficiaryBtnClick();
            }}
            btnMainStyle={styles.btnStyle}
          />
          <DesignButton
            btnTextColor={styles.btnTextColor}
            name="View All Beneficiaries"
            isClickable
            callMethod={() => {
              this.onViewAllBeneficiariesBtnClick();
            }}
            btnMainStyle={styles.btnStyle}
          />
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
