import React, { Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import StatusBar from '../../common/StatusBar';
import TitleHeader from '../../common/TitleHeader';

import styles from './styles';
/**
 * TermsConditions :  This component is meant for displaying legal requirements of the application.
 */

export default class TermsConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleGoBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <View style={styles.mainContainerStyle}>
        <StatusBar />

        <TitleHeader
          title="TERMS OF SERVICE"
          isBackArrow
          iconName="keyboard-arrow-left"
          onBtnPress={this.handleGoBack}
        />

        <Text
          style={{
            textAlign: 'justify',
            width: deviceWidth * 0.9,
            fontSize: 16,
            fontWeight: '400',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Est sit amet facilisis magna etiam tempor. Ullamcorper
          dignissim cras tincidunt lobortis feugiat vivamus. At in tellus integer feugiat
          scelerisque varius morbi enim nunc. Felis imperdiet proin fermentum leo vel orci porta
          non. In dictum non consectetur a erat nam. Turpis egestas integer eget aliquet nibh
          praesent tristique magna sit. Turpis egestas maecenas pharetra convallis posuere morbi.
          Suspendisse interdum consectetur libero id faucibus. Nulla facilisi morbi tempus iaculis
          urna id volutpat lacus laoreet. Interdum velit euismod in pellentesque massa placerat duis
          ultricies. Eget magna fermentum iaculis eu non diam phasellus. Ultrices sagittis orci a
          scelerisque purus semper eget duis at. Etiam tempor orci eu lobortis elementum nibh tellus
          molestie nunc. Non pulvinar neque laoreet suspendisse interdum consectetur libero id
          faucibus. Erat pellentesque adipiscing commodo elit at imperdiet dui. Nulla at volutpat
          diam ut venenatis tellus in. Pulvinar pellentesque habitant morbi tristique senectus et
          netus et malesuada. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Ac
          placerat vestibulum lectus mauris. Porta non pulvinar neque laoreet suspendisse interdum
          consectetur libero id. Quis vel eros donec ac odio tempor orci. Amet massa vitae tortor
          condimentum lacinia quis vel. Viverra accumsan in nisl nisi scelerisque. Leo a diam
          sollicitudin tempor id eu nisl. Ultricies leo integer malesuada nunc vel. Dignissim diam
          quis enim lobortis. Orci phasellus egestas tellus rutrum tellus. Suspendisse in est ante
          in nibh mauris cursus mattis molestie. Condimentum mattis pellentesque id nibh.
          Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Gravida
          dictum fusce ut placerat. Ut porttitor leo a diam sollicitudin. Aliquam malesuada bibendum
          arcu vitae elementum curabitur. Pellentesque elit eget gravida cum sociis natoque
          penatibus et magnis. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Viverra
          suspendisse potenti nullam ac. Rhoncus aenean vel elit scelerisque mauris pellentesque
          pulvinar pellentesque. Varius morbi enim nunc faucibus a pellentesque. Sit amet aliquam id
          diam. Rhoncus est pellentesque elit ullamcorper dignissim cras. Mi in nulla posuere
          sollicitudin aliquam ultrices sagittis orci. Mollis aliquam ut porttitor leo a diam
          sollicitudin. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Neque egestas
          congue quisque egestas diam. Pretium fusce id velit ut. Odio ut sem nulla pharetra diam
          sit. Elit ut aliquam purus sit amet luctus. Diam vulputate ut pharetra sit amet aliquam.
          Varius vel pharetra vel turpis. Sed lectus vestibulum mattis ullamcorper velit sed
          ullamcorper. In eu mi bibendum neque egestas congue quisque egestas diam. Id diam maecenas
          ultricies mi eget. Ac auctor augue mauris augue neque gravida in. Risus feugiat in ante
          metus dictum at tempor. Vitae tempus quam pellentesque nec nam aliquam sem et. Elit
          pellentesque habitant morbi tristique senectus et. Erat pellentesque adipiscing commodo
          elit. Sagittis purus sit amet volutpat consequat mauris nunc. Ut lectus arcu bibendum at
          varius vel pharetra vel turpis. Facilisi cras fermentum odio eu feugiat. Enim ut sem
          viverra aliquet. Convallis tellus id interdum velit laoreet. Consequat ac felis donec et
          odio pellentesque diam volutpat commodo. Velit laoreet id donec ultrices tincidunt arcu.
          Laoreet suspendisse interdum consectetur libero. Iaculis eu non diam phasellus vestibulum
          lorem sed risus. Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.
          Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Id aliquet
          lectus proin nibh nisl condimentum id venenatis. Id diam vel quam elementum. Vel quam
          elementum pulvinar etiam non quam lacus. Mauris sit amet massa vitae tortor condimentum
          lacinia. Condimentum vitae sapien pellentesque habitant morbi tristique. Arcu non odio
          euismod lacinia at. Turpis tincidunt id aliquet risus feugiat. Pretium lectus quam id leo
          in vitae turpis massa sed. Pharetra vel turpis nunc eget lorem dolor. Vestibulum lorem sed
          risus ultricies tristique nulla aliquet. Ut venenatis tellus in metus vulputate. Id
          aliquet risus feugiat in ante metus dictum. Diam vulputate ut pharetra sit. Dui faucibus
          in ornare quam viverra orci sagittis eu volutpat. Ultricies tristique nulla aliquet enim
          tortor at auctor urna. A diam maecenas sed enim ut sem viverra. Tincidunt vitae semper
          quis lectus nulla at volutpat. Enim diam vulputate ut pharetra sit amet. Faucibus et
          molestie ac feugiat sed lectus. Cras pulvinar mattis nunc sed blandit libero volutpat sed
          cras. Gravida in fermentum et sollicitudin ac. Viverra suspendisse potenti nullam ac
          tortor vitae purus. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi.
          Commodo viverra maecenas accumsan lacus vel facilisis. Sed odio morbi quis commodo odio
          aenean sed adipiscing diam. Aliquet eget sit amet tellus cras adipiscing enim eu turpis.
          Viverra justo nec ultrices dui sapien eget. Adipiscing enim eu turpis egestas pretium
          aenean pharetra. Sed velit dignissim sodales ut eu. Vitae elementum curabitur vitae nunc
          sed velit dignissim. Sit amet est placerat in egestas erat. Eleifend quam adipiscing vitae
          proin sagittis nisl. Diam ut venenatis tellus in metus vulputate. Molestie ac feugiat sed
          lectus vestibulum. Vivamus at augue eget arcu dictum varius duis at consectetur. Nisl vel
          pretium lectus quam id leo in. Et malesuada fames ac turpis egestas. Vitae congue eu
          consequat ac felis. Dolor morbi non arcu risus quis. Purus sit amet luctus venenatis. Eget
          mi proin sed libero enim sed faucibus. Ut placerat orci nulla pellentesque dignissim enim
          sit amet. Viverra orci sagittis eu volutpat odio. Ultricies integer quis auctor elit. In
          aliquam sem fringilla ut morbi tincidunt. Tortor aliquam nulla facilisi cras. Eleifend
          donec pretium vulputate sapien nec sagittis. Justo nec ultrices dui sapien eget mi. Duis
          convallis convallis tellus id. Feugiat pretium nibh ipsum consequat. Risus feugiat in ante
          metus. Est ullamcorper eget nulla facilisi. Pellentesque sit amet porttitor eget. Tempus
          iaculis urna id volutpat lacus laoreet non curabitur gravida. Amet mauris commodo quis
          imperdiet massa. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate.
          In nibh mauris cursus mattis molestie a. Vitae tempus quam pellentesque nec nam aliquam
          sem et. At risus viverra adipiscing at in tellus. Vestibulum mattis ullamcorper velit sed
          ullamcorper morbi. Etiam dignissim diam quis enim lobortis. Ut sem viverra aliquet eget
          sit amet tellus. Maecenas pharetra convallis posuere morbi. Et molestie ac feugiat sed
          lectus vestibulum mattis. Sit amet nisl purus in mollis nunc sed id. Dignissim convallis
          aenean et tortor at risus. Dui id ornare arcu odio ut sem nulla. In tellus integer feugiat
          scelerisque varius morbi. Tellus in metus vulputate eu. Sed blandit libero volutpat sed
          cras. Eleifend quam adipiscing vitae proin. Dolor morbi non arcu risus quis varius quam.
          Nulla facilisi nullam vehicula ipsum a arcu cursus. Mi in nulla posuere sollicitudin
          aliquam ultrices sagittis. Metus aliquam eleifend mi in.
        </Text>

        {visible && (
          <View style={styles.spinnerStyle}>
            <ActivityIndicator size="large" color="rgb(0, 177, 255)" />
          </View>
        )}
      </View>
    );
  }
}
TermsConditions.defaultProps = {
  navigation: null,
};
TermsConditions.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};
