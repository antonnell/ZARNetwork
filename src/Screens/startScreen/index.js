/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import styles from './styles';
import DesignButton from '../../common/Button';
import FirstScreen from './firstScreen';
import SecondScreen from './secondScreen';
import ThirdScreen from './thirdScreen';

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
    const ActiveDot = (
      <View
        style={{
          backgroundColor: 'rgba(0, 177, 251, 1)',
          width: 8,
          height: 8,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
      />
    );
    const inActiveDot = (
      <View
        style={{
          backgroundColor: 'rgba(0, 177, 251, 0.3)',
          width: 8,
          height: 8,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
      />
    );
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <View style={{ height: deviceHeight * 0.75, width: deviceWidth }}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            activeDot={ActiveDot}
            dot={inActiveDot}
          >
            <View>
              <FirstScreen />
            </View>
            <View>
              <SecondScreen />
            </View>
            <View>
              <ThirdScreen />
            </View>
          </Swiper>
        </View>
        <View style={{ position: 'absolute', bottom: 10 }}>
          <View style={{ marginTop: deviceHeight * 0.01 }}>
            <DesignButton
              name="LOG IN"
              isClickable
              btnTextColor={styles.loginBtnTextColor}
              callMethod={this.onLoginBtnClick}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.02 }}>
            <DesignButton
              btnTextColor={styles.btnTextColor}
              name="REGISTER"
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
