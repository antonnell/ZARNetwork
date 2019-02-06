import { Dimensions, StyleSheet } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailViewStyle: {
    marginTop: deviceHeight * 0.02,
  },
  scrollViewStyle: {
    height: deviceHeight - 100,
    width: deviceWidth,
  },
  bottomViewStyle: { height: deviceHeight * 0.1 },
  emptyDetilViewStyle: {
    backgroundColor: 'rgb(0,169,248)',
    height: 40,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderRadius: 4,
  },
  emptyDetilTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
});
