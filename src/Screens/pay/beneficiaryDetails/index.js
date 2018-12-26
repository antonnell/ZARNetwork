import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FloatLabelTextField from '../../../common/FloatLabelTextField';
import DesignButton from '../../../common/Button';
import TitleCard from '../../../common/titleCard';
import AccountType from '../../../images/AccountType.png';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// eslint-disable-next-line react/prefer-stateless-function
export default class BeneficiaryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      accountNumber: '',
      reference: '',
    };
    this.updateForm = this.updateForm.bind(this);
  }

  updateForm(value, type) {
    this.setState({ [type]: value });
  }

  validate(type) {
    // const { email } = this.state;
    if (type === 'email') {
      this.setState({
        email: '',
      });
    }
    if (type === 'account') {
      this.setState({
        accountNumber: '',
      });
    }
    if (type === 'reference') {
      this.setState({
        reference: '',
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { email, accountNumber, reference } = this.state;
    const isShowRightText = true;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={20} />
          </TouchableOpacity>
          <View style={styles.headerTextStyle}>
            <Text style={styles.textStyle}>BENEFICIARY DETIALS</Text>
          </View>
        </View>
        <TitleCard
          icon={AccountType}
          titleCardMainViewStyle={styles.titleCardMainViewStyle}
          titleCardImageStyle={styles.titleCardImageStyle}
          titleCardTextStyle={styles.titleCardTextStyle}
          text="Account Type"
        />
        <View
          style={{
            marginTop: deviceHeight * 0.07,
            width: deviceWidth * 0.8,
            alignSelf: 'center',
          }}
        >
          <FloatLabelTextField
            type="email"
            placeholder="Email"
            autoCorrect={false}
            value={email}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.validate(type)}
          />

          <FloatLabelTextField
            type="account"
            placeholder="Account Number"
            autoCorrect={false}
            value={accountNumber}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={isShowRightText ? deviceWidth * 0.42 : deviceWidth * 0.73}
            validate={type => this.validate(type)}
            isShowRightText={isShowRightText}
            rightTextStyle={styles.rightTextStyle}
            rightTextValue="Scan QR Code"
            rightTextValueStyle={styles.rightTextValueStyle}
          />
          <FloatLabelTextField
            type="reference"
            placeholder="Reference"
            autoCorrect={false}
            value={reference}
            updateForm={this.updateForm}
            inputBackgroundColor="#fff"
            textFieldSize={deviceWidth * 0.73}
            validate={type => this.validate(type)}
          />
        </View>
        <View style={{ marginTop: deviceHeight * 0.05, alignSelf: 'center' }}>
          <DesignButton
            name="ADD"
            // callMethod={}
            isClickable={false}
          />
        </View>
      </View>
    );
  }
}
