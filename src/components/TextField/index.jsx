import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { common, green, grey, red, yellow } from "../../utils/colours";

const styles = theme => ({
  arrowUp: {
    position: "absolute",
    content: "",
    top: -12,
    left: "calc(50% - 3px)",
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: `transparent transparent ${common["white"]} transparent`
  },
  icon: {
    position: "absolute",
    top: 22,
    right: 18
  },
  iconApproved: {
    color: green[400]
  },
  iconBasic: {
    color: grey[400]
  },
  iconError: {
    color: red[400]
  },
  iconWarning: {
    color: yellow[600]
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    borderRadius: 4,
    boxSizing: "border-box",
    fontFamily: "Nunito, sans-serif",
    fontSize: 16,
    lineHeight: "23px"
  },
  inputApproved: {
    border: `1px solid ${green[400]}`,
    "&:focus": {
      border: `1px solid ${green[800]}`,
      outline: "none"
    }
  },
  inputBasic: {
    border: `1px solid ${grey[400]}`,
    "&:focus": {
      border: `1px solid ${grey[600]}`,
      outline: "none"
    }
  },
  inputError: {
    border: `1px solid ${red[400]}`,
    "&:focus": {
      border: `1px solid ${red[800]}`,
      outline: "none"
    }
  },
  inputWarning: {
    border: `1px solid ${yellow[600]}`,
    "&:focus": {
      border: `1px solid ${yellow[800]}`,
      outline: "none"
    }
  },
  helperText: {
    width: "calc(100% - 16px)",
    textAlign: "center",
    fontSize: 14,
    lineHeight: "18px",
    backgroundColor: common["white"],
    borderRadius: 4,
    margin: 0,
    padding: 8
  },
  helperTextApproved: {
    color: green[400]
  },
  helperTextBasic: {
    color: grey[800]
  },
  helperTextError: {
    color: red[400]
  },
  helperTextWarning: {
    color: yellow[800]
  },
  helperTextWrapper: {
    position: "relative"
  },
  wrapper: {
    position: "relative"
  }
});

type Props = {
  actions: {
    handleChange: (value: string) => null
  },
  type: string,
  placeholder: string,
  validation: string,
  helperText: string
};

class TextField extends Component<Props> {
  static defaultProps = {
    actions: {
      handleChange: value => console.log(`Input value was changed to ${value}.`)
    },
    type: "text",
    placeholder: "Example",
    validation: "default",
    helperText: ""
  };

  getInputStyle() {
    const { classes, validation } = this.props;

    let styles = [classes.input];
    switch (validation) {
      case "error":
        styles.push(classes.inputError);
        break;
      case "warning":
        styles.push(classes.inputWarning);
        break;
      case "approved":
        styles.push(classes.inputApproved);
        break;
      default:
        styles.push(classes.inputBasic);
        break;
    }

    return _.join(styles, " ");
  }

  getHelperTextStyle() {
    const { classes, validation } = this.props;

    let styles = [classes.helperText];
    switch (validation) {
      case "error":
        styles.push(classes.helperTextError);
        break;
      case "warning":
        styles.push(classes.helperTextWarning);
        break;
      case "approved":
        styles.push(classes.helperTextApproved);
        break;
      default:
        styles.push(classes.helperTextBasic);
        break;
    }

    return _.join(styles, " ");
  }

  getIcon() {
    const { classes, validation } = this.props;

    let iconStyle = [classes.icon];
    let icon = <i />;
    switch (validation) {
      case "error":
        iconStyle.push(classes.iconError);
        icon = <i className="fas fa-times" />;
        break;
      case "warning":
        iconStyle.push(classes.iconWarning);
        icon = <i className="fas fa-exclamation" />;
        break;
      case "approved":
        iconStyle.push(classes.iconApproved);
        icon = <i className="fas fa-check" />;
        break;
      default:
        iconStyle.push(classes.iconBasic);
        icon = <i />;
        break;
    }

    return <span className={_.join(iconStyle, " ")}>{icon}</span>;
  }

  render() {
    const { classes, type, placeholder, helperText, value } = this.props;
    const { handleChange } = this.props.actions;

    const inputStyle = this.getInputStyle();
    const helperTextStyle = this.getHelperTextStyle();
    const icon = this.getIcon();
    const showHelperText = helperText.length > 0;

    return (
      <div className={classes.wrapper}>
        <input
          className={inputStyle}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
        {showHelperText && (
          <div className={classes.helperTextWrapper}>
            <span className={classes.arrowUp} />
            <p className={helperTextStyle}>{helperText}</p>
          </div>
        )}
        {icon}
      </div>
    );
  }
}

export default injectSheet(styles)(TextField);
