import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btnTextColor: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  btnStyle: {
    backgroundColor: '#212c41',
    marginTop: deviceHeight * 0.01,
    height: deviceHeight * 0.06,
  },
  btnTextColorAlternate: {
    color: '#212c41',
    fontSize: 16,
    fontWeight: '400',
  },
  btnStyleAlternate: {
    backgroundColor: '#fff',
    marginTop: deviceHeight * 0.01,
    height: deviceHeight * 0.06,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  capture: {
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#dedede',
    borderRadius: 40,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});
