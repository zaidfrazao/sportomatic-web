import React, { Component } from "react";
import Dark from "./components/Dark";
import Default from "./components/Default";
import Disabled from "./components/Disabled";
import Social from "./components/Social";

type Props = {
  actions: {
    handleClick: () => null
  },
  disabled: boolean,
  loading: boolean,
  colour: string,
  filled: boolean,
  fullWidth: boolean,
  slim: boolean,
  type: string
};

class Button extends Component<Props> {
  static defaultProps = {
    actions: {
      handleClick: () => console.log("A button was clicked")
    },
    disabled: false,
    loading: false,
    filled: false,
    fullWidth: false,
    slim: false,
    type: "default",
    colour: "primary"
  };

  render() {
    const {
      disabled,
      loading,
      colour,
      filled,
      fullWidth,
      slim,
      type,
      children
    } = this.props;
    const { handleClick } = this.props.actions;

    if (disabled) {
      return (
        <Disabled filled={filled} slim={slim} fullWidth={fullWidth}>
          {children}
        </Disabled>
      );
    }

    switch (type) {
      case "facebook":
      case "google":
        return (
          <Social
            type={type}
            filled={filled}
            fullWidth={fullWidth}
            slim={slim}
            loading={loading}
            actions={{
              handleClick: () => handleClick()
            }}
          >
            {children}
          </Social>
        );
      case "dark":
        return (
          <Dark
            colour={colour}
            filled={filled}
            fullWidth={fullWidth}
            slim={slim}
            loading={loading}
            actions={{
              handleClick: () => handleClick()
            }}
          >
            {children}
          </Dark>
        );
      default:
        return (
          <Default
            colour={colour}
            filled={filled}
            fullWidth={fullWidth}
            slim={slim}
            loading={loading}
            actions={{
              handleClick: () => handleClick()
            }}
          >
            {children}
          </Default>
        );
    }
  }
}

export default Button;
