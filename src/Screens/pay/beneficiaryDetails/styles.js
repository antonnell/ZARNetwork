import { StyleSheet } from 'react-native';
import { Dimensions, Platform } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  searchStyle: {
    marginLeft: deviceWidth * 0.8,
  },
  headerStyle: {
    width: deviceWidth - 32,
    marginTop: deviceHeight * 0.08,
    flexDirection: 'row',
    height: 20,
  },
  headerTextStyle: {
    alignItems: 'center',
  },
  textFieldStyle: {
    marginTop: deviceHeight * 0.01,
    width: deviceWidth * 0.8,
  },
  textStyle: {
    width: deviceWidth - 32,
    textAlign: 'center',
    color: 'rgb(0, 169, 252)',
    fontWeight: '600',
    fontSize: 15,
  },
  cardStyle: {
    backgroundColor: 'rgb(0, 169, 252)',
    width: deviceWidth * 0.9,
    marginTop: deviceHeight * 0.04,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardTextStyle: { fontSize: 20, color: 'white', marginLeft: deviceHeight * 0.01 },
  seperaterStyle: {
    backgroundColor: 'white',
    width: deviceWidth * 0.8,
    height: 1,
    alignSelf: 'center',
  },
  // textStyle: {
  //   color: 'rgb(0, 169, 252)',
  //   fontWeight: '600',
  //   fontSize: 15,
  //   marginLeft: deviceWidth * 0.25,
  // },
  rightTextStyle: { position: 'absolute', right: 12, alignSelf: 'center' },
  rightTextValueStyle: {
    color: 'rgb(0, 177, 251)',
    fontSize: 15,
  },
  titleCardMainViewStyle: {
    marginTop: deviceHeight * 0.1,
    width: deviceWidth * 0.8,
    // height: deviceHeight * 0.1,
    padding: 15,
    backgroundColor: 'rgb(0, 177, 251)',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  titleCardImageStyle: {
    resizeMode: 'contain',
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.1,
  },
  titleCardTextStyle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 14,
  },
});
