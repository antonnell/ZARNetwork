import { Dimensions, StyleSheet } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleText: {
    color: 'rgb(0, 177, 255)',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: deviceWidth * 0.25,
  },
  descriptionText: {
    fontFamily: 'Roboto-Regular',
    marginTop: deviceHeight * 0.1,
    color: '#000',
    fontSize: 16,
    width: deviceWidth * 0.9,
  },
  resendBtnMainView: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  resenOtpTextStyle: {
    color: '#212c41',
    fontFamily: 'Montserrat-Light',
  },
  imageStyle: {
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.05,
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.2,
  },
});
