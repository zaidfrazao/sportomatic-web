import React, { Component } from "react";
import injectStyles from "react-jss";
import {
  common,
  green,
  grey,
  lightBlue,
  red
} from "../../../../../../utils/colours";
import ProgressBar from "../../../../../../components/ProgressBar";

const styles = {
  dateWrapper: {
    margin: "24px 0 8px 0",
    padding: "0 12px",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  header: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800]
  },
  iconComplete: {
    textAlign: "center",
    color: green[500],
    width: 60,
    padding: "24px 0"
  },
  iconIncomplete: {
    textAlign: "center",
    color: red[500],
    width: 60,
    padding: "24px 0"
  },
  infoWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  infoSectionWrapper: {
    width: "100%"
  },
  listIconWrapper: {
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  listIconWrapperBottomLeft: {
    borderRadius: "0 0 0 16px",
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  listText: {
    flex: 1,
    padding: "0 12px",
    color: grey[700]
  },
  listWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  progressBarWrapper: {
    padding: "12px 24px 24px 24px"
  },
  timeWrapper: {
    textAlign: "center",
    color: grey[700],
    flexGrow: 1,
    fontSize: 20
  },
  startEndWrapper: {
    width: "100%",
    maxWidth: 260,
    margin: "0 auto",
    marginBottom: 24,
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    transition: "0.25s",
    cursor: "pointer",
    border: `1px solid ${grey[300]}`,
    margin: 24,
    borderRadius: 16,
    backgroundColor: common["white"],
    "&:hover": {
      boxShadow:
        "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  }
};

class ProfileCompletionCard extends Component {
  getEmailInfo() {
    const { classes, email } = this.props;

    let text = "";
    let icon = <div />;
    let points = 0;

    if (email !== "") {
      text = email;
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
      points = 1;
    } else {
      text = "No email address given";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
    }

    return {
      text,
      icon,
      points
    };
  }

  getPhoneNumberInfo() {
    const { classes, phoneNumber } = this.props;

    let text = "";
    let icon = <div />;
    let points = 0;

    if (phoneNumber !== "") {
      text = phoneNumber;
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
      points = 1;
    } else {
      text = "No phone number given";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
    }

    return {
      text,
      icon,
      points
    };
  }

  getPreferredSportsInfo() {
    const { classes, preferredSports } = this.props;

    let text = "";
    let icon = <div />;
    let points = 0;

    if (preferredSports !== "") {
      text = preferredSports;
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
      points = 1;
    } else {
      text = "No preferred sports selected";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
    }

    return {
      text,
      icon,
      points
    };
  }

  getProfilePictureInfo() {
    const { classes, profilePicture } = this.props;

    let text = "";
    let icon = <div />;
    let points = 0;

    if (profilePicture !== "") {
      text = "Profile picture uploaded";
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
      points = 1;
    } else {
      text = "No profile picture uploaded";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
    }

    return {
      text,
      icon,
      points
    };
  }

  render() {
    const { classes, goToSettings } = this.props;

    const emailInfo = this.getEmailInfo();
    const phoneNumberInfo = this.getPhoneNumberInfo();
    const preferredSportsInfo = this.getPreferredSportsInfo();
    const profilePictureInfo = this.getProfilePictureInfo();
    const totalPoints =
      emailInfo.points +
      phoneNumberInfo.points +
      preferredSportsInfo.points +
      profilePictureInfo.points;
    const progress = (totalPoints / 4 * 100).toFixed(0);

    return (
      <div className={classes.wrapper} onClick={() => goToSettings()}>
        <div className={classes.dateWrapper}>Profile Completion Progress</div>
        <div className={classes.progressBarWrapper}>
          <ProgressBar progress={progress} />
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.infoSectionWrapper}>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-envelope" />
              </div>
              <span className={classes.listText}>{emailInfo.text}</span>
              {emailInfo.icon}
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-phone" />
              </div>
              <span className={classes.listText}>{phoneNumberInfo.text}</span>
              {phoneNumberInfo.icon}
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-futbol" />
              </div>
              <span className={classes.listText}>
                {preferredSportsInfo.text}
              </span>
              {preferredSportsInfo.icon}
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-user" />
              </div>
              <span className={classes.listText}>
                {profilePictureInfo.text}
              </span>
              {profilePictureInfo.icon}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(ProfileCompletionCard);
