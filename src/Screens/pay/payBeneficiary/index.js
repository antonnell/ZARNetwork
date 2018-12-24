import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import TitleCard from '../../../common/titleCard';
import AccountType from '../../../images/AccountType.png';

import ProfileInfo from '../../../common/profileInfo';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class PayBeneficiary extends Component {
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={20} />
          </TouchableOpacity>
          <View style={styles.headerTextStyle}>
            <Text style={styles.textStyle}>PAY BENEFICIARY</Text>
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
          <TitleCard
            icon={AccountType}
            titleCardMainViewStyle={styles.titleCardMainViewStyle}
            titleCardImageStyle={styles.titleCardImageStyle}
            titleCardTextStyle={styles.titleCardTextStyle}
            text="Account Type"
          />
        </ScrollView>
      </View>
    );
  }
}
