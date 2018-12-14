import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/Screens/homeScreen";
import Phone from './src/Screens/phoneVerify';

const Routing = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Phone: {
      screen: Phone
    },
  },
  {
    initialRouteName: "Phone",
    headerMode: "none",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
const AppContainer = createAppContainer(Routing);

const Router = () => <AppContainer />;

export default Router;
