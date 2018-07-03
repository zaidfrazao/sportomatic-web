/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import injectStyles from "react-jss";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import { common, lightBlue } from "../../utils/colours";
import Dialog from "../../components/Dialog";
import EmptyState from "../../components/EmptyState";
import InvitePersonDialog from "./components/InvitePersonDialog";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import PeopleList from "./components/PeopleList";
import PersonalAllSwitch from "./components/PersonalAllSwitch";
import PersonInfo from "./components/PersonInfo";

const mobileBreakpoint = 800;

const styles = {
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    margin: "24px 24px 0 24px",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  adWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  buttonSeparator: {
    height: 12
  },
  emptyState: {
    padding: 24
  },
  emptyStateButton: {
    transition: "0.25s",
    fontSize: 18,
    margin: "0 8px",
    cursor: "pointer",
    color: common["black"],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    },
    "&:hover": {
      color: lightBlue[500]
    }
  },
  emptyStateButtonIcon: {
    marginRight: 8,
    width: 25,
    height: 25
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
  tabsWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

class PeopleLayout extends Component {
  state = {
    sports: {},
    types: { Admin: true, Coach: true, Manager: true }
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { personID } = this.props.match.params;
    const {
      loadAdmins,
      loadStaff,
      loadTeams,
      loadEventsByCoach,
      loadWagesByCoach,
      loadSeasons
    } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadAdmins(activeInstitutionID);
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      loadSeasons(activeInstitutionID);

      if (personID) {
        loadEventsByCoach(activeInstitutionID, personID);
        loadWagesByCoach(activeInstitutionID, personID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, teams } = nextProps;
    const { personID } = nextProps.match.params;
    const {
      loadAdmins,
      loadStaff,
      loadTeams,
      loadEventsByCoach,
      loadWagesByCoach,
      resetState,
      loadSeasons
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
      loadAdmins(activeInstitutionID);
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      loadSeasons(activeInstitutionID);

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
      loadWagesByCoach(activeInstitutionID, personID);
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

  getStaffCardsInfo(staff) {
    const { activeInstitutionID } = this.props;

    return _.values(
      _.mapValues(staff, (value, key) => {
        if (value.institutions[activeInstitutionID]) {
          return {
            id: key,
            name: value.info.name,
            surname: value.info.surname,
            profilePictureURL: value.info.profilePictureURL,
            email: value.info.email,
            isSignedUp: value.completeness.hasPassword,
            isAdmin:
              value.institutions[activeInstitutionID].roles.admin === "APPROVED"
          };
        }
      })
    )
      .filter(person => person !== undefined)
      .sort((personA, personB) => {
        if (personA.name > personB.name) return +1;
        if (personA.name < personB.name) return -1;
        if (personA.surname > personB.surname) return +1;
        if (personA.surname < personB.surname) return -1;
        return 0;
      });
  }

  filterPeople(staff, seasons) {
    const { sportFilter } = this.props;
    const { teams, userID, meAllFilter } = this.props;

    return _.fromPairs(
      _.toPairs(staff).filter(([staffID, personInfo]) => {
        let allowThroughFilter = true;
        let nameMatch = true;
        let teamMatch = false;
        let roleMatch = true;

        if (meAllFilter === "me") {
          roleMatch = false;
          _.toPairs(teams).map(([teamID, teamInfo]) => {
            let coaches = {};
            let managers = {};
            _.toPairs(seasons)
              .filter(([seasonID, seasonInfo]) => {
                return seasonInfo.teamID === teamID;
              })
              .map(([seasonID, seasonInfo]) => {
                coaches = { ...coaches, ...seasonInfo.coaches };
                managers = { ...managers, ...seasonInfo.managers };
                return {
                  id: seasonID,
                  ...seasonInfo
                };
              });
            const teamCoaches = _.keys(coaches);
            const teamManagers = _.keys(managers);

            if (teamCoaches.includes(userID) || teamManagers.includes(userID)) {
              roleMatch =
                roleMatch ||
                teamCoaches.includes(staffID) ||
                teamManagers.includes(staffID);
            }
          });
        }

        if (sportFilter !== "all") {
          let doesSport = false;
          _.toPairs(personInfo.info.sports).map(([sport, isPreferred]) => {
            if (isPreferred) {
              doesSport = doesSport || sport.includes(sportFilter);
            }
          });
          allowThroughFilter = allowThroughFilter && doesSport;
        }

        allowThroughFilter =
          allowThroughFilter && (teamMatch || nameMatch) && roleMatch;

        return allowThroughFilter;
      })
    );
  }

  getHours() {
    const { personID } = this.props.match.params;
    const { eventsByCoach } = this.props;

    const currentDate = new Date(Date.now());

    return _.toPairs(eventsByCoach)
      .filter(([eventID, eventInfo]) => {
        return eventInfo.requiredInfo.times.start < currentDate;
      })
      .map(([eventID, eventInfo]) => {
        const eventCoachInfo = eventInfo.coaches[personID];

        if (eventCoachInfo) {
          return {
            id: eventID,
            title: eventInfo.requiredInfo.title,
            status: eventInfo.requiredInfo.status,
            date: eventInfo.requiredInfo.times.start,
            times: {
              start: eventInfo.requiredInfo.times.start,
              end: eventInfo.requiredInfo.times.end
            },
            absenteeism: {
              wasAbsent: !eventInfo.coaches[personID].attendance.willAttend,
              rating: eventInfo.coaches[personID].absenteeism.rating
            },
            hours: eventInfo.coaches[personID].hours
          };
        }
      })
      .sort((eventA, eventB) => {
        const eventMomentA = moment(eventA.date);
        const eventMomentB = moment(eventB.date);

        if (eventMomentA.isBefore(eventMomentB)) return -1;
        if (eventMomentA.isAfter(eventMomentB)) return +1;
        return 0;
      });
  }

  getWages() {
    const { wagesByCoach } = this.props;

    return _.toPairs(wagesByCoach)
      .map(([wageID, wageInfo]) => {
        return { id: wageID, ...wageInfo };
      })
      .sort((wageA, wageB) => {
        const wageMomentA = moment(wageA.date);
        const wageMomentB = moment(wageB.date);

        if (wageMomentA.isBefore(wageMomentB)) return -1;
        if (wageMomentA.isAfter(wageMomentB)) return +1;
        return 0;
      });
  }

  render() {
    const {
      classes,
      users,
      teams,
      isMobile,
      isTablet,
      activeInstitutionID,
      userID,
      userName,
      communityName,
      navigateTo,
      goBack,
      roles,
      institutionCreationDate,
      meAllFilter,
      changeMeAllFilter,
      seasons,
      communityProgress
    } = this.props;
    const { resendInfo } = this.props.uiConfig;
    const {
      isCoachesLoading,
      isManagersLoading,
      isAdminsLoading,
      isResendInviteLoading,
      isInviteUserLoading,
      isCreateUserLoading,
      isInviteeInfoLoading
    } = this.props.loadingStatus;
    const {
      openInvitePersonModal,
      closeInvitePersonModal,
      fetchInviteeInfo,
      resendInvite,
      closePostInviteAlert,
      closeResendInviteAlert,
      updateAdminStatus
    } = this.props.actions;
    const {
      isInvitePersonModalOpen,
      isResendInviteAlertOpen,
      postInviteAlert
    } = this.props.dialogs;
    const { personID, infoTab } = this.props.match.params;

    if (!communityProgress.hasSports) {
      return (
        <div className={classes.root}>
          <div className={classes.outerWrapper}>
            <div className={classes.emptyState}>
              <EmptyState>
                Set up your first sport in the{" "}
                <span
                  className={classes.emptyStateButton}
                  onClick={() => navigateTo("/myaccount/community/")}
                >
                  <i
                    className={`fas fa-users ${classes.emptyStateButtonIcon}`}
                  />
                  Community
                </span>{" "}
                section.
              </EmptyState>
            </div>
          </div>
        </div>
      );
    } else if (!communityProgress.hasSeasons) {
      return (
        <div className={classes.root}>
          <div className={classes.outerWrapper}>
            <div className={classes.emptyState}>
              <EmptyState>
                Next, you should set up a team's season in the{" "}
                <span
                  className={classes.emptyStateButton}
                  onClick={() => navigateTo("/myaccount/teams/")}
                >
                  <i
                    className={`fas fa-user-friends ${classes.emptyStateButtonIcon}`}
                  />
                  Teams
                </span>{" "}
                section.
              </EmptyState>
            </div>
          </div>
        </div>
      );
    } else {
      if (personID) {
        const hours = this.getHours();
        const wages = this.getWages();

        return (
          <div className={classes.root}>
            <div className={classes.infoWrapper}>
              <PersonInfo
                institutionCreationDate={institutionCreationDate}
                userID={userID}
                teams={teams}
                personID={personID}
                info={users[personID]}
                activeInstitutionID={activeInstitutionID}
                infoTab={infoTab}
                isUserAdmin={roles.admin}
                seasons={seasons}
                hours={hours}
                wages={wages}
                isMobile={isMobile}
                isTablet={isTablet}
                actions={{
                  navigateTo,
                  goBack,
                  updateAdminStatus: newStatus =>
                    updateAdminStatus(personID, activeInstitutionID, newStatus)
                }}
              />
            </div>
          </div>
        );
      } else {
        const staffCardsInfo = this.getStaffCardsInfo(
          this.filterPeople(users, seasons)
        );
        const ad = this.createAd();

        return (
          <div className={classes.root}>
            <div className={classes.tabsWrapper}>
              <div
                className={
                  staffCardsInfo.length > 0
                    ? classes.staffTab
                    : classes.staffTabNoCards
                }
              >
                <div className={classes.adWrapper}>{ad}</div>
                <div className={classes.actionsBar}>
                  <PersonalAllSwitch
                    isMobile={isMobile}
                    meAllFilter={meAllFilter}
                    changeMeAllFilter={changeMeAllFilter}
                  />
                  {isMobile && <div className={classes.buttonSeparator} />}
                  <div className={classes.flexGrow} />
                  {roles.admin && (
                    <Button
                      colour="primary"
                      filled
                      slim
                      fullWidth={isMobile}
                      handleClick={() => openInvitePersonModal()}
                    >
                      <i
                        className={`fas fa-plus ${classes.iconAdjacentText}`}
                      />
                      Invite new person
                    </Button>
                  )}
                </div>
                {activeInstitutionID === "" ||
                isCoachesLoading ||
                isManagersLoading ||
                isAdminsLoading ? (
                  <div className={classes.loaderWrapper} />
                ) : (
                  <div>
                    <PeopleList
                      teams={teams}
                      navigateTo={navigateTo}
                      people={staffCardsInfo}
                      isLoading={isResendInviteLoading}
                      resendID={resendInfo.id}
                      isUserAdmin={roles.admin}
                      seasons={seasons}
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
                <InvitePersonDialog
                  isOpen={isInvitePersonModalOpen}
                  isLoading={
                    isInviteeInfoLoading ||
                    isCreateUserLoading ||
                    isInviteUserLoading
                  }
                  actions={{
                    invitePerson: (
                      type,
                      firstName,
                      lastName,
                      email,
                      phoneNumber
                    ) =>
                      fetchInviteeInfo(
                        type,
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        activeInstitutionID,
                        userID
                      ),
                    closeModal: () => closeInvitePersonModal()
                  }}
                />
              </div>
            </div>
            <Dialog
              type="alert"
              isOpen={isResendInviteAlertOpen}
              heading="Invite Email Resent"
              handleOkClick={() => closeResendInviteAlert()}
            >
              {`Your invite was resent to ${resendInfo.name}.`}
            </Dialog>
            <Dialog
              type="alert"
              isOpen={postInviteAlert.isOpen}
              heading={postInviteAlert.heading}
              handleOkClick={() => closePostInviteAlert()}
            >
              {postInviteAlert.message}
            </Dialog>
          </div>
        );
      }
    }
  }
}

export default injectStyles(styles)(PeopleLayout);
