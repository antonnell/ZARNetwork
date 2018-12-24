import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileInfo from '../../common/profileInfo';
import DetailCard from '../../common/detailCard';
import styles from './styles';
import Wallet from './wallet';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
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
            subTitleText="jane@gmail.com"
            titleText="Jane Smith"
            circularAvatarText="JS"
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
                <DetailCard
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
                <DetailCard
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
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
