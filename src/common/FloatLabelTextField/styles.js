// Libraries
import { Dimensions, Platform } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
// const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

export default {
  container: {
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  paddingView: {
    width: 15,
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  fieldLabel: {
    height: 15,
    fontSize: 12,
    color: 'rgb(58, 58, 58)',
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    opacity: 0.8,
  },
  withBorder: {
    borderColor: '#C8C7CC',
  },
  valueText: {
    height: isIOS ? 35 : 40,
    fontSize: deviceWidth < 375 ? 12 : 14,
    color: '#111111',
    backgroundColor: '#fff',
    // borderWidth: 0.5,
    // borderColor:'#111',
    // borderColor:'red',
    paddingLeft: 10,
    borderRadius: 5,
  },
  focused: {
    bottom: 5,
    color: '#5F5D5D',
    fontSize: 12,
  },
  iconStyle: {
    backgroundColor: 'rgba(132, 132, 132)',
    color: 'rgba(132, 132, 132)',
    // position: "absolute",
    // left: 0,
    // top: 0,
    alignSelf: 'center',
  },
  passwordError: {
    fontSize: 14,
    color: 'red',
    width: deviceWidth * 0.9,
    alignSelf: 'center',
  },
  underlineStyling: {
    width: deviceWidth * 0.76,
    height: 0.8,
    backgroundColor: 'rgb(92,92,92)',
    position: 'absolute',
    bottom: 10,
    left: 6,
  },
};
