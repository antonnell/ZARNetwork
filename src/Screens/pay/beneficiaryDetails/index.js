import React, { Component } from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FloatLabelTextField from '../../../common/FloatLabelTextField';
import DesignButton from '../../../common/Button';
import TitleCard from '../../../common/titleCard';
import TitleHeader from '../../../common/TitleHeader';
import AccountType from '../../../images/AccountType.png';
import ListCard from '../../../common/ListCard';
import { WALLET_LIST } from '../../../common/constants';
import styles from './styles';
import { setNewBeneficiary } from '../../../controllers/api/beneficiary';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class BeneficiaryDetails extends Component {
  constructor(props) {
    super(props);

    let selectedWallet = '';
    let accId = '';
    const { userWalletDetail } = this.props;
    if (userWalletDetail && userWalletDetail.length > 0) {
      selectedWallet = userWalletDetail[0].description;
      accId = userWalletDetail[0].uuid;
    }

    this.state = {
      email: '',
      accountNumber: '',
      reference: '',
      selectedWallet,
      openWalletList: false,
      accId,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleWalletList = this.handleWalletList.bind(this);
    this.toggleWalletList = this.toggleWalletList.bind(this);
    this.handleAddBeneficiary = this.handleAddBeneficiary.bind(this);
  }

  toggleWalletList() {
    const { openWalletList } = this.state;
    this.setState({
      openWalletList: !openWalletList,
    });
  }

  /**
   * @method handleWalletList : To handle selected account type from account list.
   *
   */
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

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validate(type) {
    // const { email } = this.state;
    if (type === 'email') {
      this.setState({
        email: '',
      });
    }
    if (type === 'account') {
      this.setState({
        accountNumber: '',
      });
    }
    if (type === 'reference') {
      this.setState({
        reference: '',
      });
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
    const { accountNumber, reference, accId, email } = this.state;
    const { navigation } = this.props;
    if (
      accountNumber &&
      accountNumber !== '' &&
      reference &&
      reference !== '' &&
      accId &&
      accId !== '' &&
      email &&
      email !== ''
    ) {
      const payload = {
        account_uuid: accId,
        name: email,
        number: accountNumber,
        their_reference: reference,
      };
      if (setNewBeneficiary) {
        setNewBeneficiary(payload)
          .then(res => {
            if (res && res.payload && res.payload.data && res.payload.data.status === 200) {
              navigation.goBack();
            }
          })
          // eslint-disable-next-line no-console
          .catch(err => console.log('errrrr : ', err));
      }
    }
  }

  render() {
    const { email, accountNumber, reference, selectedWallet, openWalletList, accId } = this.state;
    let isClickable = false;
    if (email !== '' && accountNumber !== '' && reference !== '' && accId !== '') {
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
          title="BENEFICIARY DETIALS"
          onBtnPress={this.handleGoBack}
        />
        <View style={{ zIndex: 99 }}>
          <TitleCard
            icon={AccountType}
            titleCardMainViewStyle={styles.titleCardMainViewStyle}
            titleCardImageStyle={styles.titleCardImageStyle}
            titleCardTextStyle={styles.titleCardTextStyle}
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
            type="email"
            placeholder="Email"
            autoCorrect={false}
            value={email}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.validate(type)}
          />

          <FloatLabelTextField
            type="account"
            placeholder="Account Number"
            autoCorrect={false}
            value={accountNumber}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={isShowRightText ? deviceWidth * 0.42 : deviceWidth * 0.73}
            validate={type => this.validate(type)}
            isShowRightText={isShowRightText}
            rightTextStyle={styles.rightTextStyle}
            rightTextValue="Scan QR Code"
            rightTextValueStyle={styles.rightTextValueStyle}
          />
          <FloatLabelTextField
            type="reference"
            placeholder="Reference"
            autoCorrect={false}
            value={reference}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.validate(type)}
          />
        </View>
        <View style={{ marginTop: deviceHeight * 0.05, alignSelf: 'center' }}>
          <DesignButton
            name="ADD"
            callMethod={this.handleAddBeneficiary}
            isClickable={isClickable}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

/*eslint-disable*/
BeneficiaryDetails.propTypes = {
  userWalletDetail: PropTypes.array,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  userWalletDetail: state.userWalletReducer.wallets,
});

export default connect(mapStateToProps)(BeneficiaryDetails);
