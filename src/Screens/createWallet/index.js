import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import styles from './styles';
import walletImg from '../../images/wallet.png';
import ListCard from '../../common/ListCard';
import FloatLabelTextField from '../../common/FloatLabelTextField';
import DesignButton from '../../common/Button';
import TitleText from '../../common/TitleText';
import { setNewWallet } from '../../controllers/api/userWallet';
import { ACCOUNT_TYPE_LIST } from '../../common/constants';
import TitleHeader from '../../common/TitleHeader';

const deviceWidth = Dimensions.get('window').width;
/**
 * @class CreateWallet : Component to render create account screen.
 */
class CreateWallet extends Component {
  constructor(props) {
    super(props);
    let selectedType = '';
    let typeUuid = '';
    const { accountTypeList } = this.props;
    if (accountTypeList && accountTypeList.length > 0) {
      selectedType = accountTypeList[0].symbol;
      typeUuid = accountTypeList[0].uuid;
    }
    this.state = {
      selectedType,
      accountName: '',
      typeUuid,
    };
    this.toggleAccountTypeList = this.toggleAccountTypeList.bind(this);
    this.handleAccountTypeList = this.handleAccountTypeList.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  toggleAccountTypeList() {
    const { openAccountList } = this.state;
    this.setState({
      openAccountList: !openAccountList,
    });
  }

  /**
   * @method handleAccountTypeList : To handle selected account type from account list.
   *
   */
  handleAccountTypeList(item) {
    const { openAccountList } = this.state;
    this.setState({
      openAccountList: !openAccountList,
    });
    if (item && item.symbol) {
      this.setState({
        selectedType: item.symbol,
        typeUuid: item.uuid,
      });
    }
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validate(type) {
    if (type === 'accountName') {
      this.setState({
        accountName: '',
      });
    }
  }

  /**
   * @method handleCreateAccount : To create new wallet account.
   *
   */
  handleCreateAccount() {
    const { accountName, typeUuid } = this.state;
    const { navigation } = this.props;

    if (accountName && accountName !== '' && typeUuid && typeUuid !== '') {
      const payload = {
        description: accountName,
        type_uuid: typeUuid,
      };
      setNewWallet(payload)
        .then(res => {
          if (res && res.payload && res.payload.data && res.payload.data.status === 200) {
            navigation.goBack();
          }
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log('errrrr : ', err));
    }
  }

  /**
   * @method handleCloseDropdown : To close account list dropdown on clicking outside dropdown.
   */
  handleCloseDropdown() {
    this.setState({ openAccountList: false });
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      navigation.goBack();
    }
  }

  render() {
    const { accountTypeList } = this.props;
    const { openAccountList, selectedType, accountName, typeUuid } = this.state;
    let isClickable = false;
    if (accountName !== '' && typeUuid !== '') {
      isClickable = true;
    }
    return (
      <TouchableOpacity
        style={styles.Container}
        onPress={() => this.handleCloseDropdown()}
        activeOpacity={1}
      >
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="CREATE WALLET"
          onBtnPress={this.handleGoBack}
        />
        <View style={styles.createWalletImageViewStyle}>
          <Image source={walletImg} style={styles.createWalletImageStyle} resizeMode="contain" />
        </View>
        <View style={styles.createWalletTextViewStyle}>
          <Text style={styles.createWalletTextStyle}>Create Wallet</Text>
        </View>
        <View style={styles.bottomViewStyle}>
          <TitleText
            titleText="Account Type"
            mainStyle={styles.accountViewStyle}
            textStyle={styles.accountTextStyle}
          />
          <View style={styles.accountListViewStyle}>
            <View style={styles.accSymbolViewStyle}>
              <Text style={styles.accSymbolTextStyle}>{selectedType}</Text>
            </View>
            <TouchableOpacity
              style={styles.accDropdownViewStyle}
              onPress={this.toggleAccountTypeList}
            >
              <MaterialIcons name="arrow-drop-down" size={24} style={styles.dropdownIconStyle} />
            </TouchableOpacity>
            {openAccountList && (
              <ListCard
                selectedType={typeUuid}
                data={accountTypeList}
                handleList={item => this.handleAccountTypeList(item)}
                type={ACCOUNT_TYPE_LIST}
              />
            )}
          </View>
          <View style={styles.accNameViewStyle}>
            <FloatLabelTextField
              type="accountName"
              placeholder="Account Name"
              autoCorrect={false}
              value={accountName}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validate={type => this.validate(type)}
            />
          </View>
          <View style={styles.buttonViewStyle}>
            <DesignButton
              name="CREATE"
              callMethod={this.handleCreateAccount}
              isClickable={isClickable}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

/*eslint-disable */
CreateWallet.propTypes = {
  navigation: PropTypes.object,
  accountTypeList: PropTypes.array,
};

const mapStateToProps = state => ({
  accountTypeList: state.supportedAccTypeReducer.types,
});

export default connect(mapStateToProps)(CreateWallet);
