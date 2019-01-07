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
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: 'rgba(100, 100, 100, 0.3)',
    height: deviceHeight,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Loading extends PureComponent {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { loaderStyle, loaderColor, isLoading, containerStyle } = this.props;
    const activityIndicatorColor = loaderColor || 'rgb(0,177,251)';
    // const marginStyle = loaderStyle ? deviceHeight * loaderStyle - 40 : deviceHeight * 0.5 - 40;
    if (isLoading === false) {
      return null;
    }

    let mainContainerStyle = styles.overlayView;
    if (containerStyle && containerStyle !== null) {
      mainContainerStyle = { ...styles.overlayView, ...containerStyle };
    }
    return (
      <View style={mainContainerStyle}>
        <ActivityIndicator
          animating
          style={[styles.activityIndicator]}
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
  containerStyle: null,
};

Loading.propTypes = {
  // eslint-disable-next-line react/require-default-props
  loaderStyle: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  loaderColor: PropTypes.string,
  isLoading: PropTypes.bool,
  containerStyle: PropTypes.objectOf(PropTypes.any),
};
