/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../components/Button";
import BannerAd from "../../components/BannerAd";
import Results from "./components/Results";
import Today from "./components/Today";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import Tabs from "../../components/Tabs";

const styles = {
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSeparator: {
    height: 12
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

class DashboardLayout extends Component {
  state = {
    tabSelected: "today"
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { loadTodaysEvents } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadTodaysEvents(activeInstitutionID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID } = nextProps;
    const { loadTodaysEvents } = nextProps.actions;

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      loadTodaysEvents(activeInstitutionID);
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
    const { classes, isMobile, navigateTo, todaysEvents, goBack } = this.props;
    const { infoTab } = this.props.match.params;
    const { tabSelected } = this.state;

    const ad = this.createAd();

    if (isMobile) {
      switch (infoTab) {
        case "today":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Today
                isMobile={isMobile}
                events={todaysEvents}
                navigateTo={navigateTo}
                goBack={goBack}
              />
            </div>
          );
        case "results":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Results isMobile={isMobile} goBack={goBack} />
            </div>
          );
        case "incomplete":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Results isMobile={isMobile} goBack={goBack} />
            </div>
          );
        case "notifications":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Results isMobile={isMobile} goBack={goBack} />
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
                  handleClick={() => navigateTo("/myaccount/overview/today")}
                >
                  Today
                </Button>
              </div>
              <div className={classes.buttonSeparator} />
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() => navigateTo("/myaccount/overview/results")}
                >
                  Results
                </Button>
              </div>
              <div>
                <div className={classes.buttonSeparator} />
                <div className={classes.menuButtonWrapper}>
                  <Button
                    type="dark"
                    colour="primary"
                    filled
                    fullWidth
                    handleClick={() =>
                      navigateTo("/myaccount/overview/incomplete")}
                  >
                    Incomplete
                  </Button>
                </div>
              </div>
              <div>
                <div className={classes.buttonSeparator} />
                <div className={classes.menuButtonWrapper}>
                  <Button
                    type="dark"
                    colour="primary"
                    filled
                    fullWidth
                    handleClick={() =>
                      navigateTo("/myaccount/overview/notifications")}
                  >
                    Notifications
                  </Button>
                </div>
              </div>
            </div>
          );
      }
    } else {
      switch (tabSelected) {
        case "today":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Today
                isMobile={isMobile}
                events={todaysEvents}
                navigateTo={navigateTo}
                goBack={goBack}
              />
            </div>
          );
        case "results":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Results isMobile={isMobile} goBack={goBack} />
            </div>
          );
        case "incomplete":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Results isMobile={isMobile} goBack={goBack} />
            </div>
          );
        case "notifications":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Results isMobile={isMobile} goBack={goBack} />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Results isMobile={isMobile} goBack={goBack} />
            </div>
          );
      }
    }
  }

  getTabs() {
    return [
      {
        key: "today",
        label: "Today"
      },
      {
        key: "results",
        label: "Results"
      },
      {
        key: "incomplete",
        label: "Incomplete"
      },
      {
        key: "notifications",
        label: "Notifications"
      }
    ];
  }

  render() {
    const { classes, isMobile } = this.props;
    const { infoTab } = this.props.match.params;
    const { tabSelected } = this.state;

    if (!isMobile && infoTab) {
      return <Redirect to="/myaccount/overview/" />;
    }

    const sectionDisplay = this.getSectionDisplay();
    const tabs = this.getTabs();

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

export default injectStyles(styles)(DashboardLayout);
