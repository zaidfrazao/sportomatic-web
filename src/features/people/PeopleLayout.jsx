/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AddIcon from "material-ui-icons/Add";
import Badge from "material-ui/Badge";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import EditIcon from "material-ui-icons/Edit";
import Tabs, { Tab } from "material-ui/Tabs";
import { withStyles } from "material-ui/styles";
import AcceptCoachModal from "./components/AcceptCoachModal";
import BannerAd from "../../components/BannerAd";
import DecisionModal from "../../components/DecisionModal";
import EditPersonDialog from "./components/EditPersonDialog";
import InvitePersonModal from "./components/InvitePersonModal";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import PeopleList from "./components/PeopleList";
import RequestsList from "./components/RequestsList";
import PersonInfo from "./components/PersonInfo";
import FiltersToolbar from "./components/FiltersToolbar";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 24
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
  fabPosition: {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: 10
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
    height: 64
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
    types: { Admin: true, Coach: true, Manager: true }
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { personID } = this.props.match.params;
    const {
      loadStaff,
      loadStaffRequests,
      loadTeams,
      loadEventsByCoach,
      loadEventsByManager
    } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadStaff(activeInstitutionID);
      loadStaffRequests(activeInstitutionID);
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
      loadStaff,
      loadStaffRequests,
      loadTeams,
      loadEventsByCoach,
      loadEventsByManager,
      resetState
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
      resetState();
      loadStaff(activeInstitutionID);
      loadStaffRequests(activeInstitutionID);
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
        if (value.institutions[activeInstitutionID]) {
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
            value.institutions[activeInstitutionID].roles.admin ===
              "APPROVED" &&
            value.institutions[activeInstitutionID].roles.coach === "APPROVED"
          ) {
            type = "Admin / Coach";
          }
          if (
            value.institutions[activeInstitutionID].roles.coach ===
              "APPROVED" &&
            value.institutions[activeInstitutionID].roles.manager === "APPROVED"
          ) {
            type = "Manager / Coach";
          }
          if (
            value.institutions[activeInstitutionID].roles.admin ===
              "APPROVED" &&
            value.institutions[activeInstitutionID].roles.manager === "APPROVED"
          ) {
            type = "Admin / Manager";
          }
          if (
            value.institutions[activeInstitutionID].roles.admin ===
              "APPROVED" &&
            value.institutions[activeInstitutionID].roles.coach ===
              "APPROVED" &&
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
        }
      })
    )
      .filter(person => person !== undefined)
      .sort((personA, personB) => {
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
    const {
      teams,
      activeInstitutionID,
      userID,
      role,
      meAllFilter
    } = this.props;

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

        if ((role === "coach" || role === "manager") && meAllFilter === "me") {
          if (meAllFilter === "me") {
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
      role,
      paymentDefaults,
      userID
    } = this.props;
    const {
      currentTab,
      inviteeID,
      inviteeInfo,
      applicantID,
      isCoachApplication
    } = this.props.uiConfig;
    const {
      isCoachesLoading,
      isManagersLoading,
      isAdminsLoading,
      isTeamsLoading,
      isInviteeLoading,
      isEditPersonLoading,
      isEventsByCoachLoading,
      isEventsByManagerLoading,
      isApplicantResponseLoading
    } = this.props.loadingStatus;
    const {
      updateTab,
      openEditPersonDialog,
      closeEditPersonDialog,
      openRejectPersonModal,
      closeRejectPersonModal,
      openInvitePersonModal,
      closeInvitePersonModal,
      applyFilters,
      updateSearch,
      fetchInviteeInfo,
      createUser,
      invitePerson,
      editPerson,
      editRoles,
      rejectPerson,
      approvePerson,
      openApprovePersonModal,
      closeApprovePersonModal
    } = this.props.actions;
    const {
      isRejectPersonModalOpen,
      isEditPersonDialogOpen,
      isInvitePersonModalOpen,
      isApprovePersonModalOpen
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
            {role === "admin" &&
              isMobile && (
                <Button
                  fab
                  color="accent"
                  aria-label="edit person info"
                  className={classes.fabPosition}
                  onClick={() => openEditPersonDialog()}
                >
                  <EditIcon />
                </Button>
              )}
          </div>
        ) : (
          <div className={classes.tabsWrapper}>
            {false &&
              role === "admin" && (
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
                    <PeopleList people={staffCardsInfo} />
                  </div>
                )}
                <InvitePersonModal
                  isOpen={isInvitePersonModalOpen}
                  isMobile={isMobile}
                  isLoading={isInviteeLoading || activeInstitutionID === ""}
                  inviteeID={inviteeID}
                  userID={userID}
                  inviteeInfo={inviteeInfo}
                  institutionID={activeInstitutionID}
                  paymentDefaults={paymentDefaults}
                  actions={{
                    editRoles: () => editRoles(),
                    invitePerson: (id, info) => invitePerson(id, info),
                    createUser: (email, password, userInfo) =>
                      createUser(email, password, userInfo),
                    fetchInviteeInfo: email => fetchInviteeInfo(email),
                    closeModal: () => closeInvitePersonModal()
                  }}
                />
                {role === "admin" &&
                  isMobile && (
                    <Button
                      fab
                      color="accent"
                      aria-label="invite new person"
                      className={classes.fabPosition}
                      onClick={() => openInvitePersonModal()}
                    >
                      <AddIcon />
                    </Button>
                  )}
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
                    actions={{ openRejectPersonModal, openApprovePersonModal }}
                  />
                )}
              </div>
            )}
            <AcceptCoachModal
              isLoading={isApplicantResponseLoading}
              isOpen={isApprovePersonModalOpen && isCoachApplication}
              applicantID={applicantID}
              institutionID={activeInstitutionID}
              paymentDefaults={paymentDefaults}
              roles={{
                admin:
                  requests[applicantID] &&
                  requests[applicantID].institutions[activeInstitutionID].roles
                    .admin !== "N/A"
                    ? "APPROVED"
                    : "N/A",
                coach:
                  requests[applicantID] &&
                  requests[applicantID].institutions[activeInstitutionID].roles
                    .coach !== "N/A"
                    ? "APPROVED"
                    : "N/A",
                manager:
                  requests[applicantID] &&
                  requests[applicantID].institutions[activeInstitutionID].roles
                    .manager !== "N/A"
                    ? "APPROVED"
                    : "N/A"
              }}
              actions={{
                approvePerson,
                closeModal: () => closeApprovePersonModal()
              }}
            />
            <DecisionModal
              isOpen={isRejectPersonModalOpen}
              handleYesClick={() => {
                rejectPerson(applicantID, activeInstitutionID);
                closeRejectPersonModal();
              }}
              handleNoClick={() => closeRejectPersonModal()}
              heading="Reject Application"
              message="Are you sure you want to reject this application?"
            />
            <DecisionModal
              isOpen={isApprovePersonModalOpen && !isCoachApplication}
              handleYesClick={() => {
                approvePerson(
                  applicantID,
                  activeInstitutionID,
                  {
                    rates: {
                      overtime: 150,
                      salary: 6000,
                      standard: 100
                    },
                    type: "HOURLY"
                  },
                  {
                    admin:
                      requests[applicantID] &&
                      requests[applicantID].institutions[activeInstitutionID]
                        .roles.admin !== "N/A"
                        ? "APPROVED"
                        : "N/A",
                    coach:
                      requests[applicantID] &&
                      requests[applicantID].institutions[activeInstitutionID]
                        .roles.coach !== "N/A"
                        ? "APPROVED"
                        : "N/A",
                    manager:
                      requests[applicantID] &&
                      requests[applicantID].institutions[activeInstitutionID]
                        .roles.manager !== "N/A"
                        ? "APPROVED"
                        : "N/A"
                  }
                );
                closeApprovePersonModal();
              }}
              handleNoClick={() => closeApprovePersonModal()}
              heading="Approve Application"
              message="Are you sure you want to approve this application?"
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PeopleLayout);
