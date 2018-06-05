/* eslint-disable array-callback-return */
import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey, lightBlue, red } from "../../../../utils/colours";
import defaultProfilePicture from "../../images/default-profile-picture.png";
import EditPersonalInfoModal from "./components/EditPersonalInfoModal";
import EditSportsDialog from "./components/EditSportsDialog";

import hockeyIcon from "../../images/hockey.png";
import netballIcon from "../../images/netball.png";
import rugbyIcon from "../../images/rugby.png";
import otherIcon from "../../images/other.png";

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
  editButton: {
    transition: "0.25s",
    position: "absolute",
    right: 0,
    top: 0,
    padding: "18px 24px",
    color: common["black"],
    cursor: "pointer",
    fontSize: 20,
    "&:hover": {
      color: lightBlue[500]
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
  name: {
    color: grey[800],
    fontSize: 16,
    lineHeight: "20px",
    margin: 4,
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      fontSize: 20,
      lineHeight: "28px"
    }
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
  profilePicture: {
    borderRadius: "50%",
    margin: 4,
    width: 50,
    ehgiht: 50,
    backgroundColor: grey[200],
    "@media (max-width: 600px)": {
      margin: 14
    }
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
    position: "relative",
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

class PersonalInfo extends Component {
  state = {
    isEditPersonalInfoDialogOpen: false,
    isEditSportsDialogOpen: false
  };

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;

    if (isLoading !== this.props.isLoading && !isLoading) {
      this.setState({
        isEditDialogOpen: false
      });
    }
  }

  openEditSportsDialog() {
    this.setState({
      isEditSportsDialogOpen: true
    });
  }

  closeEditSportsDialog() {
    this.setState({
      isEditSportsDialogOpen: false
    });
  }

  openEditPersonalInfoDialog() {
    this.setState({
      isEditPersonalInfoDialogOpen: true
    });
  }

  closeEditPersonalInfoDialog() {
    this.setState({
      isEditPersonalInfoDialogOpen: false
    });
  }

  getSportsIcon(sport) {
    const icons = {
      Hockey: hockeyIcon,
      Netball: netballIcon,
      Rugby: rugbyIcon,
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
    const {
      classes,
      info,
      isEditSportsLoading,
      isEditPersonalInfoLoading
    } = this.props;
    const { editSports, editPersonalInfo } = this.props.actions;
    const { isEditSportsDialogOpen, isEditPersonalInfoDialogOpen } = this.state;
    const {
      firstName,
      lastName,
      phoneNumber,
      profilePictureURL,
      email,
      sports
    } = info;

    const profilePicture =
      profilePictureURL === "" ? defaultProfilePicture : profilePictureURL;
    const sportsItems = this.getSportsItems();

    return (
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.nameEmblemWrapper}>
              <div
                className={classes.editButton}
                onClick={() => this.openEditPersonalInfoDialog()}
              >
                <i className="fas fa-edit" />
              </div>
              <img
                src={profilePicture}
                width="50"
                height="50"
                alt={`${firstName} ${lastName} profile`}
                className={classes.profilePicture}
              />
              <h2 className={classes.name}>{`${firstName} ${lastName}`}</h2>
            </div>
            <div className={classes.infoItemWrapper}>
              <div className={classes.infoItemIconWrapper}>
                <i className="fas fa-envelope" />
              </div>
              <span className={classes.infoItemText}>{email}</span>
            </div>
            <div className={classes.lastInfoItemWrapper}>
              <div className={classes.lastInfoItemIconWrapper}>
                <i className="fas fa-phone" />
              </div>
              <span className={classes.lastInfoItemText}>
                {phoneNumber === "" ? "No phone number given" : phoneNumber}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>
              Preferred Sports
              <div
                className={classes.editButton}
                onClick={() => this.openEditSportsDialog()}
              >
                <i className="fas fa-edit" />
              </div>
            </div>
            {sportsItems.length === 0 ? (
              <div className={classes.noItems}>No sports selected</div>
            ) : (
              <div className={classes.sportsListWrapper}>{sportsItems}</div>
            )}
          </div>
        </div>
        <EditPersonalInfoModal
          isOpen={isEditPersonalInfoDialogOpen}
          isLoading={isEditPersonalInfoLoading}
          initialInfo={{
            firstName,
            lastName,
            phoneNumber,
            profilePictureURL
          }}
          actions={{
            editPersonalInfo: (blob, firstName, lastName, phoneNumber) =>
              editPersonalInfo(blob, firstName, lastName, phoneNumber),
            closeModal: () => this.closeEditPersonalInfoDialog()
          }}
        />
        <EditSportsDialog
          isOpen={isEditSportsDialogOpen}
          isLoading={isEditSportsLoading}
          initialSports={sports}
          editSports={newSports => editSports(newSports)}
          closeDialog={() => this.closeEditSportsDialog()}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(PersonalInfo);
