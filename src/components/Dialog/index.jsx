import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey } from "../../utils/colours";

const styles = {
  action: {
    marginLeft: 12
  },
  actionsWrapper: {
    fontSize: 18,
    borderRadius: "0 0 16px 16px",
    padding: "12px 24px",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100],
    display: "flex",
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    padding: 24
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "24px 0",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  innerWrapper: {
    borderRadius: 16,
    backgroundColor: common["white"],
    margin: "24px auto",
    width: "80%",
    maxHeight: "80%",
    display: "flex",
    flexDirection: "column"
  },
  wrapper: {
    display: props => (props.isOpen ? "block" : "none"),
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
    heading: "Default"
  };

  getActionItems() {
    const { classes, actions } = this.props;

    return actions.map(action => (
      <div className={classes.action}>{action}</div>
    ));
  }

  render() {
    const { classes, heading, children } = this.props;

    const actionItems = this.getActionItems();

    return (
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <div className={classes.header}>{heading}</div>
          <div className={classes.content}>{children}</div>
          <div className={classes.actionsWrapper}>{actionItems}</div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Dialog);
