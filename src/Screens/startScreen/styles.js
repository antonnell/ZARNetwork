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
  imageStyle: {
    marginTop: deviceHeight * 0.2,
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.18,
  },
  registerBtnStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(0,177,251)',
  },
  btnTextColor: {
    color: 'rgb(0,177,251)',
    fontSize: 14,
    fontWeight: '600',
  },
  loginBtnTextColor: {
    fontSize: 14,
    fontWeight: '600',
  },
  wrapper: {},
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
