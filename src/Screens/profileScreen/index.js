import React, { Component } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TitleHeader from '../../common/TitleHeader';
import ProfileInfo from '../../common/profileInfo';

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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    const { userDetail } = this.props;

    this.state = {
      firstName: userDetail.firstname,
      lastName: userDetail.surname,
      email: userDetail.email,
      isBackArrowPresent: true,
      isEditable: false,
    };

    this.updateForm = this.updateForm.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.checkEmptyFields = this.checkEmptyFields.bind(this);
    this.editData = this.editData.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
      navigation.goBack();
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

    navigation.dispatch(resetAction);
  }

  editData() {
    const { isEditable } = this.state;
    this.setState({
      isEditable: !isEditable,
    });
  }

  renderProfileInfo() {
    const { email } = this.state;
    const { userDetail } = this.props;

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

  render() {
    const { isBackArrowPresent, firstName, lastName, email, isEditable } = this.state;
    const editable = !!isEditable;
    const rightIcon = !isEditable ? editIcon : 'cancel';
    const rightIconType = !isEditable ? ImageIconType : MaterialIconsType;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="VIEW PROFILE"
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
          {this.renderProfileInfo()}
          <View
            style={{
              marginTop: deviceHeight * 0.07,
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
              checkEmptyFields={type => this.checkEmptyFields(type)}
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
              checkEmptyFields={type => this.checkEmptyFields(type)}
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
              checkEmptyFields={type => this.checkEmptyFields(type)}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.08 }}>
            {!isEditable ? (
              <DesignButton name="LOGOUT" callMethod={this.handleLogout} isClickable />
            ) : (
              <DesignButton name="SAVE" callMethod={this.handleLogout} isClickable />
            )}
          </View>
        </KeyboardAwareScrollView>
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
