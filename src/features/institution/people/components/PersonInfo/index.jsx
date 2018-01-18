/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import BackIcon from "material-ui-icons/ArrowBack";
import { CircularProgress } from "material-ui/Progress";
import EditIcon from "material-ui-icons/Edit";
import { grey, red } from "material-ui/colors";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemText } from "material-ui/List";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../../components/LargeMobileBannerAd";
import LargeRectangleAd from "../../../../../components/LargeRectangleAd";

const styles = {
  actionsBar: {
    backgroundColor: grey[200]
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
  button: {
    "@media (max-width: 960px)": {
      width: "100%"
    }
  },
  contentWrapper: {
    "@media (min-width: 1200px)": {
      width: 1200,
      margin: "0 auto"
    }
  },
  flexGrow: {
    flexGrow: 1
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
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`
  },
  name: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  noItems: {
    textAlign: "center"
  },
  picture: {
    backgroundColor: grey[300],
    width: 240,
    height: "auto",
    margin: 24
  },
  pictureWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${grey[200]}`
  },
  outerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  removedPerson: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  removedText: {
    color: red[500],
    textAlign: "center"
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  section: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    height: "100%",
    width: "100%"
  },
  type: {
    fontWeight: "normal",
    fontSize: "1rem",
    padding: "20px 0",
    margin: 0,
    width: "100%",
    textAlign: "center",
    backgroundColor: grey[300],
    color: grey[700]
  },
  warningIcon: {
    color: red[500]
  },
  wrapper: {
    padding: 24
  }
};

class PersonInfo extends Component {
  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LargeRectangleAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  createTeamsList() {
    const { teams, personID, isStaffLoading, isTeamsLoading } = this.props;

    let teamsList = [];
    if (!isStaffLoading && !isTeamsLoading) {
      _.toPairs(teams).map(([teamID, teamInfo]) => {
        if (teamInfo.coaches[personID] || teamInfo.managers[personID]) {
          return teamsList.push({ id: teamID, ...teamInfo });
        }
      });
    }

    return teamsList;
  }

  render() {
    const { classes, type, isStaffLoading, isTeamsLoading, info } = this.props;
    const { editPersonInfo } = this.props.actions;

    const teamsList = this.createTeamsList();
    const ad = this.createAd();

    let name = "";
    let surname = "";
    let email = "";
    let profilePictureURL = "";
    let phoneNumber = "";
    let sports = {};

    if (info) {
      name = info.info.name;
      surname = info.info.surname;
      email = info.info.email;
      profilePictureURL = info.info.profilePictureURL;
      phoneNumber = info.info.phoneNumber;
      sports = info.info.sports;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          {isStaffLoading ? (
            <Typography className={classes.name} type="title" component="h2">
              Loading...
            </Typography>
          ) : (
            <Typography className={classes.name} type="title" component="h2">
              {`${name} ${surname}`}
            </Typography>
          )}
        </AppBar>
        <div className={classes.outerWrapper}>
          <Toolbar className={classes.actionsBar}>
            <Route
              render={({ history }) => (
                <Tooltip title="Back" placement="bottom">
                  <IconButton
                    aria-label="back"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    <BackIcon />
                  </IconButton>
                </Tooltip>
              )}
            />
            <div className={classes.flexGrow} />
            <Tooltip title="Edit person info" placement="bottom">
              <IconButton
                disabled={isStaffLoading || isTeamsLoading}
                aria-label="edit person info"
                onClick={() => editPersonInfo()}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <div className={classes.wrapper}>
            <Grid
              container
              direction="row"
              align="stretch"
              className={classes.contentWrapper}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                {isStaffLoading ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div className={classes.pictureWrapper}>
                    <Avatar
                      src={profilePictureURL}
                      className={classes.picture}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className={classes.adWrapper}>{ad}</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {isStaffLoading ? (
                  <Typography
                    className={classes.type}
                    type="title"
                    component="h3"
                  >
                    Loading...
                  </Typography>
                ) : (
                  <Typography
                    className={classes.type}
                    type="title"
                    component="h3"
                  >
                    {type}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Paper className={classes.section}>
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
                        primary="Email"
                        secondary={isStaffLoading ? "Loading..." : email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone number"
                        secondary={isStaffLoading ? "Loading..." : phoneNumber}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Paper className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Sports
                  </Typography>
                  {isStaffLoading ? (
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  ) : (
                    <List>
                      {sports &&
                        _.toPairs(sports).map(([sport, exists]) => {
                          if (exists)
                            return (
                              <ListItem key={sport}>
                                <ListItemText primary={sport} />
                              </ListItem>
                            );
                        })}
                    </List>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Paper className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Teams
                  </Typography>
                  {isStaffLoading || isTeamsLoading ? (
                    <List>
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="Loading..." />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      {teamsList && teamsList.length > 0 ? (
                        teamsList.map(teamInfo => (
                          <Route
                            key={teamInfo.id}
                            component={({ history }) => (
                              <ListItem
                                button
                                onClick={() =>
                                  history.push(`/admin/teams/${teamInfo.id}`)}
                              >
                                <ListItemText
                                  primary={teamInfo.info.name}
                                  secondary={teamInfo.info.sport}
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
                  )}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PersonInfo);
