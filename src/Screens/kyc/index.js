import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../common/TitleHeader';
import Level1 from './level1';
import Level2 from './level2';
import Level3 from './level3';

class KYCStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      kycLevel: 1,
    };
  }

  componentDidMount() {}

  render() {
    let screen = null;
    switch (this.state.kycLevel) {
      case 1:
        screen = <Level1 navigation={this.props.navigation} />;
        break;
      case 2:
        screen = <Level2 navigation={this.props.navigation} />;
        break;
      case 3:
        screen = <Level3 navigation={this.props.navigation} />;
        break;
      default:
        screen = <Level1 navigation={this.props.navigation} />;
    }

    return screen;
  }
}
KYCStatus.defaultProps = {
  navigation: null,
};
KYCStatus.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(KYCStatus);
