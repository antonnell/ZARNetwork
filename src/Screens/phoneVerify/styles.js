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
  infoTextStyle: {
    color: "rgb(0, 0, 0)",
    fontWeight: "normal",
    fontSize: 15,
    textAlign: "justify",
    width: deviceWidth * 0.8
  },
  mobileTextFieldStyle: {
    marginTop: deviceHeight * 0.1,
    width: deviceWidth * 0.8
  },
  textStyle: {
    color: "rgb(0, 169, 252)",
    fontWeight: "600",
    fontSize: 15
  }
});
