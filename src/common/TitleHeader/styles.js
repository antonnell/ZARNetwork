import { StyleSheet, Platform } from 'react-native';
import { isIPhoneX } from '../../utility';
// Constants
import { deviceWidth, deviceHeight } from '../constants';

let marginTop = 10;
if (Platform.OS === 'ios') {
  marginTop = isIPhoneX() ? 54 : 30;
} else if (Platform.OS === 'android') {
  marginTop = 10;
}
export default StyleSheet.create({
  mainContainer: {
    width: deviceWidth,
    height: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#9B9B9B',
    shadowColor: 'rgba(46,74,117,0.7)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  titleText: {
    // width: deviceWidth * 0.8,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  rightIconViewStyle: {
    alignItems: 'center',
    height: 50,
    width: 50,
    justifyContent: 'center',
    paddingRight: 10,
  },
  leftIconViewStyle: {
    alignItems: 'center',
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  imgIconStyle: { height: 25, width: 25 },
  iconStyle: { fontWeight: 'bold' },
  iconRenderViewStyle: { flex: 1, paddingHorizontal: 10 },
  textViewStyle: { flex: 6 },
});
