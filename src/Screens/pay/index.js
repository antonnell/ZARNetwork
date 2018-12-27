import React, { Component } from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import Card from './card';
import RecentCard from './recentCard';
import TitleText from '../../common/TitleText';
import AllBeneficiary from '../../images/AllBeneficiary.png';
import PayNewBeneficiary from '../../images/PayNewBeneficiary.png';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// eslint-disable-next-line react/prefer-stateless-function
export default class Pay extends Component {
  render() {
    const arr = [
      {
        header: 'JW',
        title: 'Joseph S. Wiggins',
        subTitle: 'CAPITEC | 13425386475',
      },
      {
        header: 'JM',
        title: 'Jacob E. Miller',
        subTitle: 'ABSA BANK | 13425386475',
      },
      {
        header: 'JL',
        title: 'James J. Lomeli',
        subTitle: 'ABSA BANK | 13425386475',
      },
      {
        header: 'JW',
        title: 'Joseph S. Wiggins',
        subTitle: 'CAPITEC | 13425386475',
      },
      {
        header: 'JM',
        title: 'Jacob E. Miller',
        subTitle: 'ABSA BANK | 13425386475',
      },
      {
        header: 'JL',
        title: 'James J. Lomeli',
        subTitle: 'ABSA BANK | 13425386475',
      },
    ];
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <View
          style={{
            width: deviceWidth,
            alignItems: 'center',
            marginTop: deviceHeight * 0.1,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              color="#000"
              size={24}
              style={{ marginLeft: 10 }}
              name="keyboard-arrow-left"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons color="#000" size={24} style={styles.searchStyle} name="search" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardStyle}>
          <Card navigation={navigation} text="Pay New Beneficiary" icon={PayNewBeneficiary} />
          <View style={styles.seperaterStyle} />
          <Card navigation={navigation} text="View all Beneficiary" icon={AllBeneficiary} />
        </View>
        <TitleText
          titleText="Recent"
          mainStyle={styles.mainStyle}
          textStyle={styles.recentTextStyle}
        />
        <View
          style={{
            marginTop: deviceHeight * 0.02,
          }}
        >
          <ScrollView
            style={{
              height: deviceHeight * 0.43,
              width: deviceWidth,
            }}
            showsVerticalScrollIndicator={false}
          >
            {arr.map(data => (
              <RecentCard header={data.header} title={data.title} subtitle={data.subTitle} />
            ))}
            <View style={{ height: deviceHeight * 0.1 }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
