import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export default class TitleText extends React.PureComponent {
  render() {
    const { titleText, mainStyle, textStyle } = this.props;

    return (
      <View style={[mainStyle]}>
        <Text style={[textStyle]}>{titleText}</Text>
      </View>
    );
  }
}
TitleText.defaultProps = {
  textStyle: {},
  titleText: 'Recent',
  mainStyle: {},
};
/*eslint-disable*/
TitleText.propTypes = {
  textStyle: PropTypes.object,
  titleText: PropTypes.string,
  mainStyle: PropTypes.object,
};
