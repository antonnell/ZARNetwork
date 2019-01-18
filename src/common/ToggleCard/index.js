import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ToggleButton from '../ToggleButton';
import styles from './styles';

export default class ToggleCard extends PureComponent {
  render() {
    const { textVal, textStyle, containerStyle, toggleState, updateToggleClick } = this.props;
    let mainView = styles.mainContainer;
    let textStyleVal = styles.textStyle;
    if (containerStyle && containerStyle !== null) {
      mainView = containerStyle;
    }
    if (textStyle) {
      textStyleVal = textStyle;
    }

    return (
      <View style={mainView}>
        <Text style={textStyleVal}>{textVal}</Text>
        <ToggleButton defaultValue={toggleState} onChangeValue={updateToggleClick} />
      </View>
    );
  }
}
ToggleCard.defaultProps = {
  textVal: '',
  textStyle: null,
  containerStyle: null,
  toggleState: false,
  updateToggleClick: () => {},
};
ToggleCard.propTypes = {
  textVal: PropTypes.string,
  textStyle: PropTypes.objectOf(PropTypes.any),
  containerStyle: PropTypes.objectOf(PropTypes.any),
  toggleState: PropTypes.bool,
  updateToggleClick: PropTypes.func,
};
