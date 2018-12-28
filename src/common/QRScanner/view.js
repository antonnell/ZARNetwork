import React, { Component } from 'react';

import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import Web3 from 'web3';
// import { DEVICE_HEIGHT } from '../../../common/constants';
// import arrowLeftButton from '../../../images/arrowLeft_White.png';
// import Header from '../../../general/header/index';
import QRCodeScanner from './index';

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  mainContainerStyle: {
    flex: 1,
  },
});

export default class ScanScreen extends Component {
  // 0x3E22efd6FA7Af208FAF1ECF2c356D7611bB06F30
  onSuccess(e) {
    const { navigation } = this.props;
    const successFunc = navigation.getParam('onScanSuccess', null);
    const { data } = e;
    if (data) {
      const dataStr = data.trim();
      const isValid = Web3.utils.isAddress(dataStr);
      if (!isValid) {
        Alert.alert('Error', 'Please scan a valid QR code.', [
          {
            text: 'Ok',
            onPress: () => {
              this.scanner._setScanning(false); // eslint-disable-line
            },
            style: 'cancel',
          },
        ]);
        return;
      }
      if (successFunc) {
        successFunc(data);
        navigation.goBack();
      }
    }
  }

  onLeftIconPress() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        {/* <Header
          text="QR Scan"
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          leftButtonStyle={{ marginLeft: -10 }}
          onLeftIconPress={() => this.onLeftIconPress()}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: deviceHeight < 810 ? 84 : (106 / 812) * deviceHeight,
          }}
        /> */}
        <QRCodeScanner
          ref={scanner => {
            this.scanner = scanner;
          }}
          onRead={e => this.onSuccess(e)}
          {...this.props}
        />
      </View>
    );
  }
}
