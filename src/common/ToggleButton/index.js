/* eslint-disable */
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Animated } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from './styles';

// const activeGradientColor = ['#20e0a5', '#06a390'];
// const inActiveGradientColor = ['#F4F5F6', '#EDEEEF'];

class ToggleButton extends Component {
  static defaultProps = {
    defaultValue: false,
    onChangeValue: () => null,
    activeText: '',
    inactiveText: '',
    fontSize: 16,
    activeTextColor: 'rgba(255, 255, 255, 1)',
    inactiveTextColor: 'rgba(255, 255, 255, 1)',
    activeBackgroundColor: 'rgba(50, 163, 50, 1)',
    inactiveBackgroundColor: 'rgba(137, 137, 137, 1)',
    activeButtonBackgroundColor: 'rgba(255, 255, 255, 1)',
    inactiveButtonBackgroundColor: 'rgba(255, 255, 255, 1)',
    switchWidth: 70,
    switchHeight: 30,
    switchBorderRadius: 15,
    switchBorderColor: 'rgba(0, 0, 0, 1)',
    switchBorderWidth: 0,
    buttonWidth: 25,
    buttonHeight: 25,
    buttonBorderRadius: 15,
    buttonBorderColor: 'rgba(0, 0, 0, 1)',
    buttonBorderWidth: 0,
    animationTime: 150,
    padding: true,
  };

  constructor(props, context) {
    super(props, context);
    this.padding = props.padding ? 1.5 : 0;
    this.transformValue = props.switchWidth - props.buttonWidth + 1.5;
    this.state = {
      value: false,
      transformValue: new Animated.Value(props.value ? this.transformValue : -1.5),
      backgroundColor: new Animated.Value(props.value ? 90 : -90),
      buttonBackgroundColor: new Animated.Value(props.value ? 90 : -90),
    };
    if (this.state.value !== this.props.defaultValue) {
      setTimeout(() => {
        if (this.state.value !== this.props.defaultValue) {
          this.toggleAnimation();
        }
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.defaultValue) {
      this.toggleAnimation();
    }
  }

  toggleAnimation() {
    this.setState({ value: !this.state.value }, () => {
      const { value } = this.state;
      Animated.parallel([
        Animated.spring(this.state.transformValue, {
          toValue: value ? this.transformValue : this.padding,
          duration: 1,
        }),
        Animated.timing(this.state.backgroundColor, {
          toValue: value ? 75 : -75,
          duration: 1,
        }),
        Animated.timing(this.state.buttonBackgroundColor, {
          toValue: value ? 100 : -100,
          duration: 1,
        }),
      ]).start();
    });
  }

  startGroupAnimations = () => {
    const { animationTime, onChangeValue } = this.props;
    this.setState({ value: !this.state.value }, () => {
      const { value } = this.state;
      Animated.parallel([
        Animated.spring(this.state.transformValue, {
          toValue: value ? this.transformValue : this.padding,
          duration: animationTime,
        }),
        Animated.timing(this.state.backgroundColor, {
          toValue: value ? 75 : -75,
          duration: animationTime,
        }),
        Animated.timing(this.state.buttonBackgroundColor, {
          toValue: value ? 100 : -100,
          duration: animationTime,
        }),
      ]).start();
      setTimeout(() => {
        onChangeValue(value);
      }, animationTime);
    });
  };

  render() {
    const { transformValue, backgroundColor, buttonBackgroundColor, value } = this.state;

    const {
      activeText,
      inactiveText,
      fontSize,
      activeTextColor,
      inactiveTextColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      activeButtonBackgroundColor,
      inactiveButtonBackgroundColor,
      switchWidth,
      switchHeight,
      switchBorderRadius,
      switchBorderColor,
      switchBorderWidth,
      buttonWidth,
      buttonHeight,
      buttonBorderRadius,
      buttonBorderColor,
      buttonBorderWidth,
    } = this.props;

    const backgroundColorValue = backgroundColor.interpolate({
      inputRange: [-0, 0],
      outputRange: [inactiveBackgroundColor, activeBackgroundColor],
    });

    const buttonBackgroundColorValue = buttonBackgroundColor.interpolate({
      inputRange: [-90, 90],
      outputRange: [inactiveButtonBackgroundColor, activeButtonBackgroundColor],
    });

    const containerHeight = switchHeight > buttonHeight ? switchHeight : buttonHeight;
    const containerWidth = switchWidth > buttonWidth ? switchWidth : buttonWidth;

    return (
      <TouchableWithoutFeedback onPress={this.startGroupAnimations}>
        <View
          style={[
            styles.container,
            {
              height: containerHeight,
              width: containerWidth,
            },
          ]}
        >
          <Animated.View
            style={[
              {
                backgroundColor: backgroundColorValue,
                height: switchHeight,
                width: switchWidth,
                borderRadius: switchBorderRadius,
                borderWidth: switchBorderWidth,
                borderColor: switchBorderColor,
                zIndex: 1,
                position: 'absolute',
                top: (containerHeight - switchHeight) / 2.1,
                left: (containerWidth - switchWidth) / 55,
              },
            ]}
          >
            <View
              // start={{ x: 1.0, y: 0.0 }}
              // end={{ x: 1.0, y: 1.0 }}
              // colors={value ? activeGradientColor : inActiveGradientColor}
              style={[
                styles.animatedContainer,
                value ? styles.activeShadow : styles.inactiveShadow,
              ]}
            >
              <View style={styles.textContainer}>
                <Text
                  style={{
                    color: activeTextColor,
                    fontSize,
                  }}
                >
                  {value ? activeText : ''}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={{
                    color: inactiveTextColor,
                    fontSize,
                  }}
                >
                  {value ? '' : inactiveText}
                </Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              {
                backgroundColor: buttonBackgroundColorValue,
                borderRadius: buttonBorderRadius,
                width: buttonWidth,
                height: buttonHeight,
                zIndex: 3,
                position: 'absolute',
                left: transformValue,
                justifyContent: 'center',
              },
              value ? styles.activeButtonShadow : styles.inactiveButtonShadow,
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class QMToggleButton extends Component {
  render() {
    return (
      <ToggleButton
        defaultValue={this.props.defaultValue}
        switchWidth={32}
        switchHeight={14}
        switchBorderRadius={20}
        switchBorderWidth={0}
        buttonWidth={18}
        buttonHeight={18}
        buttonBorderRadius={9}
        buttonBorderColor="transparent"
        buttonBorderWidth={0}
        animationTime={150}
        switchBorderColor="transparent  "
        inactiveBackgroundColor="rgba(123,123,123,0.7)"
        activeBackgroundColor="rgba(0,177,255,0.6)"
        activeButtonBackgroundColor="rgb(0,177,255)"
        inactiveButtonBackgroundColor="rgb(123,123,123)"
        onChangeValue={this.props.onChangeValue}
      />
    );
  }
}

ToggleButton.propTypes = {
  defaultValue: PropTypes.bool,
  onChangeValue: PropTypes.func,
  activeText: PropTypes.string,
  inactiveText: PropTypes.string,
  fontSize: PropTypes.number,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  activeBackgroundColor: PropTypes.string,
  inactiveBackgroundColor: PropTypes.string,
  activeButtonBackgroundColor: PropTypes.string,
  inactiveButtonBackgroundColor: PropTypes.string,
  switchWidth: PropTypes.number,
  switchHeight: PropTypes.number,
  switchBorderRadius: PropTypes.number,
  switchBorderColor: PropTypes.string,
  switchBorderWidth: PropTypes.number,
  buttonWidth: PropTypes.number,
  buttonHeight: PropTypes.number,
  buttonBorderRadius: PropTypes.number,
  buttonBorderColor: PropTypes.string,
  buttonBorderWidth: PropTypes.number,
  animationTime: PropTypes.number,
  padding: PropTypes.bool,
};
