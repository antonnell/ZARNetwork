import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
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

class NewBeneficiary extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let isBackArrowPresent = false;
    if (navigation && navigation.state && navigation.state.params) {
      isBackArrowPresent = navigation.state.params.isBackArrow;
    }

    const initialState = this.setInitialState();

    this.state = {
      name: initialState.name,
      accountNumber: initialState.accountNumber,
      reference: initialState.reference,
      selectedWallet: initialState.selectedWallet,
      openWalletList: false,
      accId: initialState.accId,
      isBackArrowPresent,
      isLoading: false,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleAddBeneficiary = this.handleAddBeneficiary.bind(this);
    this.openScanner = this.openScanner.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  /**
   * @method onScanSuccess : To handle selected account type from account list.
   *
   */
  onScanSuccess(address) {
    this.setState({
      accountNumber: address,
    });
  }

  /**
   * @method resetState : To handle reset state of component on goBack from pay beneficiary screen.
   */
  resetState() {
    const initialState = this.setInitialState();
    this.setState({
      name: initialState.name,
      accountNumber: initialState.accountNumber,
      reference: initialState.reference,
      selectedWallet: initialState.selectedWallet,
      accId: initialState.accId,
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
                const selectedBeneficiary = res.payload.data.result;
                navigation.navigate('PayBeneficiary', {
                  isBackArrow: true,
                  selectedBeneficiary,
                  resetState: this.resetState,
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

  openScanner() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('QRScanner', { onScanSuccess: this.onScanSuccess.bind(this) });
    }
  }

  setInitialState() {
    let selectedWallet = '';
    let accId = '';
    const name = '';
    const accountNumber = '';
    const reference = '';
    const { userWalletDetail } = this.props;
    if (userWalletDetail && userWalletDetail.length > 0) {
      selectedWallet = userWalletDetail[0].description;
      accId = userWalletDetail[0].uuid;
    }
    return { selectedWallet, accId, name, accountNumber, reference };
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
      mobileNumber,
      email,
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

    let rightIcon = 'keyboard-arrow-right';
    if (openWalletList) {
      rightIcon = 'keyboard-arrow-down';
    }

    return (
      <TouchableOpacity style={styles.Container} activeOpacity={1}>
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
          <View style={{ marginTop: deviceHeight * 0.1 }}>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.75,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>Quickly create a </Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> new beneficiary</Text>
              <Text> by providing some basic information.</Text>
            </Text>
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
              placeholder="Beneficiary Name"
              autoCorrect={false}
              value={name}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
            <FloatLabelTextField
              type="mobile"
              placeholder="Mobile Number"
              inputType="text"
              valueType="text"
              autoCorrect={false}
              value={mobileNumber}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={isShowRightText ? deviceWidth * 0.42 : deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
            <FloatLabelTextField
              type="email"
              placeholder="Email Address"
              inputType="email"
              valueType="text"
              autoCorrect={false}
              value={email}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={isShowRightText ? deviceWidth * 0.42 : deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
            <FloatLabelTextField
              type="accountNumber"
              placeholder="ZAR Wallet Address"
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
          <View
            style={{
              marginTop: deviceHeight * 0.05,
              width: deviceWidth * 0.7,
              alignSelf: 'center',
            }}
          >
            <DesignButton
              name="DONE"
              callMethod={this.handleAddBeneficiary}
              isClickable={isClickable}
            />
          </View>
        </KeyboardAwareScrollView>
        {this.renderLoader()}
      </TouchableOpacity>
    );
  }
}
NewBeneficiary.defaultProps = {
  userWalletDetail: [],
  navigation: null,
  beneficiaries: [],
};
NewBeneficiary.propTypes = {
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  beneficiaries: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userWalletDetail: state.userWalletReducer.wallets,
  beneficiaries: state.userBeneficiaryReducer.beneficiaries,
});

export default connect(mapStateToProps)(NewBeneficiary);
