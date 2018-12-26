import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import Card from './card';
import RecentCard from './recentCard';
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
        <View
          style={{
            marginTop: deviceHeight * 0.05,
            alignSelf: 'center',
            width: deviceWidth * 0.9,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: 'left' }}>Recent</Text>
        </View>
        <View
          style={{
            marginTop: deviceHeight * 0.05,
          }}
        >
          <ScrollView
            style={{
              height: deviceHeight,
              width: deviceWidth,
            }}
            showsVerticalScrollIndicator={false}
          >
            {arr.map((data, index) => (
              <RecentCard header={data.header} title={data.title} subtitle={data.subTitle} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}
