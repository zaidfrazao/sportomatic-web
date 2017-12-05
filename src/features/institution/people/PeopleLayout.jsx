import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import EditIcon from "material-ui-icons/Edit";
import Tabs, { Tab } from "material-ui/Tabs";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../components/LeaderboardAd";
import NotificationModal from "../../../components/NotificationModal";
import PeopleList from "./components/PeopleList";
import RequestsList from "./components/RequestsList";
import PersonInfo from "./components/PersonInfo";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 72,
    right: 24,
    "@media (min-width: 600px)": {
      bottom: 24
    }
  },
  infoWrapper: {
    height: "100%",
    width: "100%"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  requestsTab: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    textAlign: "center"
  },
  root: {
    width: "100%",
    height: "100%"
  },
  staffTab: {
    flexGrow: 1,
    overflow: "auto"
  },
  staffTabNoCards: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  tabsWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class PeopleLayout extends Component {
  componentWillMount() {
    const { userID } = this.props;
    const {
      loadCoaches,
      loadManagers,
      loadTeams,
      loadCoachRequests,
      loadManagerRequests
    } = this.props.actions;

    loadCoaches(userID);
    loadManagers(userID);
    loadCoachRequests(userID);
    loadManagerRequests(userID);
    loadTeams(userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const {
      loadCoaches,
      loadManagers,
      loadTeams,
      loadCoachRequests,
      loadManagerRequests
    } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadCoaches(nextProps.userID);
      loadManagers(nextProps.userID);
      loadCoachRequests(nextProps.userID);
      loadManagerRequests(nextProps.userID);
      loadTeams(nextProps.userID);
    }
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

  getType() {
    const { staff, userID } = this.props;
    const { personID } = this.props.match.params;

    let type = "";
    if (personID && staff[personID]) {
      if (staff[personID].institutions[userID].managerStatus === "APPROVED") {
        type = "Manager";
      }
      if (staff[personID].institutions[userID].coachStatus === "APPROVED") {
        type = "Coach";
      }
    }

    return type;
  }

  getStaffCardsInfo() {
    const { staff, userID } = this.props;

    return _.values(
      _.mapValues(staff, (value, key) => {
        let type = "";
        if (value.institutions[userID].managerStatus === "APPROVED") {
          type = "Manager";
        }
        if (value.institutions[userID].coachStatus === "APPROVED") {
          type = "Coach";
        }
        if (
          value.institutions[userID].coachStatus === "APPROVED" &&
          value.institutions[userID].managerStatus === "APPROVED"
        ) {
          type = "Manager / Coach";
        }
        return {
          ...value,
          id: key,
          name: value.info.name,
          surname: value.info.surname,
          profilePictureURL: value.info.profilePictureURL,
          type: type
        };
      })
    ).sort((personA, personB) => {
      if (personA.info.name > personB.info.name) return +1;
      if (personA.info.name < personB.info.name) return -1;
      if (personA.info.surname > personB.info.surname) return +1;
      if (personA.info.surname < personB.info.surname) return -1;
      return 0;
    });
  }

  getRequestsCardsInfo() {
    const { requests, userID } = this.props;

    return _.values(
      _.mapValues(requests, (value, key) => {
        let type = "";
        if (value.institutions[userID].managerStatus === "AWAITING_APPROVAL") {
          type = "Manager";
        }
        if (value.institutions[userID].coachStatus === "AWAITING_APPROVAL") {
          type = "Coach";
        }
        if (
          value.institutions[userID].coachStatus === "AWAITING_APPROVAL" &&
          value.institutions[userID].managerStatus === "AWAITING_APPROVAL"
        ) {
          type = "Manager / Coach";
        }
        return {
          ...value,
          id: key,
          name: value.info.name,
          surname: value.info.surname,
          profilePictureURL: value.info.profilePictureURL,
          type: type
        };
      })
    ).sort((personA, personB) => {
      if (personA.info.name > personB.info.name) return +1;
      if (personA.info.name < personB.info.name) return -1;
      if (personA.info.surname > personB.info.surname) return +1;
      if (personA.info.surname < personB.info.surname) return -1;
      return 0;
    });
  }

  render() {
    const { classes, staff, teams, isMobile, isTablet } = this.props;
    const { currentTab } = this.props.uiConfig;
    const { isStaffLoading, isTeamsLoading } = this.props.loadingStatus;
    const {
      updateTab,
      openEditPersonDialog,
      closeEditPersonDialog,
      openDeletePersonAlert,
      closeDeletePersonAlert
    } = this.props.actions;
    const {
      isDeletPersonAlertOpen,
      isEditPersonDialogOpen
    } = this.props.dialogs;
    const { personID } = this.props.match.params;

    const staffCardsInfo = this.getStaffCardsInfo();
    const requestsCardsInfo = this.getRequestsCardsInfo();
    const ad = this.createAd();
    const type = this.getType();

    return (
      <div className={classes.root}>
        {personID && staff[personID] ? (
          <div className={classes.infoWrapper}>
            <PersonInfo
              type={type}
              teams={teams}
              personID={personID}
              info={staff[personID]}
              isLoading={isTeamsLoading}
              isMobile={isMobile}
              isTablet={isTablet}
            />
            <Button
              fab
              color="accent"
              aria-label="edit event"
              className={classes.button}
              onClick={() => openEditPersonDialog()}
            >
              <EditIcon />
            </Button>
            <NotificationModal
              isOpen={isEditPersonDialogOpen}
              handleOkClick={closeEditPersonDialog}
              heading="Unavailable in Beta"
              message="The ability to edit staff member info is unavailable in this version of the beta."
            />
          </div>
        ) : (
          <div className={classes.tabsWrapper}>
            <AppBar position="static" color="default">
              <Tabs
                value={currentTab}
                onChange={(event, newTab) => updateTab(newTab)}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Staff" value="STAFF" />
                <Tab label="Requests" value="REQUESTS" />
              </Tabs>
            </AppBar>
            {currentTab === "STAFF" && (
              <div
                className={
                  staffCardsInfo.length > 0
                    ? classes.staffTab
                    : classes.staffTabNoCards
                }
              >
                <div className={classes.adWrapper}>{ad}</div>
                {isStaffLoading ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
                ) : (
                  <PeopleList
                    people={staffCardsInfo}
                    actions={{ openDeletePersonAlert }}
                  />
                )}
              </div>
            )}
            {currentTab === "REQUESTS" && (
              <div
                className={
                  staffCardsInfo.length > 0
                    ? classes.staffTab
                    : classes.staffTabNoCards
                }
              >
                <div className={classes.adWrapper}>{ad}</div>
                {isStaffLoading ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
                ) : (
                  <RequestsList
                    people={requestsCardsInfo}
                    actions={{ openDeletePersonAlert }}
                  />
                )}
              </div>
            )}
            <NotificationModal
              isOpen={isDeletPersonAlertOpen}
              handleOkClick={closeDeletePersonAlert}
              heading="Unavailable in Beta"
              message="The ability to delete staff members is unavailable in this version of the beta."
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PeopleLayout);
