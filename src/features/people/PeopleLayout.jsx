/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Badge from "material-ui/Badge";
import { CircularProgress } from "material-ui/Progress";
import Switch from "material-ui/Switch";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import EditPersonDialog from "./components/EditPersonDialog";
import InvitePersonModal from "./components/InvitePersonModal";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import NotificationModal from "../../components/NotificationModal";
import PeopleList from "./components/PeopleList";
import RequestsList from "./components/RequestsList";
import PersonInfo from "./components/PersonInfo";
import FiltersToolbar from "./components/FiltersToolbar";

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
  myPeopleSelector: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center"
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
  tabs: {
    height: 72
  },
  tabsWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class PeopleLayout extends Component {
  state = {
    sports: {},
    types: { Admin: true, Coach: true, Manager: true },
    showAllPeople: false
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { personID } = this.props.match.params;
    const {
      loadCoaches,
      loadManagers,
      loadAdmins,
      loadTeams,
      loadCoachRequests,
      loadManagerRequests,
      loadAdminRequests,
      loadEventsByCoach,
      loadEventsByManager
    } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadCoaches(activeInstitutionID);
      loadManagers(activeInstitutionID);
      loadAdmins(activeInstitutionID);
      loadCoachRequests(activeInstitutionID);
      loadManagerRequests(activeInstitutionID);
      loadAdminRequests(activeInstitutionID);
      loadTeams(activeInstitutionID);

      if (personID) {
        loadEventsByCoach(activeInstitutionID, personID);
        loadEventsByManager(activeInstitutionID, personID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, teams } = nextProps;
    const { personID } = nextProps.match.params;
    const {
      loadCoaches,
      loadManagers,
      loadAdmins,
      loadTeams,
      loadCoachRequests,
      loadManagerRequests,
      loadAdminRequests,
      loadEventsByCoach,
      loadEventsByManager
    } = nextProps.actions;

    let sports = this.state.sports;

    if (teams !== this.props.teams) {
      sports = {};
      _.toPairs(teams).map(([id, info]) => {
        sports = {
          ...sports,
          [info.info.sport]: true
        };
      });
    }

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      loadCoaches(activeInstitutionID);
      loadManagers(activeInstitutionID);
      loadAdmins(activeInstitutionID);
      loadCoachRequests(activeInstitutionID);
      loadManagerRequests(activeInstitutionID);
      loadAdminRequests(activeInstitutionID);
      loadTeams(activeInstitutionID);

      if (personID) {
        loadEventsByCoach(activeInstitutionID, personID);
        loadEventsByManager(activeInstitutionID, personID);
      }
    }

    if (
      activeInstitutionID !== "" &&
      personID &&
      personID !== this.props.match.params.personID
    ) {
      loadEventsByCoach(activeInstitutionID, personID);
      loadEventsByManager(activeInstitutionID, personID);
    }

    this.setState({
      sports
    });
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

  getType() {
    const { staff, activeInstitutionID } = this.props;
    const { personID } = this.props.match.params;

    let type = "";
    if (personID && staff[personID]) {
      if (
        staff[personID].institutions[activeInstitutionID].roles.admin ===
        "APPROVED"
      ) {
        type = "Admin";
      }
      if (
        staff[personID].institutions[activeInstitutionID].roles.manager ===
        "APPROVED"
      ) {
        type = "Manager";
      }
      if (
        staff[personID].institutions[activeInstitutionID].roles.coach ===
        "APPROVED"
      ) {
        type = "Coach";
      }
      if (
        staff[personID].institutions[activeInstitutionID].roles.admin ===
          "APPROVED" &&
        staff[personID].institutions[activeInstitutionID].roles.coach ===
          "APPROVED"
      ) {
        type = "Admin / Coach";
      }
      if (
        staff[personID].institutions[activeInstitutionID].roles.coach ===
          "APPROVED" &&
        staff[personID].institutions[activeInstitutionID].roles.manager ===
          "APPROVED"
      ) {
        type = "Manager / Coach";
      }
      if (
        staff[personID].institutions[activeInstitutionID].roles.admin ===
          "APPROVED" &&
        staff[personID].institutions[activeInstitutionID].roles.manager ===
          "APPROVED"
      ) {
        type = "Admin / Manager";
      }
      if (
        staff[personID].institutions[activeInstitutionID].roles.admin ===
          "APPROVED" &&
        staff[personID].institutions[activeInstitutionID].roles.coach ===
          "APPROVED" &&
        staff[personID].institutions[activeInstitutionID].roles.manager ===
          "APPROVED"
      ) {
        type = "Admin / Coach / Manager";
      }
    }

    return type;
  }

  getStaffCardsInfo(staff) {
    const { activeInstitutionID } = this.props;

    return _.values(
      _.mapValues(staff, (value, key) => {
        let type = "";
        if (
          value.institutions[activeInstitutionID].roles.admin === "APPROVED"
        ) {
          type = "Admin";
        }
        if (
          value.institutions[activeInstitutionID].roles.manager === "APPROVED"
        ) {
          type = "Manager";
        }
        if (
          value.institutions[activeInstitutionID].roles.coach === "APPROVED"
        ) {
          type = "Coach";
        }
        if (
          value.institutions[activeInstitutionID].roles.admin === "APPROVED" &&
          value.institutions[activeInstitutionID].roles.coach === "APPROVED"
        ) {
          type = "Admin / Coach";
        }
        if (
          value.institutions[activeInstitutionID].roles.coach === "APPROVED" &&
          value.institutions[activeInstitutionID].roles.manager === "APPROVED"
        ) {
          type = "Manager / Coach";
        }
        if (
          value.institutions[activeInstitutionID].roles.admin === "APPROVED" &&
          value.institutions[activeInstitutionID].roles.manager === "APPROVED"
        ) {
          type = "Admin / Manager";
        }
        if (
          value.institutions[activeInstitutionID].roles.admin === "APPROVED" &&
          value.institutions[activeInstitutionID].roles.coach === "APPROVED" &&
          value.institutions[activeInstitutionID].roles.manager === "APPROVED"
        ) {
          type = "Admin / Coach / Manager";
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

  getRequestsCardsInfo(requests) {
    const { activeInstitutionID } = this.props;

    return _.values(
      _.mapValues(requests, (value, key) => {
        let type = "";
        if (
          value.institutions[activeInstitutionID].roles.admin === "REQUESTED"
        ) {
          type = "Admin";
        }
        if (
          value.institutions[activeInstitutionID].roles.manager === "REQUESTED"
        ) {
          type = "Manager";
        }
        if (
          value.institutions[activeInstitutionID].roles.coach === "REQUESTED"
        ) {
          type = "Coach";
        }
        if (
          value.institutions[activeInstitutionID].roles.admin === "REQUESTED" &&
          value.institutions[activeInstitutionID].roles.coach === "REQUESTED"
        ) {
          type = "Admin and Coach";
        }
        if (
          value.institutions[activeInstitutionID].roles.coach === "REQUESTED" &&
          value.institutions[activeInstitutionID].roles.manager === "REQUESTED"
        ) {
          type = "Manager and Coach";
        }
        if (
          value.institutions[activeInstitutionID].roles.admin === "REQUESTED" &&
          value.institutions[activeInstitutionID].roles.manager === "REQUESTED"
        ) {
          type = "Admin and Manager";
        }
        if (
          value.institutions[activeInstitutionID].roles.admin === "REQUESTED" &&
          value.institutions[activeInstitutionID].roles.coach === "REQUESTED" &&
          value.institutions[activeInstitutionID].roles.manager === "REQUESTED"
        ) {
          type = "Admin, Coach and Manager";
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

  filterPeople(staff) {
    const { sport, type, searchText } = this.props.filters;
    const { teams, activeInstitutionID, userID, role } = this.props;
    const { showAllPeople } = this.state;

    return _.fromPairs(
      _.toPairs(staff).filter(([staffID, personInfo]) => {
        let allowThroughFilter = true;
        let nameMatch = true;
        let teamMatch = false;
        let roleMatch = true;

        if (searchText !== "") {
          nameMatch =
            nameMatch &&
            _.toLower(
              `${personInfo.info.name} ${personInfo.info.surname}`
            ).includes(_.toLower(searchText));
          _.toPairs(teams).map(([teamID, teamInfo]) => {
            const teamCoaches = _.keys(teamInfo.coaches);
            const teamManagers = _.keys(teamInfo.managers);

            if (
              teamCoaches.includes(staffID) ||
              teamManagers.includes(staffID)
            ) {
              teamMatch =
                teamMatch ||
                _.toLower(teamInfo.info.name).includes(_.toLower(searchText));
            }
          });
        }

        if ((role === "coach" || role === "manager") && !showAllPeople) {
          if (!showAllPeople) {
            roleMatch = false;
            _.values(teams).map(teamInfo => {
              const teamCoaches = _.keys(teamInfo.coaches);
              const teamManagers = _.keys(teamInfo.managers);

              if (
                teamCoaches.includes(userID) ||
                teamManagers.includes(userID)
              ) {
                roleMatch =
                  roleMatch ||
                  teamCoaches.includes(staffID) ||
                  teamManagers.includes(staffID);
              }
            });
          }
        }

        if (sport !== "All") {
          allowThroughFilter =
            allowThroughFilter && personInfo.info.sports[sport];
        }
        if (type !== "All") {
          if (type === "Admin") {
            allowThroughFilter =
              allowThroughFilter &&
              personInfo.institutions[activeInstitutionID].roles.admin ===
                "APPROVED";
          } else if (type === "Coach") {
            allowThroughFilter =
              allowThroughFilter &&
              personInfo.institutions[activeInstitutionID].roles.coach ===
                "APPROVED";
          } else if (type === "Manager") {
            allowThroughFilter =
              allowThroughFilter &&
              personInfo.institutions[activeInstitutionID].roles.manager ===
                "APPROVED";
          }
        }

        allowThroughFilter =
          allowThroughFilter && (teamMatch || nameMatch) && roleMatch;

        return allowThroughFilter;
      })
    );
  }

  render() {
    const { showAllPeople } = this.state;
    const {
      classes,
      staff,
      requests,
      teams,
      isMobile,
      isTablet,
      filters,
      activeInstitutionID,
      eventsByCoach,
      eventsByManager,
      role
    } = this.props;
    const { currentTab, inviteeID, inviteeInfo } = this.props.uiConfig;
    const {
      isCoachesLoading,
      isManagersLoading,
      isAdminsLoading,
      isTeamsLoading,
      isInviteeLoading,
      isEditPersonLoading,
      isEventsByCoachLoading,
      isEventsByManagerLoading
    } = this.props.loadingStatus;
    const {
      updateTab,
      openEditPersonDialog,
      closeEditPersonDialog,
      openDeletePersonAlert,
      closeDeletePersonAlert,
      openInvitePersonModal,
      closeInvitePersonModal,
      applyFilters,
      updateSearch,
      fetchInviteeInfo,
      createUser,
      invitePerson,
      editPerson,
      editRoles
    } = this.props.actions;
    const {
      isDeletPersonAlertOpen,
      isEditPersonDialogOpen,
      isInvitePersonModalOpen
    } = this.props.dialogs;
    const { personID } = this.props.match.params;

    const staffCardsInfo = this.getStaffCardsInfo(
      this.filterPeople(staff, false)
    );
    const requestsCardsInfo = this.getRequestsCardsInfo(requests);
    const ad = this.createAd();
    const type = this.getType();

    return (
      <div className={classes.root}>
        {personID ? (
          <div className={classes.infoWrapper}>
            <PersonInfo
              role={role}
              type={type}
              teams={teams}
              personID={personID}
              info={staff[personID]}
              institutionID={activeInstitutionID}
              isStaffLoading={
                isCoachesLoading ||
                isManagersLoading ||
                isAdminsLoading ||
                activeInstitutionID === ""
              }
              isTeamsLoading={isTeamsLoading || activeInstitutionID === ""}
              isEventsByPersonLoading={
                isEventsByCoachLoading || isEventsByManagerLoading
              }
              eventsByPerson={{ ...eventsByCoach, ...eventsByManager }}
              isMobile={isMobile}
              isTablet={isTablet}
              actions={{
                editPersonInfo: () => openEditPersonDialog()
              }}
            />
            <EditPersonDialog
              isOpen={isEditPersonDialogOpen}
              isMobile={isMobile}
              isLoading={
                isCoachesLoading ||
                isManagersLoading ||
                isAdminsLoading ||
                isEditPersonLoading ||
                activeInstitutionID === ""
              }
              personID={personID}
              personInfo={staff[personID]}
              institutionID={activeInstitutionID}
              actions={{
                editPerson: (id, info) => editPerson(id, info),
                closeModal: () => closeEditPersonDialog()
              }}
            />
          </div>
        ) : (
          <div className={classes.tabsWrapper}>
            {role === "admin" && (
              <AppBar position="static" color="default">
                <Tabs
                  value={currentTab}
                  onChange={(event, newTab) => updateTab(newTab)}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Staff" value="STAFF" className={classes.tabs} />
                  {requestsCardsInfo.length > 0 ? (
                    <Tab
                      label={
                        <Badge
                          badgeContent={requestsCardsInfo.length}
                          color="accent"
                        >
                          Requests
                        </Badge>
                      }
                      value="REQUESTS"
                      className={classes.tabs}
                    />
                  ) : (
                    <Tab
                      label="Requests"
                      value="REQUESTS"
                      className={classes.tabs}
                    />
                  )}
                </Tabs>
              </AppBar>
            )}
            {currentTab === "STAFF" && (
              <div
                className={
                  staffCardsInfo.length > 0
                    ? classes.staffTab
                    : classes.staffTabNoCards
                }
              >
                <FiltersToolbar
                  sports={_.keys(this.state.sports)}
                  types={_.keys(this.state.types)}
                  isMobile={isMobile}
                  initialFilters={filters}
                  applyFilters={applyFilters}
                  addPerson={openInvitePersonModal}
                  updateSearch={updateSearch}
                  role={role}
                />
                <div className={classes.adWrapper}>{ad}</div>
                {activeInstitutionID === "" ||
                isCoachesLoading ||
                isManagersLoading ||
                isAdminsLoading ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div>
                    {(role === "coach" || role === "manager") && (
                      <div className={classes.myPeopleSelector}>
                        <Switch
                          checked={showAllPeople}
                          onChange={(event, checked) =>
                            this.setState({
                              showAllPeople: checked
                            })}
                        />
                        <Typography component="h3" type="headline">
                          {showAllPeople ? "All People" : "My Team Members"}
                        </Typography>
                      </div>
                    )}
                    <PeopleList
                      people={staffCardsInfo}
                      actions={{ openDeletePersonAlert }}
                    />
                  </div>
                )}
                <InvitePersonModal
                  isOpen={isInvitePersonModalOpen}
                  isMobile={isMobile}
                  isLoading={isInviteeLoading || activeInstitutionID === ""}
                  inviteeID={inviteeID}
                  inviteeInfo={inviteeInfo}
                  institutionID={activeInstitutionID}
                  actions={{
                    editRoles: () => editRoles(),
                    invitePerson: (id, info) => invitePerson(id, info),
                    createUser: userInfo => createUser(userInfo),
                    fetchInviteeInfo: email => fetchInviteeInfo(email),
                    closeModal: () => closeInvitePersonModal()
                  }}
                />
              </div>
            )}
            {currentTab === "REQUESTS" && (
              <div
                className={
                  requestsCardsInfo.length > 0
                    ? classes.staffTab
                    : classes.staffTabNoCards
                }
              >
                <div className={classes.adWrapper}>{ad}</div>
                {activeInstitutionID === "" ||
                isCoachesLoading ||
                isManagersLoading ||
                isAdminsLoading ? (
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
