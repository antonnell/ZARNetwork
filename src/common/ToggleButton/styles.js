// Library
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  animatedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeShadow: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00BCD4',
    overflow: 'hidden',
  },
  inactiveShadow: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DEDFE2',
    overflow: 'hidden',
  },
  activeButtonShadow: {
    shadowOpacity: 0.24,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
  },
  inactiveButtonShadow: {
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowColor: '#000',
  },
});
