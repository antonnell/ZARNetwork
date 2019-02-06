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
  },
  emailTextFieldStyle: {
    marginTop: deviceHeight * 0.1,
    width: deviceWidth * 0.9,
  },
  passwordTextFieldStyle: {
    marginTop: deviceHeight * 0.01,
    width: deviceWidth * 0.9,
  },
  textStyle: {
    color: 'lightgray',
    fontSize: deviceWidth < 375 ? 14 : 16,
  },
  bottomTextStyle: {
    color: 'lightgray',
    fontWeight: 'normal',
    fontSize: deviceWidth < 375 ? 14 : 16,
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
