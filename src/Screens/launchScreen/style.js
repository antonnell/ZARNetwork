import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
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
