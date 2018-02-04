/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import BackIcon from "material-ui-icons/ArrowBack";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import { grey, lightBlue } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import moment from "moment";
import Paper from "material-ui/Paper";
import { Redirect, Route } from "react-router-dom";
import Tabs, { Tab } from "material-ui/Tabs";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import CoachesList from "./components/CoachesList";
import FiltersToolbar from "./components/FiltersToolbar";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import WageCard from "./components/WageCard";
import WageHistory from "./components/WageHistory";

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    overflow: "auto"
  },
  dateHeader: {
    padding: 16,
    backgroundColor: lightBlue[900],
    color: grey[50]
  },
  dateWrapper: {
    margin: 24,
    width: "calc(100% - 24px)",
    maxWidth: 970
  },
  innerWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loadMoreButton: {
    margin: 24
  },
  name: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  noCardsText: {
    color: grey[500],
    padding: 40,
    border: `3px solid ${grey[300]}`
  },
  noCardsWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 1200,
    margin: "0 auto"
  },
  outerWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabs: {
    height: 72
  },
  tabsWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  wagesByDateWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class WagesLayout extends Component {
  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { loadStaff, loadWagesByDate } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadStaff(activeInstitutionID);
      loadWagesByDate(activeInstitutionID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID } = nextProps;
    const { loadStaff, loadWagesByDate } = nextProps.actions;

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      loadStaff(activeInstitutionID);
      loadWagesByDate(activeInstitutionID);
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  renderWagesByDate() {
    const { classes, wagesByDate, staff, activeInstitutionID } = this.props;
    const { lastVisible } = this.props.uiConfig;
    const { isStaffLoading, isWagesByDateLoading } = this.props.loadingStatus;
    const { loadWagesByDate } = this.props.actions;

    if (isStaffLoading || activeInstitutionID === "") {
      return (
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
      );
    } else {
      let groupedByDate = {};
      _.toPairs(wagesByDate).map(([id, info]) => {
        const wageDate = moment(info.date).format("YYYY-MM-DD");
        if (groupedByDate[wageDate]) {
          groupedByDate[wageDate] = {
            ...groupedByDate[wageDate],
            [id]: info
          };
        } else {
          groupedByDate[wageDate] = {
            [id]: info
          };
        }
      });

      return (
        <div className={classes.wagesByDateWrapper}>
          {_.toPairs(groupedByDate).map(([date, wages]) => {
            const currentDate = moment().format("YYYY-MM-DD");
            return (
              <Paper className={classes.dateWrapper} key={date}>
                <div className={classes.dateHeader}>
                  {date === currentDate
                    ? "Today"
                    : moment(date).format("dddd, MMMM Do YYYY")}
                </div>
                <div>
                  {_.toPairs(wages).map(([wageID, wageInfo]) => {
                    return (
                      <WageCard
                        key={`wagescards-${wageID}`}
                        wageInfo={wageInfo}
                        coachInfo={{
                          name: staff[wageInfo.coachID].info.name,
                          surname: staff[wageInfo.coachID].info.surname,
                          profilePictureURL:
                            staff[wageInfo.coachID].info.profilePictureURL
                        }}
                      />
                    );
                  })}
                </div>
              </Paper>
            );
          })}
          {isWagesByDateLoading && (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          )}
          {!isWagesByDateLoading &&
            _.keys(groupedByDate).length === 0 && (
              <div className={classes.noCardsWrapper}>
                <Typography
                  type="title"
                  component="h3"
                  className={classes.noCardsText}
                >
                  No wages logged
                </Typography>
              </div>
            )}
          <Button
            disabled={isWagesByDateLoading}
            className={classes.loadMoreButton}
            raised
            onClick={() => loadWagesByDate(activeInstitutionID, lastVisible)}
          >
            Load more...
          </Button>
        </div>
      );
    }
  }

  renderLogs() {
    const { classes, staff, activeInstitutionID } = this.props;
    const { coachID } = this.props.match.params;
    const { isStaffLoading } = this.props.loadingStatus;

    const ad = this.createAd();
    const filteredStaff = this.getStaffCardsInfo(this.filterPeople(staff));

    if (isStaffLoading || activeInstitutionID === "") {
      return (
        <div>
          <div className={classes.adWrapper}>{ad}</div>
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      if (coachID) {
      } else {
        return (
          <div>
            <div className={classes.adWrapper}>{ad}</div>
            <CoachesList people={filteredStaff} />
          </div>
        );
      }
    }
  }

  getStaffCardsInfo(staff) {
    const { activeInstitutionID } = this.props;

    let sortedStaff = [];
    _.values(
      _.mapValues(staff, (value, key) => {
        if (
          value.institutions[activeInstitutionID].roles.coach === "APPROVED"
        ) {
          sortedStaff.push({
            ...value,
            id: key,
            name: value.info.name,
            surname: value.info.surname,
            profilePictureURL: value.info.profilePictureURL
          });
        }
      })
    );

    return sortedStaff.sort((personA, personB) => {
      if (personA.info.name > personB.info.name) return +1;
      if (personA.info.name < personB.info.name) return -1;
      if (personA.info.surname > personB.info.surname) return +1;
      if (personA.info.surname < personB.info.surname) return -1;
      return 0;
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

  filterPeople(staff) {
    const { searchText } = this.props.filters;

    return _.fromPairs(
      _.toPairs(staff).filter(([staffID, personInfo]) => {
        let allowThroughFilter = true;
        let nameMatch = true;

        if (searchText !== "") {
          nameMatch =
            nameMatch &&
            _.toLower(
              `${personInfo.info.name} ${personInfo.info.surname}`
            ).includes(_.toLower(searchText));
        }

        allowThroughFilter = allowThroughFilter && nameMatch;

        return allowThroughFilter;
      })
    );
  }

  render() {
    const {
      classes,
      isMobile,
      isTablet,
      wagesByCoach,
      activeInstitutionID,
      staff,
      role,
      userID
    } = this.props;
    const { currentTab } = this.props.uiConfig;
    const { updateTab, loadWagesByCoach, updateSearch } = this.props.actions;
    const { coachID } = this.props.match.params;
    const { isWagesByCoachLoading, isStaffLoading } = this.props.loadingStatus;

    if (role === "manager") {
      return <Redirect to="/myaccount/dashboard" />;
    }

    const ad = this.createAd();

    if (coachID) {
      if (role === "coach") {
        return <Redirect to="/myaccount/wages" />;
      }
      return (
        <div className={classes.outerWrapper}>
          <AppBar position="static" color="default">
            {isStaffLoading || !staff[coachID] || activeInstitutionID === "" ? (
              <Typography className={classes.name} type="title" component="h2">
                Loading...
              </Typography>
            ) : (
              <Typography className={classes.name} type="title" component="h2">
                {`${staff[coachID].info.name} ${staff[coachID].info.surname}`}
              </Typography>
            )}
          </AppBar>
          <div className={classes.innerWrapper}>
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
            </Toolbar>
            <div className={classes.adWrapper}>{ad}</div>
            <WageHistory
              institutionID={activeInstitutionID}
              isLoading={isWagesByCoachLoading || activeInstitutionID === ""}
              isMobile={isMobile}
              isTablet={isTablet}
              wages={wagesByCoach}
              coachID={coachID}
              minDate={new Date(2017, 11)}
              actions={{
                loadWages: loadWagesByCoach
              }}
            />
          </div>
        </div>
      );
    } else {
      if (role === "coach") {
        return (
          <div className={classes.root}>
            <div className={classes.contentWrapper}>
              <div className={classes.adWrapper}>{ad}</div>
              <WageHistory
                institutionID={activeInstitutionID}
                isLoading={isWagesByCoachLoading || activeInstitutionID === ""}
                isMobile={isMobile}
                isTablet={isTablet}
                wages={wagesByCoach}
                coachID={userID}
                minDate={new Date(2017, 11)}
                actions={{
                  loadWages: loadWagesByCoach
                }}
              />
            </div>
          </div>
        );
      }
      return (
        <div className={classes.root}>
          <div className={classes.contentWrapper}>
            <div className={classes.tabsWrapper}>
              <AppBar position="static" color="default">
                <Tabs
                  value={currentTab}
                  onChange={(event, newTab) => updateTab(newTab)}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab
                    label="Overview"
                    value="OVERVIEW"
                    className={classes.tabs}
                  />
                  <Tab label="Logs" value="LOGS" className={classes.tabs} />
                </Tabs>
              </AppBar>
              {currentTab === "OVERVIEW" && (
                <div className={classes.contentWrapper}>
                  <div className={classes.adWrapper}>{ad}</div>
                  {this.renderWagesByDate()}
                </div>
              )}
              {currentTab === "LOGS" && (
                <div className={classes.contentWrapper}>
                  <FiltersToolbar
                    isMobile={isMobile}
                    updateSearch={updateSearch}
                  />
                  {this.renderLogs()}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(WagesLayout);
