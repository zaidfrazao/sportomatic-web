import React, { Component } from "react";
import { common, grey, lightBlue } from "../../utils/colours";
import injectSheet from "react-jss";

const styles = theme => ({
  tab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 8,
    margin: "0 8px",
    padding: 18,
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  tabSelected: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 8,
    margin: "0 8px",
    padding: 18,
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: lightBlue[600]
    }
  },
  wrapper: {
    display: "flex",
    justifyContent: "center"
  }
});

class Tabs extends Component {
  render() {
    const { classes, tabs, selected, handleClick } = this.props;

    const tabComponents = tabs.map(tab => {
      if (selected === tab.key) {
        return (
          <div key={tab.key} className={classes.tabSelected}>
            {tab.label}
          </div>
        );
      } else {
        return (
          <div
            key={tab.key}
            className={classes.tab}
            onClick={() => handleClick(tab.key)}
          >
            {tab.label}
          </div>
        );
      }
    });

    return <div className={classes.wrapper}>{tabComponents}</div>;
  }
}

export default injectSheet(styles)(Tabs);
