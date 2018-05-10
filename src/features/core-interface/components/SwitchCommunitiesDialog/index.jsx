/* eslint-disable array-callback-return */
import React, { Component } from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { common, grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const mobileBreakpoint = 800;

const styles = {
  community: {
    transition: "0.25s",
    fontSize: 14,
    margin: "16px 18px",
    borderRadius: 16,
    cursor: "pointer",
    backgroundColor: grey[100],
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  communitySelected: {
    transition: "0.25s",
    borderRadius: 16,
    margin: "16px 18px",
    fontSize: 16,
    position: "relative",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    backgroundColor: lightBlue[800],
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  communityName: {
    color: common["black"],
    margin: 8
  },
  communityNameSelected: {
    color: common["white"],
    margin: 8
  },
  emblem: {
    borderRadius: "50%",
    padding: 4,
    margin: 12,
    width: 32,
    ehgiht: 32,
    backgroundColor: common["white"],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      margin: 14
    }
  }
};

class SwitchCommunitiesDialog extends Component {
  state = {
    selectedCommunityID: ""
  };

  componentWillMount() {
    const { activeCommunityID } = this.props;

    this.setState({
      selectedCommunityID: activeCommunityID
    });
  }

  changeSelection(communityID) {
    this.setState({
      selectedCommunityID: communityID
    });
  }

  getCommunityItems() {
    const { selectedCommunityID } = this.state;
    const { classes, communities } = this.props;

    return communities.map(info => {
      return (
        <div
          key={`switch-comunity-${info.id}`}
          className={
            selectedCommunityID === info.id
              ? classes.communitySelected
              : classes.community
          }
          onClick={() => this.changeSelection(info.id)}
        >
          <img
            className={classes.emblem}
            alt={`${info.name} emblem`}
            src={info.emblem}
          />
          <span
            className={
              selectedCommunityID === info.id
                ? classes.communityNameSelected
                : classes.communityName
            }
          >
            {info.name}
          </span>
        </div>
      );
    });
  }

  render() {
    const { selectedCommunityID } = this.state;
    const { isOpen, isMobile } = this.props;
    const { closeDialog, updateActiveCommunity } = this.props.actions;

    const communityItems = this.getCommunityItems();

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        onRequestClose={() => closeDialog()}
      >
        <DialogTitle>Switch Community</DialogTitle>
        <DialogContent>{communityItems}</DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
          <Button
            color="primary"
            onClick={() => updateActiveCommunity(selectedCommunityID)}
          >
            Switch
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SwitchCommunitiesDialog);
