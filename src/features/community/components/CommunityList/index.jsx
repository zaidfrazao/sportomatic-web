import React, { Component } from "react";
import injectStyles from "react-jss";
import EmptyState from "../../../../components/EmptyState";
import CommunityCard from "./components/CommunityCard";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  cardWrapper: {
    width: "100%",
    padding: 24,
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      padding: 24,
      width: "calc(50% - 48px)"
    },
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      padding: 24,
      width: "calc(33% - 48px)"
    }
  },
  emptyState: {
    padding: 24
  }
};

class CommunityList extends Component {
  render() {
    const { classes, communities, switchCommunity } = this.props;

    if (communities.length > 0) {
      return (
        <div className={classes.cardsWrapper}>
          {communities.map(communityInfo => (
            <div className={classes.cardWrapper} key={communityInfo.id}>
              <CommunityCard
                name={communityInfo.name}
                id={communityInfo.id}
                isActive={communityInfo.isActive}
                emblemURL={communityInfo.emblemURL}
                switchCommunity={switchCommunity}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className={classes.emptyState}>
          <EmptyState message="No communities" />
        </div>
      );
    }
  }
}

export default injectStyles(styles)(CommunityList);
