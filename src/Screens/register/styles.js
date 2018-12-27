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
  // headerStyle: {
  //   width: deviceWidth - 32,
  //   marginTop: deviceHeight * 0.08,
  //   flexDirection: "row"
  // },
  // headerTextStyle: {
  //   alignItems: "center",
  //   position: "absolute",
  //   width: deviceWidth - 32
  // },
  FantomPayLogoContainer: {
    marginTop: deviceHeight * 0.1,
    marginBottom: deviceHeight * 0.06,
  },
  loginButtonContainer: {
    marginTop: deviceHeight * 0.03,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  FantomPayLogoImageStyle: {
    resizeMode: 'contain',
    height: deviceHeight * 0.15,
  },
  textFieldStyle: {
    marginTop: deviceHeight * 0.01,
    width: deviceWidth * 0.8,
  },
  textStyle: {
    color: 'rgb(0, 169, 252)',
    fontWeight: '600',
    fontSize: deviceWidth < 375 ? 14 : 16,
  },
  passwordConstraints: {
    flexDirection: 'row',
    width: deviceWidth * 0.8,
    justifyContent: 'space-between',
  },
  constraintsTextStyle: {
    fontSize: deviceWidth < 375 ? 12 : 14,
    color: 'rgb(3,3,3)',
    paddingLeft: 3,
  },
});
