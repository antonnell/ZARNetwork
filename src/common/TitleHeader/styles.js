import { StyleSheet } from 'react-native';
import { Dimensions, Platform } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  mainContainer: {
    width: deviceWidth,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: deviceHeight * 0.08,
  },
  titleText: {
    width: deviceWidth * 0.8,
    textAlign: 'center',
    fontSize: 18,
    color: 'rgb(0,177,251)',
    fontWeight: '600',
  },
});
