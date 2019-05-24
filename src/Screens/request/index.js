/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import StartScreenIcon from '../../images/startScreenIcon.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import DesignButton from '../../common/Button';
import StatusBar from '../../common/StatusBar';
import Loader from '../../common/Loader';
import { updatePayRequestDetail } from '../../controllers/api/paymentRequest';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class RequestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onAcceptBtnClick = this.onAcceptBtnClick.bind(this);
    this.onRejectBtnClick = this.onRejectBtnClick.bind(this);
    this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
    this.onHelpBtnClick = this.onHelpBtnClick.bind(this);
    this.renderLoader = this.renderLoader.bind(this);

  };

  async componentDidMount() {
    let pushRequestString = await AsyncStorage.getItem('pushRequest');
    if(pushRequestString && pushRequestString != '' && pushRequestString != null) {
      let pushRequest = JSON.parse(pushRequestString)
      this.setState({pushRequest})
      AsyncStorage.removeItem('pushRequest', (err) => console.log('pushRequest', err))
      // AsyncStorage.removeItem('pushRequest')
    }
  };

  onAcceptBtnClick() {
    const { navigation } = this.props;
    const payload = {
      request_uuid: this.state.pushRequest.request_uuid,
      status_uuid: this.state.pushRequest.accepted_uuid
    };
    this.setState({
      isLoading: true,
    });
    if (updatePayRequestDetail) {
      navigation.navigate('PaymentSuccess', {
        data: navigation.state.params,
      });
    }
    //   updatePayRequestDetail(payload)
    //     .then(res => {
    //       this.setState({
    //         isLoading: false,
    //       });
    //
    //       if (res.payload && res.payload.data && res.payload.data.status === 200) {
    //         navigation.navigate('PaymentSuccess', {
    //           data: navigation.state.params,
    //         });
    //       } else if (
    //         res &&
    //         res.error &&
    //         res.error.response &&
    //         res.error.response.data &&
    //         res.error.response.data.result
    //       ) {
    //         const { result } = res.error.response.data;
    //         Alert.alert('Error', JSON.stringify(result));
    //       } else {
    //         Alert.alert('Error', 'An error occurred');
    //       }
    //     })
    //     .catch(error => {
    //       this.setState({
    //         isLoading: false,
    //       });
    //       Alert.alert('Error', error);
    //     });
    // }
  };

  onRejectBtnClick() {
    const { navigation } = this.props;
    const payload = {
      request_uuid: this.state.pushRequest.request_uuid,
      status_uuid: this.state.pushRequest.reject_uuid
    };
    this.setState({
      isLoading: true,
    });
    if (updatePayRequestDetail) {
      updatePayRequestDetail(payload)
        .then(res => {
          this.setState({
            isLoading: false,
          });
          if (res.payload && res.payload.data && res.payload.data.status === 200) {
            navigation.navigate('PaymentSuccess', {
              data: navigation.state.params,
            });
          } else if (
            res &&
            res.error &&
            res.error.response &&
            res.error.response.data &&
            res.error.response.data.result
          ) {
            const { result } = res.error.response.data;
            Alert.alert('Error', JSON.stringify(result));
          }
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          });
          Alert.alert('Error', error);
        });
    }
  };

  onCloseBtnClick() {
    this.props.navigation.navigate('Home');
  };

  onHelpBtnClick() {
    this.props.navigation.navigate('Home');
  };

  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader isLoading={isLoading} loaderStyle={0.25} />;
    }
    return null;
  };

  render() {
    return (
      <View style={styles.container} >
        <StatusBar />
        <View style={{ width: deviceWidth * 0.9 }}>

          <View style={{ width: '100%', flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', marginTop: deviceHeight * 0.012}}>
            <TouchableOpacity onPress={this.onCloseBtnClick}>
              <MaterialCommunityIcons style='' name={'close'} size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onHelpBtnClick}>
              <Text style={styles.help}>Help</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
            <Feather style={{}} name={'alert-triangle'} size={75} color="#fff" />
          </View>

          <View style={{ margintTop: 30, marginBottom: 30 }}>
            <Text style={styles.header} >
              {this.state.pushRequest != null ? this.state.pushRequest.message : 'Request'}
            </Text>
          </View>
          <View style={styles.border} />
          <View style={styles.pairsContainer}>
            <View style={styles.pairContainer}>
              <Text style={styles.textLeft}>Sender</Text>
              <Text style={styles.textRight}>{this.state.pushRequest ? this.state.pushRequest.sender : 'Not provided'}</Text>
            </View>
            <View style={styles.pairContainer}>
              <Text style={styles.textLeft}>Reference</Text>
              <Text style={styles.textRight}>{this.state.pushRequest ? this.state.pushRequest.reference : 'Not provided'}</Text>
            </View>
            <View style={styles.pairContainer}>
              <Text style={styles.textLeft}>Amount</Text>
              <Text style={styles.textRight}>{this.state.pushRequest ? (this.state.pushRequest.value + ' ' + this.state.pushRequest.symbol): 'Not provided'}</Text>
            </View>

          </View>
          <View style={styles.border} />
        </View>
        <View style={{ marginTop: deviceWidth * 0.1, marginBottom: deviceWidth * 0.04, alignItems: 'center', }}>
          <View>
            <DesignButton
              name="Reject"
              isClickable
              btnTextColor={styles.rejectBtnTextColor}
              btnMainStyle={styles.rejectBtnStyle}
              callMethod={this.onRejectBtnClick}
            />
          </View>
          <View style={{ marginTop: deviceHeight * 0.03 }}>
            <DesignButton
              name="Accept"
              isClickable
              btnTextColor={styles.acceptBtnTextColor}
              btnMainStyle={styles.acceptBtnStyle}
              callMethod={this.onAcceptBtnClick}
            />
          </View>
          <Text style={{ marginTop: deviceHeight * 0.02, color: '#fff' }}>Only ever confirm transactions that you recognise</Text>
        </View>
        {this.renderLoader()}
      </View>
    );
  }
}
/*eslint-disable*/
RequestScreen.propTypes = {
  navigation: PropTypes.object,
};
