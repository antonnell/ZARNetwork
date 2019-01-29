import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatLabelTextField from '../../../common/updatedFloatLabel';

import DesignButton from '../../../common/Button';
import TitleCard from '../../../common/titleCard';
import TitleHeader from '../../../common/TitleHeader';
import AccountType from '../../../images/AccountType.png';
import ListCard from '../../../common/ListCard';
import {
  WALLET_LIST,
  BENEFICIARY_TYPE_LIST,
  deviceHeight,
  deviceWidth,
  invalid,
  valid,
  invalidAccNumber,
  invalidBeneficiaryName,
} from '../../../common/constants';
import styles from './styles';
import { setNewBeneficiary } from '../../../controllers/api/beneficiary';
import Loader from '../../../common/Loader';
import { isValidName } from '../../../utility/index';
import StatusBar from '../../../common/StatusBar';

class BeneficiaryDetails extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let isBackArrowPresent = false;
    if (navigation && navigation.state && navigation.state.params) {
      isBackArrowPresent = navigation.state.params.isBackArrow;
    }

    let selectedWallet = '';
    let accId = '';
    const { userWalletDetail } = this.props;
    if (userWalletDetail && userWalletDetail.length > 0) {
      selectedWallet = userWalletDetail[0].description;
      accId = userWalletDetail[0].uuid;
    }

    this.state = {
      name: '',
      accountNumber: '',
      reference: '',
      selectedWallet,
      openWalletList: false,
      accId,
      isBackArrowPresent,
      isLoading: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleWalletList = this.handleWalletList.bind(this);
    this.toggleWalletList = this.toggleWalletList.bind(this);
    this.handleAddBeneficiary = this.handleAddBeneficiary.bind(this);
    this.openScanner = this.openScanner.bind(this);
  }

  /**
   * @method handleWalletList : To handle selected account type from account list.
   *
   */
  onScanSuccess(address) {
    this.setState({
      accountNumber: address,
    });
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validateFields(type) {
    const { accountNumber } = this.state;
    if (type === 'accountNumber') {
      if (accountNumber !== '' && !Web3.prototype.isAddress(accountNumber)) {
        Alert.alert('Invalid Account Number', invalidAccNumber);
        this.setState({
          accountNumber: '',
        });
        return invalid;
      }
    }
    return valid;
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  /**
   * @method handleCloseDropdown : To close wallet list dropdown on clicking outside dropdown.
   */
  handleCloseDropdown() {
    this.setState({ openWalletList: false });
  }

  /**
   * @method handleAddBeneficiary : To add new beneficiary of selected account.
   */
  handleAddBeneficiary() {
    const { accountNumber, reference, accId, name } = this.state;
    const { navigation, beneficiaries } = this.props;

    if (!isValidName(beneficiaries, name, BENEFICIARY_TYPE_LIST)) {
      Alert.alert('Duplicate Name', invalidBeneficiaryName);
      return;
    }

    if (
      accountNumber &&
      accountNumber !== '' &&
      Web3.prototype.isAddress(accountNumber) &&
      reference &&
      reference !== '' &&
      accId &&
      accId !== '' &&
      name &&
      name !== ''
    ) {
      const payload = {
        account_uuid: accId,
        name,
        number: accountNumber,
        their_reference: reference,
      };
      this.setState({
        isLoading: true,
      });
      if (setNewBeneficiary) {
        setNewBeneficiary(payload)
          .then(res => {
            this.setState({
              isLoading: false,
            });
            if (res && res.payload && res.payload.data && res.payload.data.status === 200) {
              const len = beneficiaries.length;
              if (beneficiaries && len > 0) {
                const beneficiaryReference = beneficiaries[len - 1].their_reference;
                const selectedBeneficiary = beneficiaries[len - 1];
                navigation.navigate('PayBeneficiary', {
                  beneficiaryReference,
                  isBackArrow: true,
                  selectedBeneficiary,
                });
              }
            } else if (
              res &&
              res.error &&
              res.error.response &&
              res.error.response.data &&
              res.error.response.data.result
            ) {
              const { result } = res.error.response.data;
              Alert.alert('Error', result);
            }
          })
          .catch(error => {
            this.setState({
              isLoading: false,
            });
            Alert.alert('Error', error);
          });
      }
    }
  }

  handleWalletList(item) {
    const { openWalletList } = this.state;
    this.setState({
      openWalletList: !openWalletList,
    });
    if (item && item.description) {
      this.setState({
        selectedWallet: item.description,
        accId: item.uuid,
      });
    }
  }

  toggleWalletList() {
    const { openWalletList } = this.state;
    this.setState({
      openWalletList: !openWalletList,
    });
  }

  openScanner() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('QRScanner', { onScanSuccess: this.onScanSuccess.bind(this) });
    }
  }

  /**
   * @method renderLoader : To display loader indicator.
   */
  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader isLoading={isLoading} loaderStyle={0.25} />;
    }
    return null;
  }

  render() {
    const {
      name,
      accountNumber,
      reference,
      selectedWallet,
      openWalletList,
      accId,
      isBackArrowPresent,
    } = this.state;
    let isClickable = false;
    if (name !== '' && accountNumber !== '' && reference !== '' && accId !== '') {
      isClickable = true;
    }
    const { userWalletDetail } = this.props;
    const isShowRightText = true;
    let ParentView = View;
    if (openWalletList) {
      ParentView = TouchableOpacity;
    }
    return (
      <ParentView
        style={styles.Container}
        onPress={() => this.handleCloseDropdown()}
        activeOpacity={1}
      >
        <StatusBar />

        <TitleHeader
          iconName="keyboard-arrow-left"
          title="BENEFICIARY DETAILS"
          onBtnPress={this.handleGoBack}
          isBackArrow={isBackArrowPresent}
        />
        <KeyboardAwareScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={{ zIndex: openWalletList ? 99 : 0 }}>
            <TitleCard
              icon={AccountType}
              titleCardMainViewStyle={styles.titleCardMainViewStyle}
              titleCardImageStyle={styles.titleCardImageStyle}
              titleCardTextStyle={styles.titleCardTextStyle}
              titleMaterialIconStyle={
                {
                  // marginLeft: deviceWidth < 380 ? deviceWidth * 0.2 : deviceWidth * 0.3,
                }
              }
              // text="Account Type"
              text={selectedWallet}
              onPress={this.toggleWalletList}
            />
            {openWalletList && (
              <ListCard
                selectedType={accId}
                data={userWalletDetail}
                handleList={item => this.handleWalletList(item)}
                type={WALLET_LIST}
                listStyle={styles.listStyling}
              />
            )}
          </View>

          <View
            style={{
              marginTop: deviceHeight * 0.07,
              width: deviceWidth * 0.8,
              alignSelf: 'center',
            }}
          >
            <FloatLabelTextField
              type="name"
              inputType="text"
              valueType="name"
              placeholder="Name"
              autoCorrect={false}
              value={name}
              // maxLength={20}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />

            <FloatLabelTextField
              type="accountNumber"
              placeholder="Account Number"
              inputType="text"
              valueType="text"
              autoCorrect={false}
              value={accountNumber}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={isShowRightText ? deviceWidth * 0.42 : deviceWidth * 0.73}
              isShowRightText={isShowRightText}
              rightTextStyle={styles.rightTextStyle}
              rightTextValue="Scan QR Code"
              rightTextValueStyle={styles.rightTextValueStyle}
              onPressRightBtn={this.openScanner}
              validateFields={type => this.validateFields(type)}
            />
            <FloatLabelTextField
              type="reference"
              inputType="text"
              valueType="text"
              placeholder="Reference"
              autoCorrect={false}
              value={reference}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.05, alignSelf: 'center' }}>
            <DesignButton
              name="DONE"
              // name="ADD"
              callMethod={this.handleAddBeneficiary}
              isClickable={isClickable}
            />
          </View>
          {this.renderLoader()}
        </KeyboardAwareScrollView>
      </ParentView>
    );
  }
}
BeneficiaryDetails.defaultProps = {
  userWalletDetail: [],
  navigation: null,
  beneficiaries: [],
};
BeneficiaryDetails.propTypes = {
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  beneficiaries: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userWalletDetail: state.userWalletReducer.wallets,
  beneficiaries: state.userBeneficiaryReducer.beneficiaries,
});

export default connect(mapStateToProps)(BeneficiaryDetails);
