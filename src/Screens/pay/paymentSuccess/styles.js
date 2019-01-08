import { Dimensions, StyleSheet } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  registrationText: {
    marginTop: 20,
    width: deviceWidth * 0.5,
    textAlign: 'center',
    fontSize: 24,
    color: 'rgb(0,177,251)',
    fontWeight: 'bold',
  },
  accountTextStyle: {
    fontSize: 15,
    paddingLeft: 26,
  },
  imageStyle: { width: 100, height: 100 },
  textStyle: { fontSize: 15 },
});
