import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainStyle: {
    width: deviceWidth * 0.8,
    alignSelf: 'center',
    marginTop: deviceHeight * 0.06,
  },
  textStyle: {
    marginLeft: deviceWidth * 0.05,
    fontSize: 16,
    color: 'rgb(3,3,3)',
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  toggleContainerStyle: {
    marginTop: deviceHeight * 0.03,
    backgroundColor: 'rgb(244,244,244)',
    alignSelf: 'center',
    width: deviceWidth * 0.8,
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 4,
    shadowColor: 'rgba(0,0,0,0.2)',
    elevation: 4,
  },
  toggleTextStyle: {
    fontSize: 14,
    color: 'rgba(3,3,3,0.9)',
    fontFamily: 'Roboto-Regular',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: deviceWidth * 0.75,
    alignSelf: 'center',
  },
});
