import { StyleSheet } from 'react-native';
// Constants
import { deviceWidth, deviceHeight } from '../constants';

export default StyleSheet.create({
  constraintContainer: { marginTop: deviceHeight * 0.06 },
  passwordConstraints: {
    flexDirection: 'row',
    width: deviceWidth * 0.8,
    justifyContent: 'space-between',
  },
  constraintViewStyle: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  spaceViewStyle: { width: deviceWidth * 0.03 },

  constraintsTextStyle: {
    fontSize: deviceWidth < 375 ? 12 : 14,
    color: 'rgb(3,3,3)',
    paddingLeft: 3,
  },
});
