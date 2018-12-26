import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ProfileInfo from '../../common/profileInfo';
import DetailCard from '../../common/detailCard';
import styles from './styles';
import Wallet from './wallet';

import { getAccountType } from '../../controllers/api/accountType';
import { getWalletDetail } from '../../controllers/api/userWallet';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            // account={userWalletDetail[index]} walletType={walletType}
            topTitleText="Micheal Smith"
            bottomTitleText="ETH 12.08082"
            topSubTitleText="2134 5678 9656 4756"
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

  render() {
    const { userDetail } = this.props;
    const userIcon = userDetail.email ? userDetail.email.charAt(0).toUpperCase() : '--';
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        {/* header */}
        <View style={styles.headerStyle}>
          <View style={styles.headerTextStyle}>
            <Text style={styles.textStyle}>DASHBOARD</Text>
          </View>
        </View>

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
              marginTop: deviceHeight * 0.03,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: deviceWidth * 0.7,
              height: deviceHeight * 0.1,
            }}
          >
            <Wallet text="Pay Someone" />
            <Wallet text="Receive" />
            <Wallet text="Add Account" />
          </View>
          <View
            style={{
              marginTop: deviceHeight * 0.1,
            }}
          >
            <View style={{ marginLeft: deviceWidth * 0.05 }}>
              <Text style={{ fontSize: 15 }}>Accounts</Text>
            </View>
            <View
              style={{
                height: deviceHeight * 0.3,
                width: deviceWidth,
                padding: 10,
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
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
  accountTypeList: state.supportedAccTypeReducer.types,
  userWalletDetail: state.userWalletReducer.wallets,
});

export default connect(mapStateToProps)(HomePage);
