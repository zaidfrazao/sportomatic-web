import React, { Component } from "react";
import { common, grey, lightBlue } from "../../utils/colours";
import injectSheet from "react-jss";

const styles = theme => ({
  tab: {
    textAlign: "center",
    width: 120,
    borderRadius: 8,
    margin: "12px 4px",
    padding: 18,
    color: grey[800],
    backgroundColor: grey[200],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[100]
    }
  },
  tabSelected: {
    textAlign: "center",
    width: 120,
    borderRadius: 8,
    margin: "12px 4px",
    padding: 18,
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[700],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: lightBlue[600]
    }
  },
  wrapper: {
    margin: "12px 8px",
    display: "flex",
    justifyContent: "center"
  }
});

class Tabs extends Component {
  render() {
    const { classes, tabs, selected } = this.props;

    const tabComponents = tabs.map(tab => {
      if (selected === tab.value) {
        return <div className={classes.tabSelected}>{tab.label}</div>;
      } else {
        return <div className={classes.tab}>{tab.label}</div>;
      }
    });

    return <div className={classes.wrapper}>{tabComponents}</div>;
  }
}

export default injectSheet(styles)(Tabs);
