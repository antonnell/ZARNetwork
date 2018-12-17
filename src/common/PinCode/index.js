import React, { Component } from "react";
import { Text, Dimensions } from "react-native";
import PINCode from "@haskkor/react-native-pincode";
const deviceHeight = Dimensions.get("window").height;

export default class GeneratePinCode extends Component {
  render() {
    return (
      <PINCode
        status={"choose"}
        bottomLeftComponent={<Text>Forgot PIN?</Text>}
        titleChoose={" "}
        subtitleChoose={"Enter your 4 digit Pin "}
        colorPassword="rgb(0, 169, 252)"
        styleLockScreenColorIcon="email-outline"
        stylePinCodeColorTitle="rgb(1,1,1)"
        stylePinCodeColorSubtitle="black"
        stylePinCodeColorTitleError="red"
        buttonDeleteText="Remove"
        textPasswordVisibleFamily="red"
        stylePinCodeButtonNumber="#fff"
        colorPasswordError="red"
        textPasswordVisibleSize={1}
        styleLockScreenSizeIcon={1}
        stylePinCodeTextButtonCircle={(style = { fontSize: 16, color: "#fff" })}
        stylePinCodeRowButtons={
          (style = {
            height: deviceHeight * 0.1

            //backgroundColor: "red"
          })
        }
        stylePinCodeButtonCircle={
          (style = {
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            backgroundColor: "rgb(0,169,252)"
          })
        }
        titleConfirmFailed="4 digit PIN don't match"
        stylePinCodeHiddenPasswordSizeFull={10}
        stylePinCodeHiddenPasswordSizeEmpty={10}
        styleLockScreenColorIcon="blue"
        titleConfirm="Confirm your 4 digit PIN"
        stylePinCodeDeleteButtonColorHideUnderlay="rgb(0,0,0)"
        stylePinCodeDeleteButtonColorShowUnderlay="black"
        numbersButtonOverlayColor="rgb(0, 169, 252)"
      />
    );
  }
}
