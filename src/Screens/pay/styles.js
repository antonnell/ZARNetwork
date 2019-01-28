import { StyleSheet } from 'react-native';
// Constants
import { deviceWidth, deviceHeight } from '../../common/constants';

export default StyleSheet.create({
  Container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  searchStyle: {
    padding: 5,
  },
  cardStyle: {
    backgroundColor: 'rgb(0, 169, 252)',
    width: deviceWidth * 0.9,
    marginTop: deviceHeight * 0.04,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardTextStyle: {
    fontSize: 20,
    color: 'white',
    marginLeft: deviceHeight * 0.01,
    fontFamily: 'Roboto-Regular',
  },
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
    fontFamily: 'Roboto-Regular',
  },
  recentCardContainerstyle: {
    flexDirection: 'row',
    width: deviceWidth * 0.9,
    backgroundColor: '#f4f4f4',
    alignSelf: 'center',
    height: deviceHeight * 0.1,
    borderRadius: 5,
    marginTop: 10,
  },
  recentCardHeaderStyle: {
    backgroundColor: '#00b1fb',
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    justifyContent: 'center',
  },
  recentCardHeaderTextStyle: {
    fontFamily: 'Roboto-Light',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  recentCardDetailViewStyle: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentCardTextOnestyle: {
    fontFamily: 'Roboto-Regular',
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentCardTextTwoStyle: {
    fontFamily: 'Roboto-Light',
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
});
