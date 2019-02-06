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
  profileInfoMainViewStyle: {
    backgroundColor: '#00b1fb',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: deviceHeight * 0.05,
  },
  circularAvatarTextStyle: {
    textAlign: 'center',
    position: 'absolute',
    color: 'white',
    fontSize: 20,
  },
  profileInfoTitleStyle: {
    fontSize: 17,
    alignSelf: 'center',
    color: '#030303',
  },
  profileInfoSubTitleStyle: {
    fontSize: 15,
    color: '#030303',
  },
  detailCardMainViewStyle: {
    backgroundColor: 'rgb(0, 177, 255)',
    height: deviceHeight * 0.15,
    width: deviceWidth * 0.8,
    borderRadius: 5,
    marginTop: deviceHeight * 0.05,
  },
  detailCardTopViewStyle: {
    backgroundColor: 'rgb(40,190,253)',
    height: deviceHeight * 0.06,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  detailCardTopTitleStyle: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
    textAlign: 'center',
  },
  detailCardSubTitleTextStyle: {
    color: 'white',
  },
  detailCardBottomViewStyle: {
    position: 'absolute',
    // right: 10,
    alignSelf: 'center',
    bottom: 20,
  },
  detailCardBottomTitleTextStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  detailCardBottomSubTitleTextStyle: {
    color: 'white',
    textAlign: 'right',
  },
  imageStyle: {
    height: deviceHeight * 0.03,
    width: deviceWidth * 0.1,
  },
  cardStyle: {
    backgroundColor: '#f4f4f4',
    width: deviceWidth * 0.8,
    marginTop: deviceHeight * 0.04,
    borderRadius: 5,
    // alignSelf: 'center',
  },
  cardTitleStyle: { fontSize: 14, color: 'rgba(3, 3, 3, 0.9)' },
  cardsubtitleStyle: { fontSize: 12, color: 'rgba(0, 177, 255, 0.9)' },
  seperaterStyle: {
    backgroundColor: '#000000',
    width: deviceWidth * 0.6,
    opacity: 0.05,
    height: 1,
    alignSelf: 'center',
  },
});
