/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import BannerAd from "../../../../components/BannerAd";
import CoachManagement from "./components/CoachManagement";
import { common, grey, lightBlue } from "../../../../utils/colours";
import Details from "./components/Details";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";
import Results from "./components/Results";
import Tabs from "../../../../components/Tabs";

const styles = {
  actionsBar: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0 12px",
    backgroundColor: grey[200]
  },
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  backButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: lightBlue[800],
    color: common["white"],
    cursor: "pointer",
    textAlign: "center",
    fontSize: 24,
    padding: "18px 24px",
    borderRadius: "16px 0 0 16px",
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  buttonSeparator: {
    height: 12
  },
  buttonWrapper: {
    margin: "24px 24px 0 24px"
  },
  header: {
    display: "flex",
    border: `1px solid ${grey[300]}`,
    margin: "0 24px 24px 24px",
    borderRadius: 16,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: common["white"]
  },
  headerInnerWrapper: {
    flexGrow: 1,
    textAlign: "center",
    padding: 24
  },
  iconAdjacentText: {
    marginRight: 8
  },
  menuButtonWrapper: {
    margin: "0 24px"
  },
  outerWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabsWrapper: {
    margin: "0 24px 24px 24px"
  }
};

class EventInfo extends Component {
  state = {
    tabSelected: "details"
  };

  updateTabSelected(newTab) {
    this.setState({
      tabSelected: newTab
    });
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

  getCancelButton(status) {
    const { classes, isInfoLoading } = this.props;
    const { cancelEvent, uncancelEvent } = this.props.actions;

    if (status === "CANCELLED") {
      return (
        <div className={classes.buttonWrapper}>
          <Button
            disabled={isInfoLoading}
            colour="primary"
            slim
            filled
            handleClick={() => uncancelEvent()}
          >
            <i className={`fas fa-undo ${classes.iconAdjacentText}`} />
            Uncancel event
          </Button>
        </div>
      );
    } else {
      return (
        <div className={classes.buttonWrapper}>
          <Button
            disabled={isInfoLoading}
            colour="primary"
            slim
            filled
            handleClick={() => cancelEvent()}
          >
            <i className={`fas fa-ban ${classes.iconAdjacentText}`} /> Cancel
            event
          </Button>
        </div>
      );
    }
  }

  getInfo() {
    const { info } = this.props;

    let reformattedInfo = {
      status: "DELETED",
      title: "Loading...",
      eventType: "Loading",
      date: new Date(Date.now()),
      times: {
        start: new Date(Date.now()),
        end: new Date(Date.now())
      },
      homeAway: "HOME",
      formattedDate: "Loading",
      formattedStartTime: "Loading",
      formattedEndTime: "Loading",
      isCompetitive: false,
      venue: "",
      notes: "",
      coaches: {},
      managers: {}
    };

    if (info) {
      reformattedInfo = {
        status: info.requiredInfo.status,
        title: info.requiredInfo.title,
        eventType: info.requiredInfo.type,
        date: info.requiredInfo.times.start,
        times: {
          start: info.requiredInfo.times.start,
          end: info.requiredInfo.times.end
        },
        formattedDate: moment(info.requiredInfo.times.start).format(
          "D MMMM YYYY"
        ),
        formattedStartTime: moment(info.requiredInfo.times.start).format(
          "h:mm A"
        ),
        formattedEndTime: moment(info.requiredInfo.times.end).format("h:mm A"),
        isCompetitive: info.requiredInfo.isCompetitive,
        venue: info.optionalInfo.venue,
        notes: info.optionalInfo.notes,
        homeAway: info.optionalInfo.homeAway,
        coaches: info.coaches,
        managers: info.managers
      };
    }

    return reformattedInfo;
  }

  getSectionDisplay(
    info,
    teams,
    coaches,
    managers,
    athletes,
    canLogResults,
    canApproveResults
  ) {
    const {
      classes,
      isMobile,
      isTablet,
      infoTab,
      eventID,
      dateSelected,
      isPastEvent,
      isAdmin,
      userID,
      isEditDetailsLoading,
      isEditOpponentLoading
    } = this.props;
    const {
      navigateTo,
      signIn,
      signOut,
      updateTimes,
      approveHours,
      updateAbsent,
      startLogging,
      toggleOptionalStats,
      finaliseResults,
      editResult,
      editDetails,
      editOpponents
    } = this.props.actions;
    const { isInfoLoading, emblem } = this.props;
    const { tabSelected } = this.state;

    const ad = this.createAd();
    const showButtons = !isPastEvent && !isInfoLoading;
    const cancelButton = this.getCancelButton(info.status);

    if (isMobile) {
      switch (infoTab) {
        case "details":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                {showButtons && isAdmin && cancelButton}
              </div>
              <Details
                eventType={info.eventType}
                date={info.formattedDate}
                times={info.times}
                isCancelled={info.status === "CANCELLED"}
                isCompetitive={info.isCompetitive}
                venue={info.venue}
                notes={info.notes}
                homeAway={info.homeAway}
                isEditDetailsLoading={isEditDetailsLoading}
                isEditOpponentLoading={isEditOpponentLoading}
                isAdmin={isAdmin}
                userID={userID}
                teams={teams}
                coaches={coaches}
                managers={managers}
                athletes={athletes}
                navigateTo={navigateTo}
                signIn={signIn}
                signOut={signOut}
                editDetails={editDetails}
                editOpponents={editOpponents}
              />
            </div>
          );
        case "coach-management":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                {showButtons && isAdmin && cancelButton}
              </div>
              <CoachManagement
                isAdmin={isAdmin}
                isCancelled={info.status === "CANCELLED"}
                isCompetitive={info.isCompetitive}
                coaches={coaches}
                eventTimes={info.times}
                signIn={signIn}
                signOut={signOut}
                updateTimes={updateTimes}
                approveHours={approveHours}
                updateAbsent={updateAbsent}
              />
            </div>
          );
        case "results":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                {showButtons && isAdmin && cancelButton}
              </div>
              <Results
                userID={userID}
                isUserAdmin={isAdmin}
                emblem={emblem}
                isTablet={isTablet}
                teams={teams}
                eventInfo={info}
                canLogResults={canLogResults}
                canApproveResults={canApproveResults}
                isCancelled={info.status === "CANCELLED"}
                editResult={(teamID, opponentID, newResult) =>
                  editResult(teamID, opponentID, newResult)}
                startLogging={(teamID, structure, opponentIDs) =>
                  startLogging(teamID, structure, opponentIDs)}
                toggleOptionalStats={(teamID, opponentID, newState) =>
                  toggleOptionalStats(teamID, opponentID, newState)}
                finaliseResults={teamID => finaliseResults(teamID)}
              />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() =>
                    navigateTo(
                      `/myaccount/schedule/${dateSelected}/${eventID}/details`
                    )}
                >
                  Details
                </Button>
              </div>
              <div className={classes.buttonSeparator} />
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() =>
                    navigateTo(
                      `/myaccount/schedule/${dateSelected}/${eventID}/coach-management`
                    )}
                >
                  Coach Management
                </Button>
              </div>
              {info.isCompetitive && (
                <div>
                  <div className={classes.buttonSeparator} />
                  <div className={classes.menuButtonWrapper}>
                    <Button
                      type="dark"
                      colour="primary"
                      filled
                      fullWidth
                      handleClick={() =>
                        navigateTo(
                          `/myaccount/schedule/${dateSelected}/${eventID}/results`
                        )}
                    >
                      Results
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
      }
    } else {
      switch (tabSelected) {
        case "details":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                {showButtons && isAdmin && cancelButton}
              </div>
              <Details
                eventType={info.eventType}
                date={info.formattedDate}
                times={info.times}
                isCancelled={info.status === "CANCELLED"}
                isCompetitive={info.isCompetitive}
                venue={info.venue}
                notes={info.notes}
                homeAway={info.homeAway}
                isEditDetailsLoading={isEditDetailsLoading}
                isEditOpponentLoading={isEditOpponentLoading}
                isAdmin={isAdmin}
                userID={userID}
                teams={teams}
                coaches={coaches}
                managers={managers}
                athletes={athletes}
                navigateTo={navigateTo}
                signIn={signIn}
                signOut={signOut}
                editDetails={editDetails}
                editOpponents={editOpponents}
              />
            </div>
          );
        case "coach-management":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                {showButtons && isAdmin && cancelButton}
              </div>
              <CoachManagement
                isAdmin={isAdmin}
                isCancelled={info.status === "CANCELLED"}
                isCompetitive={info.isCompetitive}
                coaches={coaches}
                eventTimes={info.times}
                signIn={signIn}
                signOut={signOut}
                updateTimes={updateTimes}
                approveHours={approveHours}
                updateAbsent={updateAbsent}
              />
            </div>
          );
        case "results":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                {showButtons && isAdmin && cancelButton}
              </div>
              <Results
                userID={userID}
                isUserAdmin={isAdmin}
                emblem={emblem}
                isTablet={isTablet}
                eventInfo={info}
                teams={teams}
                isCancelled={info.status === "CANCELLED"}
                canLogResults={canLogResults}
                canApproveResults={canApproveResults}
                editResult={(teamID, opponentID, newResult) =>
                  editResult(teamID, opponentID, newResult)}
                startLogging={(teamID, structure, opponentIDs) =>
                  startLogging(teamID, structure, opponentIDs)}
                toggleOptionalStats={(teamID, opponentID, newState) =>
                  toggleOptionalStats(teamID, opponentID, newState)}
                finaliseResults={teamID => finaliseResults(teamID)}
              />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                {showButtons && isAdmin && cancelButton}
              </div>
              <Details
                eventType={info.eventType}
                date={info.formattedDate}
                times={info.times}
                isCancelled={info.status === "CANCELLED"}
                isCompetitive={info.isCompetitive}
                venue={info.venue}
                notes={info.notes}
                homeAway={info.homeAway}
                userID={userID}
                teams={teams}
                coaches={coaches}
                managers={managers}
                athletes={athletes}
                navigateTo={navigateTo}
                signIn={signIn}
                signOut={signOut}
              />
            </div>
          );
      }
    }
  }

  getTabs(isCompetitive, canManageCoaches) {
    const allTabs = [
      {
        key: "details",
        label: "Details"
      },
      {
        key: "coach-management",
        label: "Coach Management"
      },
      {
        key: "results",
        label: "Results"
      }
    ];

    if (isCompetitive) {
      if (canManageCoaches) {
        return allTabs;
      } else {
        return [allTabs[0], allTabs[2]];
      }
    } else {
      if (canManageCoaches) {
        return [allTabs[0], allTabs[1]];
      } else {
        return [allTabs[0]];
      }
    }
  }

  getTeams() {
    const { info, teams } = this.props;

    if (info) {
      return _.toPairs(info.teams).map(([teamID, eventTeamInfo]) => {
        const teamInfo = teams[teamID];
        let opponentName = "";
        if (eventTeamInfo.opponents) {
          opponentName = eventTeamInfo.opponents["0"].name;
        }

        if (teamInfo) {
          return {
            id: teamID,
            name: teamInfo.info.name,
            formattedOpponents:
              opponentName === "" ? "Unknown opponents" : opponentName,
            results: eventTeamInfo
          };
        } else {
          return {
            id: teamID,
            name: "Error finding team",
            formattedOpponents: "",
            results: {
              opponents: []
            }
          };
        }
      });
    } else {
      return [];
    }
  }

  getCoaches() {
    const { info, coaches } = this.props;

    if (info) {
      return _.toPairs(info.coaches).map(([coachID, eventCoachInfo]) => {
        const coachInfo = coaches[coachID];
        if (coachInfo) {
          let payment = {
            rates: {
              standard: 100,
              overtime: 150
            },
            type: "HOURLY"
          };

          if (eventCoachInfo.payment) {
            payment = eventCoachInfo.payment;
          }

          return {
            payment,
            id: coachID,
            absenteeism: {
              isAbsent: !eventCoachInfo.attendance.didAttend,
              rating: eventCoachInfo.absenteeism.rating
            },
            name: `${coachInfo.info.name} ${coachInfo.info.surname}`,
            profilePicture: coachInfo.info.profilePictureURL,
            hours: eventCoachInfo.hours
          };
        } else {
          return {
            id: coachID,
            name: "Error finding coach",
            profilePicture: "",
            hours: {
              status: "AWAITING_SIGN_IN",
              times: {
                signIn: new Date(Date.now()),
                signOut: new Date(Date.now())
              }
            },
            absenteeism: {
              isAbsent: false,
              rating: ""
            },
            payment: {
              rates: {
                standard: 100,
                overtime: 150
              },
              type: "HOURLY"
            }
          };
        }
      });
    } else {
      return [];
    }
  }

  getManagers() {
    const { info, managers } = this.props;

    if (info) {
      return _.toPairs(info.managers).map(([managerID, eventManagerInfo]) => {
        const managerInfo = managers[managerID];
        if (managerInfo) {
          return {
            id: managerID,
            name: `${managerInfo.info.name} ${managerInfo.info.surname}`,
            profilePicture: managerInfo.info.profilePictureURL
          };
        } else {
          return {
            id: managerID,
            name: "Error finding manager",
            profilePicture: ""
          };
        }
      });
    } else {
      return [];
    }
  }

  getAthletes() {
    const { info, athletes } = this.props;

    if (info && info.athletes) {
      return _.toPairs(info.athletes).map(([athleteID, eventAthleteInfo]) => {
        const athleteInfo = athletes[athleteID];
        if (athleteInfo) {
          return {
            id: athleteID,
            name: `${athleteInfo.info.name} ${athleteInfo.info.surname}`,
            profilePicture: athleteInfo.info.profilePictureURL
          };
        } else {
          return {
            id: athleteID,
            name: "Error finding athlete",
            profilePicture: ""
          };
        }
      });
    } else {
      return [];
    }
  }

  checkIfCanManageCoaches() {
    const { role, userID, info } = this.props;

    return role === "admin" || (info && info.managers[userID]);
  }

  checkIfCanLogResults() {
    const { role, userID, info } = this.props;

    return (
      role === "admin" ||
      (info && info.managers[userID]) ||
      (info && info.coaches[userID])
    );
  }

  checkIfCanApproveResults() {
    const { role, userID, info } = this.props;

    return role === "admin" || (info && info.managers[userID]);
  }

  render() {
    const { classes, isMobile, infoTab, eventID, dateSelected } = this.props;
    const { goBack } = this.props.actions;
    const { tabSelected } = this.state;

    const info = this.getInfo();
    const teams = this.getTeams();
    const coaches = this.getCoaches();
    const managers = this.getManagers();
    const athletes = this.getAthletes();
    const canLogResults = this.checkIfCanLogResults();
    const canApproveResults = this.checkIfCanApproveResults();

    if (!isMobile && infoTab) {
      return <Redirect to={`/myaccount/schedule/${dateSelected}/${eventID}`} />;
    }

    const sectionDisplay = this.getSectionDisplay(
      info,
      teams,
      coaches,
      managers,
      athletes,
      canLogResults,
      canApproveResults
    );
    const tabs = this.getTabs(
      info.isCompetitive,
      this.checkIfCanManageCoaches()
    );

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.backButton} onClick={() => goBack()}>
            <div>
              <i className="fas fa-caret-left" />
            </div>
          </div>
          <div className={classes.headerInnerWrapper}>{info.title}</div>
        </div>
        <div className={classes.outerWrapper}>
          {!isMobile && (
            <div className={classes.tabsWrapper}>
              <Tabs
                tabs={tabs}
                selected={tabSelected}
                handleClick={newTab => this.updateTabSelected(newTab)}
              />
            </div>
          )}
          {sectionDisplay}
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(EventInfo);
