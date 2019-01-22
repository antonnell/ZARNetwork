import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import launchScreen from '../../images/logo.png';
import { isSessionExpires } from '../../utility/index';
/**
 * SplashScreen: Splash Screen for app.
 */
class SplashScreen extends Component {
  /**
   * Render different screens based on user is already a registered user or not.
   */
  componentDidMount() {
    const { authDetail, navigation } = this.props;
    if (authDetail && authDetail !== null) {
      const { expires } = authDetail.jwt;
      if (expires && isSessionExpires(expires)) {
        setTimeout(() => navigation.navigate('Home'), 4000);
      } else {
        setTimeout(() => navigation.navigate('StartScreen'), 4000);
      }
    } else {
      setTimeout(() => navigation.navigate('StartScreen'), 4000);
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
