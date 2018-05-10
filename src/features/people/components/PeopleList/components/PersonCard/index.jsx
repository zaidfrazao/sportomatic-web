import React, { Component } from "react";
import { common, grey, lightBlue } from "../../../../../../utils/colours";
import injectStyles from "react-jss";
import { Route } from "react-router-dom";
import Button from "../../../../../../components/Button";
import defaultProfilePicture from "../../../../image/default-profile-picture.png";

const styles = {
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "0 0 16px 16px",
    backgroundColor: lightBlue[500]
  },
  card: {
    borderRadius: 16,
    maxWidth: 400,
    backgroundColor: common["white"],
    margin: "0 auto"
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: grey[500]
  },
  picture: {
    borderRadius: 8,
    width: "100%",
    height: "100%"
  },
  pictureWrapper: {
    borderRadius: 8,
    width: 260,
    height: 260,
    backgroundColor: grey[300],
    margin: "16px auto 0 auto"
  },
  type: {
    color: grey[500],
    padding: 16,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  }
};

class PersonCard extends Component {
  render() {
    const { classes, name, surname, profilePictureURL, id, type } = this.props;

    return (
      <div className={classes.card}>
        <div className={classes.header}>{`${name} ${surname}`}</div>
        <div className={classes.pictureWrapper}>
          <img
            className={classes.picture}
            src={
              profilePictureURL === ""
                ? defaultProfilePicture
                : profilePictureURL
            }
            alt={name}
          />
        </div>
        <div className={classes.type}>{type}</div>
        <div className={classes.buttons}>
          <Route
            render={({ history }) => (
              <Button
                colour="primary"
                filled
                fullWidth
                handleClick={() => history.push(`/myaccount/people/${id}`)}
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

export default injectStyles(styles)(PersonCard);
