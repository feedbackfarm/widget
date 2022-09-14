import React from "react";

export type Theme = {
  backgroundColor: string;
  borderColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  disabledButtonBackgroundColor: string;
  disabledButtonTextColor: string;
  textColor: string;
  typeBackgroundColor: string;
};

const ThemeContext = React.createContext<Theme>({
  backgroundColor: "#FFFFFF",
  borderColor: "#D1D1D1",
  buttonBackgroundColor: "#22c197",
  buttonTextColor: "#FFFFFF",
  disabledButtonBackgroundColor: "#D1D1D1",
  disabledButtonTextColor: "#A7A7A7",
  textColor: "#000000",
  typeBackgroundColor: "#FCFBFA",
});

export default ThemeContext;
