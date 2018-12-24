import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, SceneMap } from 'react-native-tab-view';
import Home from '../../images/Home.png';
import More from '../../images/More.png';
import Exchange from '../../images/Exchange.png';
import PayIcon from '../../images/Pay.png';
import Receive from '../../images/Receive.png';
import HomePage from '../homePage';
import Pay from '../pay/index';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: 'blue' }} />;
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
    paddingTop: 10,
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
      index: 0,
      routes: [
        { key: 'home', title: 'Home', icon: Home },
        { key: 'exchange', title: 'Exchange', icon: Exchange },
        { key: 'pay', title: 'Pay', icon: PayIcon },
        { key: 'receive', title: 'Receive', icon: Receive },
        { key: 'more', title: 'More', icon: More },
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
            outputRange: inputRange.map(inputIndex => (inputIndex === i ? '#D6356C' : '#222')),
          });
          return (
            <TouchableOpacity style={styles.tabItem} onPress={() => this.setState({ index: i })}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* <MaterialCommunityIcons name={route.icon} size={30} /> */}
                <Image
                  source={route.icon}
                  style={{ resizeMode: 'contain', height: deviceHeight * 0.03, color: 'black' }}
                />
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = SceneMap({
    home: HomePage,
    exchange: SecondRoute,
    pay: Pay,
    receive: SecondRoute,
    more: SecondRoute,
  });

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
