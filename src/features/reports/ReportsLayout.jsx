/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../components/Button";
import BannerAd from "../../components/BannerAd";
import BillingSummary from "./components/BillingSummary";
import { common, grey, lightBlue, red } from "../../utils/colours";
import EmptyState from "../../components/EmptyState";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import Tabs from "../../components/Tabs";
import Wages from "./components/Wages";

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
  count: {
    margin: "0 8px",
    padding: "4px 8px",
    backgroundColor: red[500],
    borderRadius: 8,
    color: common["white"]
  },
  countLight: {
    margin: "0 8px",
    padding: "4px 8px",
    backgroundColor: common["white"],
    borderRadius: 8,
    fontWeight: "bold",
    color: red[500]
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
  loadMoreButtonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 24
  },
  loadMoreIcon: {
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

class ReportsLayout extends Component {
  state = {
    tabSelected: "wages"
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { loadWages, loadStaff, loadAdmins } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadWages(activeInstitutionID);
      loadStaff(activeInstitutionID);
      loadAdmins(activeInstitutionID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID } = nextProps;
    const { loadWages, loadStaff, loadAdmins } = nextProps.actions;

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      loadWages(activeInstitutionID);
      loadStaff(activeInstitutionID);
      loadAdmins(activeInstitutionID);
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

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

  getSectionDisplay() {
    const {
      classes,
      isMobile,
      isTablet,
      institutionCreationDate,
      navigateTo,
      goBack,
      wages,
      users,
      userID,
      isAdmin
    } = this.props;
    const { infoTab } = this.props.match.params;
    const { tabSelected } = this.state;

    const ad = this.createAd();
    const formattedWages = this.getWages(wages);

    if (isMobile) {
      switch (infoTab) {
        case "billing-summary":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>Wages</div>
              </div>
              <div className={classes.adWrapper}>{ad}</div>
              <BillingSummary
                users={users}
                isTablet={isTablet}
                isMobile={isMobile}
                wages={formattedWages}
                institutionCreationDate={institutionCreationDate}
              />
            </div>
          );
        case "wages":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>Wages</div>
              </div>
              <div className={classes.adWrapper}>{ad}</div>
              <Wages
                userID={userID}
                isTablet={isTablet}
                isMobile={isMobile}
                wages={formattedWages}
                institutionCreationDate={institutionCreationDate}
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
                  handleClick={() => navigateTo("/myaccount/reports/wages")}
                >
                  My Wages
                </Button>
              </div>
              {isAdmin && <div className={classes.buttonSeparator} />}
              {isAdmin && (
                <div className={classes.menuButtonWrapper}>
                  <Button
                    type="dark"
                    colour="primary"
                    filled
                    fullWidth
                    handleClick={() =>
                      navigateTo("/myaccount/reports/billing-summary")}
                  >
                    Billing Summary
                  </Button>
                </div>
              )}
            </div>
          );
      }
    } else {
      switch (tabSelected) {
        case "billing-summary":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <BillingSummary
                users={users}
                isTablet={isTablet}
                isMobile={isMobile}
                wages={formattedWages}
                institutionCreationDate={institutionCreationDate}
              />
            </div>
          );
        case "wages":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Wages
                userID={userID}
                isTablet={isTablet}
                isMobile={isMobile}
                wages={formattedWages}
                institutionCreationDate={institutionCreationDate}
              />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
            </div>
          );
      }
    }
  }

  getWages() {
    const { wages } = this.props;

    return _.toPairs(wages)
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

  getTabs() {
    const { isAdmin } = this.props;

    if (isAdmin) {
      return [
        {
          key: "wages",
          label: "My Wages"
        },
        {
          key: "billing-summary",
          label: "Billing Summary"
        }
      ];
    } else {
      return [
        {
          key: "wages",
          label: "My Wages"
        }
      ];
    }
  }

  render() {
    const { classes, isMobile, communityProgress, navigateTo } = this.props;
    const { infoTab } = this.props.match.params;
    const { tabSelected } = this.state;

    if (!isMobile && infoTab) {
      return <Redirect to="/myaccount/reports/" />;
    }

    const sectionDisplay = this.getSectionDisplay();
    const tabs = this.getTabs();

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
      return (
        <div className={classes.root}>
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
}

export default injectStyles(styles)(ReportsLayout);
