/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../components/Button";
import BannerAd from "../../components/BannerAd";
import { common, grey } from "../../utils/colours";
import Results from "./components/Results";
import Today from "./components/Today";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import Tabs from "../../components/Tabs";

const styles = {
  actionsBar: {
    margin: "0 12px",
    backgroundColor: grey[200],
    display: "flex",
    justifyContent: "center"
  },
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSeparator: {
    height: 12
  },
  buttonWrapper: {
    margin: "24px 12px"
  },
  flexGrow: {
    flexGrow: 1
  },
  header: {
    margin: "0 24px",
    padding: 24,
    borderRadius: 16,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
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
    backgroundColor: grey[500]
  },
  sectionList: {
    flexGrow: 1,
    margin: "12px 12px 0 12px",
    width: "calc(100% - 24px)"
  },
  subheader: {
    paddingTop: 8,
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[700]
  },
  tabsWrapper: {
    margin: "0 24px 24px 24px"
  },
  wrapper: {
    padding: 24
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
