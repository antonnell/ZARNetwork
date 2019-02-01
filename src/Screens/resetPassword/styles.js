import { StyleSheet } from 'react-native';
// Constants
import { deviceWidth, deviceHeight } from '../../common/constants';

export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  fantomPayLogoContainer: {
    marginTop: deviceHeight * 0.1,
  },
  fantomPayLogoImageStyle: {
    height: 80,
  },
  mainTextViewStyle: {
    marginTop: 30,
    width: deviceWidth * 0.8,
    alignItems: 'center',
  },
  mainTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(0,177,251)',
    fontFamily: 'Roboto-Regular',
  },
  subTextViewStyle: {
    marginTop: 10,
    width: deviceWidth * 0.8,
  },
  subTextStyle: { textAlign: 'center', fontSize: 13, color: 'rgb(145,145,145)' },
  emailTextFieldStyle: {
    marginTop: 35,
    width: deviceWidth * 0.8,
  },
  textStyle: {
    color: 'rgb(0, 169, 252)',
    fontWeight: '600',
    fontSize: deviceWidth < 375 ? 14 : 16,
  },
  buttonContainer: {
    marginTop: deviceHeight * 0.03,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verfiyOTPContainerStyle: { flex: 1 },
  keyboardScrollViewStyle: {
    height: deviceHeight,
    width: deviceWidth,
  },
  resetButtonViewStyle: { marginTop: deviceHeight * 0.08 },
});
