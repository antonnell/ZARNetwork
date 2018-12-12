import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/Screens/homeScreen";

const Routing = createStackNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: "Home",
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
