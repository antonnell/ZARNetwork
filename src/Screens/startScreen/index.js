/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Image, Text } from 'react-native';
// import Swiper from 'react-native-swiper';
import StartScreenIcon from '../../images/startScreenIcon.png';

import styles from './styles';
import DesignButton from '../../common/Button';
import StatusBar from '../../common/StatusBar';
// import FirstScreen from './firstScreen';
// import SecondScreen from './secondScreen';
// import ThirdScreen from './thirdScreen';

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
          backgroundColor: 'rgba(0, 177, 255, 1)',
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
          backgroundColor: 'rgba(0, 177, 255, 0.3)',
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <StatusBar />
        <Image source={StartScreenIcon} style={styles.imageStyle} resizeMode="contain" />
        <View style={{ marginTop: deviceHeight * 0.12 }}>
          <Text
            style={{
              textAlign: 'center',
              width: deviceWidth * 0.68,
              fontSize: 24,
              fontWeight: '600'
            }}
          >
            Real-time transactions with near zero transaction costs
          </Text>
        </View>
        <View style={{ marginTop: deviceHeight * 0.20, bottom: 25 }}>
          <View
            style={{
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
            }}
          />
          <View style={{ marginTop: deviceHeight * 0.04 }}>
            <DesignButton
              btnTextColor={styles.btnTextColor}
              name="Register"
              isClickable
              callMethod={this.onRegisterBtnClick}
              btnMainStyle={styles.registerBtnStyle}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.03 }}>
            <DesignButton
              name="Log in"
              isClickable
              btnTextColor={styles.loginBtnTextColor}
              callMethod={this.onLoginBtnClick}
            />
          </View>
        </View>
      </View>

      // Swiper removed for the time being as per client requirements
      // <View style={styles.Container}>
      //   <StatusBar backgroundColor="black" />
      //   <View style={{ height: deviceHeight * 0.75, width: deviceWidth }}>
      //     <Swiper
      //       style={styles.wrapper}
      //       showsButtons={false}
      //       activeDot={ActiveDot}
      //       dot={inActiveDot}
      //     >
      //       <View>
      //         <FirstScreen />
      //       </View>
      //       <View>
      //         <SecondScreen />
      //       </View>
      //       <View>
      //         <ThirdScreen />
      //       </View>
      //     </Swiper>
      //   </View>
      //   <View style={{ position: 'absolute', bottom: 10 }}>
      //     <View style={{ marginTop: deviceHeight * 0.01 }}>
      //       <DesignButton
      //         name="LOG IN"
      //         isClickable
      //         btnTextColor={styles.loginBtnTextColor}
      //         callMethod={this.onLoginBtnClick}
      //       />
      //     </View>
      //     <View style={{ marginTop: deviceHeight * 0.02 }}>
      //       <DesignButton
      //         btnTextColor={styles.btnTextColor}
      //         name="REGISTER"
      //         isClickable
      //         callMethod={this.onRegisterBtnClick}
      //         btnMainStyle={styles.registerBtnStyle}
      //       />
      //     </View>
      //   </View>
      // </View>
    );
  }
}
/*eslint-disable*/
StartScreen.propTypes = {
  navigation: PropTypes.object,
};
