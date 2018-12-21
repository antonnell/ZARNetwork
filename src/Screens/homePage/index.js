import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from './cards';
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
                JS
              </Text>
            </View>
            <View style={{ marginTop: deviceHeight * 0.01 }}>
              <Text style={{ fontSize: 17, alignSelf: 'center' }}>Jane Smith</Text>
              <Text style={{ fontSize: 17 }}>janes@gmail.com</Text>
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
                <Card />
                <Card />
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
