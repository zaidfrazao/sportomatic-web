/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import accounting from "accounting";
import Avatar from "material-ui/Avatar";
import AwaitingApprovalIcon from "material-ui-icons/AssignmentReturn";
import AwaitingSignInIcon from "material-ui-icons/AssignmentLate";
import AwaitingSignOutIcon from "material-ui-icons/AssignmentReturned";
import {
  amber,
  brown,
  common,
  grey,
  green,
  lightBlue,
  orange,
  red
} from "material-ui/colors";
import HoursApprovedIcon from "material-ui-icons/AssignmentTurnedIn";
import List, { ListItem, ListItemText } from "material-ui/List";
import moment from "moment";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import defaultProfilePicture from "./image/default-profile-picture.png";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  awaitingApprovalAvatar: {
    backgroundColor: lightBlue[500]
  },
  awaitingSignInAvatar: {
    backgroundColor: red[500]
  },
  awaitingSignOutAvatar: {
    backgroundColor: orange[500]
  },
  draw: {
    backgroundColor: lightBlue[500],
    color: grey[50]
  },
  flexGrow: {
    flexGrow: 2
  },
  hoursApprovedAvatar: {
    backgroundColor: green[500]
  },
  loaderWrapper: {
    margin: 12,
    width: "100%",
    textAlign: "center"
  },
  loss: {
    backgroundColor: red[500],
    color: grey[50]
  },
  noItems: {
    textAlign: "center"
  },
  placedFirst: {
    backgroundColor: amber[500],
    color: grey[50]
  },
  placedSecond: {
    backgroundColor: grey[400],
    color: grey[50]
  },
  placedThird: {
    backgroundColor: brown[400],
    color: grey[50]
  },
  placedOther: {
    backgroundColor: grey[700],
    color: grey[50]
  },
  root: {
    width: "100%"
  },
  section: {
    borderRadius: 16,
    marginBottom: 24,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  sectionHeading: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800]
  },
  sectionList: {
    flexGrow: 1,
    margin: "12px 12px 0 12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "calc(100% - 24px)"
  },
  sectionButton: {
    backgroundColor: lightBlue[500],
    borderRadius: "0 0 16px 16px",
    width: "100%",
    marginTop: 12
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
  viewMoreButton: {
    width: "calc(100% - 16px)",
    margin: 8
  },
  widgetsWrapper: {
    padding: 24
  },
  win: {
    backgroundColor: green[500],
    color: grey[50]
  }
});

class DashboardLayout extends Component {
  componentWillMount() {
    const { activeInstitutionID, role, userID } = this.props;
    const {
      loadRecentWages,
      loadStaff,
      loadTeams,
      loadUpcomingEvents,
      loadPastEvents
    } = this.props.actions;

    if (activeInstitutionID && activeInstitutionID !== "" && userID !== "") {
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      loadUpcomingEvents(activeInstitutionID);
      loadPastEvents(activeInstitutionID);
      if (role === "admin") {
        loadRecentWages(activeInstitutionID);
      } else if (role === "coach") {
        loadRecentWages(activeInstitutionID, userID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, role, userID } = nextProps;
    const {
      loadRecentWages,
      loadStaff,
      loadTeams,
      loadUpcomingEvents,
      loadPastEvents,
      resetState
    } = nextProps.actions;

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      resetState();
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      loadUpcomingEvents(activeInstitutionID);
      loadPastEvents(activeInstitutionID);
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
    const { recentWages, staff, role, history } = this.props;
    const { isStaffLoading } = this.props.loadingStatus;

    let recentWagesList = [];
    _.toPairs(recentWages).map(([id, info]) => {
      let primaryText = "";
      let secondaryText = "";
      let link = `/myaccount/wages`;

      if (staff[info.coachID]) {
        secondaryText = moment(info.date).fromNow();
        if (role === "coach") {
          primaryText = `You were paid ${accounting.formatMoney(
            info.wage,
            "R"
          )}`;
        } else {
          primaryText = `${staff[info.coachID].info.name} ${staff[info.coachID]
            .info.surname} was paid ${accounting.formatMoney(info.wage, "R")}`;
          link = `/myaccount/wages/${info.coachID}`;
        }
      }

      recentWagesList.push(
        <ListItem key={id} button onClick={() => history.push(link)}>
          {!isStaffLoading &&
            staff[info.coachID] &&
            role !== "coach" && (
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

    return recentWagesList;
  }

  getUpcomingEventsList() {
    const { upcomingEvents, history, role, userID } = this.props;

    let upcomingEventsList = [];
    _.toPairs(upcomingEvents).map(([id, info]) => {
      if (
        (role === "admin" ||
          (role === "coach" && info.coaches[userID]) ||
          (role === "manager" && info.managers[userID])) &&
        upcomingEventsList.length < 5
      ) {
        const date = moment(info.requiredInfo.times.start);

        let primaryText = info.requiredInfo.title;
        let secondaryText = `${date.format(
          "D MMM YYYY"
        )} | Starts ${date.fromNow()}`;
        let link = `/myaccount/schedule/${date.format("YYYY-MM-DD")}/${id}`;

        upcomingEventsList.push(
          <ListItem key={id} button onClick={() => history.push(link)}>
            <ListItemText primary={primaryText} secondary={secondaryText} />
          </ListItem>
        );
      }
    });

    return upcomingEventsList;
  }

  getRecentResultsList() {
    const { classes, pastEvents, history, teams, role, userID } = this.props;

    let recentResultsList = [];
    _.toPairs(pastEvents).map(([id, info]) => {
      const date = moment(info.requiredInfo.times.start);

      if (
        info.requiredInfo.isCompetitive &&
        info.requiredInfo.status === "ACTIVE"
      ) {
        if (
          role === "admin" ||
          (role === "coach" && info.coaches[userID]) ||
          (role === "manager" && info.managers[userID])
        ) {
          _.toPairs(info.teams).map(([teamID, teamInfo]) => {
            if (
              teamInfo.resultsStatus === "FINALISED" &&
              recentResultsList.length < 5
            ) {
              const sport = teams[teamID] ? teams[teamID].info.sport : "";
              switch (sport) {
                case "Athletics":
                case "Swimming":
                  let ourTotalPoints = 0;
                  _.toPairs(
                    teamInfo.opponents
                  ).map(([opponentID, opponentInfo]) => {
                    ourTotalPoints =
                      opponentInfo.ourScore &&
                      opponentInfo.ourScore.totalPoints;
                  });

                  let scores = [{ id: teamID, score: ourTotalPoints }];

                  _.toPairs(
                    teamInfo.opponents
                  ).map(([opponentID, opponentInfo]) => {
                    scores.push({
                      id: opponentID,
                      score: opponentInfo.theirScore.totalPoints
                    });
                  });

                  scores.sort((scoreA, scoreB) => {
                    if (scoreA.score > scoreB.score) {
                      return -1;
                    } else if (scoreA.score < scoreB.score) {
                      return +1;
                    } else {
                      return 0;
                    }
                  });

                  let placement = 1;
                  let prevScore = scores[0].score;
                  const placements = _.fromPairs(
                    scores.map((score, index) => {
                      if (index === 0) {
                        prevScore = score.score;
                        return [score.id, placement];
                      } else {
                        if (score.score === prevScore) {
                          prevScore = score.score;
                          return [score.id, placement];
                        } else {
                          placement = index + 1;
                          prevScore = score.score;
                          return [score.id, placement];
                        }
                      }
                    })
                  );

                  let statusStyle = "";
                  let resultText = "";
                  let primaryText = "Loading...";
                  let secondaryText = `${date.fromNow()}`;
                  switch (placements[teamID]) {
                    case 1:
                      statusStyle = classes.placedFirst;
                      resultText = "1";
                      primaryText = `${teams[teamID].info.name} placed 1st`;
                      break;
                    case 2:
                      statusStyle = classes.placedSecond;
                      resultText = "2";
                      primaryText = `${teams[teamID].info.name} placed 2nd`;
                      break;
                    case 3:
                      statusStyle = classes.placedThird;
                      resultText = "3";
                      primaryText = `${teams[teamID].info.name} placed 3rd`;
                      break;
                    default:
                      let suffix = "th";
                      if (placements[teamID] > 20) {
                        if (placements[teamID] % 10 === 1) {
                          suffix = "st";
                        } else if (placements[teamID] % 10 === 2) {
                          suffix = "nd";
                        } else if (placements[teamID] % 10 === 3) {
                          suffix = "rd";
                        }
                      }
                      statusStyle = classes.placedOther;
                      resultText = `${placements[teamID]}`;
                      primaryText = `${teams[teamID].info
                        .name} placed ${placements[teamID]}${suffix}`;
                      break;
                  }

                  recentResultsList.push(
                    <ListItem
                      key={`rankingResult-${id}`}
                      button
                      onClick={() =>
                        history.push(`/myaccount/results/${teamID}/${id}`)}
                    >
                      <Avatar className={statusStyle}>{resultText}</Avatar>
                      <ListItemText
                        primary={primaryText}
                        secondary={secondaryText}
                      />
                    </ListItem>
                  );
                  break;
                default:
                  _.toPairs(
                    teamInfo.opponents
                  ).map(([opponentID, resultInfo]) => {
                    let primaryText = "Loading...";
                    let secondaryText = `vs ${resultInfo.name === ""
                      ? "Unknown"
                      : resultInfo.name} | ${date.fromNow()}`;
                    let link = `/myaccount/results/${teamID}/${id}`;

                    let result = "drew";
                    let avatarStyle = classes.draw;

                    if (teams[teamID]) {
                      if (resultInfo.ourScore.finalScore !== undefined) {
                        primaryText = `${teams[teamID].info
                          .name} ${result} ${resultInfo.ourScore
                          .finalScore} - ${resultInfo.theirScore.finalScore}`;

                        if (
                          resultInfo.ourScore.finalScore >
                          resultInfo.theirScore.finalScore
                        ) {
                          result = "won";
                          avatarStyle = classes.win;
                        } else if (
                          resultInfo.ourScore.finalScore <
                          resultInfo.theirScore.finalScore
                        ) {
                          result = "lost";
                          avatarStyle = classes.loss;
                        }
                      } else {
                        primaryText = `${teams[teamID].info
                          .name} ${result} ${resultInfo.ourScore
                          .totalPoints} - ${resultInfo.theirScore.totalPoints}`;

                        if (
                          resultInfo.ourScore.totalPoints >
                          resultInfo.theirScore.totalPoints
                        ) {
                          result = "won";
                          avatarStyle = classes.win;
                        } else if (
                          resultInfo.ourScore.totalPoints <
                          resultInfo.theirScore.totalPoints
                        ) {
                          result = "lost";
                          avatarStyle = classes.loss;
                        }
                      }
                    }

                    recentResultsList.push(
                      <ListItem
                        key={`${id}-${opponentID}`}
                        button
                        onClick={() => history.push(link)}
                      >
                        <Avatar className={avatarStyle}>
                          {_.upperCase(result[0])}
                        </Avatar>
                        <ListItemText
                          primary={primaryText}
                          secondary={secondaryText}
                        />
                      </ListItem>
                    );
                  });
                  break;
              }
            }
          });
        }
      }
    });

    return recentResultsList;
  }

  getRecentHoursList() {
    const { classes, pastEvents, history, staff, userID, role } = this.props;

    let recentHoursList = [];
    _.toPairs(pastEvents).map(([id, info]) => {
      _.toPairs(info.coaches).map(([coachID, coachInfo]) => {
        if (
          (role === "admin" ||
            (role === "manager" && info.managers[userID]) ||
            (role === "coach" && coachID === userID)) &&
          (coachInfo.attendance.willAttend && coachInfo.attendance.didAttend) &&
          info.requiredInfo.status === "ACTIVE" &&
          recentHoursList.length < 5
        ) {
          let primaryText = "Loading...";
          let secondaryText = "Awaiting sign in";
          let link = "/myaccount/hours/";

          let avatarStyle = classes.awaitingSignInAvatar;
          let avatarIcon = <AwaitingSignInIcon />;
          if (coachInfo.hours.status === "AWAITING_SIGN_OUT") {
            secondaryText = "Awaiting sign out";
            avatarStyle = classes.awaitingSignOutAvatar;
            avatarIcon = <AwaitingSignOutIcon />;
          } else if (coachInfo.hours.status === "AWAITING_APPROVAL") {
            secondaryText = "Awaiting approval";
            avatarStyle = classes.awaitingApprovalAvatar;
            avatarIcon = <AwaitingApprovalIcon />;
          } else if (coachInfo.hours.status === "APPROVED") {
            secondaryText = "Approved";
            avatarStyle = classes.hoursApprovedAvatar;
            avatarIcon = <HoursApprovedIcon />;

            if (role !== "coach") {
              link = `/myaccount/hours/${coachID}`;
            }
          }

          if (staff[coachID]) {
            if (role === "coach") {
              primaryText = info.requiredInfo.title;
            } else {
              primaryText = `${staff[coachID].info.name} ${staff[coachID].info
                .surname} at ${info.requiredInfo.title}`;
            }
          }

          recentHoursList.push(
            <ListItem key={id} button onClick={() => history.push(link)}>
              <Avatar className={avatarStyle}>{avatarIcon}</Avatar>
              <ListItemText primary={primaryText} secondary={secondaryText} />
            </ListItem>
          );
        }
      });
    });

    return recentHoursList;
  }

  render() {
    const {
      classes,
      accountInfo,
      institutions,
      permissions,
      role,
      history
    } = this.props;
    const {
      isRecentWagesLoading,
      isUpcomingEventsLoading,
      isPastEventsLoading
    } = this.props.loadingStatus;

    let active = {
      id: "",
      role: "ADMIN",
      institutionName: "",
      emblemURL: ""
    };

    let showWages =
      role === "admin" ||
      role === "coach" ||
      (role === "manager" && permissions.managers.wages.canView);

    const ad = this.createAd();
    const recentWagesList = this.getRecentWagesList();
    const upcomingEventsList = this.getUpcomingEventsList();
    const recentResultsList = this.getRecentResultsList();
    const recentHoursList = this.getRecentHoursList();

    if (accountInfo.lastAccessed) {
      active.id = accountInfo.lastAccessed.institutionID;
      active.role = accountInfo.lastAccessed.role;
    }

    if (institutions[active.id]) {
      active.institutionName = institutions[active.id].info.name;
      active.emblemURL = institutions[active.id].info.emblemURL;
    }

    return (
      <div className={classes.root}>
        <div className={classes.adWrapper}>{ad}</div>
        <div className={classes.widgetsWrapper}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Upcoming Events</div>
            <div className={classes.sectionContent}>
              {isUpcomingEventsLoading ? (
                <List className={classes.sectionList}>
                  <ListItem className={classes.noItems}>
                    <ListItemText primary="Loading..." />
                  </ListItem>
                </List>
              ) : (
                <List className={classes.sectionList}>
                  {upcomingEventsList.length > 0 ? (
                    upcomingEventsList
                  ) : (
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="None" />
                    </ListItem>
                  )}
                </List>
              )}
              <div className={classes.sectionButton}>
                <Button
                  colour="primary"
                  fullWidth
                  filled
                  handleClick={() => history.push("/myaccount/schedule")}
                >
                  View more
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Recent Results</div>
            <div className={classes.sectionContent}>
              {isPastEventsLoading ? (
                <List className={classes.sectionList}>
                  <ListItem className={classes.noItems}>
                    <ListItemText primary="Loading..." />
                  </ListItem>
                </List>
              ) : (
                <List className={classes.sectionList}>
                  {recentResultsList.length > 0 ? (
                    recentResultsList
                  ) : (
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="None" />
                    </ListItem>
                  )}
                </List>
              )}
              <div className={classes.sectionButton}>
                <Button
                  colour="primary"
                  fullWidth
                  filled
                  handleClick={() => history.push("/myaccount/results")}
                >
                  View more
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Recent Hours</div>
            <div className={classes.sectionContent}>
              {isPastEventsLoading ? (
                <List className={classes.sectionList}>
                  <ListItem className={classes.noItems}>
                    <ListItemText primary="Loading..." />
                  </ListItem>
                </List>
              ) : (
                <List className={classes.sectionList}>
                  {recentHoursList.length > 0 ? (
                    recentHoursList
                  ) : (
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="None" />
                    </ListItem>
                  )}
                </List>
              )}
              <div className={classes.sectionButton}>
                <Button
                  colour="primary"
                  fullWidth
                  filled
                  handleClick={() => history.push("/myaccount/hours")}
                >
                  View more
                </Button>
              </div>
            </div>
          </div>
          {showWages && (
            <div className={classes.section}>
              <div className={classes.sectionHeading}>Recent Wages</div>
              <div className={classes.sectionContent}>
                {isRecentWagesLoading ? (
                  <List className={classes.sectionList}>
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  </List>
                ) : (
                  <List className={classes.sectionList}>
                    {recentWagesList.length > 0 ? (
                      recentWagesList
                    ) : (
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="None" />
                      </ListItem>
                    )}
                  </List>
                )}
                <div className={classes.sectionButton}>
                  <Button
                    colour="primary"
                    fullWidth
                    filled
                    handleClick={() => history.push("/myaccount/wages")}
                  >
                    View more
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardLayout);
