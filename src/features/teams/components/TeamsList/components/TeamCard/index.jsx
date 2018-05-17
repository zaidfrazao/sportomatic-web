import React, { Component } from "react";
import injectStyles from "react-jss";
import { grey, lightBlue } from "../../../../../../utils/colours";
import Button from "../../../../../../components/Button";

const styles = {
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "0 0 16px 16px",
    backgroundColor: lightBlue[500]
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  }
};

class TeamCard extends Component {
  render() {
    const { classes, name, id, navigateTo } = this.props;

    return (
      <div className={classes.card}>
        <div className={classes.header}>{name}</div>
        <div className={classes.buttons}>
          <Button
            colour="primary"
            filled
            fullWidth
            handleClick={() => navigateTo(`/myaccount/teams/${id}`)}
          >
            View
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(TeamCard);
