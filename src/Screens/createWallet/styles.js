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
    marginTop: deviceHeight * 0.06,
    flex: 1,
    alignSelf: 'center',
    width: deviceWidth * 0.8,
    position: 'relative',
  },
  accountViewStyle: {
    padding: 4,
    marginBottom: 4,
  },
  accountTextStyle: { fontSize: 16 },
  accountListViewStyle: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'lightgray',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    zIndex: 99,
  },
  accSymbolViewStyle: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  accSymbolTextStyle: { fontSize: 16, color: '#fff' },
  dropdownIconStyle: { color: '#888888', fontSize: 35 },
  accDropdownViewStyle: {
    alignItems: 'center',
    height: 40,
    width: 50,
    justifyContent: 'center',
  },
  accNameTextStyle: { fontSize: 16 },
  accNameViewStyle: {
    marginTop: 10,
    width: '100%',
  },
  buttonViewStyle: {
    marginTop: deviceHeight * 0.07,
    width: deviceWidth * 0.7,
    flex: 1,
    alignSelf: 'center',
  },
});
