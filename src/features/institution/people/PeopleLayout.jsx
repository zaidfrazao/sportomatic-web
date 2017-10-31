import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import { CircularProgress } from "material-ui/Progress";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import PeopleList from "./components/PeopleList";
import PersonInfo from "./components/PersonInfo";
import LeaderboardAd from "../../../components/LeaderboardAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import BannerAd from "../../../components/BannerAd";
import NotificationModal from "../../../components/NotificationModal";
import _ from "lodash";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%"
  },
  infoWrapper: {
    height: "100%",
    width: "100%"
  },
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
  toolbar: {
    backgroundColor: grey[300],
    zIndex: 1
  },
  tabsWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
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
  requestsTab: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    textAlign: "center"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class PeopleLayout extends Component {
  componentWillMount() {
    const { userID } = this.props;
    const { loadStaff } = this.props.actions;
    loadStaff(userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const { loadStaff } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadStaff(nextProps.userID);
    }
  }

  render() {
    const { classes, staff, isMobile, isTablet } = this.props;
    const { currentTab } = this.props.uiConfig;
    const { isStaffLoading } = this.props.loadingStatus;
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

    const staffCardsInfo = _.values(
      _.mapValues(staff, (value, key) => {
        return {
          ...value,
          id: key,
          name: value.metadata.name,
          surname: value.metadata.surname,
          profilePictureURL: value.metadata.profilePictureURL,
          type: value.metadata.type
        };
      })
    ).sort((personA, personB) => {
      if (personA.metadata.name > personB.metadata.name) return +1;
      if (personA.metadata.name < personB.metadata.name) return -1;
      if (personA.metadata.surname > personB.metadata.surname) return +1;
      if (personA.metadata.surname < personB.metadata.surname) return -1;
      return 0;
    });

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        {personID && staff[personID] ? (
          <div className={classes.infoWrapper}>
            <PersonInfo
              info={staff[personID]}
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
              <div className={classes.requestsTab}>
                <Typography type="title" component="h3">
                  Unavailable in this version of the beta.
                </Typography>
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

PeopleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PeopleLayout);
