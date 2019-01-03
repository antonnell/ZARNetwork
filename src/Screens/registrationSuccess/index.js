import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import successImg from '../../images/success.png';

export default class RegistrationSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.Container}>
        <Image source={successImg} style={{ width: 100, height: 100 }} resizeMode="cover" />
        <Text style={styles.registrationText}>Registration Success!</Text>
      </View>
    );
  }
}

RegistrationSuccess.propTypes = {
  // eslint-disable-next-line react/require-default-props
  navigation: PropTypes.objectOf(PropTypes.any),
};
