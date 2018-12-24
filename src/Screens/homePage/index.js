import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from './cards';
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
        let walletType = '-';
        if (accountTypeList && accountTypeList.length > 0) {
          const accTypeLen = accountTypeList.length;
          for (let i = 0; i < accTypeLen; i += 1) {
            if (accountTypeList[i].uuid === userWalletDetail[index].type_uuid) {
              walletType = accountTypeList[i].symbol ? accountTypeList[i].symbol : '-';
            }
          }
        }

        walletList.push(<Card account={userWalletDetail[index]} walletType={walletType} />);
      }
    }
    return walletList;
  }

  render() {
    const { userDetail } = this.props;
    const userIcon = userDetail.email ? userDetail.email.charAt(0).toUpperCase() : '--';
    // const { navigation } = this.props;
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
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#030303',
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: deviceHeight * 0.05,
              }}
            >
              <Text
                style={{ textAlign: 'center', position: 'absolute', color: 'white', fontSize: 20 }}
              >
                {userIcon}
              </Text>
            </View>
            <View style={{ marginTop: deviceHeight * 0.01 }}>
              {/* <Text style={{ fontSize: 17, alignSelf: 'center' }}>Jane Smith</Text> */}
              <Text style={{ fontSize: 17 }}>{userDetail.email}</Text>
            </View>
          </View>
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
