import { StyleSheet } from 'react-native';
// Constants
import { deviceWidth, deviceHeight } from '../../../common/constants';

export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  fantomPayLogoContainer: {
    marginTop: deviceHeight * 0.1,
  },
  imageStyle: {
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.05,
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.2,
  },
  mainTextViewStyle: {
    marginTop: 30,
    width: deviceWidth * 0.8,
    alignItems: 'center',
  },
  mainTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(0,177,251)',
    fontFamily: 'Roboto-Regular',
  },
  subTextViewStyle: {
    marginTop: 10,
    width: deviceWidth * 0.8,
  },
  subTextStyle: { textAlign: 'center', fontSize: 13, color: 'rgb(145,145,145)' },
  emailTextFieldStyle: {
    marginTop: 35,
    width: deviceWidth * 0.8,
  },
  textStyle: {
    color: 'rgb(0, 169, 252)',
    fontWeight: '600',
    fontSize: deviceWidth < 375 ? 14 : 16,
  },
  buttonContainer: {
    marginTop: deviceHeight * 0.03,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textFieldStyle: {
    marginTop: deviceHeight * 0.01,
    width: deviceWidth * 0.8,
  },
  passwordConstraints: {
    flexDirection: 'row',
    width: deviceWidth * 0.8,
    justifyContent: 'space-between',
  },
  constraintsTextStyle: {
    fontSize: deviceWidth < 375 ? 12 : 14,
    color: 'rgb(3,3,3)',
    paddingLeft: 3,
  },
});
