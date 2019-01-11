import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { deviceHeight, deviceWidth } from '../constants';

class PasswordConstraints extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPasswordContraintsContainer() {
    return (
      <View style={styles.constraintContainer}>
        <View style={styles.passwordConstraints}>
          {this.renderConstraintText('8+ characters')}
          <View style={styles.spaceViewStyle} />
          {this.renderConstraintText('1+ Capital letter')}
        </View>

        <View style={[styles.passwordConstraints, { marginTop: deviceHeight * 0.03 }]}>
          {this.renderConstraintText('1+ Lower case letter')}
          <View style={styles.spaceViewStyle} />
          {this.renderConstraintText('1+ Number')}
        </View>
      </View>
    );
  }

  renderConstraintText(textVal) {
    const {
      eightPlusCharacter,
      moreThanOneCapital,
      moreThanOneLower,
      moreThanOneNumber,
    } = this.props;
    let iconName = 'close';

    let iconColor = 'rgb(245,0,0)';

    let textColor = 'rgba(3,3,3,0.5)';
    if (textVal === '8+ characters' && eightPlusCharacter) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    } else if (textVal === '1+ Capital letter' && moreThanOneCapital) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    } else if (textVal === '1+ Lower case letter' && moreThanOneLower) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    } else if (textVal === '1+ Number' && moreThanOneNumber) {
      iconName = 'check';
      iconColor = 'rgb(84,154,236)';
      textColor = 'rgba(3,3,3,1)';
    }
    return (
      <View style={styles.constraintViewStyle}>
        <MaterialIcons name={iconName} color={iconColor} size={deviceWidth < 375 ? 14 : 18} />
        <Text style={[styles.constraintsTextStyle, { color: textColor }]}>{textVal}</Text>
      </View>
    );
  }

  render() {
    return this.renderPasswordContraintsContainer();
  }
}

PasswordConstraints.defaultProps = {
  eightPlusCharacter: false,
  moreThanOneCapital: false,
  moreThanOneLower: false,
  moreThanOneNumber: false,
};

PasswordConstraints.propTypes = {
  eightPlusCharacter: PropTypes.bool,
  moreThanOneCapital: PropTypes.bool,
  moreThanOneLower: PropTypes.bool,
  moreThanOneNumber: PropTypes.bool,
};

export default PasswordConstraints;
