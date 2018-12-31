/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Permissions from 'react-native-permissions';
import { RNCamera as Camera } from 'react-native-camera';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  infoView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },

  camera: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
});

const PERMISSION_AUTHORIZED = 'authorized';
const CAMERA_PERMISSION = 'camera';

export default class QRCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      // fadeInOpacity: new Animated.Value(0),
      isAuthorized: false,
      isAuthorizationChecked: false,
    };

    this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
    this._setScanning = this._setScanning.bind(this);
  }

  componentWillMount() {
    const { checkAndroid6Permissions, permissionDialogTitle, permissionDialogMessage } = this.props;
    if (Platform.OS === 'ios') {
      Permissions.request(CAMERA_PERMISSION).then(response => {
        this.setState({
          isAuthorized: response === PERMISSION_AUTHORIZED,
          isAuthorizationChecked: true,
        });
      });
    } else if (Platform.OS === 'android' && checkAndroid6Permissions) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: permissionDialogTitle,
        message: permissionDialogMessage,
      }).then(granted => {
        const isAuthorized =
          Platform.Version >= 23
            ? granted === PermissionsAndroid.RESULTS.GRANTED
            : granted === true;

        this.setState({ isAuthorized, isAuthorizationChecked: true });
      });
    } else {
      this.setState({ isAuthorized: true, isAuthorizationChecked: true });
    }
  }

  componentDidMount() {
    const { fadeIn, fadeInOpacity } = this.props;
    if (fadeIn) {
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(fadeInOpacity, {
          toValue: 1,
          easing: Easing.inOut(Easing.quad),
        }),
      ]).start();
    }
  }

  _setScanning(value) {
    this.setState({ scanning: value });
  }

  _handleBarCodeRead(e) {
    const { scanning } = this.state;
    const { onRead, reactivate, reactivateTimeout } = this.props;
    if (!scanning) {
      // Vibration.vibrate();
      this._setScanning(true);
      onRead(e);
      if (reactivate) {
        setTimeout(() => this._setScanning(false), reactivateTimeout);
      }
    }
  }

  _renderCameraMarker() {
    const { showMarker, customMarker } = this.props;

    if (showMarker) {
      if (customMarker) {
        return customMarker;
      }
      return (
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
      );
    }
    return null;
  }

  _renderCamera() {
    const {
      notAuthorizedView,
      pendingAuthorizationView,
      cameraType,
      fadeIn,
      cameraStyle,
    } = this.props;
    const { isAuthorized, isAuthorizationChecked } = this.state;
    if (isAuthorized) {
      if (fadeIn) {
        return (
          <Animated.View
            style={{
              // opacity: this.state.fadeInOpacity,
              backgroundColor: 'transparent',
            }}
          >
            <Camera
              style={[styles.camera, cameraStyle]}
              onBarCodeRead={e => this._handleBarCodeRead(e)}
              type={cameraType}
            >
              {this._renderCameraMarker()}
            </Camera>
          </Animated.View>
        );
      }
      return (
        <Camera
          type={cameraType}
          style={[styles.camera, cameraStyle]}
          onBarCodeRead={e => this._handleBarCodeRead(e)}
        >
          {this._renderCameraMarker()}
        </Camera>
      );
    }
    if (!isAuthorizationChecked) {
      return pendingAuthorizationView;
    }
    return notAuthorizedView;
  }

  reactivate() {
    this._setScanning(false);
  }

  render() {
    const { containerStyle } = this.props;
    return <View style={[styles.mainContainer, containerStyle]}>{this._renderCamera()}</View>;
  }
}

QRCodeScanner.propTypes = {
  onRead: PropTypes.func,
  reactivate: PropTypes.bool,
  reactivateTimeout: PropTypes.number,
  // fadeIn: PropTypes.bool,
  showMarker: PropTypes.bool,
  cameraType: PropTypes.oneOf(['front', 'back']),
  // customMarker: PropTypes.element,
  // containerStyle: PropTypes.any,
  // cameraStyle: PropTypes.any,
  topContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]), // eslint-disable-line
  bottomContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]), // eslint-disable-line
  notAuthorizedView: PropTypes.element,
  permissionDialogTitle: PropTypes.string,
  permissionDialogMessage: PropTypes.string,
  checkAndroid6Permissions: PropTypes.bool,
  pendingAuthorizationView: PropTypes.node,
};

QRCodeScanner.defaultProps = {
  onRead: () => console.log('QR code scanned!'),
  reactivate: false,
  reactivateTimeout: 0,
  // fadeIn: true,
  showMarker: false,
  cameraType: 'back',
  notAuthorizedView: (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
        }}
      >
        Camera not authorized
      </Text>
    </View>
  ),
  pendingAuthorizationView: (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
        }}
      >
        ...
      </Text>
    </View>
  ),
  permissionDialogTitle: 'Info',
  permissionDialogMessage: 'Need camera permission',
  checkAndroid6Permissions: false,
};
