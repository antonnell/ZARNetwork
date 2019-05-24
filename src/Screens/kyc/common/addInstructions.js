import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import DesignButton from '../../../common/Button';

import { deviceWidth, deviceHeight } from '../../../common/constants';

import styles from './styles';

class AddInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {}

  render() {
    const { navigation, onTakePhotoBtnClick, onUploadPhotoBtnClick, goBack, docType } = this.props;

    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => goBack()}
          title={`Add ${docType}`}
          isBackArrow
        />

        <ScrollView
          style={styles.scrollViewStyle}
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
              <Text>Provide a </Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> colour photo</Text>
              <Text> of your</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> {docType}.</Text>
              <Text> Ensure all of it is</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> visibile</Text>
              <Text> (not cutting off) and in</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> focus</Text>
              <Text> (you can read all the information)</Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: deviceHeight * 0.025,
              width: deviceWidth * 0.8,
              alignSelf: 'center',
            }}
          >
            <DesignButton
              btnTextColor={styles.btnTextColor}
              name="TAKE A PHOTO"
              isClickable
              callMethod={() => {
                onTakePhotoBtnClick();
              }}
              btnMainStyle={styles.btnStyle}
            />
            <DesignButton
              btnTextColor={styles.btnTextColorAlternate}
              name="UPLOAD A PHOTO"
              isClickable
              callMethod={() => {
                onUploadPhotoBtnClick();
              }}
              btnMainStyle={styles.btnStyleAlternate}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
AddInstructions.defaultProps = {
  navigation: null,
};
AddInstructions.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(AddInstructions);
