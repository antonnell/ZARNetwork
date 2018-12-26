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
import ConfirmPayment from './src/Screens/pay/confirmPayment/index';

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
    BeneficiaryDetails: {
      screen: BeneficiaryDetails,
    },
    PayBeneficiary: {
      screen: PayBeneficiary,
    },
    ConfirmPayment: {
      screen: ConfirmPayment,
    },
  },
  {
    initialRouteName: 'ConfirmPayment',
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

// <ToggleButton
// defaultValue={toggleState}
// onChangeValue={() => this.updateToggleClick()}
// />
// updateToggleClick() {
//   const { toggleState } = this.state,
//       { SendNotificationStatus } = this.props,
//       data = {
//           deviceId: DeviceInfo.getUniqueID(),
//           notificationStatus: toggleState,
//       };
//   this.setState({
//       toggleState: !toggleState,
//   });
//   SendNotificationStatus(data).then(res => {
//       console.log(res, 'resData');
//   });
// }
