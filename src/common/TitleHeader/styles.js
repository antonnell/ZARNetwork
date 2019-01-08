import { Dimensions, StyleSheet } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  mainContainer: {
    width: deviceWidth * 0.9,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  titleText: {
    // width: deviceWidth * 0.8,
    textAlign: 'center',
    fontSize: deviceHeight < 675 ? 16 : 18,
    color: 'rgb(0,177,251)',
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
});
