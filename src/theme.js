import { ImageBackground } from "react-native";

const Colors = {
  white: "#ffffff",
  black: "#111111",
  main: "#3679fe",
  grey0: "#d5d5d5",
  grey1: "#a6a6a6",
  red: "#e84118",
};

export const theme = {
  background: Colors.white,
  text: Colors.black,
  errorText: Colors.red,

  //button
  btnBackground: Colors.main,
  btnTitle: Colors.white,
  btnTextLink: Colors.main,
  btnSignout: Colors.red,

  //imgage
  imgBackground: Colors.grey,
  imgBtnBackground: Colors.grey1,
  imgBtnIcon: Colors.white,

  //input
  inputBackground: Colors.white,
  inputLabel: Colors.grey1,
  inputPlaceholder: Colors.grey1,
  inputBorder: Colors.grey1,
  inputDisabled: Colors.grey0,

  //spinner
  spinnerBackground: Colors.black,
  SpinnerIndicator: Colors.white,

  //tab
  tabBtnActive: Colors.main,
  tabBtnInactive: Colors.grey1,
};
