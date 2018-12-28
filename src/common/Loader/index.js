// Libraries
import React, { PureComponent } from 'react';
import { View, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// Calculate  max height and width of device
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// Styling
const styles = StyleSheet.create({
  overlayView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 1.0,
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
    width: deviceWidth,
    height: deviceHeight,
    zIndex: 12200,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});

export default class Loading extends PureComponent {
  render() {
    const { loaderStyle, loaderColor, isLoading } = this.props;
    const activityIndicatorColor = loaderColor || 'rgba(0,0,0,1)';
    const marginStyle = loaderStyle ? deviceHeight * loaderStyle - 40 : deviceHeight * 0.5 - 40;
    if (isLoading === false) {
      return null;
    }
    return (
      <View style={styles.overlayView}>
        <ActivityIndicator
          animating
          style={[styles.activityIndicator, { marginTop: marginStyle }]}
          size="large"
          color={activityIndicatorColor}
        />
      </View>
    );
  }
}

// Specifies the default values for props:
Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  // eslint-disable-next-line react/require-default-props
  loaderStyle: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  loaderColor: PropTypes.string,
  isLoading: PropTypes.bool,
};
