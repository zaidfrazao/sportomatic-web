// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import WagesTable from "./components/WagesTable";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import LeaderboardAd from "../../../components/LeaderboardAd";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import { CircularProgress } from "material-ui/Progress";
import CoachesList from "./components/CoachesList";
import Typography from "material-ui/Typography";
import _ from "lodash";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  wagesTableWrapper: {
    flexGrow: 1,
    display: "flex"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: 24,
    "@media (max-width: 960px)": {
      width: "calc(100% - 48px)"
    }
  },
  coachName: {
    width: "100%",
    textAlign: "center",
    margin: "24px 0"
  }
});

class WagesLayout extends Component {
  componentWillMount() {
    const { userID } = this.props;
    const { loadStaff, loadCoachWages } = this.props.actions;
    const { coachID } = this.props.match.params;

    loadCoachWages(userID, coachID);
    loadStaff(userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const { loadStaff, loadCoachWages } = this.props.actions;
    const { coachID } = this.props.match.params;

    if (userID !== nextProps.userID) {
      loadStaff(nextProps.userID);
      loadCoachWages(nextProps.userID, nextProps.match.params.coachID);
    }
    if (coachID !== nextProps.match.params.coachID) {
      loadCoachWages(nextProps.userID, nextProps.match.params.coachID);
    }
  }

  render() {
    const { classes, isMobile, isTablet, coachWages, coaches } = this.props;
    const { isWagesLoading, isStaffLoading } = this.props.loadingStatus;
    const { coachID } = this.props.match.params;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    if (isWagesLoading || isStaffLoading) {
      return (
        <div className={classes.root}>
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      if (coachID && coaches[coachID]) {
        return (
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Typography
                type="title"
                component="h2"
                className={classes.coachName}
              >
                {`${coaches[coachID].metadata.name} ${coaches[coachID].metadata
                  .surname}`}
              </Typography>
            </AppBar>
            <div>
              <Route
                render={({ history }) => (
                  <Button
                    raised
                    className={classes.button}
                    onClick={() => history.goBack()}
                  >
                    Back
                  </Button>
                )}
              />
            </div>
            {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
            <div className={classes.wagesTableWrapper}>
              <WagesTable
                isMobile={isMobile}
                isTablet={isTablet}
                wages={coachWages}
              />
            </div>
          </div>
        );
      } else {
        const coachesList = _.values(
          _.mapValues(coaches, (value, key) => {
            return {
              ...value,
              id: key,
              name: value.metadata.name,
              surname: value.metadata.surname,
              profilePictureURL: value.metadata.profilePictureURL
            };
          })
        ).sort((personA, personB) => {
          if (personA.metadata.name > personB.metadata.name) return +1;
          if (personA.metadata.name < personB.metadata.name) return -1;
          if (personA.metadata.surname > personB.metadata.surname) return +1;
          if (personA.metadata.surname < personB.metadata.surname) return -1;
          return 0;
        });

        return (
          <div
            className={
              coachesList.length > 0
                ? classes.coachesList
                : classes.coachesListNoCards
            }
          >
            <div className={classes.adWrapper}>{ad}</div>
            <CoachesList coaches={coachesList} />
          </div>
        );
      }
    }
  }
}

WagesLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WagesLayout);
