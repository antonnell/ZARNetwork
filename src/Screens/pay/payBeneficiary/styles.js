import { StyleSheet } from 'react-native';
import { Dimensions, Platform } from 'react-native';
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
    marginTop: deviceHeight * 0.05,
    width: deviceWidth * 0.8,
    // height: deviceHeight * 0.1,
    padding: 12,
    backgroundColor: 'rgb(0, 177, 251)',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  titleCardImageStyle: {
    resizeMode: 'contain',
    height: deviceHeight * 0.03,
    width: deviceWidth * 0.1,
  },
  titleCardTextStyle: {
    color: 'white',
    fontSize: 15,
    marginLeft: 12,
  },
  titleMaterialIconStyle: {
    marginLeft: deviceHeight * 0.18,
  },
  notificationImageStyle: {
    resizeMode: 'contain',
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
});
