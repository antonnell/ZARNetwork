import { Dimensions, StyleSheet } from 'react-native';
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
  textStyle: {
    color: 'rgb(0, 169, 252)',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: deviceWidth * 0.25,
  },
  rightTextStyle: { position: 'absolute', right: 12, alignSelf: 'center' },
  rightTextValueStyle: {
    color: 'rgb(0, 177, 251)',
    fontSize: 15,
  },
  mainStyle: {
    width: deviceWidth,
    marginTop: deviceHeight * 0.05,
  },
  recentTextStyle: {
    marginLeft: deviceWidth * 0.1,
    fontSize: 16,
    color: 'rgb(3,3,3)',
    fontWeight: '600',
  },
});
