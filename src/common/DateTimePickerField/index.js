import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import CalendarImg from '../../images/Calendar.png';
import TimeImg from '../../images/Time.png';

export default class DateTimePickerField extends React.PureComponent {
  render() {
    const { callMethod, text, eventType } = this.props;
    let imgSource = CalendarImg;
    if (eventType && eventType === 'time') {
      imgSource = TimeImg;
    }

    return (
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}> {text}</Text>
        <TouchableOpacity style={styles.imgViewStyle} onPress={callMethod}>
          <Image source={imgSource} alt="date" style={styles.imgStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}
DateTimePickerField.defaultProps = {
  text: 'Select date',
  eventType: 'date',
  callMethod: () => {},
};
DateTimePickerField.propTypes = {
  callMethod: PropTypes.func,
  text: PropTypes.string,
  eventType: PropTypes.string,
};
