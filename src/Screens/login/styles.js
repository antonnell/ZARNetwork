import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginBtn: {
    backgroundColor: 'rgb(0, 169, 252)',
    width: deviceWidth * 0.76,
    height: deviceHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loginBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  fantomPayLogoContainer: {
    marginTop: deviceHeight * 0.1,
  },
  fantomPayLogoImageStyle: {
    height: 80,
  },
  signInImageStyle: {
    height: deviceHeight * 0.06,
  },
  signInTextStyle: {
    color: 'rgb(0, 0, 0)',
    fontWeight: 'normal',
    fontSize: 15,
  },
  emailTextFieldStyle: {
    marginTop: deviceHeight * 0.1,
    width: deviceWidth * 0.8,
  },
  passwordTextFieldStyle: {
    marginTop: deviceHeight * 0.01,
    width: deviceWidth * 0.8,
  },
  textStyle: {
    color: 'rgb(0, 169, 252)',
    fontWeight: '600',
    fontSize: deviceWidth < 375 ? 14 : 16,
  },
  bottomTextStyle: {
    color: 'rgb(0, 0, 0)',
    fontWeight: 'normal',
    fontSize: deviceWidth < 375 ? 14 : 16,
    fontFamily: 'Roboto-Regular',
  },
  bottomTextViewStyle: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: deviceWidth,
    height: 35,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 10,
  },
});
