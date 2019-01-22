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
  // headerStyle: {
  //   width: deviceWidth - 32,
  //   marginTop: deviceHeight * 0.08,
  //   flexDirection: 'row',
  //   height: 20,
  // },
  // headerTextStyle: {
  //   alignItems: 'center',
  // },
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
    backgroundColor: '#030303',
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
  },
  profileInfoSubTitleStyle: {
    fontSize: 15,
  },
  detailCardMainViewStyle: {
    backgroundColor: 'rgb(0,177,251)',
    height: deviceHeight * 0.3,
    width: deviceWidth * 0.7,
    borderRadius: 5,
    marginLeft: 20,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 3.7 },
    shadowRadius: 5.3,
    shadowColor: 'rgba(127, 127, 127, 0.15)',
    elevation: 4,
  },
  detailCardTopViewStyle: {
    backgroundColor: 'rgb(40,190,253)',
    height: deviceHeight * 0.1,
    padding: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  detailCardTopTitleStyle: {
    color: 'white',
    fontSize: 15,
  },
  detailCardSubTitleTextStyle: {
    color: 'white',
  },
  detailCardBottomViewStyle: {
    position: 'absolute',
    right: 10,
    bottom: 30,
  },
  detailCardBottomTitleTextStyle: {
    color: 'white',
    fontSize: 28,
  },
  detailCardBottomSubTitleTextStyle: {
    color: 'white',
    textAlign: 'right',
  },
  walletOptionContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletOptionIconViewStyle: {
    backgroundColor: 'rgb(0, 169, 252)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletOptionTextStyle: {
    fontSize: deviceWidth < 375 ? 12 : 14,
    marginTop: deviceHeight * 0.01,
  },
  walletIconImgStyle: {
    width: 20,
    height: 20,
  },
  walletIconTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  renderCardContainer: {
    height: deviceHeight * 0.3,
    width: deviceWidth,
    paddingVertical: 10,
    // backgroundColor: 'red',
  },
  accountCardMainViewStyle: {
    backgroundColor: 'rgba(123,123,123,0.1)',
    // height: deviceHeight * 0.1,
    width: deviceWidth * 0.8,
    borderRadius: 5,

    alignSelf: 'center',
    paddingLeft: 10,
    marginBottom: 20,
    paddingTop: 5,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 3.7 },
    shadowRadius: 5.3,
    shadowColor: 'rgba(127, 127, 127, 0.15)',
    elevation: 4,
  },
  accountCardrightBottomTextStyle: {
    textAlign: 'right',
    right: 10,
    color: 'rgba(0,177,255,1)',
  },
  accountCardTopTitleStyle: {
    color: 'black',
    fontSize: 15,
  },
  accountCardSubTitleTextStyle: {
    color: 'black',
  },
});