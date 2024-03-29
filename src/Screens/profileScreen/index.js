import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TitleHeader from '../../common/TitleHeader';
import ProfileInfo from '../../common/profileInfo';
import StatusBar from '../../common/StatusBar';
import { clearAuth, updateUserProfile } from '../../controllers/api/auth';

import {
  deviceHeight,
  deviceWidth,
  ImageIconType,
  MaterialIconsType,
  invalid,
  valid,
} from '../../common/constants';
import { isEmailValid, getAccountIcon, getFullName } from '../../utility';
import FloatLabelTextField from '../../common/updatedFloatLabel';
import DesignButton from '../../common/Button';
import editIcon from '../../images/Edit.png';
import styles from './styles';
import Loader from '../../common/Loader';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    const { userDetail } = this.props;

    this.state = {
      firstName: userDetail.firstname,
      lastName: userDetail.surname,
      email: userDetail.email,
      mobileNumber: userDetail.mobile_number,
      isBackArrowPresent: true,
      isEditable: false,
      isLoading: false,
    };

    this.updateForm = this.updateForm.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.checkEmptyFields = this.checkEmptyFields.bind(this);
    this.editData = this.editData.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpdateUserProfile = this.handleUpdateUserProfile.bind(this);
    this.navigateKYC = this.navigateKYC.bind(this);
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validateFields(type) {
    const { email } = this.state;
    if (type === 'email') {
      if (email !== '' && email !== undefined) {
        if (isEmailValid(email) === false) {
          Alert.alert('Error', 'Invalid Email');
          this.setState({
            email: '',
          });
          return invalid;
        }
      }
    }
    return valid;
  }

  checkEmptyFields(type) {
    const { firstName, lastName } = this.state;
    if (type === 'firstname') {
      Alert.alert('Error', 'Enter first name!');
    } else if (type === 'lastname') {
      if (firstName !== '') {
        Alert.alert('Error', 'Enter last name!');
      }
    } else if (type === 'email') {
      if (lastName !== '') {
        Alert.alert('Error', 'Enter email!');
      }
    }
  }

  handleGoBack() {
    const { navigation } = this.props;
    if (navigation) {
      // navigation.goBack();
      const isBackArrow = true;
      navigation.navigate('Home', { isBackArrow });
    }
  }

  /**
   * @method handleLogout : To logout user.
   */
  handleLogout() {
    const { navigation } = this.props;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'StartScreen',
        }),
      ],
    });
    clearAuth();
    navigation.dispatch(resetAction);
  }

  handleUpdateUserProfile() {
    const { email, firstName, lastName, mobileNumber } = this.state;
    this.setState({
      isLoading: true,
    });
    const payload = {
      email,
      firstname: firstName,
      surname: lastName,
      mobile_number: mobileNumber,
    };
    updateUserProfile(payload)
      .then(response => {
        this.setState({
          isLoading: false,
        });
        if (response.payload && response.payload.data && response.payload.data.status) {
          this.setState({
            isEditable: false,
          });
          Alert.alert('Updation', "User's profile updated successfully");
        }

        if (
          response.error &&
          response.error.response &&
          response.error.response.data &&
          response.error.response.data.status
        ) {
          Alert.alert('Error', response.error.response.data.result);
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  editData() {
    const { isEditable } = this.state;
    const rightIcon = !isEditable ? editIcon : 'cancel';

    const { userDetail } = this.props;

    if (rightIcon === 'cancel') {
      this.setState({
        email: userDetail.email,
        firstName: userDetail.firstname,
        lastName: userDetail.surname,
      });
    }

    this.setState({
      isEditable: !isEditable,
    });
  }

  navigateKYC() {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'KYCStatus',
        }),
      ],
    });
    navigation.dispatch(resetAction);
  }

  renderButtonView() {
    const { isEditable, email, firstName, lastName } = this.state;
    let isClickable = true;
    if (isEditable && (email === '' || firstName === '' || lastName === '')) {
      isClickable = false;
    }

    let buttonProps = {
      name: 'SIGN OUT',
      callMethod: this.handleLogout,
      isClickable,
    };
    if (isEditable) {
      buttonProps = {
        name: 'SAVE',
        callMethod: this.handleUpdateUserProfile,
        isClickable,
      };
    }
    return (
      <View style={{ marginTop: deviceHeight * 0.08, width: deviceWidth * 0.7 }}>
        <DesignButton
          name={buttonProps.name}
          callMethod={buttonProps.callMethod}
          isClickable={buttonProps.isClickable}
        />
      </View>
    );
  }

  renderProfileInfo() {
    const { userDetail } = this.props;
    const { email } = userDetail;
    const userIcon = getAccountIcon(userDetail);
    let subtitleText = '';
    const titleText = getFullName(userDetail);

    if (email && email !== '' && email !== null && email !== undefined) {
      subtitleText = email;
    }

    if (subtitleText === '') {
      subtitleText = '--';
    }

    return (
      <ProfileInfo
        circularAvatarTextStyle={styles.circularAvatarTextStyle}
        profileInfoMainViewStyle={styles.profileInfoMainViewStyle}
        profileInfoTitleStyle={styles.profileInfoTitleStyle}
        profileInfoSubTitleStyle={styles.profileInfoSubTitleStyle}
        subTitleText={subtitleText}
        titleText={titleText}
        circularAvatarText={userIcon}
      />
    );
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
    const { isBackArrowPresent, firstName, lastName, email, isEditable } = this.state;
    const editable = !!isEditable;
    const rightIcon = !isEditable ? editIcon : 'cancel';
    const rightIconType = !isEditable ? ImageIconType : MaterialIconsType;
    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="MY PROFILE"
          isBackArrow={isBackArrowPresent}
          onBtnPress={this.handleGoBack}
          rightIconName={rightIcon}
          rightIconType={rightIconType}
          onRightBtnPress={this.editData}
        />
        <KeyboardAwareScrollView
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={{ marginTop: deviceHeight * 0.04 }}>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.7,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                marginTop: deviceHeight * 0.025,
                marginBottom: deviceHeight * 0.025,
              }}
            >
              <Text>Your</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> account details.</Text>
            </Text>
          </View>
          <View
            style={{
              width: deviceWidth * 0.9,
              marginTop: deviceHeight * 0.06,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: '#046dc2',
                fontFamily: 'Montserrat-Bold',
              }}
            >
              Personal Details
            </Text>
            <View
              style={{
                marginTop: 6,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View
            style={{
              marginTop: deviceHeight * 0.025,
              width: deviceWidth * 0.8,
              alignSelf: 'center',
            }}
          >
            <FloatLabelTextField
              type="firstName"
              editable={editable}
              inputType="text"
              valueType="name"
              placeholder="First Name"
              autoCorrect={false}
              value={firstName}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />

            <FloatLabelTextField
              type="lastName"
              editable={editable}
              inputType="text"
              valueType="name"
              placeholder="Last Name"
              autoCorrect={false}
              value={lastName}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
            <FloatLabelTextField
              type="email"
              editable={editable}
              inputType="email"
              valueType="email"
              placeholder="Email"
              autoCorrect={false}
              value={email}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
            />
            <FloatLabelTextField
              type="kycStatus"
              editable={editable}
              inputType="kycStatus"
              valueType="kycStatus"
              placeholder="KYC Status"
              autoCorrect={false}
              value="Level 1"
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              validateFields={type => this.validateFields(type)}
              onPressRightBtn={this.navigateKYC}
            />
          </View>
          {this.renderButtonView()}
        </KeyboardAwareScrollView>
        {this.renderLoader()}
      </View>
    );
  }
}

UserProfile.defaultProps = {
  userDetail: null,
  navigation: null,
};
UserProfile.propTypes = {
  userDetail: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(UserProfile);
