import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey } from "../../../../../../utils/colours";
import defaultProfilePicture from "./images/default-profile-picture.png";

const tabletBreakpoint = 1080;

const styles = {
  ageIconWrapper: {
    fontWeight: "bold",
    borderRadius: "16px 0 0 0",
    textAlign: "center",
    backgroundColor: grey[100],
    width: props => (props.isMobile ? 60 : 140),
    padding: "24px 0"
  },
  ageText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  ageWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  column: {
    width: "100%",
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      padding: "0 24px",
      width: "calc(50% - 48px)"
    }
  },
  divisionIconWrapper: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: grey[100],
    width: props => (props.isMobile ? 60 : 140),
    padding: "24px 0"
  },
  divisionText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  divisionWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  genderIconWrapper: {
    fontWeight: "bold",
    borderRadius: "0 0 0 16px",
    textAlign: "center",
    backgroundColor: grey[100],
    width: props => (props.isMobile ? 60 : 140),
    padding: "24px 0"
  },
  genderText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  genderWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  iconText: {
    marginLeft: 8
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: grey[100],
    margin: "6px 24px"
  },
  listItemWrapper: {
    display: "flex",
    alignItems: "center",
    borderRadius: 12,
    padding: 24,
    margin: 24,
    backgroundColor: grey[100],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  noItems: {
    backgroundColor: grey[100],
    color: grey[500],
    borderRadius: 12,
    padding: 24,
    margin: 24,
    textAlign: "center"
  },
  profilePicture: {
    borderRadius: "50%",
    backgroundColor: grey[300],
    width: 40,
    height: 40,
    marginRight: 24
  },
  section: {
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    marginBottom: 24,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionHeading: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  sportIconWrapper: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: grey[100],
    width: props => (props.isMobile ? 60 : 140),
    padding: "24px 0"
  },
  sportText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  sportWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 24
  }
};

class Details extends Component {
  getCoachItems() {
    const { classes, coaches, navigateTo } = this.props;

    const lastIndex = coaches.length - 1;

    return coaches.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div>
            <div
              key={info.id}
              className={classes.listItemWrapper}
              onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
            >
              <img
                alt={info.name}
                className={classes.profilePicture}
                src={
                  info.profilePicture === ""
                    ? defaultProfilePicture
                    : info.profilePicture
                }
              />
              {info.name}
            </div>
            <div className={classes.listItemSeparator} />
          </div>
        );
      } else {
        return (
          <div
            key={info.id}
            className={classes.listItemWrapper}
            onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
          >
            <img
              alt={info.name}
              className={classes.profilePicture}
              src={
                info.profilePicture === ""
                  ? defaultProfilePicture
                  : info.profilePicture
              }
            />
            {info.name}
          </div>
        );
      }
    });
  }

  getManagerItems() {
    const { classes, managers, navigateTo } = this.props;

    const lastIndex = managers.length - 1;

    return managers.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div>
            <div
              key={info.id}
              className={classes.listItemWrapper}
              onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
            >
              <img
                alt={info.name}
                className={classes.profilePicture}
                src={
                  info.profilePicture === ""
                    ? defaultProfilePicture
                    : info.profilePicture
                }
              />
              {info.name}
            </div>
            <div className={classes.listItemSeparator} />
          </div>
        );
      } else {
        return (
          <div
            key={info.id}
            className={classes.listItemWrapper}
            onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
          >
            <img
              alt={info.name}
              className={classes.profilePicture}
              src={
                info.profilePicture === ""
                  ? defaultProfilePicture
                  : info.profilePicture
              }
            />
            {info.name}
          </div>
        );
      }
    });
  }

  formatGender() {
    const { ageGroup, gender } = this.props;

    if (gender === "MALE") {
      if (isNaN(parseInt(ageGroup, 10))) {
        return "Men";
      }
      if (parseInt(ageGroup, 10) >= 18) {
        return "Men";
      }
      return "Boys";
    }
    if (gender === "Female") {
      if (isNaN(parseInt(ageGroup, 10))) {
        return "Women";
      }
      if (parseInt(ageGroup, 10) >= 18) {
        return "Women";
      }
      return "Girls";
    }
    return "Mixed";
  }

  formatAgeGroup() {
    const { ageGroup } = this.props;

    if (!isNaN(parseInt(ageGroup, 10))) {
      return `U/${ageGroup}`;
    }
    return ageGroup;
  }

  render() {
    const { classes, division, sport, isMobile } = this.props;

    const coachItems = this.getCoachItems();
    const managerItems = this.getManagerItems();
    const gender = this.formatGender();
    const ageGroup = this.formatAgeGroup();

    return (
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.ageWrapper}>
              <div className={classes.ageIconWrapper}>
                <i className="fas fa-hourglass-half" />
                {!isMobile && (
                  <span className={classes.iconText}>Age Group</span>
                )}
              </div>
              <span className={classes.ageText}>{ageGroup}</span>
            </div>
            <div className={classes.divisionWrapper}>
              <div className={classes.divisionIconWrapper}>
                <i className="fas fa-sort-alpha-down" />
                {!isMobile && (
                  <span className={classes.iconText}>Division</span>
                )}
              </div>
              <span className={classes.divisionText}>{division}</span>
            </div>
            <div className={classes.sportWrapper}>
              <div className={classes.sportIconWrapper}>
                <i className="fas fa-futbol" />
                {!isMobile && <span className={classes.iconText}>Sport</span>}
              </div>
              <span className={classes.sportText}>{sport}</span>
            </div>
            <div className={classes.genderWrapper}>
              <div className={classes.genderIconWrapper}>
                <i className="fas fa-venus-mars" />
                {!isMobile && <span className={classes.iconText}>Gender</span>}
              </div>
              <span className={classes.genderText}>{gender}</span>
            </div>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Coaches</div>
            {coachItems.length === 0 ? (
              <div className={classes.noItems}>
                No coaches on current roster
              </div>
            ) : (
              coachItems
            )}
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Managers</div>
            {coachItems.length === 0 ? (
              <div className={classes.noItems}>
                No managers on current roster
              </div>
            ) : (
              managerItems
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Details);
