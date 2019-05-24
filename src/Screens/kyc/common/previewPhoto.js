import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TitleHeader from '../../../common/TitleHeader';
import StatusBar from '../../../common/StatusBar';
import DesignButton from '../../../common/Button';

import { deviceWidth, deviceHeight } from '../../../common/constants';

import styles from './styles';

class PreviewPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {}

  render() {
    const {
      navigation,
      goBack,
      onUseThisPhotoBtnClick,
      onChooseAnotherPhotoBtnClick,
      kycDoc,
      identificationDoc,
      addressDoc,
    } = this.props;

    let image = null;
    if (kycDoc == 'Identification') {
      if (identificationDoc && identificationDoc.file) {
        image = `data:image/jpeg;base64,${identificationDoc.file.data}`;
      }
    } else if (kycDoc == 'Address') {
      if (addressDoc && addressDoc.file) {
        image = `data:image/jpeg;base64,${addressDoc.file.data}`;
      }
    }

    console.log('LOOK HERE ANTON~');
    console.log(kycDoc);
    console.log(addressDoc);
    console.log(image);
    return (
      <View style={styles.Container}>
        <StatusBar />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => goBack()}
          title="PREVIEW PHOTO"
          isBackArrow
        />

        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={{ marginTop: deviceHeight * 0.075 }}>
            <Text
              style={{
                textAlign: 'center',
                width: deviceWidth * 0.75,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              <Text>If your document is </Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> clear</Text>
              <Text> and completely</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold' }}> visible</Text>
              <Text> , it's goood to go</Text>
            </Text>
          </View>
          <View style={{ marginTop: deviceHeight * 0.05 }}>
            <Image
              source={{ uri: image }}
              style={{ width: deviceWidth * 0.8, height: deviceHeight * 0.5 }}
            />
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
              name="USE THIS PHOTO"
              isClickable
              callMethod={() => {
                onUseThisPhotoBtnClick();
              }}
              btnMainStyle={styles.btnStyle}
            />
            <DesignButton
              btnTextColor={styles.btnTextColorAlternate}
              name="USE ANOTHER PHOTO"
              isClickable
              callMethod={() => {
                onChooseAnotherPhotoBtnClick();
              }}
              btnMainStyle={styles.btnStyleAlternate}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
PreviewPhoto.defaultProps = {
  navigation: null,
};
PreviewPhoto.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  userDetail: state.userAuthReducer.userDetail,
});

export default connect(mapStateToProps)(PreviewPhoto);
