import { createMuiTheme } from "material-ui/styles";
import { lightBlue, orange, red } from "material-ui/colors";

export default function defineMUITheme() {
  return createMuiTheme({
    palette: {
      primary: lightBlue,
      secondary: orange,
      error: red
    }
  });
}
