import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileInfo from '../../common/profileInfo';
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

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderCreateAccount = this.renderCreateAccount.bind(this);
    this.renderPaySomeone = this.renderPaySomeone.bind(this);
  }

  componentDidMount() {
    if (getAccountType) {
      getAccountType();
    }
    if (getWalletDetail) {
      getWalletDetail();
    }
  }

  renderAccountCards() {
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

        walletList.push(
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
          />
        );
      }
    }
    return walletList;
  }

  /**
   * @method renderPaySomeone : To render pay screen.
   */
  renderPaySomeone() {
    // console.log('renderPaySomeone');
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('BeneficiaryDetails');
    }
  }

  /**
   * @method renderCreateAccount : To render create account screen.
   */
  renderCreateAccount() {
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('CreateWallet');
    }
  }

  render() {
    const { userDetail } = this.props;
    console.log('this.props home page : ', this.props);
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
          <ProfileInfo
            circularAvatarTextStyle={styles.circularAvatarTextStyle}
            profileInfoMainViewStyle={styles.profileInfoMainViewStyle}
            profileInfoTitleStyle={styles.profileInfoTitleStyle}
            profileInfoSubTitleStyle={styles.profileInfoSubTitleStyle}
            subTitleText={userDetail.email}
            titleText="Jane Smith"
            circularAvatarText={userIcon}
          />
          <View
            style={{
              marginTop: deviceHeight * 0.04,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: deviceWidth * 0.78,
            }}
          >
            <Wallet text="Pay Someone" icon={paySomeoneIcon} handleWallet={this.renderPaySomeone} />
            <Wallet text="Receive" icon={receiveIcon} />
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
            <View style={{ width: deviceWidth * 0.85, alignSelf: 'center' }}>
              <Text style={{ fontSize: 15 }}>Accounts</Text>
            </View>
            <View
              style={{
                height: deviceHeight * 0.3,
                width: deviceWidth,
                paddingVertical: 10,
              }}
            >
              <ScrollView
                style={{
                  flex: 1,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {this.renderAccountCards()}
              </ScrollView>
            </View>
          </View>
          <View style={{ height: deviceHeight * 0.05 }} />
        </ScrollView>
      </View>
    );
  }
}
/*eslint-disable*/
HomePage.propTypes = {
  userDetail: PropTypes.object,
  userWalletDetail: PropTypes.array,
  accountTypeList: PropTypes.array,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
  accountTypeList: state.supportedAccTypeReducer.types,
  userWalletDetail: state.userWalletReducer.wallets,
});

export default connect(mapStateToProps)(HomePage);
