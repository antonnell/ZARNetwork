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
    backgroundColor: '#212c41',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: deviceHeight * 0.05,
  },
  circularAvatarTextStyle: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconStyle: {
    color: '#212c41',
  },
  profileInfoTitleStyle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  profileInfoSubTitleStyle: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
  },
  detailCardMainViewStyle: {
    backgroundColor: '#212c41',
    height: deviceHeight * 0.3,
    width: deviceWidth * 0.8,
    borderRadius: 7,
    marginLeft: 20,
  },
  detailCardTopViewStyle: {
    backgroundColor: '#212c41',
    height: deviceHeight * 0.1,
    padding: 20,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  detailCardTopTitleStyle: {
    fontFamily: 'Roboto-Regular',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  detailCardSubTitleTextStyle: {
    color: 'white',
    fontFamily: 'Roboto-Light',
  },
  detailCardBottomViewStyle: {
    position: 'absolute',
    right: 10,
    bottom: 30,
  },
  detailCardBottomTitleTextStyle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Roboto-Light',
  },
  detailCardBottomSubTitleTextStyle: {
    color: 'white',
    textAlign: 'right',
    fontFamily: 'Roboto-Light',
  },
  walletOptionContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  walletOptionIconViewStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#212c41',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletOptionTextStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: deviceWidth < 375 ? 12 : 14,
    marginTop: deviceHeight * 0.02,
  },
  walletIconImgStyle: {
    width: 30,
    height: 30,
  },
  walletIconTextStyle: {
    color: '#212c41',
    fontWeight: 'bold',
  },
  renderCardContainer: {
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
    shadowColor: 'rgba(127, 127, 127,0.15)',
    elevation: 4,
  },
  accountCardrightBottomTextStyle: {
    textAlign: 'right',
    right: 10,
    color: 'rgba(0,177,255,1)',
    fontFamily: 'Roboto-Regular',
  },
  accountCardTopTitleStyle: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  accountCardSubTitleTextStyle: {
    color: 'black',
    fontFamily: 'Roboto-Light',
  },

  accountCardListItemOneStyle: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  accountCardListItemTwoStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  scrollViewStyle: {
    height: deviceHeight,
    width: deviceWidth,
  },
  quickMenuViewStyle: {
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.05,
    flexDirection: 'row',
    width: deviceWidth * 0.8,
  },
  accountCardMainContainerStyle: {
    marginTop: deviceHeight * 0.1,
  },
  accountTextViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  accountTextSubViewStyle: { width: deviceWidth * 0.85, alignSelf: 'center' },
  accountTextStyle: { fontSize: 16, fontFamily: 'Roboto-Medium' },
  emptyViewStyle: { height: deviceHeight * 0.05 },
  accCardScrollViewStyle: {
    flex: 1,
  },
  accCardScrollEmptyViewStyle: { width: deviceWidth * 0.02 },
});
