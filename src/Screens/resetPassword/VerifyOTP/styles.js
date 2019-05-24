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
    fontFamily: 'Roboto-Medium',
  },
  imageStyle: {
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.05,
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.2,
  },
  descriptionText: {
    fontFamily: 'Roboto-Regular',
    marginTop: deviceHeight * 0.1,
    color: '#000',
    fontSize: 16,
    width: deviceWidth * 0.7,
    textAlign: 'center',
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
    margin: 4,
    height: 40,
    borderRadius: 0,
  },
  otpInputsStyle: {
    color: '#000',
    width: 40,
    fontSize: 14,
    borderRadius: 0,
  },
  resendViewStyle: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: deviceHeight * 0.03,
    width: deviceWidth * 0.7,
  },
  resendTimerViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: deviceHeight * 0.02,
  },
  resendTimerTextStyle: {
    fontFamily: 'Roboto-Regular',
  },
  timerCountdownStyle: {
    fontSize: 20,
    fontWeight: '400',
  },
  btnStyle: {
    backgroundColor: 'white',
  },
  btnTextColor: {
    color: 'rgb(0, 0, 0)',
    fontWeight: 'normal',
  },
});
