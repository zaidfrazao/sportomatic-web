/* eslint-disable array-callback-return */
import React, { Component } from "react";
import injectSheet from "react-jss";
import Button from "../../../../components/Button";
import { common, grey, red } from "../../../../utils/colours";
import defaultEmblem from "../../images/default-emblem.jpg";

import athleticsIcon from "../../images/athletics.png";
import crossCountryIcon from "../../images/cross-country.png";
import hockeyIcon from "../../images/hockey.png";
import netballIcon from "../../images/netball.png";
import rugbyIcon from "../../images/rugby.png";
import otherIcon from "../../images/other.png";
import soccerIcon from "../../images/soccer.png";
import swimmingIcon from "../../images/swimming.png";
import waterPoloIcon from "../../images/water-polo.png";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  addIcon: {
    marginRight: 8
  },
  addSportButtonWrapper: {
    margin: "12px 24px"
  },
  column: {
    width: "100%",
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      padding: "0 24px",
      width: "calc(50% - 48px)"
    }
  },
  communityName: {
    color: grey[800],
    fontSize: 16,
    lineHeight: "20px",
    margin: 4,
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      fontSize: 20,
      lineHeight: "28px"
    }
  },
  deleteButton: {
    transition: "0.25s",
    cursor: "pointer",
    fontSize: 24,
    margin: "0 24px",
    color: grey[300],
    "&:hover": {
      color: red[500]
    }
  },
  emblem: {
    borderRadius: "50%",
    padding: 4,
    margin: 4,
    width: 50,
    ehgiht: 50,
    backgroundColor: common["white"],
    "@media (max-width: 600px)": {
      margin: 14
    }
  },
  icon: {
    width: 24,
    height: 24,
    margin: "0 auto"
  },
  iconSportWrapper: {
    flexGrow: 1,
    flexDirection: "flex",
    alignItems: "center"
  },
  nameEmblemWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px 12px"
  },
  noItems: {
    backgroundColor: grey[100],
    color: grey[500],
    borderRadius: 12,
    padding: 24,
    margin: 24,
    textAlign: "center"
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
  listItemInactiveWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 24,
    margin: "0 24px"
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

class CommunityInfo extends Component {
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

  getSportsItems() {
    const { classes, info, isAdmin } = this.props;
    const { removeSport } = this.props.actions;
    const { sports } = info;

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
            {isAdmin && (
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => removeSport(sport)}
              />
            )}
          </div>
        );
      } else {
        return (
          <div key={sport} className={classes.lastInfoItemWrapper}>
            <div className={classes.lastInfoItemIconWrapper}>
              <img alt={`${sport} icon`} className={classes.icon} src={icon} />
            </div>
            <span className={classes.lastInfoItemText}>{sport}</span>
            {isAdmin && (
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => removeSport(sport)}
              />
            )}
          </div>
        );
      }
    });
  }

  render() {
    const { classes, info, isAdmin } = this.props;
    const { addSport } = this.props.actions;
    const {
      name,
      physicalAddress,
      emblemURL,
      publicEmail,
      phoneNumber,
      gender,
      type
    } = info;

    const emblem = emblemURL === "" ? defaultEmblem : emblemURL;
    const sportsItems = this.getSportsItems();

    return (
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.nameEmblemWrapper}>
              <img
                src={emblem}
                width="50"
                height="50"
                alt={`${name} emblem`}
                className={classes.emblem}
              />
              <h2 className={classes.communityName}>{name}</h2>
            </div>
            <div className={classes.infoItemWrapper}>
              <div className={classes.infoItemIconWrapper}>
                <i className="fas fa-school" />
              </div>
              <span className={classes.infoItemText}>{type}</span>
            </div>
            <div className={classes.infoItemWrapper}>
              <div className={classes.infoItemIconWrapper}>
                <i className="fas fa-venus-mars" />
              </div>
              <span className={classes.infoItemText}>{gender}</span>
            </div>
            <div className={classes.infoItemWrapper}>
              <div className={classes.infoItemIconWrapper}>
                <i className="fas fa-phone" />
              </div>
              <span className={classes.infoItemText}>
                {phoneNumber === "" ? "No phone number given" : phoneNumber}
              </span>
            </div>
            <div className={classes.infoItemWrapper}>
              <div className={classes.infoItemIconWrapper}>
                <i className="fas fa-map-marker" />
              </div>
              <span className={classes.infoItemText}>
                {physicalAddress === ""
                  ? "No physical address given"
                  : physicalAddress}
              </span>
            </div>
            <div className={classes.lastInfoItemWrapper}>
              <div className={classes.lastInfoItemIconWrapper}>
                <i className="fas fa-envelope" />
              </div>
              <span className={classes.lastInfoItemText}>
                {publicEmail === "" ? "No public email given" : publicEmail}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Available Sports</div>
            {isAdmin && (
              <div className={classes.addSportButtonWrapper}>
                <Button
                  colour="primary"
                  slim
                  filled
                  fullWidth
                  handleClick={() => addSport()}
                >
                  <i className={`fas fa-plus ${classes.addIcon}`} />Add sport
                </Button>
              </div>
            )}
            {sportsItems.length === 0 ? (
              <div className={classes.noItems}>No sports available</div>
            ) : (
              <div className={classes.sportsListWrapper}>{sportsItems}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(CommunityInfo);
