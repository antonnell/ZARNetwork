import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/Screens/homeScreen";
import Phone from "./src/Screens/phoneVerify";
import Login from "./src/Screens/login";
import EncryptDecrypt from "./src/Screens/encryptDecrypt";

const Routing = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Phone: {
      screen: Phone
    },
    Login: {
      screen: Login
    }
    // EncryptDecrypt: {
    //   screen: EncryptDecrypt
    // }
  },
  {
    initialRouteName: "Login",
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
