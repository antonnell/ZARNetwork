import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
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
});
