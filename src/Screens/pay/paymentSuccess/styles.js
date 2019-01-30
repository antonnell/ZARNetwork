import { StyleSheet } from 'react-native';
// Constants
import { deviceWidth, deviceHeight } from '../../../common/constants';

export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  registrationText: {
    marginTop: 20,
    width: deviceWidth * 0.5,
    textAlign: 'center',
    fontSize: 24,
    color: 'rgb(0,177,251)',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Medium',
  },
  accountTextStyle: {
    fontSize: 15,
    paddingLeft: 26,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  viewStyle: { marginTop: 30, alignItems: 'center' },
  imageStyle: { width: 100, height: 100 },
  textStyle: { fontSize: 15, fontFamily: 'Roboto-Regular', textAlign: 'center' },
  buttonViewStyle: { marginTop: deviceHeight * 0.2 },
});
