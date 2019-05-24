import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import DesignButton from '../../../common/Button';
import { deviceWidth, deviceHeight } from '../../../common/constants';

import KYCStatus from './kycStatus';
import AddIdentification from './addIdentification';
import AddAddress from './addAddress';
import AddInstructions from '../common/addInstructions';
import TakePhoto from '../common/takePhoto';
import UploadPhoto from '../common/uploadPhoto';
import PreviewPhoto from '../common/previewPhoto';

class Level1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      screen: 'status',
      addressDoc: null,
      identificationDoc: null,
      docType: null,
    };

    this.onAddressBtnClick = this.onAddressBtnClick.bind(this);
    this.onIdentificationBtnClick = this.onIdentificationBtnClick.bind(this);
    this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
    this.onIdentificationTypeBtnClick = this.onIdentificationTypeBtnClick.bind(this);
    this.onAddressTypeBtnClick = this.onAddressTypeBtnClick.bind(this);
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

  onIdentificationBtnClick() {
    this.setState({ screen: 'addIdentification', kycDoc: 'Identification' });
  }

  onAddressBtnClick() {
    this.setState({ screen: 'addAddress', kycDoc: 'Address' });
  }

  onIdentificationTypeBtnClick(type) {
    this.setState({ identificationDoc: { type }, docType: type, screen: 'addInstructions' });
  }

  onAddressTypeBtnClick(type) {
    this.setState({ addressDoc: { type }, docType: type, screen: 'addInstructions' });
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
    if (this.state.kycDoc === 'Identification') {
      doc = this.state.identificationDoc;
      doc.file = file;
      this.setState({ identificationDoc: doc });
    } else if (this.state.kycDoc === 'Address') {
      doc = this.state.addressDoc;
      doc.file = file;
      this.setState({ addressDoc: doc });
    }

    this.setState({ screen: 'previewPhoto' });
  }

  onUseThisPhotoBtnClick() {}

  onChooseAnotherPhotoBtnClick() {
    this.goBack();
  }

  goBack() {
    const { navigation } = this.props;
    const isBackArrow = true;
    switch (this.state.screen) {
      case 'status':
        if (navigation) {
          navigation.navigate('ProfileScreen', { isBackArrow });
        }
        break;
      case 'addIdentification':
        this.setState({ screen: 'status' });
        break;
      case 'addAddress':
        this.setState({ screen: 'status' });
        break;
      case 'addInstructions':
        if (this.state.kycDoc == 'Identification') {
          this.setState({ screen: 'addIdentification' });
        } else if (this.state.kycDoc == 'Address') {
          this.setState({ screen: 'addAddress' });
        }
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
        if (navigation) {
          navigation.navigate('ProfileScreen', { isBackArrow });
        }
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
      case 'addIdentification':
        return (
          <AddIdentification
            goBack={this.goBack}
            onIdentificationTypeBtnClick={this.onIdentificationTypeBtnClick}
          />
        );
      case 'addAddress':
        return (
          <AddAddress goBack={this.goBack} onAddressTypeBtnClick={this.onAddressTypeBtnClick} />
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
Level1.defaultProps = {
  navigation: null,
};
Level1.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(Level1);
