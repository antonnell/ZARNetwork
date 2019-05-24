import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import DesignButton from '../../../common/Button';
import { deviceWidth, deviceHeight } from '../../../common/constants';

import KYCStatus from './kycStatus';

class Level3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      screen: 'status',
    };

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {}

  onSubmitBtnClick() {
    // TODO call API for KYC validation?
  }

  goBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  render() {
    switch (this.state.screen) {
      case 'status':
        return (
          <KYCStatus
            goBack={this.goBack}
            onIdentificationBtnClick={this.onIdentificationBtnClick}
            identificationDoc={this.state.identificationDoc}
            onAddressBtnClick={this.onAddressBtnClick}
            addressDoc={this.state.addressDoc}
          />
        );
      default:
    }
  }
}
Level3.defaultProps = {
  navigation: null,
};
Level3.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(Level3);
