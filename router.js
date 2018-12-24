import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CreatePin from './src/Screens/createPin';
import Phone from './src/Screens/phoneVerify';
import Login from './src/Screens/login';
import Register from './src/Screens/register';
import Home from './src/Screens/homePage';
import RegistrationSuccess from './src/Screens/registrationSuccess';
import TabBarView from './src/Screens/tabBar';

const Routing = createStackNavigator(
  {
    CreatePin: {
      screen: CreatePin,
    },
    Home: {
      screen: Home,
    },
    Phone: {
      screen: Phone,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    RegistrationSuccess: {
      screen: RegistrationSuccess,
    },
    TabBarView: {
      screen: TabBarView,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);
const AppContainer = createAppContainer(Routing);

const Router = () => <AppContainer />;

export default Router;
