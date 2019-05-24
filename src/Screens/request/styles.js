import { StyleSheet, Dimensions } from 'react-native';
// Constants
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(0, 177, 255)',
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  rejectBtnStyle: {
    backgroundColor: 'rgb(0, 177, 255)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  acceptBtnStyle: {
    backgroundColor: '#fff',
  },
  rejectBtnTextColor: {
    color: '#fff',
  },
  acceptBtnTextColor: {
    color: 'rgb(0, 177, 255)',
  },
  textLeft: {
    fontSize: 16,
    width: '50%',
    color: '#fff',
  },
  textRight: {
    fontSize: 16,
    width: '50%',
    textAlign: 'right',
    color: '#fff',
  },
  pairContainer: {
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
  },
  pairsContainer: {
    padding: 8,
  },
  border: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  help: {
    color: '#fff',
  },
});
