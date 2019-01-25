import { StyleSheet } from 'react-native';
import { isIPhoneX } from '../../utility';
// Constants
import { deviceWidth, deviceHeight } from '../constants';

export default StyleSheet.create({
  mainContainer: {
    width: deviceWidth,
    height: 44,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: isIPhoneX() ? 54 : 30,
  },

  titleText: {
    textAlign: 'center',
    fontSize: deviceHeight < 675 ? 16 : 18,
    color: 'rgb(0,177,251)',
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  rightIconViewStyle: {
    alignItems: 'center',
    height: 44,
    width: 44,
    justifyContent: 'center',
    paddingRight: 10,
  },
  leftIconViewStyle: {
    alignItems: 'center',
    height: 44,
    width: 44,
    justifyContent: 'center',
  },
  imgIconStyle: { height: 25, width: 25 },
  iconStyle: { fontWeight: 'bold' },
  iconRenderViewStyle: { flex: 1, paddingHorizontal: 10 },
  textViewStyle: { flex: 6 },
});
