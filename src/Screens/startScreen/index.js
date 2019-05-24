/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Image, Text } from 'react-native';
import StartScreenIcon from '../../images/ZARNetwork_Logo.png';
import TitleHeader from '../../common/TitleHeader';

import styles from './styles';
import DesignButton from '../../common/Button';
import StatusBar from '../../common/StatusBar';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class StartScreen extends React.Component {
  onLoginBtnClick = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  };

  onRegisterBtnClick = () => {
    const { navigation } = this.props;
    navigation.navigate('Register');
  };

  render() {
    return (
      <View
        style={styles.container}
      >
        <StatusBar />
        <TitleHeader
          title="WELCOME"
        />

        <Image source={StartScreenIcon} style={styles.imageStyle} resizeMode="contain" />
        <View style={{ marginTop: deviceHeight * 0.02 }}>
          <Text
            style={{
              textAlign: 'center',
              width: deviceWidth * 0.7,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular'
            }}
          >
            <Text style={{fontFamily: "Montserrat-Bold"}}>Real-time</Text>
            <Text> transactions with near</Text>
            <Text style={{fontFamily: "Montserrat-Bold"}}> zero</Text>
            <Text> transaction costs.</Text>
          </Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.15, bottom: 45, width: deviceWidth * 0.7, }}>
          <View style={{ marginBottom: deviceHeight * 0.03 }}>
            <DesignButton
              name="SIGN IN"
              isClickable
              btnTextColor={styles.loginBtnTextColor}
              callMethod={this.onLoginBtnClick}
            />
          </View>
          <View
            style={{
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
              marginTop: deviceHeight * 0.02
            }}
          >
            Don't have an account?
          </Text>
          <View style={{ marginTop: deviceHeight * 0.04 }}>
            <DesignButton
              btnTextColor={styles.btnTextColor}
              name="REGISTER NOW"
              isClickable
              callMethod={this.onRegisterBtnClick}
              btnMainStyle={styles.registerBtnStyle}
            />
          </View>
        </View>
      </View>
    );
  }
}
/*eslint-disable*/
StartScreen.propTypes = {
  navigation: PropTypes.object,
};
