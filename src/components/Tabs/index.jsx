import React, { Component } from "react";
import { common, grey, lightBlue } from "../../utils/colours";
import injectSheet from "react-jss";

const styles = theme => ({
  tab: {
    transition: "0.25s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 8,
    margin: "0 8px",
    padding: 18,
    fontWeight: "bold",
    color: grey[700],
    backgroundColor: common["white"],
    border: `1px solid ${grey[300]}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[100]
    }
  },
  tabSelected: {
    border: `1px solid ${grey[300]}`,
    transition: "0.25s",
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
