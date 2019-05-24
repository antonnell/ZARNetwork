import { StyleSheet } from 'react-native';
// Constants
import { deviceWidth, deviceHeight } from '../../common/constants';

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
    backgroundColor: '#212c41',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: deviceHeight * 0.025,
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
  titleCardMainViewStyle: {
    marginTop: deviceHeight * 0.1,
    width: deviceWidth * 0.8,
    padding: 15,
    backgroundColor: 'rgb(0, 177, 255)',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleCardImageStyle: {
    flex: 1,
    height: 30,
    width: 30,
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
    left: -(deviceWidth * 0.25),
    width: deviceWidth * 0.78,
    maxHeight: deviceHeight * 0.3,
  },
});
