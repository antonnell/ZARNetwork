import React, { Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import StatusBar from '../../common/StatusBar';
import TitleHeader from '../../common/TitleHeader';

import styles from './styles';
/**
 * TermsConditions :  This component is meant for displaying legal requirements of the application.
 */

export default class TermsConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleGoBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <View style={styles.mainContainerStyle}>
        <StatusBar />

        <TitleHeader
          title="TERMS OF SERVICE"
          isBackArrow
          iconName="keyboard-arrow-left"
          onBtnPress={this.handleGoBack}
        />

        <WebView
          source={{ uri: 'http://fantom.foundation' }}
          onLoad={() => this.hideSpinner()}
          onError={() => this.hideSpinner()}
        />

        {visible && (
          <View style={styles.spinnerStyle}>
            <ActivityIndicator size="large" color="rgb(0,177,251)" />
          </View>
        )}
      </View>
    );
  }
}
TermsConditions.defaultProps = {
  navigation: null,
};
TermsConditions.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};
