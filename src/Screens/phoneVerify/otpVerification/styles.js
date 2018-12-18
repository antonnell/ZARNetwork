import { StyleSheet } from "react-native";
import { Dimensions, Platform } from "react-native";
//Constants
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  titleText: {
    color: "rgb(0,177,251)",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: deviceWidth * 0.25
  },
  descriptionText: {
    marginTop: deviceHeight * 0.1,
    color: "#000",
    fontSize: 16,
    width: deviceWidth * 0.7
  },
  resendBtnMainView: {
    marginTop: 20
  },
  resenOtpTextStyle: {
    fontSize: 16,
    fontWeight: "400"
  }
});
