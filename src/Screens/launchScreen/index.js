import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import launchScreen from '../../images/logo.png';

/**
 * SplashScreen: Splash Screen for app.
 */
class SplashScreen extends Component {
  /**
   * Render different screens based on user is already a registered user or not.
   */
  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => navigation.navigate('StartScreen'), 4000);
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
};
SplashScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

export default SplashScreen;
