/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import BackIcon from "material-ui-icons/ArrowBack";
import Collapse from "material-ui/transitions/Collapse";
import EditIcon from "material-ui-icons/Edit";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import { grey, red } from "material-ui/colors";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "material-ui/List";
import Paper from "material-ui/Paper";
import PersonIcon from "material-ui-icons/Person";
import { Route } from "react-router-dom";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import WarningIcon from "material-ui-icons/Warning";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../../components/LeaderboardAd";
import defaultProfilePicture from "../../image/default-profile-picture.png";

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
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
  deletedTeam: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  deletedText: {
    color: red[500],
    textAlign: "center"
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
  inset: {
    paddingLeft: theme.spacing.unit * 4
  },
  name: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  nested: {
    backgroundColor: grey[100]
  },
  noItems: {
    textAlign: "center"
  },
  outerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
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
  warningIcon: {
    color: red[500]
  },
  wrapper: {
    padding: 24
  }
});

class TeamInfo extends Component {
  state = {
    isCoachOpen: {},
    isManagerOpen: {}
  };

  componentWillMount() {
    const { info } = this.props;

    if (info) {
      let isCoachOpen = {};
      let isManagerOpen = {};

      _.keys(info.coaches).map(coachID => {
        isCoachOpen[coachID] = false;
      });

      _.keys(info.managers).map(managerID => {
        isManagerOpen[managerID] = false;
      });

      this.setState({
        isCoachOpen,
        isManagerOpen
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { info } = nextProps;

    if (info && info !== this.props.info) {
      let isCoachOpen = {};
      let isManagerOpen = {};

      _.keys(info.coaches).map(coachID => {
        isCoachOpen[coachID] = false;
      });

      _.keys(info.managers).map(managerID => {
        isManagerOpen[managerID] = false;
      });

      this.setState({
        isCoachOpen,
        isManagerOpen
      });
    }
  }

  toggleCoachInfo = coachID => {
    const { isCoachOpen } = this.state;

    this.setState({
      isCoachOpen: {
        ...isCoachOpen,
        [coachID]: !isCoachOpen[coachID]
      }
    });
  };

  toggleManagerInfo = managerID => {
    const { isManagerOpen } = this.state;

    this.setState({
      isManagerOpen: {
        ...isManagerOpen,
        [managerID]: !isManagerOpen[managerID]
      }
    });
  };

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

  getListItems() {
    const {
      classes,
      coaches,
      managers,
      info,
      isCoachesLoading,
      isManagersLoading
    } = this.props;
    const { isCoachOpen, isManagerOpen } = this.state;

    let eventCoaches = [];
    let eventManagers = [];

    !isCoachesLoading &&
      info &&
      _.toPairs(info.coaches).map(([id, coachEventInfo]) => {
        const coachInfo = coaches[id].info;
        eventCoaches.push(
          <Route
            key={id}
            render={({ history }) => {
              return (
                <div>
                  <ListItem button onClick={() => this.toggleCoachInfo(id)}>
                    <Avatar
                      src={
                        coachInfo.profilePictureURL === ""
                          ? defaultProfilePicture
                          : coachInfo.profilePictureURL
                      }
                    />
                    <ListItemText
                      primary={`${coachInfo.name} ${coachInfo.surname}`}
                      secondary={coachInfo.phoneNumber}
                    />
                    {isCoachOpen[id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    component="li"
                    in={isCoachOpen[id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List className={classes.nested} disablePadding>
                      <ListSubheader>Options</ListSubheader>
                      <ListItem
                        className={classes.inset}
                        button
                        onClick={() => history.push(`/admin/people/${id}`)}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="View coach info" />
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              );
            }}
          />
        );
      });
    !isManagersLoading &&
      info &&
      _.toPairs(info.managers).map(([id, managerEventInfo]) => {
        const managerInfo = managers[id].info;
        eventManagers.push(
          <Route
            key={id}
            render={({ history }) => {
              return (
                <div>
                  <ListItem button onClick={() => this.toggleManagerInfo(id)}>
                    <Avatar
                      src={
                        managerInfo.profilePictureURL === ""
                          ? defaultProfilePicture
                          : managerInfo.profilePictureURL
                      }
                    />
                    <ListItemText
                      primary={`${managerInfo.name} ${managerInfo.surname}`}
                      secondary={managerInfo.phoneNumber}
                    />
                    {isManagerOpen[id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    component="li"
                    in={isManagerOpen[id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List className={classes.nested} disablePadding>
                      <ListSubheader>Options</ListSubheader>
                      <ListItem
                        className={classes.inset}
                        button
                        onClick={() => history.push(`/admin/people/${id}`)}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="View manager info" />
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              );
            }}
          />
        );
      });

    return {
      coaches: eventCoaches,
      managers: eventManagers
    };
  }

  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  render() {
    const { classes, info } = this.props;
    const { isTeamsLoading, isCoachesLoading, isManagersLoading } = this.props;
    const { editTeam } = this.props.actions;

    let name = "";
    let sport = "";
    let division = "";
    let ageGroup = "";
    let gender = "";

    if (info) {
      name = info.info.name;
      sport = info.info.sport;
      division = info.info.division;
      ageGroup = info.info.ageGroup;
      gender = info.info.gender;
    }

    let formattedGender = "Loading...";
    let formattedAgeGroup = "Loading...";
    if (!isTeamsLoading) {
      formattedGender = this.formatGender(gender, ageGroup);
      formattedAgeGroup = this.formatAgeGroup(ageGroup);
    }

    const ad = this.createAd();
    const { coaches, managers } = this.getListItems();

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          {isTeamsLoading ? (
            <Typography className={classes.name} type="title" component="h2">
              Loading...
            </Typography>
          ) : (
            <Typography className={classes.name} type="title" component="h2">
              {name}
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
            <Tooltip title="Edit team" placement="bottom">
              <IconButton
                disabled={
                  isCoachesLoading || isManagersLoading || isTeamsLoading
                }
                aria-label="edit team"
                onClick={() => editTeam()}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <div className={classes.wrapper}>
            <div className={classes.adWrapper}>{ad}</div>
            {info &&
              info.status === "DELETED" && (
                <div className={classes.deletedTeam}>
                  <WarningIcon className={classes.warningIcon} />
                  <Typography
                    className={classes.deletedText}
                    type="subtitle"
                    component="h3"
                  >
                    This team has been deleted.
                  </Typography>
                </div>
              )}
            <Grid
              container
              direction="row"
              align="stretch"
              className={classes.contentWrapper}
            >
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
                        primary="Sport"
                        secondary={isTeamsLoading ? "Loading..." : sport}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Division"
                        secondary={isTeamsLoading ? "Loading..." : division}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Age Group"
                        secondary={
                          isTeamsLoading ? "Loading..." : formattedAgeGroup
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Gender"
                        secondary={
                          isTeamsLoading ? "Loading..." : formattedGender
                        }
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
                    Managers
                  </Typography>
                  {isManagersLoading ? (
                    <List>
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="Loading..." />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      {managers.length > 0 ? (
                        managers
                      ) : (
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="No managers" />
                        </ListItem>
                      )}
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
                    Coaches
                  </Typography>
                  {isCoachesLoading ? (
                    <List>
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="Loading..." />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      {coaches.length > 0 ? (
                        coaches
                      ) : (
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="No coaches" />
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

export default withStyles(styles)(TeamInfo);
