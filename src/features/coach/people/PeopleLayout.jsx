import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { CircularProgress } from "material-ui/Progress";
import FiltersToolbar from "./components/FiltersToolbar";
import PeopleList from "./components/PeopleList";
import PersonInfo from "./components/PersonInfo";
import LeaderboardAd from "../../../components/LeaderboardAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import BannerAd from "../../../components/BannerAd";
import _ from "lodash";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%"
  },
  infoWrapper: {
    width: "100%",
    height: "100%"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
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
  toolbar: {
    backgroundColor: grey[300],
    zIndex: 1
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  staffTab: {
    height: "100%",
    overflow: "auto"
  },
  staffTabNoCards: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  }
});

class PeopleLayout extends Component {
  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { loadStaff } = this.props.actions;
    loadStaff(activeInstitutionID);
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID } = this.props;
    const { loadStaff } = this.props.actions;

    if (activeInstitutionID !== nextProps.activeInstitutionID) {
      loadStaff(nextProps.activeInstitutionID);
    }
  }

  render() {
    const { classes, staff, userID, isMobile, isTablet } = this.props;
    const { isStaffLoading } = this.props.loadingStatus;
    const { personID } = this.props.match.params;

    const staffCardsInfo = _.values(
      _.mapValues(staff, (value, key) => {
        return {
          ...value,
          id: key,
          name: value.metadata.name,
          surname: value.metadata.surname,
          profilePictureURL: value.metadata.profilePictureURL,
          type: value.metadata.type
        };
      })
    )
      .filter(personInfo => {
        return personInfo.id !== userID;
      })
      .sort((personA, personB) => {
        if (personA.metadata.name > personB.metadata.name) return +1;
        if (personA.metadata.name < personB.metadata.name) return -1;
        if (personA.metadata.surname > personB.metadata.surname) return +1;
        if (personA.metadata.surname < personB.metadata.surname) return -1;
        return 0;
      });

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        <FiltersToolbar
          isMobile={isMobile}
          types={["Coach", "Manager"]}
          sports={["Cricket", "Rugby", "Soccer"]}
        />
        {personID && staff[personID] ? (
          <div className={classes.infoWrapper}>
            <PersonInfo
              info={staff[personID]}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>
        ) : (
          <div
            className={
              staffCardsInfo.length > 0
                ? classes.staffTab
                : classes.staffTabNoCards
            }
          >
            <div className={classes.adWrapper}>{ad}</div>
            {isStaffLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <PeopleList people={staffCardsInfo} />
            )}
          </div>
        )}
      </div>
    );
  }
}

PeopleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PeopleLayout);
