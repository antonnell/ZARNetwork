import { StyleSheet } from "react-native";
import { Dimensions, Platform } from "react-native";
//Constants
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center"
  },
  registrationText: {
    marginTop: 20,
    width: deviceWidth * 0.5,
    textAlign: "center",
    fontSize: 24,
    color: "rgb(0,177,251)",
    fontWeight: "bold"
  }
});
