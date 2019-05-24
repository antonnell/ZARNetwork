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
    backgroundColor: '#212c41',
    width: '100%',
    height: deviceHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
  },
});
