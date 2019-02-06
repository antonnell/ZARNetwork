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
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loginBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
});
