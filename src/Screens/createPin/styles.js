import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  Container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'rgb(0, 169, 252)',
    fontWeight: '600',
    fontSize: 15,
  },
  dialPadBackground: {
    backgroundColor: 'red',
  },
  loginBtn: {
    backgroundColor: 'rgb(0, 169, 252)',
    width: deviceWidth * 0.76,
    height: deviceHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  termTextStyle: {
    marginTop: 10,
  },
  loginButtonView: {
    position: 'absolute',
    bottom: deviceHeight * 0.06,
    alignItems: 'center',
  },
  dialerView: {
    marginTop: 10,
    position: 'absolute',
    // marginTop: deviceHeight * 0.1,
    height: deviceHeight * 0.6,
    alignItems: 'center',
  },
});
