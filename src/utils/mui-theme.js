// @flow
import { createMuiTheme } from "material-ui/styles";
import { orange, red } from "material-ui/colors";

export default function defineMUITheme() {
  return createMuiTheme({
    palette: {
      primary: orange,
      secondary: {
        "50": "#484848",
        "100": "#484848",
        "200": "#484848",
        "300": "#212121",
        "400": "#212121",
        "500": "#212121",
        "600": "#212121",
        "700": "#212121",
        "800": "#000000",
        "900": "#000000",
        A100: "#212121",
        A200: "#212121",
        A400: "#212121",
        A700: "#212121",
        contrastDefaultColor: "light"
      },
      error: red
    }
  });
}
