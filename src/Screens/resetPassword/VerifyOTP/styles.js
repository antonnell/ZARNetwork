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
    color: 'rgb(0,177,251)',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: deviceWidth * 0.25,
    fontFamily: 'Roboto-Medium',
  },
  descriptionText: {
    fontFamily: 'Roboto-Regular',
    marginTop: deviceHeight * 0.1,
    color: '#000',
    fontSize: 16,
    width: deviceWidth * 0.7,
  },
  resendBtnMainView: {
    marginTop: 20,
  },
  resenOtpTextStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  optFieldViewStyle: {
    height: deviceHeight * 0.13,
  },
  otpInputsViewStyle: {
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#fff',
    margin: 7,
    height: 40,
  },
  otpInputsStyle: { color: '#000', width: 30, fontSize: 14 },
  resendViewStyle: { marginTop: 20, alignItems: 'center' },
  resendTimerViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  resendTimerTextStyle: { fontFamily: 'Roboto-Regular' },
  timerCountdownStyle: { fontSize: 14, fontFamily: 'Roboto-Regular' },
});
