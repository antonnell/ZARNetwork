import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  mainStyle: {
    width: deviceWidth,
    marginTop: deviceHeight * 0.06,
  },
  textStyle: {
    marginLeft: deviceWidth * 0.1,
    fontSize: 16,
    color: 'rgb(3,3,3)',
    fontWeight: '600',
  },
});
