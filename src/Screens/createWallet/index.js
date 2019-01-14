import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import styles from './styles';
import walletImg from '../../images/wallet.png';
import ListCard from '../../common/ListCard';
import FloatLabelTextField from '../../common/updatedFloatLabel';

import DesignButton from '../../common/Button';
import TitleText from '../../common/TitleText';
import { setNewWallet } from '../../controllers/api/userWallet';
import { ACCOUNT_TYPE_LIST, WALLET_LIST } from '../../common/constants';
import TitleHeader from '../../common/TitleHeader';
import Loader from '../../common/Loader';
import { isValidName } from '../../utility/index';

const deviceWidth = Dimensions.get('window').width;
/**
 * @class CreateWallet : Component to render create account screen.
 */
class CreateWallet extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let isBackArrowPresent = false;
    if (navigation && navigation.state && navigation.state.params) {
      isBackArrowPresent = navigation.state.params.isBackArrow;
    }
    let selectedType = '';
    let typeUuid = '';
    const { accountTypeList } = this.props;
    if (accountTypeList && accountTypeList.length > 0) {
      selectedType = accountTypeList[0].symbol;
      typeUuid = accountTypeList[0].uuid;
    }
    this.state = {
      selectedType,
      name: '',
      typeUuid,
      isBackArrowPresent,
      isLoading: false,
    };
    this.toggleAccountTypeList = this.toggleAccountTypeList.bind(this);
    this.handleAccountTypeList = this.handleAccountTypeList.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  checkEmptyFields = type => {
    if (type === 'name') {
      Alert.alert('Error', 'Enter account name!');
    }
  };

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

  // validate(type) {
  //   if (type === 'name') {
  //     this.setState({
  //       name: '',
  //     });
  //   }
  // }

  /**
   * @method handleCreateAccount : To create new wallet account.
   *
   */
  handleCreateAccount() {
    const { name, typeUuid } = this.state;
    const { navigation, userWalletDetail } = this.props;

    if (!isValidName(userWalletDetail, name, WALLET_LIST)) {
      Alert.alert('Error', 'Wallet name already exists!');
      return;
    }

    if (name && name !== '' && typeUuid && typeUuid !== '') {
      const payload = {
        description: name,
        type_uuid: typeUuid,
      };
      this.setState({
        isLoading: true,
      });
      setNewWallet(payload)
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
            navigation.goBack();
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
        .catch(error => {
          this.setState({
            isLoading: false,
          });
          Alert.alert('Error', error);
        });
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
    const { accountTypeList } = this.props;
    const { openAccountList, selectedType, name, typeUuid, isBackArrowPresent } = this.state;
    let isClickable = false;
    if (name !== '' && typeUuid !== '') {
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
          isBackArrow={isBackArrowPresent}
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
              type="name"
              inputType="text"
              valueType="name"
              placeholder="Account Name"
              autoCorrect={false}
              value={name}
              maxLength={20}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              // validateFields={type=>this.validateFields(type)}
              checkEmptyFields={type => this.checkEmptyFields(type)}
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
        {this.renderLoader()}
      </TouchableOpacity>
    );
  }
}
CreateWallet.defaultProps = {
  navigation: null,
  accountTypeList: [],
  userWalletDetail: [],
};
CreateWallet.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  accountTypeList: PropTypes.arrayOf(PropTypes.any),
  userWalletDetail: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  accountTypeList: state.supportedAccTypeReducer.types,
  userWalletDetail: state.userWalletReducer.wallets,
});

export default connect(mapStateToProps)(CreateWallet);
