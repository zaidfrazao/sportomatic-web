import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey } from "../../../../../../utils/colours";
import defaultProfilePicture from "./images/default-profile-picture.png";
import athleticsIcon from "./images/athletics.png";
import crossCountryIcon from "./images/cross-country.png";
import hockeyIcon from "./images/hockey.png";
import netballIcon from "./images/netball.png";
import rugbyIcon from "./images/rugby.png";
import otherIcon from "./images/other.png";
import soccerIcon from "./images/soccer.png";
import swimmingIcon from "./images/swimming.png";
import waterPoloIcon from "./images/water-polo.png";

const tabletBreakpoint = 1080;

const styles = {
  column: {
    width: "100%",
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      padding: "0 24px",
      width: "calc(50% - 48px)"
    }
  },
  emailIconWrapper: {
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  emailText: {
    flex: 1,
    overflow: "auto",
    padding: 12,
    color: grey[700]
  },
  emailWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  infoItemIconWrapper: {
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  infoItemText: {
    flex: 1,
    padding: "0 12px",
    color: grey[700]
  },
  infoItemWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    width: 24,
    height: 24,
    margin: "0 auto"
  },
  lastInfoItemIconWrapper: {
    borderRadius: "0 0 0 16px",
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  lastInfoItemText: {
    flex: 1,
    padding: "0 12px",
    color: grey[700]
  },
  lastInfoItemWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: grey[100],
    margin: "6px 24px"
  },
  listItemWrapper: {
    transition: "0.25s",
    display: "flex",
    alignItems: "center",
    borderRadius: 12,
    padding: 24,
    margin: 24,
    backgroundColor: grey[200],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[300]
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
  phoneNumberIconWrapper: {
    borderRadius: "0 0 0 16px",
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  phoneNumberText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  phoneNumberWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  profilePicture: {
    borderRadius: 8,
    backgroundColor: grey[300],
    width: 200,
    height: 200,
    margin: 24
  },
  profilePictureWrapper: {
    display: "flex",
    justifyContent: "center"
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
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 24
  }
};

class Details extends Component {
  getSportsIcon(sport) {
    const icons = {
      Athletics: athleticsIcon,
      "Cross Country": crossCountryIcon,
      Hockey: hockeyIcon,
      Netball: netballIcon,
      Rugby: rugbyIcon,
      Soccer: soccerIcon,
      Swimming: swimmingIcon,
      "Water Polo": waterPoloIcon,
      Other: otherIcon
    };

    if (icons[sport]) return icons[sport];
    return icons["Other"];
  }

  getTeamItems() {
    const { classes, teams, navigateTo } = this.props;

    const lastIndex = teams.length - 1;

    return teams.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div key={info.id}>
            <div
              className={classes.listItemWrapper}
              onClick={() => navigateTo(`/myaccount/teams/${info.id}`)}
            >
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
            onClick={() => navigateTo(`/myaccount/teams/${info.id}`)}
          >
            {info.name}
          </div>
        );
      }
    });
  }

  getSportsItems() {
    const { classes, sports } = this.props;

    const lastIndex = sports.length - 1;

    return sports.map((sport, index) => {
      const icon = this.getSportsIcon(sport);

      if (index !== lastIndex) {
        return (
          <div key={sport} className={classes.infoItemWrapper}>
            <div className={classes.infoItemIconWrapper}>
              <img alt={`${sport} icon`} className={classes.icon} src={icon} />
            </div>
            <span className={classes.infoItemText}>{sport}</span>
          </div>
        );
      } else {
        return (
          <div key={sport} className={classes.lastInfoItemWrapper}>
            <div className={classes.lastInfoItemIconWrapper}>
              <img alt={`${sport} icon`} className={classes.icon} src={icon} />
            </div>
            <span className={classes.lastInfoItemText}>{sport}</span>
          </div>
        );
      }
    });
  }

  render() {
    const {
      classes,
      email,
      phoneNumber,
      firstName,
      lastName,
      profilePicture
    } = this.props;

    const teamItems = this.getTeamItems();
    const sportsItems = this.getSportsItems();

    return (
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.profilePictureWrapper}>
              <img
                className={classes.profilePicture}
                src={
                  profilePicture === "" ? defaultProfilePicture : profilePicture
                }
                alt={`${firstName} ${lastName}`}
              />
            </div>
            <div className={classes.emailWrapper}>
              <div className={classes.emailIconWrapper}>
                <i className="fas fa-envelope" />
              </div>
              <span className={classes.emailText}>{email}</span>
            </div>
            <div className={classes.phoneNumberWrapper}>
              <div className={classes.phoneNumberIconWrapper}>
                <i className="fas fa-phone" />
              </div>
              <span className={classes.phoneNumberText}>
                {phoneNumber === "" ? "No phone number given" : phoneNumber}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Teams</div>
            {teamItems.length === 0 ? (
              <div className={classes.noItems}>
                This person is not in a team
              </div>
            ) : (
              teamItems
            )}
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Preferred Sports</div>
            {sportsItems.length === 0 ? (
              <div className={classes.noItems}>No sports selected</div>
            ) : (
              <div className={classes.sportsListWrapper}>{sportsItems}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Details);
