// Libraries
import { Dimensions, Platform } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
// const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

export default {
  container: {
    height: 55,
    backgroundColor: 'transparent',
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
    top: 5,
    left: -5,
  },
  fieldLabel: {
    fontFamily: 'Montserrat-Bold',
    height: 25,
    fontSize: 12,
    color: 'rgb(58, 58, 58)',
    bottom: 0,
  },
  focused: {
    fontFamily: 'Montserrat-Medium',
    height: 25,
    fontSize: 12,
    color: '#212c41',
    bottom: 0,
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
    opacity: 0.8,
    borderBottomWidth: 1.5,
    borderBottomColor: 'lightgray',
  },
  focusedContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
    opacity: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: '#212c41',
  },
  withBorder: {
    borderColor: '#212c41',
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  valueText: {
    height: 30,
    lineHeight: 30,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: -4,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#212c41',
    backgroundColor: '#fff',
    // borderWidth: 0.5,
    // borderColor:'#111',
    // borderColor:'red'
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
