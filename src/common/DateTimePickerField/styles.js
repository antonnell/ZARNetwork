import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 7,
    borderColor: '#cbcbcb',
    borderWidth: 2,
    marginBottom: 8,
  },
  textStyle: { color: '#8b8b8b', marginLeft: 8 },
  imgViewStyle: { flex: 1, alignItems: 'flex-end', marginRight: 8 },
  imgStyle: { height: 20, width: 20 },
});
