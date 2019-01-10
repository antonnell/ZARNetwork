import React, { Component } from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import FloatLabelTextField from '../../../common/FloatLabelTextField';
import Web3 from 'web3';
import FloatLabelTextField from '../../../common/updatedFloatLabel';

import DesignButton from '../../../common/Button';
import TitleCard from '../../../common/titleCard';
import TitleHeader from '../../../common/TitleHeader';
import AccountType from '../../../images/AccountType.png';
import ListCard from '../../../common/ListCard';
import { WALLET_LIST, BENEFICIARY_TYPE_LIST } from '../../../common/constants';
import styles from './styles';
import { setNewBeneficiary } from '../../../controllers/api/beneficiary';
import Loader from '../../../common/Loader';
import { isValidName } from '../../../utility/index';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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

  // validate(type) {
  //   if (type === 'name') {
  //     this.setState({
  //       name: '',
  //     });
  //   }
  //   if (type === 'account') {
  //     this.setState({
  //       accountNumber: '',
  //     });
  //   }
  //   if (type === 'reference') {
  //     this.setState({
  //       reference: '',
  //     });
  //   }
  // }
  validateFields(type) {
    const { accountNumber } = this.state;
    if (type === 'account') {
      if (accountNumber !== '' && !Web3.utils.isAddress(accountNumber)) {
        Alert.alert('Error', 'Please enter valid account number.');
        this.setState({
          accountNumber: '',
        });
      }
    }
  }

  checkEmptyFields(type) {
    const { name, accountNumber } = this.state;
    if (type === 'name') {
      Alert.alert('Error', 'Enter name!');
    } else if (type === 'account') {
      if (name !== '') {
        Alert.alert('Error', 'Enter account number!');
      }
    } else if (type === 'reference') {
      if (accountNumber !== '') {
        Alert.alert('Error', 'Enter reference!');
      }
    }
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
      Alert.alert('Error', 'Beneficiary name already exists!');
      return;
    }

    if (
      accountNumber &&
      accountNumber !== '' &&
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
          .then(result => {
            this.setState({
              isLoading: false,
            });
            if (
              result &&
              result.payload &&
              result.payload.data &&
              result.payload.data.status === 200
            ) {
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
              result &&
              result.error &&
              result.error.response &&
              result.error.response.data &&
              result.error.response.data.message
            ) {
              const { message } = result.error.response.data;
              Alert.alert('Error', message);
            }
          })
          // eslint-disable-next-line no-console
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
    return (
      <TouchableOpacity
        style={styles.Container}
        onPress={() => this.handleCloseDropdown()}
        activeOpacity={1}
      >
        <StatusBar backgroundColor="black" />

        <TitleHeader
          iconName="keyboard-arrow-left"
          title="BENEFICIARY DETAILS"
          onBtnPress={this.handleGoBack}
          isBackArrow={isBackArrowPresent}
        />
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
            placeholder="Name"
            autoCorrect={false}
            value={name}
            // maxLength={20}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            // validate={type => this.validate(type)}
            validateFields={type => this.validateFields(type)}
            checkEmptyFields={type => this.checkEmptyFields(type)}
          />

          <FloatLabelTextField
            type="account"
            placeholder="Account Number"
            autoCorrect={false}
            value={accountNumber}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={isShowRightText ? deviceWidth * 0.42 : deviceWidth * 0.73}
            // validate={type => this.validate(type)}
            isShowRightText={isShowRightText}
            rightTextStyle={styles.rightTextStyle}
            rightTextValue="Scan QR Code"
            rightTextValueStyle={styles.rightTextValueStyle}
            onPressRightBtn={this.openScanner}
            validateFields={type => this.validateFields(type)}
            checkEmptyFields={type => this.checkEmptyFields(type)}
          />
          <FloatLabelTextField
            type="reference"
            placeholder="Reference"
            autoCorrect={false}
            value={reference}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            // validate={type => this.validate(type)}
            validateFields={type => this.validateFields(type)}
            checkEmptyFields={type => this.checkEmptyFields(type)}
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
      </TouchableOpacity>
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
