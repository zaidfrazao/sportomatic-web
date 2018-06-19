import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../../../components/Button";
import {
  common,
  green,
  grey,
  lightBlue,
  red
} from "../../../../../../utils/colours";
import ProgressBar from "../../../../../../components/ProgressBar";

const styles = {
  buttonWrapper: {
    marginTop: 24,
    width: "100%",
    textAlign: "center"
  },
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
    overflow: "hidden",
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
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    backgroundColor: common["white"]
  }
};

class CommunityCompletionCard extends Component {
  getEmailInfo() {
    const { classes, publicEmail } = this.props;

    let text = "";
    let icon = <div />;
    let complete = false;

    if (publicEmail !== "") {
      text = publicEmail;
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
    } else {
      text = "No email address given";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
      complete = true;
    }

    return {
      text,
      icon,
      complete
    };
  }

  getPhoneNumberInfo() {
    const { classes, phoneNumber } = this.props;

    let text = "";
    let icon = <div />;
    let complete = false;

    if (phoneNumber !== "") {
      text = phoneNumber;
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
    } else {
      text = "No phone number given";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
      complete = true;
    }

    return {
      text,
      icon,
      complete
    };
  }

  getSportsInfo() {
    const { classes, sports } = this.props;

    let text = "";
    let icon = <div />;
    let complete = false;

    if (sports !== "") {
      text = sports;
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
    } else {
      text = "No sports selected";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
      complete = true;
    }

    return {
      text,
      icon,
      complete
    };
  }

  getPhysicalAddressInfo() {
    const { classes, physicalAddress } = this.props;

    let text = "";
    let icon = <div />;
    let complete = false;

    if (physicalAddress !== "") {
      text = physicalAddress;
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
    } else {
      text = "No physical address given";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
      complete = true;
    }

    return {
      text,
      icon,
      complete
    };
  }

  getEmblemInfo() {
    const { classes, emblem } = this.props;

    let text = "";
    let icon = <div />;
    let complete = false;

    if (emblem !== "") {
      text = "Emblem uploaded";
      icon = (
        <div className={classes.iconComplete}>
          <i className="fas fa-check" />
        </div>
      );
    } else {
      text = "No emblem uploaded";
      icon = (
        <div className={classes.iconIncomplete}>
          <i className="fas fa-times" />
        </div>
      );
      complete = true;
    }

    return {
      text,
      icon,
      complete
    };
  }

  render() {
    const { classes, goToSettings, communityProfileProgress } = this.props;

    const emailInfo = this.getEmailInfo();
    const phoneNumberInfo = this.getPhoneNumberInfo();
    const sportsInfo = this.getSportsInfo();
    const emblemInfo = this.getEmblemInfo();
    const physicalAddressInfo = this.getPhysicalAddressInfo();

    return (
      <div className={classes.wrapper}>
        <div className={classes.dateWrapper}>Community Profile Progress</div>
        <div className={classes.progressBarWrapper}>
          <ProgressBar progress={communityProfileProgress} />
          <div className={classes.buttonWrapper}>
            <Button
              type="dark"
              slim
              filled
              fullWidth
              handleClick={() => goToSettings()}
            >
              Complete
            </Button>
          </div>
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.infoSectionWrapper}>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-futbol" />
              </div>
              <span className={classes.listText}>{sportsInfo.text}</span>
              {sportsInfo.icon}
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
                <i className="fas fa-map-marker" />
              </div>
              <span className={classes.listText}>
                {physicalAddressInfo.text}
              </span>
              {physicalAddressInfo.icon}
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-envelope" />
              </div>
              <span className={classes.listText}>{emailInfo.text}</span>
              {emailInfo.icon}
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapperBottomLeft}>
                <i className="fas fa-image" />
              </div>
              <span className={classes.listText}>{emblemInfo.text}</span>
              {emblemInfo.icon}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(CommunityCompletionCard);
