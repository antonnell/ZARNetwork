import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class StatusBarComponent extends Component {
  render() {
    let barstyle = 'dark-content';
    if (Platform.OS === 'android') {
      barstyle = 'light-content';
    }

    return <StatusBar barStyle={barstyle} />;
  }
}
