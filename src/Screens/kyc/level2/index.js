import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import DesignButton from '../../../common/Button';
import { deviceWidth, deviceHeight } from '../../../common/constants';

import KYCStatus from './kycStatus';
import AddInstructions from '../common/addInstructions';
import TakePhoto from '../common/takePhoto';
import UploadPhoto from '../common/uploadPhoto';
import PreviewPhoto from '../common/previewPhoto';

class Level2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      screen: 'status',
      bankDoc: null,
      docType: null,
    };

    this.onBankBtnClick = this.onBankBtnClick.bind(this);
    this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
    this.onTakePhotoBtnClick = this.onTakePhotoBtnClick.bind(this);
    this.onUploadPhotoBtnClick = this.onUploadPhotoBtnClick.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onChooseAnotherPhotoBtnClick = this.onChooseAnotherPhotoBtnClick.bind(this);
    this.onSubmitPhotoBtnClick = this.onSubmitPhotoBtnClick.bind(this);
  }

  componentDidMount() {}

  onSubmitBtnClick() {
    // TODO call API for KYC validation?
  }

  onBankBtnClick() {
    this.setState({ screen: 'addInstructions', bankDoc: { type }, kycDoc: 'Bank' });
  }

  onTakePhotoBtnClick() {
    this.setState({ screen: 'takePhoto' });
  }

  onUploadPhotoBtnClick() {
    this.setState({ screen: 'uploadPhoto' });
  }

  onSubmitPhotoBtnClick(file) {
    let doc = {};
    if (!file.data) {
      file.data = file.base64;
    }

    doc = this.state.bankDoc;
    doc.file = file;
    this.setState({ bankDoc: doc });

    this.setState({ screen: 'previewPhoto' });
  }

  onUseThisPhotoBtnClick() {}

  onChooseAnotherPhotoBtnClick() {
    this.goBack();
  }

  goBack() {
    switch (this.state.screen) {
      case 'status':
        const { navigation } = this.props;
        if (navigation) {
          navigation.goBack();
        }
        break;
      case 'addInstructions':
        this.setState({ screen: 'status' });
        break;
      case 'takePhoto':
        this.setState({ screen: 'addInstructions' });
        break;
      case 'uploadPhoto':
        this.setState({ screen: 'addInstructions' });
        break;
      case 'previewPhoto':
        this.setState({ screen: 'addInstructions' });
        break;
      default:
    }
  }

  render() {
    switch (this.state.screen) {
      case 'status':
        return (
          <KYCStatus
            goBack={this.goBack}
            onBankBtnClick={this.onBankBtnClick}
            bankDoc={this.state.bankDoc}
          />
        );
      case 'addInstructions':
        return (
          <AddInstructions
            goBack={this.goBack}
            docType={this.state.docType}
            onTakePhotoBtnClick={this.onTakePhotoBtnClick}
            onUploadPhotoBtnClick={this.onUploadPhotoBtnClick}
          />
        );
      case 'takePhoto':
        return (
          <TakePhoto
            goBack={this.goBack}
            docType={this.state.docType}
            onSubmitPhotoBtnClick={this.onSubmitPhotoBtnClick}
          />
        );
      case 'uploadPhoto':
        return (
          <UploadPhoto
            goBack={this.goBack}
            docType={this.state.docType}
            onSubmitPhotoBtnClick={this.onSubmitPhotoBtnClick}
          />
        );
      case 'previewPhoto':
        return (
          <PreviewPhoto
            goBack={this.goBack}
            kycDoc={this.state.kycDoc}
            onUseThisPhotoBtnClick={this.onUseThisPhotoBtnClick}
            onChooseAnotherPhotoBtnClick={this.onChooseAnotherPhotoBtnClick}
            addressDoc={this.state.addressDoc}
            identificationDoc={this.state.identificationDoc}
          />
        );
      default:
    }
  }
}
Level2.defaultProps = {
  navigation: null,
};
Level2.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(Level2);
