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
  createWalletImageViewStyle: {
    marginTop: deviceHeight * 0.1,
  },
  createWalletImageStyle: {
    resizeMode: 'contain',
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
  listContainerStyle: {
    backgroundColor: '#fff',
    marginLeft: deviceWidth * 0.27,
    position: 'absolute',
    opacity: 1,
    top: 38,
    width: deviceWidth * 0.7,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  listStyle: {
    margin: 2,
    alignContent: 'center',
  },
  listItemStyle: {
    flexDirection: 'row',
    padding: 1,
  },
  listButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  accNameTextStyle: { fontSize: 16 },
  accNameViewStyle: {
    marginTop: 10,
    width: deviceWidth * 0.8,
  },
  buttonViewStyle: { marginTop: deviceHeight * 0.07 },
});
