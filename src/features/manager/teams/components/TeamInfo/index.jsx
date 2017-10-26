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
import LeaderboardAd from "../../../../../components/LeaderboardAd";
import BannerAd from "../../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../../components/LargeMobileBannerAd";
import _ from "lodash";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
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
    margin: "24px 0"
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
  },
  noItems: {
    textAlign: "center"
  }
};

class TeamInfo extends Component {
  formatGender(gender, ageGroup) {
    let formattedGender = "Mixed";
    if (ageGroup < 18) {
      if (ageGroup !== "Open" && gender === "MALE") {
        formattedGender = "Boys";
      } else if (gender === "FEMALE") {
        formattedGender = "Girls";
      }
    } else {
      if (gender === "FEMALE") {
        formattedGender = "Men";
      } else if (gender === "FEMALE") {
        formattedGender = "Women";
      }
    }
    return formattedGender;
  }

  formatAgeGroup(ageGroup) {
    return ageGroup !== "Open" ? `U/${ageGroup}` : ageGroup;
  }

  getManagersList(managers) {
    const { classes, userID } = this.props;
    const managersArray = _.toPairs(managers).map(keyValuePair => {
      return {
        id: keyValuePair[0],
        name: keyValuePair[1].metadata.name,
        surname: keyValuePair[1].metadata.surname,
        phoneNumber: keyValuePair[1].metadata.phoneNumber,
        profilePictureURL: keyValuePair[1].metadata.profilePictureURL
      };
    });

    return (
      <List>
        {managersArray.length > 0 ? (
          managersArray.map(managerInfo => (
            <Route
              key={managerInfo.id}
              component={({ history }) => (
                <ListItem
                  button={userID !== managerInfo.id}
                  onClick={() => {
                    if (userID !== managerInfo.id) {
                      history.push(`/manager/people/${managerInfo.id}`);
                    }
                  }}
                >
                  <Avatar src={managerInfo.profilePictureURL} />
                  <ListItemText
                    primary={`${managerInfo.name} ${managerInfo.surname}`}
                    secondary={managerInfo.phoneNumber}
                  />
                </ListItem>
              )}
            />
          ))
        ) : (
          <ListItem className={classes.noItems}>
            <ListItemText primary="No managers" />
          </ListItem>
        )}
      </List>
    );
  }

  getCoachesList(coaches) {
    const { classes } = this.props;
    const coachesArray = _.toPairs(coaches).map(keyValuePair => {
      return {
        id: keyValuePair[0],
        name: keyValuePair[1].metadata.name,
        surname: keyValuePair[1].metadata.surname,
        phoneNumber: keyValuePair[1].metadata.phoneNumber,
        profilePictureURL: keyValuePair[1].metadata.profilePictureURL
      };
    });

    return (
      <List>
        {coachesArray.length > 0 ? (
          coachesArray.map(coachInfo => (
            <Route
              key={coachInfo.id}
              component={({ history }) => (
                <ListItem
                  button
                  onClick={() =>
                    history.push(`/manager/people/${coachInfo.id}`)}
                >
                  <Avatar src={coachInfo.profilePictureURL} />
                  <ListItemText
                    primary={`${coachInfo.name} ${coachInfo.surname}`}
                    secondary={coachInfo.phoneNumber}
                  />
                </ListItem>
              )}
            />
          ))
        ) : (
          <ListItem className={classes.noItems}>
            <ListItemText primary="No coaches" />
          </ListItem>
        )}
      </List>
    );
  }

  render() {
    const { classes, isMobile, isTablet } = this.props;
    const {
      name,
      sport,
      division,
      ageGroup,
      gender
    } = this.props.info.metadata;
    const { coaches, managers } = this.props.info;

    let formattedGender = this.formatGender(gender, ageGroup);
    let formattedAgeGroup = this.formatAgeGroup(ageGroup);
    let managersList = this.getManagersList(managers);
    let coachesList = this.getCoachesList(coaches);

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Typography className={classes.name} type="title" component="h2">
            {`${name}`}
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
          <div className={classes.adWrapper}>{ad}</div>
          <Grid container direction="row" align="stretch">
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
                    <ListItemText primary="Sport" secondary={sport} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Division" secondary={division} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Age Group"
                      secondary={formattedAgeGroup}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Gender"
                      secondary={formattedGender}
                    />
                  </ListItem>
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
                  Managers
                </Typography>
                {managersList}
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <div className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Coaches
                </Typography>
                {coachesList}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TeamInfo);
