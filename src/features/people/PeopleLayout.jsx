/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AddIcon from "material-ui-icons/Add";
import MuiButton from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import EditIcon from "material-ui-icons/Edit";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import EditPersonDialog from "./components/EditPersonDialog";
import InvitePersonModal from "./components/InvitePersonModal";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import PeopleList from "./components/PeopleList";
import PersonInfo from "./components/PersonInfo";
import NotificationModal from "../../components/NotificationModal";

const styles = theme => ({
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    margin: "0 24px 24px 24px"
  },
  adWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  fabPosition: {
    color: "#fff",
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: 10
  },
  flexGrow: {
    flexGrow: 1
  },
  iconAdjacentText: {
    marginRight: 8
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
    const { loadStaff, loadTeams, loadEventsByCoach } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);

      if (personID) {
        loadEventsByCoach(activeInstitutionID, personID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, teams } = nextProps;
    const { personID } = nextProps.match.params;
    const {
      loadStaff,
      loadTeams,
      loadEventsByCoach,
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
      loadTeams(activeInstitutionID);

      if (personID) {
        loadEventsByCoach(activeInstitutionID, personID);
      }
    }

    if (
      activeInstitutionID !== "" &&
      personID &&
      personID !== this.props.match.params.personID
    ) {
      loadEventsByCoach(activeInstitutionID, personID);
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
            email: value.info.email,
            status: value.metadata.status,
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

  filterPeople(staff) {
    const { sportFilter } = this.props;
    const { type } = this.props.filters;
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

        if (sportFilter !== "all") {
          if (sportFilter === "other") {
            const supportedSports = ["netball", "rugby", "soccer"];
            let doesSport = false;
            _.toPairs(personInfo.info.sports).map(([sport, isPreferred]) => {
              let reformattedSport = _.toLower(sport);
              if (reformattedSport === "soccer / football") {
                reformattedSport = "soccer";
              }
              if (
                !supportedSports.includes(reformattedSport) &&
                isPreferred &&
                reformattedSport !== "unknown"
              ) {
                doesSport = true;
              }
            });
            allowThroughFilter = allowThroughFilter && doesSport;
          } else {
            let doesSport = false;
            _.toPairs(personInfo.info.sports).map(([sport, isPreferred]) => {
              if (isPreferred) {
                doesSport =
                  doesSport || _.lowerCase(sport).includes(sportFilter);
              }
            });
            allowThroughFilter = allowThroughFilter && doesSport;
          }
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
      teams,
      isMobile,
      isTablet,
      activeInstitutionID,
      eventsByCoach,
      role,
      paymentDefaults,
      userID,
      userName,
      communityName
    } = this.props;
    const { inviteeID, inviteeInfo } = this.props.uiConfig;
    const {
      isCoachesLoading,
      isManagersLoading,
      isAdminsLoading,
      isTeamsLoading,
      isInviteeLoading,
      isEditPersonLoading,
      isResendInviteLoading
    } = this.props.loadingStatus;
    const {
      openEditPersonDialog,
      closeEditPersonDialog,
      openInvitePersonModal,
      closeInvitePersonModal,
      fetchInviteeInfo,
      createUser,
      invitePerson,
      editPerson,
      editRoles,
      resendInvite,
      closeResendInviteAlert
    } = this.props.actions;
    const {
      isEditPersonDialogOpen,
      isInvitePersonModalOpen,
      isResendInviteAlertOpen
    } = this.props.dialogs;
    const { personID } = this.props.match.params;

    const staffCardsInfo = this.getStaffCardsInfo(
      this.filterPeople(staff, false)
    );
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
              eventsByPerson={{ ...eventsByCoach }}
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
                <MuiButton
                  fab
                  color="accent"
                  aria-label="edit person info"
                  className={classes.fabPosition}
                  onClick={() => openEditPersonDialog()}
                >
                  <EditIcon />
                </MuiButton>
              )}
          </div>
        ) : (
          <div className={classes.tabsWrapper}>
            <div
              className={
                staffCardsInfo.length > 0
                  ? classes.staffTab
                  : classes.staffTabNoCards
              }
            >
              {role === "admin" &&
                !isMobile && (
                  <div className={classes.actionsBar}>
                    <div className={classes.flexGrow} />
                    <Button
                      colour="secondary"
                      filled
                      handleClick={() => openInvitePersonModal()}
                    >
                      <i
                        className={`fas fa-plus ${classes.iconAdjacentText}`}
                      />
                      Invite new person
                    </Button>
                  </div>
                )}
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
                  <PeopleList
                    people={staffCardsInfo}
                    isLoading={isResendInviteLoading}
                    resendInvite={(inviteeName, inviteeID, inviteeEmail) =>
                      resendInvite(
                        inviteeName,
                        inviteeID,
                        inviteeEmail,
                        userName,
                        communityName
                      )}
                  />
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
                  <MuiButton
                    fab
                    color="accent"
                    aria-label="invite new person"
                    className={classes.fabPosition}
                    onClick={() => openInvitePersonModal()}
                  >
                    <AddIcon />
                  </MuiButton>
                )}
            </div>
          </div>
        )}
        <NotificationModal
          isOpen={isResendInviteAlertOpen}
          heading="Invite Email Resent"
          message="Your invite was resent to this person."
          handleOkClick={() => closeResendInviteAlert()}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PeopleLayout);
