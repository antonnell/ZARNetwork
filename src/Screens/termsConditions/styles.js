import { deviceHeight, deviceWidth } from '../../common/constants';

const headerHeight = deviceHeight < 810 ? 84 : (106 / 812) * deviceHeight;
const style = {
  mainContainerStyle: {
    flex: 1,
  },
  statusBarStyle: {
    height: 20,
  },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  spinnerStyle: {
    height: deviceHeight - headerHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
  },
};

export default style;
