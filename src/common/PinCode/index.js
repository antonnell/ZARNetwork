/* eslint-disable no-console */
import React, { Component } from 'react';
import { Text, Dimensions, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const deviceWidth = Dimensions.get('window').width;

// export default class GeneratePinCode extends Component {
//   render() {
//     return (
//       <PINCode
//         status={"choose"}
//         bottomLeftComponent={<Text>Forgot PIN?</Text>}
//         titleChoose={" "}
//         subtitleChoose={"Enter your 4 digit Pin "}
//         colorPassword="rgb(0, 169, 252)"
//         styleLockScreenColorIcon="email-outline"
//         stylePinCodeColorTitle="rgb(1,1,1)"
//         stylePinCodeColorSubtitle="black"
//         stylePinCodeColorTitleError="red"
//         buttonDeleteText="Remove"
//         textPasswordVisibleFamily="red"
//         stylePinCodeButtonNumber="#fff"
//         colorPasswordError="red"
//         textPasswordVisibleSize={1}
//         styleLockScreenSizeIcon={1}
//         stylePinCodeTextButtonCircle={(style = { fontSize: 16, color: "#fff" })}
//         stylePinCodeRowButtons={
//           (style = {
//             height: deviceHeight * 0.1

//             //backgroundColor: "red"
//           })
//         }
//         stylePinCodeButtonCircle={
//           (style = {
//             width: 50,
//             height: 50,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 25,
//             backgroundColor: "rgb(0,169,252)"
//           })
//         }
//         titleConfirmFailed="4 digit PIN don't match"
//         stylePinCodeHiddenPasswordSizeFull={10}
//         stylePinCodeHiddenPasswordSizeEmpty={10}
//         styleLockScreenColorIcon="blue"
//         titleConfirm="Confirm your 4 digit PIN"
//         stylePinCodeDeleteButtonColorHideUnderlay="rgb(0,0,0)"
//         stylePinCodeDeleteButtonColorShowUnderlay="black"
//         numbersButtonOverlayColor="rgb(0, 169, 252)"
//       />
//     );
//   }
// }

export default class GeneratePinCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCode: '',
      confirmPincode: '',
    };
  }

  removePin = (event, type) => {
    const { pinCodeObj, updateForm } = this.props;
    event.preventDefault();
    const updateData = pinCodeObj.text.slice(-pinCodeObj.text.length, -1);
    this.setState({
      [type]: updateData,
    });
    updateForm(updateData, type);
  };

  updateValue(btn, type) {
    const { pinCodeObj, updateForm } = this.props;
    if (pinCodeObj.text.length < 4) {
      const value = pinCodeObj.text + btn;
      this.setState({
        [type]: value,
      });
      updateForm(value, type);
    }
  }

  renderButtons = () => {
    const { pinCodeObj } = this.props;
    const totalNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (totalNumber) {
      return totalNumber.map(btn => (
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(0,177,251)',
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 15,
          }}
          onPress={() => this.updateValue(btn, pinCodeObj.type)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{btn}</Text>
        </TouchableOpacity>
      ));
    }
  };

  render() {
    console.log(this.state, '123');
    const { pinCodeObj } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', marginTop: 15, marginBottom: 15 }}>
          {pinCodeObj.title}
        </Text>
        <TextInput
          style={{
            height: 30,
            borderWidth: 1,
            width: 300,
            textAlign: 'center',
            letterSpacing: 10,
          }}
          maxLength={4}
          // secureTextEntry={true}
          placeholder={pinCodeObj.text}
          value={pinCodeObj.text}
        />
        <View
          style={{
            width: deviceWidth * 0.8,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}
        >
          {this.renderButtons()}
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              width: deviceWidth * 0.6,
              paddingLeft: 0,
              justifyContent: 'space-between',
              bottom: 20,
              paddingRight: 0,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity>
              <Text style={{ width: 50 }}>Forgot Pin?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={event => this.removePin(event, pinCodeObj.type)}
            >
              <MaterialIcons name="backspace" size={18} />
              <Text style={{ fontSize: 16 }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
