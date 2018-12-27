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
  createWalletImageViewStyle: {
    marginTop: deviceHeight * 0.1,
  },
  createWalletImageStyle: {
    height: deviceHeight * 0.06,
  },
  createWalletTextViewStyle: {
    marginTop: deviceHeight * 0.01,
  },
  createWalletTextStyle: {
    color: 'rgb(0, 0, 0)',
    fontWeight: 'normal',
    fontSize: 14,
  },
  bottomViewStyle: {
    marginTop: deviceHeight * 0.09,
    // backgroundColor: 'orange',
    flex: 1,
    width: deviceWidth,
    alignSelf: 'flex-start',
    padding: deviceWidth * 0.1,
    position: 'relative',
  },
  accountViewStyle: {
    padding: 4,
    marginBottom: 4,
  },
  accountTextStyle: { fontSize: 16 },
  accountListViewStyle: {
    backgroundColor: 'rgb(0, 169, 252)',
    width: deviceWidth * 0.76,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    zIndex: 99,
  },
  accSymbolViewStyle: { flex: 1, paddingLeft: 10 },
  accSymbolTextStyle: { fontSize: 16, color: '#fff' },
  dropdownIconStyle: { color: '#fff' },
  accDropdownViewStyle: { flex: 1, alignItems: 'flex-end', paddingRight: 10 },
  accNameTextStyle: { fontSize: 16 },
  accNameViewStyle: {
    marginTop: 10,
    width: deviceWidth * 0.8,
  },
  buttonViewStyle: { marginTop: deviceHeight * 0.07 },
});
