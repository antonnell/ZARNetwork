import React, { Component } from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import firebase from 'react-native-firebase';
import styles from './styles';
import launchScreen from '../../images/ZARNetwork_Logo.png';
import { isSessionExpires } from '../../utility/index';

/**
 * SplashScreen: Splash Screen for app.
 */
class SplashScreen extends Component {
  /**
   * Render different screens based on user is already a registered user or not.
   */
  async componentDidMount() {
    const { authDetail, navigation } = this.props;
    if (authDetail && authDetail !== null && authDetail.jwt) {
      const { expires } = authDetail.jwt;
      if (expires && isSessionExpires(expires)) {
        // setTimeout(() => navigation.navigate('LoginWithPin'), 1000);
        setTimeout(() => navigation.navigate('StartScreen'), 1000);
      } else {
        setTimeout(() => navigation.navigate('StartScreen'), 1000);
      }
    } else {
      setTimeout(() => navigation.navigate('StartScreen'), 1000);
    }

    this.checkPermission();
    this.createNotificationListeners();
  }

  // async componentDidMount() {
  //   this.checkPermission();
  //   this.createNotificationListeners();
  // }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase.notifications().onNotification(async notification => {
      const { title, body, data } = notification;

      const { authDetail, navigation } = this.props;

      console.log('We received a new push notification while in the foreground');

      if (authDetail && authDetail !== null && authDetail.jwt) {
        const { expires } = authDetail.jwt;

        if (expires && isSessionExpires(expires)) {
          await AsyncStorage.setItem('pushRequest', JSON.stringify(data));
          setTimeout(() => navigation.navigate('Request'), 1000);
        } else {
          await AsyncStorage.setItem('pushRequest', JSON.stringify(data));
          setTimeout(() => navigation.navigate('LoginWithPin'), 1000);
        }
      } else {
        console.log('No login credentials found, navigate to manual login screen');
        await AsyncStorage.setItem('pushRequest', JSON.stringify(data));
        setTimeout(() => navigation.navigate('Login'), 1000);
      }
    });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body, data } = notificationOpen.notification;

        // not going to do anything here for now
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;

      const { authDetail, navigation } = this.props;

      if (authDetail && authDetail !== null && authDetail.jwt) {
        const { expires } = authDetail.jwt;

        await AsyncStorage.setItem('pushRequest', JSON.stringify(data));
        setTimeout(() => navigation.navigate('LoginWithPin'), 1000);
      } else {
        await AsyncStorage.setItem('pushRequest', JSON.stringify(data));
        setTimeout(() => navigation.navigate('Login'), 1000);
      }
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    // guess we need to send the device ID to the server here.
    console.log(fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  render() {
    return (
      <View style={styles.imageBackground}>
        <Image style={styles.imageStyle} source={launchScreen} resizeMode="contain" />
      </View>
    );
  }
}
SplashScreen.defaultProps = {
  navigation: null,
  authDetail: null,
};
SplashScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  authDetail: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  authDetail: state.userAuthReducer.userDetail,
});
export default connect(mapStateToProps)(SplashScreen);
