import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  mainContainer: {
    paddingHorizontal: deviceHeight * 0.04,
    paddingVertical: deviceHeight * 0.02,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgb(3,3,3)',
    fontWeight: '600',
  },
});
