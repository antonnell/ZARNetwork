import { Dimensions, StyleSheet } from 'react-native';
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
    backgroundColor: 'rgb(0, 177, 251)',
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
  titleCardMainViewStyle: {
    marginTop: deviceHeight * 0.1,
    width: deviceWidth * 0.8,
    padding: 15,
    backgroundColor: 'rgb(0, 177, 251)',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleCardImageStyle: {
    flex: 1,
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.1,
  },
  titleCardTextStyle: {
    flex: 5,
    color: 'white',
    fontSize: 16,
    marginLeft: 14,
  },
  notificationImageStyle: {
    height: deviceHeight * 0.03,
    width: deviceWidth * 0.1,
  },
  notificationTextStyle: {
    color: 'white',
    fontSize: 15,
    marginLeft: 8,
  },
  notificationMaterialIconStyle: {
    marginLeft: deviceHeight * 0.04,
  },
  toggleContainerStyle: {
    marginTop: deviceHeight * 0.05,
    backgroundColor: 'rgb(244,244,244)',
    alignSelf: 'center',
    width: deviceWidth * 0.8,
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 4,
    shadowColor: 'rgba(0,0,0,0.2)',
    elevation: 4,
  },
  toggleTextStyle: {
    fontSize: 14,
    color: 'rgba(3,3,3,0.9)',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: deviceWidth * 0.75,
    alignSelf: 'center',
  },
  listStyling: {
    top: deviceHeight < 675 ? deviceHeight * 0.195 : deviceHeight * 0.185,
    left: -(deviceWidth * 0.26),
    width: deviceWidth * 0.78,
    maxHeight: deviceHeight * 0.3,
  },
});
