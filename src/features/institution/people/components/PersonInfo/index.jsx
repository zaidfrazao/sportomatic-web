// @flow
import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { Route } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import _ from "lodash";
import LargeRectangleAd from "../../../../../components/LargeRectangleAd";
import LargeMobileBannerAd from "../../../../../components/LargeMobileBannerAd";
import BannerAd from "../../../../../components/BannerAd";

const styles = {
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  wrapper: {
    flexGrow: 1,
    overflow: "auto",
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
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
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
    width: 240,
    height: "auto",
    margin: 24
  },
  button: {
    "@media (max-width: 960px)": {
      width: "100%"
    }
  },
  noItems: {
    textAlign: "center"
  }
};

class PersonInfo extends Component {
  render() {
    const { classes, isMobile, isTablet } = this.props;
    const { preferredSports, teams, paymentDefaults } = this.props.info;
    const {
      name,
      surname,
      email,
      phoneNumber,
      profilePictureURL,
      type
    } = this.props.info.metadata;

    const teamsList = _.toPairs(teams).map(([teamID, teamInfo]) => {
      return { id: teamID, ...teamInfo };
    });

    let ad = <LargeRectangleAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Typography className={classes.name} type="title" component="h2">
            {`${name} ${surname}`}
          </Typography>
        </AppBar>
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
          <Grid container direction="row" align="stretch">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.pictureWrapper}>
                <Avatar src={profilePictureURL} className={classes.picture} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.adWrapper}>{ad}</div>
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
            {type === "COACH" && (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <div className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Payment Defaults
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Type"
                        secondary={_.capitalize(paymentDefaults.type)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Standard Hourly Rate"
                        secondary={`R${paymentDefaults.standardHourlyRate.toLocaleString(
                          "en",
                          { minimumFractionDigits: 2 }
                        )}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Overtime Hourly Rate"
                        secondary={`R${paymentDefaults.overtimeHourlyRate.toLocaleString(
                          "en",
                          { minimumFractionDigits: 2 }
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
                  {preferredSports &&
                    _.toPairs(preferredSports).map(([sportID, sport]) => (
                      <ListItem key={sportID}>
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
                  {teamsList && teamsList.length > 0 ? (
                    teamsList.map(teamInfo => (
                      <Route
                        key={teamInfo.id}
                        component={({ history }) => (
                          <ListItem
                            button
                            onClick={() =>
                              history.push(`/institution/teams/${teamInfo.id}`)}
                          >
                            <ListItemText
                              primary={teamInfo.name}
                              secondary={teamInfo.sport}
                            />
                          </ListItem>
                        )}
                      />
                    ))
                  ) : (
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="No teams" />
                    </ListItem>
                  )}
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PersonInfo);
