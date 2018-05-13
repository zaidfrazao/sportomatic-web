import React, { Component } from "react";
import { common, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../../../../../../components/Button";
import PersonalAllSwitch from "./components/PersonalAllSwitch";
import RoleSwitcher from "./components/RoleSwitcher";

const mobileBreakpoint = 800;

const styles = theme => ({
  buttonIcon: {
    marginRight: 8
  },
  buttonsWrapper: {
    display: "flex",
    marginBottom: 12
  },
  communityName: {
    flexGrow: 1,
    color: common["white"],
    fontSize: 16,
    lineHeight: "20px",
    margin: 4,
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      fontSize: 20,
      lineHeight: "28px"
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
  interactiveSectionWrapper: {
    width: "100%",
    margin: "4px 0"
  },
  nameEmblemWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
  },
  switchButtonWrapper: {
    flexGrow: 1,
    marginRight: 8
  },
  wrapper: {
    backgroundColor: lightBlue[500],
    padding: 28,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "cen  buttonWrapper: {},ter"
  }
});

type Props = {
  classes: {
    wrapper: string
  }
};

class CommunityInfo extends Component<Props> {
  render() {
    const {
      classes,
      emblem,
      name,
      selectedRole,
      switchRoles,
      availableRoles,
      logOut,
      meAllFilter,
      changeMeAllFilter,
      switchCommunities
    } = this.props;

    return (
      <div className={classes.wrapper}>
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
        <div className={classes.interactiveSectionWrapper}>
          {false && (
            <RoleSwitcher
              selected={selectedRole}
              options={availableRoles}
              handleChange={newRole => switchRoles(newRole)}
            />
          )}
          <div className={classes.buttonsWrapper}>
            <div className={classes.switchButtonWrapper}>
              <Button
                colour="primary"
                type="dark"
                filled
                slim
                fullWidth
                handleClick={() => switchCommunities()}
              >
                Communities
              </Button>
            </div>
            <Button
              colour="primary"
              type="dark"
              filled
              slim
              handleClick={() => logOut()}
            >
              <i className="fas fa-sign-out-alt" />
            </Button>
          </div>
          <PersonalAllSwitch
            meAllFilter={meAllFilter}
            changeMeAllFilter={newFilter => changeMeAllFilter(newFilter)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CommunityInfo);
