import { deviceWidth, deviceHeight } from '../../common/constants';

const style = {
  imageBackground: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: deviceWidth * 0.6,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
};

export default style;
