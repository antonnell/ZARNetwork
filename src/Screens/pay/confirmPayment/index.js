import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import DetailCard from '../../../common/detailCard';
import AccountType from '../../../images/AccountType.png';
import ProfileInfo from '../../../common/profileInfo';
import DesignButton from '../../../common/Button';
import Card from './card';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class ConfirmPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    const isIcon = true;
    const isSubTitle = true;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        {/* header */}
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={20} />
          </TouchableOpacity>
          <View style={styles.headerTextStyle}>
            <Text style={styles.textStyle}>CONFIRM PAYMENT</Text>
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
            subTitleText="ABSA BANK | 1342567896"
            titleText="Jane Smith"
            circularAvatarText="JS"
          />
          <DetailCard
            // account={userWalletDetail[index]} walletType={walletType}
            topTitleText="Amount"
            bottomTitleText="ETH 1.0897"
            topSubTitleText=""
            bottomSubTitleText=""
            isIcon={isIcon}
            icon={AccountType}
            isSubTitle={isSubTitle}
            imageStyle={styles.imageStyle}
            detailCardMainViewStyle={styles.detailCardMainViewStyle}
            detailCardTopViewStyle={styles.detailCardTopViewStyle}
            detailCardTopTitleStyle={styles.detailCardTopTitleStyle}
            detailCardBottomViewStyle={styles.detailCardBottomViewStyle}
            detailCardBottomSubTitleTextStyle={styles.detailCardBottomSubTitleTextStyle}
            detailCardBottomTitleTextStyle={styles.detailCardBottomTitleTextStyle}
            detailCardSubTitleTextStyle={styles.detailCardSubTitleTextStyle}
          />
          <View style={styles.cardStyle}>
            <Card navigation={navigation} title="Account" subtitle="Ethereum Wallet" />
            <View style={styles.seperaterStyle} />
            <Card navigation={navigation} title="Reference" subtitle="Loan" />
            <View style={styles.seperaterStyle} />
            <Card navigation={navigation} title="Notification Type" subtitle="None" />
          </View>
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <DesignButton name="PAY" isClickable />
          </View>
        </ScrollView>
      </View>
    );
  }
}
