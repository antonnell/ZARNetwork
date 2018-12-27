/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, Image, Dimensions, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
// Black colored Images
import Home from '../../images/Home.png';
import More from '../../images/More.png';
import Exchange from '../../images/Exchange.png';
import PayIcon from '../../images/Pay.png';
import Receive from '../../images/Receive.png';
// White colored images
import HomeWhiteImg from '../../images/HomeWhite.png';
import MoreWhiteImg from '../../images/MoreWhite.png';
import ExchangeWhiteImg from '../../images/ExchangeWhite.png';
import PayWhiteIcon from '../../images/PayWhite.png';
import ReceiveWhiteImg from '../../images/ReceiveWhite.png';
// Components
import HomePage from '../homePage';
import Pay from '../pay/index';

const deviceHeight = Dimensions.get('window').height;
// const deviceWidth = Dimensions.get('window').width;

// const FirstRoute = () => <View style={{ flex: 1, backgroundColor: 'blue' }} />;
const SecondRoute = () => <View style={{ flex: 1, backgroundColor: 'green' }} />;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#e91e63',
    flexDirection: 'row',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  tabBar: {
    flexDirection: 'row',
    height: deviceHeight * 0.09,
    shadowColor: 'rgba(127,127,127, 0.1)',
    shadowOffset: {
      width: 0,
      height: -2.3,
    },
    shadowRadius: 4.2,
    shadowOpacity: 0.7,
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default class TabBarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      index: 0,
      // eslint-disable-next-line react/no-unused-state
      routes: [
        { key: 'home', title: 'Home', icon: Home, whiteIcon: HomeWhiteImg },
        { key: 'exchange', title: 'Exchange', icon: Exchange, whiteIcon: ExchangeWhiteImg },
        { key: 'pay', title: 'Pay', icon: PayIcon, whiteIcon: PayWhiteIcon },
        { key: 'receive', title: 'Receive', icon: Receive, whiteIcon: ReceiveWhiteImg },
        { key: 'more', title: 'More', icon: More, whiteIcon: MoreWhiteImg },
      ],
    };
  }

  handleIndexChange = index => this.setState({ index });

  renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex => (inputIndex === i ? '#FFF' : '#111')),
          });

          const viewColor = props.navigationState.index === i ? '#00b1ff' : '#fff';
          const iconName = props.navigationState.index === i ? route.whiteIcon : route.icon;

          return (
            <TouchableOpacity
              style={[styles.tabItem, { backgroundColor: viewColor }]}
              onPress={() => this.setState({ index: i })}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={iconName}
                  resizeMode="contain"
                  style={{ height: deviceHeight * 0.03 }}
                />
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <HomePage {...this.props} />;
      case 'exchange':
        return <SecondRoute {...this.props} />;
      case 'pay':
        return <Pay {...this.props} />;
      case 'receive':
        return <SecondRoute {...this.props} />;
      case 'more':
        return <SecondRoute {...this.props} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        tabBarPosition="bottom"
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}
