import { StyleSheet } from 'react-native';

import { deviceHeight } from '../../../common/constants';

export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    fontFamily: 'Roboto-Regular',
    color: 'lightgray',
    fontSize: 15,
  },
  dialPadBackground: {
    backgroundColor: 'red',
  },
  loginBtn: {},
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
