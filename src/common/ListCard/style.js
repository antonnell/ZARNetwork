import { StyleSheet } from 'react-native';
// Constants
import { deviceWidth } from '../constants';

export default StyleSheet.create({
  listContainerStyle: {
    backgroundColor: '#fff',
    marginLeft: deviceWidth * 0.27,
    position: 'absolute',
    opacity: 1,
    top: 40,
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
