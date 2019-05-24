import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageStyle: {
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.05,
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.2,
  },
  registerBtnStyle: {
    backgroundColor: 'white',
  },
  btnTextColor: {
    color: '#212c41',
    fontFamily: 'Montserrat-Light',
  },
  loginBtnTextColor: {},
  wrapper: {},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
