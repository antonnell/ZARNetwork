import { StyleSheet } from 'react-native';

import { deviceHeight, deviceWidth } from '../../../common/constants';

export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    fontFamily: 'Roboto-Regular',
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
    marginTop: deviceHeight * 0.04,
    // alignItems: 'center',
  },
  dialerView: {
    marginTop: 10,
    // position: 'absolute',
    // marginTop: deviceHeight * 0.1,
    height: deviceHeight,
    // alignItems: 'center',
  },
});
