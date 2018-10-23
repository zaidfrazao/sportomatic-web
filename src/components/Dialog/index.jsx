import React, { Component } from "react";
import injectSheet from "react-jss";
import Button from "../../components/Button";
import { common, grey, lightBlue } from "../../utils/colours";

const mobileBreakpoint = 800;

const styles = {
  action: {
    marginLeft: 12
  },
  actionsWrapper: {
    display: "flex",
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    display: "flex",
    padding: props => (props.size === "fullscreen" ? 0 : 24)
  },
  dotHighlighted: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    margin: "0 4px",
    backgroundColor: lightBlue[500]
  },
  dotNotHighlighted: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    margin: "0 4px",
    backgroundColor: grey[300]
  },
  dotsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 8
  },
  footer: {
    borderRadius: props => (props.size === "fullscreen" ? 0 : "0 0 16px 16px"),
    padding: "12px 24px",
    backgroundColor: grey[100],
    borderTop: `1px solid ${grey[300]}`
  },
  header: {
    fontSize: 18,
    borderRadius: props => (props.size === "fullscreen" ? 0 : "16px 16px 0 0"),
    padding: "24px 0",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100],
    borderBottom: `1px solid ${grey[300]}`
  },
  innerWrapper: {
    borderRadius: 16,
    backgroundColor: common["white"],
    minWidth: 260,
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      width: props =>
        props.size === "medium"
          ? "60%"
          : props.size === "fullscreen" ? "100%" : "auto",
      height: props =>
        props.size === "medium"
          ? "60%"
          : props.size === "fullscreen" ? "100%" : "auto"
    }
  },
  wrapper: {
    zIndex: 5,
    display: props => (props.isOpen ? "flex" : "none"),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)"
  }
};

class Dialog extends Component<Props> {
  static defaultProps = {
    actions: [],
    heading: "Default",
    type: "default",
    hasSteps: false,
    currentStep: 0,
    numberOfSteps: 0
  };

  getActionItems() {
    const {
      classes,
      actions,
      type,
      handleYesClick,
      handleNoClick,
      handleOkClick
    } = this.props;

    switch (type) {
      case "alert":
        return (
          <div className={classes.action}>
            <Button slim filled handleClick={() => handleOkClick()}>
              Ok
            </Button>
          </div>
        );
      case "decision":
        return [
          <div key="decision-no" className={classes.action}>
            <Button slim handleClick={() => handleNoClick()}>
              No
            </Button>
          </div>,
          <div key="decision-yes" className={classes.action}>
            <Button slim filled handleClick={() => handleYesClick()}>
              Yes
            </Button>
          </div>
        ];
      default:
        return actions.map((action, index) => (
          <div key={`dialog-action-${index}`} className={classes.action}>
            {action}
          </div>
        ));
    }
  }

  getDots() {
    const { classes, numberOfSteps, currentStep } = this.props;

    return Array(numberOfSteps)
      .fill(1)
      .map((value, index) => {
        const step = index + 1;
        if (step <= currentStep) {
          return (
            <span
              key={`dialog-dots-${step}`}
              className={classes.dotHighlighted}
            />
          );
        } else {
          return (
            <span
              key={`dialog-dots-${step}`}
              className={classes.dotNotHighlighted}
            />
          );
        }
      });
  }

  render() {
    const { classes, heading, children, hasSteps } = this.props;

    const actionItems = this.getActionItems();
    const dots = this.getDots();

    return (
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <div className={classes.header}>
            {heading}
            {hasSteps && <div className={classes.dotsWrapper}>{dots}</div>}
          </div>
          <div className={classes.content}>{children}</div>
          <div className={classes.footer}>
            <div className={classes.actionsWrapper}>{actionItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Dialog);
