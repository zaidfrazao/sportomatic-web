// @flow
import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { Route } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import BlockAd from "../../../../components/BlockAd";

const styles = {
  wrapper: {
    padding: 24
  },
  adWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    height: "100%",
    width: "100%"
  },
  heading: {
    fontWeight: "normal",
    fontSize: "1.2rem",
    padding: "20px 0",
    margin: 0,
    width: "100%",
    textAlign: "center",
    backgroundColor: grey[700],
    color: grey[50],
    borderBottom: `1px solid ${grey[200]}`
  },
  name: {
    width: "100%",
    textAlign: "center",
    margin: "40px 0"
  },
  pictureWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  picture: {
    backgroundColor: grey[300],
    width: 300,
    height: "auto"
  },
  button: {
    "@media (max-width: 960px)": {
      width: "100%"
    }
  }
};

class TeamInfo extends Component {
  render() {
    const { classes, accountType } = this.props;
    const {
      name,
      surname,
      email,
      phoneNumber,
      paymentDetails,
      sports,
      type,
      profilePictureURL,
      teams
    } = this.props.info;
    return (
      <div className={classes.wrapper}>
        <Route
          render={({ history }) => (
            <Button
              raised
              className={classes.button}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          )}
        />
        <Typography className={classes.name} type="display2" component="h2">
          {`${name} ${surname}`}
        </Typography>
        <Grid container direction="row" align="stretch">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.pictureWrapper}>
              <Avatar src={profilePictureURL} className={classes.picture} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.adWrapper}>
              <BlockAd />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Email" secondary={email} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Phone number"
                    secondary={phoneNumber}
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          {type === "Coach" &&
          accountType === "institution" && (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <div className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Payment Details
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Standard hourly rate"
                      secondary={`R${paymentDetails.standardHourlyRate.toLocaleString(
                        "en"
                      )}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Overtime hourly rate"
                      secondary={`R${paymentDetails.overtimeHourlyRate.toLocaleString(
                        "en"
                      )}`}
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Sports
              </Typography>
              <List>
                {sports &&
                  sports.map(sport => (
                    <ListItem key={sport}>
                      <ListItemText primary={sport} />
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Teams
              </Typography>
              <List>
                {teams &&
                  teams.map(teamInfo => (
                    <ListItem key={teamInfo.name}>
                      <ListItemText
                        primary={teamInfo.name}
                        secondary={teamInfo.sport}
                      />
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TeamInfo);
