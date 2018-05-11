import React, { Component } from "react";
import { common, lightBlue } from "../../../../../../utils/colours";
import injectStyles from "react-jss";
import { Route } from "react-router-dom";
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
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: common["black"],
    backgroundColor: common["white"]
  }
};

class TeamCard extends Component {
  render() {
    const { classes, name, id } = this.props;

    return (
      <div className={classes.card}>
        <div className={classes.header}>{name}</div>
        <div className={classes.buttons}>
          <Route
            render={({ history }) => (
              <Button
                colour="primary"
                filled
                fullWidth
                handleClick={() => history.push(`/myaccount/teams/${id}`)}
              >
                View
              </Button>
            )}
          />
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(TeamCard);
