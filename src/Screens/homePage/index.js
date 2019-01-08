import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import ProfileInfo from '../../common/profileInfo';
import DetailCard from '../../common/detailCard';
import styles from './styles';
import Wallet from './wallet';

import { getAccountType } from '../../controllers/api/accountType';
import { getWalletDetail } from '../../controllers/api/userWallet';
import { getFirstCharOfString } from '../../utility/index';

import addAccountIcon from '../../images/addAccountIcon.png';
import paySomeoneIcon from '../../images/paySomeoneIcon.png';
import receiveIcon from '../../images/receiveIcon.png';
import TitleHeader from '../../common/TitleHeader';
import Loader from '../../common/Loader';
import ToggleButton from '../../common/ToggleButton';
import AccountCard from '../../common/accountCard';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.renderCreateAccount = this.renderCreateAccount.bind(this);
    this.renderPaySomeone = this.renderPaySomeone.bind(this);
    this.renderReceive = this.renderReceive.bind(this);
    this.handleAccountPay = this.handleAccountPay.bind(this);
  }

  componentDidMount() {
    if (getAccountType) {
      getAccountType();
    }
    if (getWalletDetail) {
      this.setState({
        isLoading: true,
      });
      getWalletDetail()
        .then(() => {
          this.setState({
            isLoading: false,
          });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
          });
          Alert.alert('Error', err);
        });
    }
  }

  /**
   * @method handleAccountPay : To open account payment screen
   */
  handleAccountPay(event, account) {
    event.preventDefault();
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('AccountDetail', { isBackArrow, account });
    }
  }

  /**
   * @method renderLoader : To display loader indicator.
   */
  updateToggleValue() {
    const { accountToggle } = this.state;
    this.setState({ accountToggle: !accountToggle });
  }

  renderAccountCards(toggle) {
    const { userWalletDetail, accountTypeList } = this.props;
    const userWalletLength = userWalletDetail.length;
    const walletList = [];

    if (userWalletDetail && userWalletLength > 0) {
      for (let index = 0; index < userWalletLength; index += 1) {
        // eslint-disable-next-line no-unused-vars
        let walletType = '-';
        if (accountTypeList && accountTypeList.length > 0) {
          const accTypeLen = accountTypeList.length;
          for (let i = 0; i < accTypeLen; i += 1) {
            if (accountTypeList[i].uuid === userWalletDetail[index].type_uuid) {
              walletType = accountTypeList[i].symbol ? accountTypeList[i].symbol : '-';
            }
          }
        }
        // eslint-disable-next-line  no-unused-expressions
        toggle
          ? walletList.push(
              <DetailCard
                key={`${index}_card`}
                account={userWalletDetail[index]}
                walletType={walletType}
                bottomSubTitleText="Current Balance"
                detailCardMainViewStyle={styles.detailCardMainViewStyle}
                detailCardTopViewStyle={styles.detailCardTopViewStyle}
                detailCardTopTitleStyle={styles.detailCardTopTitleStyle}
                detailCardBottomViewStyle={styles.detailCardBottomViewStyle}
                detailCardBottomSubTitleTextStyle={styles.detailCardBottomSubTitleTextStyle}
                detailCardBottomTitleTextStyle={styles.detailCardBottomTitleTextStyle}
                detailCardSubTitleTextStyle={styles.detailCardSubTitleTextStyle}
                callMethod={event => this.handleAccountPay(event, userWalletDetail[index])}
              />
            )
          : walletList.push(
              <AccountCard
                key={`${index}_card`}
                account={userWalletDetail[index]}
                walletType={walletType}
                accountCardMainViewStyle={styles.accountCardMainViewStyle}
                accountCardrightBottomTextStyle={styles.accountCardrightBottomTextStyle}
                accountCardTopTitleStyle={styles.accountCardTopTitleStyle}
                accountCardSubTitleTextStyle={styles.accountCardSubTitleTextStyle}
                callMethod={event => this.handleAccountPay(event, userWalletDetail[index])}
              />
            );
      }
      return walletList;
    }

    return this.renderNoAccountView();
  }

  /**
   * @method renderPaySomeone : To render pay screen.
   */
  renderPaySomeone() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('PaySomeone', { isBackArrow });
    }
  }

  /**
   * @method renderCreateAccount : To render create account screen.
   */
  renderCreateAccount() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('CreateWallet', { isBackArrow });
    }
  }

  /**
   * @method renderReceive : To render receive functionality
   */
  // eslint-disable-next-line class-methods-use-this
  renderReceive() {
    Alert.alert('Information', 'Under development.');
  }

  renderCards() {
    const { isLoading, accountToggle } = this.state;
    if (!isLoading) {
      return (
        <ScrollView
          style={{
            flex: 1,
          }}
          horizontal={!accountToggle}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderAccountCards(!accountToggle)}
          <View style={{ width: deviceWidth * 0.02 }} />
        </ScrollView>
      );
    }
    return this.renderLoader();
  }

  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Loader
          isLoading={isLoading}
          loaderStyle={0.25}
          containerStyle={{
            height: deviceHeight * 0.3,
            width: deviceWidth - 40,
            marginHorizontal: 20,
          }}
        />
      );
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  renderNoAccountView() {
    return (
      <View
        style={{
          height: deviceHeight * 0.3,
          width: deviceWidth - 40,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 16, color: 'red' }}>NO DATA FOUND</Text>
      </View>
    );
  }

  render() {
    const { userDetail } = this.props;
    const { accountToggle } = this.state;
    let userIcon = '--';
    if (userDetail.email) {
      userIcon = getFirstCharOfString(userDetail.email);
    }
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        {/* header */}
        <TitleHeader title="DASHBOARD" />

        <ScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {/* <ProfileInfo
            circularAvatarTextStyle={styles.circularAvatarTextStyle}
            profileInfoMainViewStyle={styles.profileInfoMainViewStyle}
            profileInfoTitleStyle={styles.profileInfoTitleStyle}
            profileInfoSubTitleStyle={styles.profileInfoSubTitleStyle}
            subTitleText={userDetail.email}
            titleText="Jane Smith"
            circularAvatarText={userIcon}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: deviceWidth * 0.8,
            }}
          >
            <View style={styles.profileInfoMainViewStyle}>
              <Text style={styles.circularAvatarTextStyle}>{userIcon}</Text>
            </View>
            <View style={{ marginTop: deviceHeight * 0.05, paddingLeft: 15 }}>
              {/* <Text style={profileInfoTitleStyle}>{titleText}</Text> */}
              <Text style={styles.profileInfoSubTitleStyle}>{userDetail.email}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: deviceHeight * 0.04,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: deviceWidth * 0.78,
            }}
          >
            <Wallet text="Pay" icon={paySomeoneIcon} handleWallet={this.renderPaySomeone} />
            <Wallet text="Request" icon={receiveIcon} handleWallet={this.renderReceive} />
            <Wallet
              text="Add Account"
              handleWallet={this.renderCreateAccount}
              icon={addAccountIcon}
            />
          </View>
          <View
            style={{
              marginTop: deviceHeight * 0.1,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: deviceWidth * 0.85, alignSelf: 'center' }}>
                <Text style={{ fontSize: 16 }}>Accounts</Text>
              </View>
              <ToggleButton
                defaultValue={accountToggle}
                onChangeValue={() => {
                  this.updateToggleValue();
                }}
              />
            </View>
            <View style={styles.renderCardContainer}>{this.renderCards()}</View>
          </View>
          <View style={{ height: deviceHeight * 0.05 }} />
        </ScrollView>
      </View>
    );
  }
}
HomePage.defaultProps = {
  userDetail: null,
  userWalletDetail: [],
  accountTypeList: [],
  navigation: null,
};
HomePage.propTypes = {
  userDetail: PropTypes.objectOf(PropTypes.any),
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
  accountTypeList: PropTypes.arrayOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
  accountTypeList: state.supportedAccTypeReducer.types,
  userWalletDetail: state.userWalletReducer.wallets,
});

export default connect(mapStateToProps)(HomePage);
