import React, { Component } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TitleHeader from '../../common/TitleHeader';
import ProfileInfo from '../../common/profileInfo';
import { deviceHeight, deviceWidth, ImageIconType } from '../../common/constants';
import { getFirstCharOfString } from '../../utility';
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
    };

    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
    if (navigation) {
      navigation.navigate('StartScreen');
    }
  }

  renderProfileInfo() {
    const { firstName, lastName, email } = this.state;

    let userIcon = '';
    let subtitleText = '';
    let titleText = '';
    if (firstName && firstName !== '' && firstName !== null && firstName !== undefined) {
      userIcon = getFirstCharOfString(firstName);
      titleText = firstName;
    }

    if (lastName && lastName !== '' && lastName !== null && lastName !== undefined) {
      userIcon = `${userIcon} ${getFirstCharOfString(lastName)}`;
      titleText = `${titleText} ${lastName}`;
    }

    if (email && email !== '' && email !== null && email !== undefined) {
      subtitleText = email;
    }
    if (userIcon === '') {
      userIcon = '--';
    }
    if (titleText === '') {
      titleText = '--';
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
    const { isBackArrowPresent, firstName, lastName, email } = this.state;

    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          title="VIEW PROFILE"
          isBackArrow={isBackArrowPresent}
          onBtnPress={this.handleGoBack}
          rightIconName={editIcon}
          rightIconType={ImageIconType}
          onRightBtnPress={() => {}}
        />
        <ScrollView
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
              type="name"
              inputType="text"
              valueType="name"
              placeholder="First Name"
              autoCorrect={false}
              value={firstName}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              // validateFields={type => this.validateFields(type)}
              // checkEmptyFields={type => this.checkEmptyFields(type)}
            />

            <FloatLabelTextField
              type="name"
              inputType="text"
              valueType="name"
              placeholder="Last Name"
              autoCorrect={false}
              value={lastName}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              // validateFields={type => this.validateFields(type)}
              // checkEmptyFields={type => this.checkEmptyFields(type)}
            />
            <FloatLabelTextField
              type="email"
              inputType="email"
              valueType="email"
              placeholder="Email"
              autoCorrect={false}
              value={email}
              updateForm={this.updateForm}
              inputBackgroundColor="#fff"
              textFieldSize={deviceWidth * 0.73}
              // validateFields={type => this.validateFields(type)}
              // checkEmptyFields={type => this.checkEmptyFields(type)}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.08 }}>
            <DesignButton name="LOGOUT" callMethod={this.handleLogout} isClickable />
          </View>
        </ScrollView>
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
