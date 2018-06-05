/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { Redirect } from "react-router-dom";
import AddSportDialog from "./components/AddSportDialog";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import { common, grey, lightBlue } from "../../utils/colours";
import CommunityList from "./components/CommunityList";
import CommunityInfo from "./components/CommunityInfo";
import Dialog from "../../components/Dialog";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import Tabs from "../../components/Tabs";
import TextField from "../../components/TextField";

const styles = {
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: props => (props.isMobile ? 0 : 24)
  },
  backButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: lightBlue[800],
    color: common["white"],
    cursor: "pointer",
    textAlign: "center",
    fontSize: 24,
    padding: "18px 24px",
    borderRadius: "16px 0 0 16px",
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  buttonSeparator: {
    height: 12
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    border: `1px solid ${grey[300]}`,
    margin: "0 24px 24px 24px",
    borderRadius: 16,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: common["white"]
  },
  headerInnerWrapper: {
    flexGrow: 1,
    textAlign: "center",
    padding: 24
  },
  menuButtonWrapper: {
    margin: "0 24px"
  },
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

class CommunityLayout extends Component {
  state = {
    tabSelected: "details",
    removeConfirmText: {
      value: "",
      validation: "default",
      helperText: ""
    }
  };

  removeSport() {
    const { activeCommunityID, communities } = this.props;
    const { removeSportDialog } = this.props.dialogs;
    const { closeRemoveSportDialog, removeSport } = this.props.actions;
    const { removeConfirmText } = this.state;

    const newSports = communities[
      activeCommunityID
    ].info.sports.filter(sport => {
      if (sport.info) {
        return sport.info.name !== removeSportDialog.sport;
      } else {
        return sport !== removeSportDialog.sport;
      }
    });

    if (removeConfirmText.value === "REMOVE_SPORT") {
      closeRemoveSportDialog();
      removeSport(activeCommunityID, newSports);
      this.setState({
        removeConfirmText: {
          value: "",
          validation: "default",
          helperText: ""
        }
      });
    } else {
      this.setState({
        removeConfirmText: {
          value: "",
          validation: "error",
          helperText: "Please type REMOVE_SPORT"
        }
      });
    }
  }

  updateRemoveConfirm(newValue) {
    this.setState({
      removeConfirmText: {
        value: newValue,
        validation: "default",
        helperText: ""
      }
    });
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

  getCommunities() {
    const { communities, activeCommunityID } = this.props;

    return _.toPairs(communities).map(([communityID, communityInfo]) => {
      return {
        id: communityID,
        isActive: communityID === activeCommunityID,
        name: communityInfo.info.name,
        emblemURL: communityInfo.info.emblemURL,
        gender: communityInfo.info.gender,
        phoneNumber: communityInfo.info.phoneNumber,
        physicalAddress: communityInfo.info.physicalAddress,
        publicEmail: communityInfo.info.publicEmail,
        sports: communityInfo.info.sports,
        subType: communityInfo.info.subType,
        type: communityInfo.info.type
      };
    });
  }

  getCommunityInfo() {
    const { communities, activeCommunityID } = this.props;

    let info = {
      id: "",
      name: "",
      emblemURL: "",
      gender: "",
      phoneNumber: "",
      physicalAddress: "",
      publicEmail: "",
      sports: [],
      subType: "",
      type: ""
    };

    let formattedGender = "Mixed";

    if (communities[activeCommunityID]) {
      const communityInfo = communities[activeCommunityID];
      const type = communityInfo.info.type;
      const gender = communityInfo.info.gender;
      const sports = communityInfo.info.sports;

      if (gender === "MALE") {
        if (type === "Primary School" || type === "High School") {
          formattedGender = "All Boys";
        } else {
          formattedGender = "All Men";
        }
      } else if (gender === "FEMALE") {
        if (type === "Primary School" || type === "High School") {
          formattedGender = "All Girls";
        } else {
          formattedGender = "All Women";
        }
      }

      const reformattedSports = sports.map(sport => {
        if (sport.info) {
          return sport.info.name;
        } else {
          return sport;
        }
      });

      info = {
        id: activeCommunityID,
        gender: formattedGender,
        name: communityInfo.info.name,
        abbreviation: communityInfo.info.abbreviation,
        emblemURL: communityInfo.info.emblemURL,
        phoneNumber: communityInfo.info.phoneNumber,
        physicalAddress: communityInfo.info.physicalAddress,
        publicEmail: communityInfo.info.publicEmail,
        subType: communityInfo.info.subType,
        type: communityInfo.info.type,
        sports: reformattedSports
      };
    }

    return info;
  }

  getSectionDisplay() {
    const { classes, isMobile, navigateTo, isAdmin, goBack } = this.props;
    const { infoTab } = this.props.match.params;
    const { tabSelected } = this.state;

    if (isMobile) {
      switch (infoTab) {
        case "details":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>Details</div>
              </div>
              {this.getCommunityInfoView(isAdmin)}
            </div>
          );
        case "switch":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>Switch</div>
              </div>
              {this.getCommunityListView()}
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
                  handleClick={() => navigateTo("/myaccount/community/details")}
                >
                  Details
                </Button>
              </div>
              <div className={classes.buttonSeparator} />
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() => navigateTo("/myaccount/community/switch")}
                >
                  Switch
                </Button>
              </div>
            </div>
          );
      }
    } else {
      switch (tabSelected) {
        case "details":
          return <div>{this.getCommunityInfoView(isAdmin)}</div>;
        case "switch":
          return <div>{this.getCommunityListView()}</div>;
        default:
          return <div>{this.getCommunityInfoView(isAdmin)}</div>;
      }
    }
  }

  getCommunityListView() {
    const {
      isTablet,
      isMobile,
      classes,
      navigateTo,
      switchCommunity
    } = this.props;

    const ad = this.createAd();
    const communities = this.getCommunities();

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.adWrapper}>{ad}</div>
          <CommunityList
            isMobile={isMobile}
            isTablet={isTablet}
            navigateTo={navigateTo}
            communities={communities}
            switchCommunity={switchCommunity}
          />
        </div>
      </div>
    );
  }

  getCommunityInfoView(isAdmin) {
    const {
      isTablet,
      isMobile,
      classes,
      activeCommunityID,
      userID,
      navigateTo,
      goBack
    } = this.props;
    const {
      openRemoveSportDialog,
      openAddSportDialog,
      editCommunityInfo
    } = this.props.actions;

    const ad = this.createAd();
    const communityInfo = this.getCommunityInfo();

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.adWrapper}>{ad}</div>
          <CommunityInfo
            isAdmin={isAdmin}
            userID={userID}
            info={communityInfo}
            communityID={activeCommunityID}
            isMobile={isMobile}
            isTablet={isTablet}
            actions={{
              navigateTo,
              goBack,
              editCommunityInfo: (
                blob,
                gender,
                name,
                abbreviation,
                phoneNumber,
                physicalAddress,
                publicEmail
              ) =>
                editCommunityInfo(
                  activeCommunityID,
                  blob,
                  gender,
                  name,
                  abbreviation,
                  phoneNumber,
                  physicalAddress,
                  publicEmail
                ),
              addSport: () => openAddSportDialog(),
              removeSport: sport => openRemoveSportDialog(sport)
            }}
          />
        </div>
      </div>
    );
  }

  getTabs() {
    return [
      {
        key: "details",
        label: "Details"
      },
      {
        key: "switch",
        label: "Switch"
      }
    ];
  }

  getSportsAllowed() {
    const { sports } = this.props;

    let sportsAllowed = {
      Hockey: true,
      Netball: true,
      Rugby: true
    };

    sports.map(sport => {
      sportsAllowed[sport] = false;
    });

    return sportsAllowed;
  }

  render() {
    const {
      classes,
      isMobile,
      ageGroups,
      divisions,
      activeCommunityID,
      genders,
      sports
    } = this.props;
    const { addSportDialog, removeSportDialog } = this.props.dialogs;
    const { isAddSportLoading } = this.props.loadingStatus;
    const {
      closeAddSportDialog,
      closeRemoveSportDialog,
      addSport
    } = this.props.actions;
    const { infoTab } = this.props.match.params;
    const { tabSelected, removeConfirmText } = this.state;

    if (!isMobile && infoTab) {
      return <Redirect to="/myaccount/community/" />;
    }

    const tabs = this.getTabs();
    const sectionDisplay = this.getSectionDisplay();
    const sportsAllowed = this.getSportsAllowed();

    return (
      <div>
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
        <Dialog
          isOpen={removeSportDialog.isOpen}
          heading={`Remove ${removeSportDialog.sport}`}
          handleOkClick={() => closeRemoveSportDialog()}
          actions={[
            <Button
              colour="primary"
              handleClick={() => closeRemoveSportDialog()}
            >
              Cancel
            </Button>,
            <Button
              colour="primary"
              filled
              handleClick={() => this.removeSport()}
            >
              Delete
            </Button>
          ]}
        >
          <span>
            {"Type REMOVE_SPORT to confirm that you want to remove this sport:"}
          </span>
          <TextField
            placeholder=""
            value={removeConfirmText.value}
            validation={removeConfirmText.validation}
            helperText={removeConfirmText.helperText}
            handleChange={newValue => this.updateRemoveConfirm(newValue)}
          />
        </Dialog>
        <AddSportDialog
          isOpen={addSportDialog.isOpen || sports.length === 0}
          isLoading={isAddSportLoading}
          sportsAllowed={sportsAllowed}
          ageGroupOptions={ageGroups}
          divisionOptions={divisions}
          genders={genders}
          establishedSports={sports}
          addSport={sportInfo => {
            closeAddSportDialog();
            addSport(activeCommunityID, sportInfo);
          }}
          closeDialog={() => closeAddSportDialog()}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(CommunityLayout);
