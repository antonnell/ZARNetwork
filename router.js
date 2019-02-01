import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CreatePin from './src/Screens/createPin';
import Phone from './src/Screens/phoneVerify';
import Login from './src/Screens/login';
import Register from './src/Screens/register';
import Home from './src/Screens/homePage';
import RegistrationSuccess from './src/Screens/registrationSuccess';
import TabBarView from './src/Screens/tabBar';
import BeneficiaryDetails from './src/Screens/pay/beneficiaryDetails';
import PayBeneficiary from './src/Screens/pay/payBeneficiary/index';
import CreateWallet from './src/Screens/createWallet';
import PaymentNotification from './src/Screens/paymentNotification';
import ConfirmPayment from './src/Screens/pay/confirmPayment/index';
import StartScreen from './src/Screens/startScreen';
import QRScanner from './src/common/QRScanner/view';
import Pay from './src/Screens/pay/index';
import AccountDetail from './src/Screens/homePage/account-detail';
import PaymentSuccess from './src/Screens/pay/paymentSuccess/index';
import ViewBeneficiaryList from './src/Screens/pay/allBeneficiaryList';
import LaunchScreen from './src/Screens/launchScreen';
import TermsConditions from './src/Screens/termsConditions';
import ProfileScreen from './src/Screens/profileScreen';
import ResetPassword from './src/Screens/resetPassword';
import UpdatePassword from './src/Screens/resetPassword/updatePassword';
import LoginWithPin from './src/Screens/login/pinLogin';

const Routing = createStackNavigator(
  {
    CreatePin: {
      screen: CreatePin,
    },
    Home: {
      screen: Home,
      navigationOptions: {
        gesturesEnabled: false,
      },
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
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    BeneficiaryDetails: {
      screen: BeneficiaryDetails,
    },
    PaymentSuccess: {
      screen: PaymentSuccess,
    },
    PayBeneficiary: {
      screen: PayBeneficiary,
    },
    CreateWallet: {
      screen: CreateWallet,
    },
    ConfirmPayment: {
      screen: ConfirmPayment,
    },
    PaymentNotification: {
      screen: PaymentNotification,
    },
    StartScreen: {
      screen: StartScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    QRScanner: {
      screen: QRScanner,
    },
    PaySomeone: {
      screen: Pay,
    },
    AccountDetail: {
      screen: AccountDetail,
    },
    ViewBeneficiaryList: {
      screen: ViewBeneficiaryList,
    },
    LaunchScreen: {
      screen: LaunchScreen,
    },
    TermsConditions: {
      screen: TermsConditions,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    ResetPassword: {
      screen: ResetPassword,
    },
    UpdatePassword: {
      screen: UpdatePassword,
    },
    LoginWithPin: {
      screen: LoginWithPin,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'LaunchScreen',
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
