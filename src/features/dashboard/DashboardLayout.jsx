/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import accounting from "accounting";
import Avatar from "material-ui/Avatar";
import { grey } from "material-ui/colors";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import moment from "moment";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import BannerCarousel from "./components/BannerCarousel";
import defaultProfilePicture from "./image/default-profile-picture.png";
import InstitutionSelectCard from "./components/InstitutionSelectCard";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import RoleSelectCard from "./components/RoleSelectCard";
import UpdatesDialog from "./components/UpdatesDialog";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 24
  },
  contentWrapper: {
    "@media (min-width: 1200px)": {
      width: 1200,
      margin: "0 auto"
    }
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
    margin: 12,
    width: "100%",
    textAlign: "center"
  },
  noItems: {
    textAlign: "center"
  },
  root: {
    width: "100%"
  },
  section: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    height: "100%",
    width: "100%"
  },
  selectWrapper: {
    width: "50%"
  },
  toolbar: {
    padding: 0,
    backgroundColor: grey[200],
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch"
  },
  widgetsWrapper: {
    padding: 24
  }
});

class DashboardLayout extends Component {
  componentWillMount() {
    const { activeInstitutionID, role, userID } = this.props;
    const { loadRecentWages, loadStaff } = this.props.actions;

    if (activeInstitutionID && activeInstitutionID !== "" && userID !== "") {
      loadStaff(activeInstitutionID);
      if (role === "admin") {
        loadRecentWages(activeInstitutionID);
      } else if (role === "coach") {
        loadRecentWages(activeInstitutionID, userID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, role, userID } = nextProps;
    const { loadRecentWages, loadStaff } = nextProps.actions;

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      loadStaff(activeInstitutionID);
      if (role === "admin") {
        loadRecentWages(activeInstitutionID);
      } else if (role === "coach") {
        loadRecentWages(activeInstitutionID, userID);
      }
    }

    if (
      role !== this.props.role &&
      role &&
      role !== "" &&
      activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      if (role === "admin" || role === "manager") {
        loadRecentWages(activeInstitutionID);
      } else if (role === "coach") {
        loadRecentWages(activeInstitutionID, userID);
      }
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
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

  getRecentWagesList() {
    const { recentWages, staff, role } = this.props;
    const { isStaffLoading } = this.props.loadingStatus;

    return _.toPairs(recentWages).map(([id, info]) => {
      let primaryText = "";
      let secondaryText = "";
      if (staff[info.coachID]) {
        secondaryText = moment(info.date).fromNow();
        if (role === "coach") {
          primaryText = `Paid ${accounting.formatMoney(info.wage, "R")}`;
        } else {
          primaryText = `${staff[info.coachID].info.name} ${staff[info.coachID]
            .info.surname} was paid ${accounting.formatMoney(info.wage, "R")}`;
        }
      }
      return (
        <ListItem key={id} button>
          {!isStaffLoading && (
            <Avatar
              src={
                staff[info.coachID].info.profilePictureURL === ""
                  ? defaultProfilePicture
                  : staff[info.coachID].info.profilePictureURL
              }
            />
          )}
          <ListItemText primary={primaryText} secondary={secondaryText} />
        </ListItem>
      );
    });
  }

  render() {
    const {
      classes,
      isTablet,
      isMobile,
      accountInfo,
      institutions,
      userID,
      permissions,
      role
    } = this.props;
    const { isRecentWagesLoading } = this.props.loadingStatus;
    const { isUpdatesDialogOpen } = this.props.dialogs;
    const {
      switchInstitution,
      switchRole,
      openUpdatesDialog,
      closeUpdatesDialog
    } = this.props.actions;

    let active = {
      id: "",
      role: "ADMIN",
      institutionName: "",
      emblemURL: ""
    };
    let rolesAvailable = {
      admin: false,
      coach: false,
      manager: false
    };

    let showWages =
      role === "admin" ||
      role === "coach" ||
      (role === "manager" && permissions.managers.wages.canView);

    const ad = this.createAd();
    const recentWagesList = this.getRecentWagesList();

    if (accountInfo.lastAccessed) {
      active.id = accountInfo.lastAccessed.institutionID;
      active.role = accountInfo.lastAccessed.role;
    }
    if (accountInfo.institutions && accountInfo.institutions[active.id]) {
      rolesAvailable = {
        admin: accountInfo.institutions[active.id].roles.admin === "APPROVED",
        coach: accountInfo.institutions[active.id].roles.coach === "APPROVED",
        manager:
          accountInfo.institutions[active.id].roles.manager === "APPROVED"
      };
    }
    if (institutions[active.id]) {
      active.institutionName = institutions[active.id].info.name;
      active.emblemURL = institutions[active.id].info.emblemURL;
    }

    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.selectWrapper}>
            <InstitutionSelectCard
              isMobile={isMobile}
              userID={userID}
              activeInstitution={{
                id: active.id,
                name: active.institutionName
              }}
              institutions={_.fromPairs(
                _.toPairs(institutions).map(([id, info]) => {
                  let rolesAvailable = {
                    admin: false,
                    coach: false,
                    manager: false
                  };
                  let isActive = false;
                  if (
                    accountInfo.institutions &&
                    accountInfo.institutions[id]
                  ) {
                    rolesAvailable = {
                      admin:
                        accountInfo.institutions[id].roles.admin === "APPROVED",
                      coach:
                        accountInfo.institutions[id].roles.coach === "APPROVED",
                      manager:
                        accountInfo.institutions[id].roles.manager ===
                        "APPROVED"
                    };
                    isActive = accountInfo.institutions[id].status === "STAFF";
                  }
                  return [
                    id,
                    {
                      name: info.info.name,
                      isActive,
                      rolesAvailable
                    }
                  ];
                })
              )}
              emblemURL={active.emblemURL}
              actions={{
                switchInstitution
              }}
            />
          </div>
          <div className={classes.selectWrapper}>
            <RoleSelectCard
              isMobile={isMobile}
              userID={userID}
              activeRole={active.role}
              rolesAvailable={rolesAvailable}
              actions={{
                switchRole
              }}
            />
          </div>
        </Toolbar>
        <BannerCarousel
          isTablet={isTablet}
          actions={{
            openUpdatesDialog
          }}
        />
        <div className={classes.adWrapper}>{ad}</div>
        <div className={classes.widgetsWrapper}>
          <Grid
            container
            direction="row"
            align="stretch"
            className={classes.contentWrapper}
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Paper className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Upcoming Events
                </Typography>
                <List />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Paper className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Recent Results
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Paper className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Recent Hours
                </Typography>
              </Paper>
            </Grid>
            {showWages && (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Paper className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Recent Wages
                  </Typography>
                  {isRecentWagesLoading ? (
                    <List>
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="Loading..." />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      {recentWagesList.length > 0 ? (
                        recentWagesList
                      ) : (
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="None" />
                        </ListItem>
                      )}
                    </List>
                  )}
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
        <UpdatesDialog
          isOpen={isUpdatesDialogOpen}
          isMobile={isMobile}
          actions={{
            handleClose: () => closeUpdatesDialog()
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DashboardLayout);
