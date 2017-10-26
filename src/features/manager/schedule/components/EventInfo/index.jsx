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
    height: "100%",
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
    margin: "24px 0",
    width: "100%",
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
  },
  notesWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  notes: {
    padding: 24
  }
};

class EventInfo extends Component {
  render() {
    const { classes, userID, isMobile, isTablet } = this.props;
    const {
      title,
      type,
      date,
      startTime,
      endTime,
      isCompetitive,
      additionalInfo
    } = this.props.info.metadata;
    const { teams, coaches, managers, status } = this.props.info;
    const { updateView } = this.props.actions;

    const dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric"
    };

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          {status === "CANCELLED" ? (
            <Typography className={classes.name} type="title" component="h2">
              {title} - [Cancelled]
            </Typography>
          ) : (
            <Typography className={classes.name} type="title" component="h2">
              {title}
            </Typography>
          )}
        </AppBar>
        <div className={classes.wrapper}>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => {
                  history.goBack();
                  updateView("EVENTS_LIST");
                }}
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
                    <ListItemText
                      primary="Date"
                      secondary={new Date(date).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Starts at" secondary={startTime} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Ends as" secondary={endTime} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Event type" secondary={type} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Venue"
                      secondary={additionalInfo.venue}
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
            {isCompetitive && (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <div className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Match Info
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Home / Away"
                        secondary={
                          additionalInfo.homeAway === "UNKNOWN"
                            ? "Not yet specified"
                            : _.capitalize(additionalInfo.homeAway)
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Opponents"
                        secondary={additionalInfo.opponents}
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
                  Teams
                </Typography>
                <List>
                  {_.keys(teams).length > 0 ? (
                    _.toPairs(teams).map(([id, info]) => (
                      <Route
                        key={id}
                        component={({ history }) => (
                          <ListItem
                            button
                            onClick={() => history.push(`/manager/teams/${id}`)}
                          >
                            <ListItemText
                              primary={info.metadata.name}
                              secondary={info.metadata.sport}
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
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <div className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Managers
                </Typography>
                <List>
                  {_.keys(managers).length > 0 ? (
                    _.toPairs(managers).map(([id, info]) => (
                      <Route
                        key={id}
                        component={({ history }) => (
                          <ListItem
                            button={userID !== id}
                            onClick={() => {
                              if (userID !== id) {
                                history.push(`/manager/people/${id}`);
                              }
                            }}
                          >
                            <Avatar src={info.profilePictureURL} />
                            <ListItemText
                              primary={`${info.name} ${info.surname}`}
                              secondary={info.phoneNumber}
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
                <List>
                  {_.keys(coaches).length > 0 ? (
                    _.toPairs(coaches).map(([id, info]) => (
                      <Route
                        key={id}
                        component={({ history }) => (
                          <ListItem
                            button
                            onClick={() =>
                              history.push(`/manager/people/${id}`)}
                          >
                            <Avatar src={info.profilePictureURL} />
                            <ListItemText
                              primary={`${info.name} ${info.surname}`}
                              secondary={info.phoneNumber}
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
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <div className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Notes
                </Typography>
                <div className={classes.notesWrapper}>
                  {additionalInfo.notes === "" ? (
                    <Typography
                      className={classes.notes}
                      type="body2"
                      component="p"
                    >
                      No notes
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.notes}
                      type="body2"
                      component="p"
                    >
                      {additionalInfo.notes}
                    </Typography>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventInfo);
