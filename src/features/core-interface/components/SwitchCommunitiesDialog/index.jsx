/* eslint-disable array-callback-return */
import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import { common, grey, lightBlue } from "../../../../utils/colours";
import defaultEmblem from "./images/default-emblem.jpg";
import Dialog from "../../../../components/Dialog";

const mobileBreakpoint = 800;

const styles = {
  community: {
    maxWidth: 400,
    transition: "0.25s",
    fontSize: 14,
    margin: "16px auto",
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
    maxWidth: 400,
    transition: "0.25s",
    borderRadius: 16,
    margin: "16px auto",
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
    height: 32,
    backgroundColor: grey[300],
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
            src={info.emblem === "" ? defaultEmblem : info.emblem}
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
    const { isOpen } = this.props;
    const { closeDialog, updateActiveCommunity } = this.props.actions;

    const communityItems = this.getCommunityItems();
    const actions = [
      <Button colour="primary" slim handleClick={() => closeDialog()}>
        Close
      </Button>,
      <Button
        colour="primary"
        slim
        filled
        handleClick={() => updateActiveCommunity(selectedCommunityID)}
      >
        Switch
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading="Switch Community" actions={actions}>
        {communityItems}
      </Dialog>
    );
  }
}

export default injectStyles(styles)(SwitchCommunitiesDialog);
