/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { grey } from "material-ui/colors";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";
import BannerCarousel from "./components/BannerCarousel";
import InstitutionSelectCard from "./components/InstitutionSelectCard";
import RoleSelectCard from "./components/RoleSelectCard";
import UpdatesDialog from "./components/UpdatesDialog";

const styles = theme => ({
  loaderWrapper: {
    margin: 12,
    width: "100%",
    textAlign: "center"
  },
  root: {
    width: "100%"
  },
  selectWrapper: {
    width: "50%"
  },
  toolbar: {
    padding: 0,
    backgroundColor: grey[200],
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch"
  }
});

class DashboardLayout extends Component {
  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  render() {
    const {
      classes,
      isTablet,
      isMobile,
      accountInfo,
      institutions,
      userID
    } = this.props;
    const { isUpdatesDialogOpen } = this.props.dialogs;
    const {
      switchInstitution,
      switchRole,
      openUpdatesDialog,
      closeUpdatesDialog
    } = this.props.actions;

    let active = {
      id: "",
      role: "ADMIN",
      institutionName: "",
      emblemURL: ""
    };
    let rolesAvailable = {
      admin: false,
      coach: false,
      manager: false
    };

    if (accountInfo.lastAccessed) {
      active.id = accountInfo.lastAccessed.institutionID;
      active.role = accountInfo.lastAccessed.role;
    }
    if (accountInfo.institutions && accountInfo.institutions[active.id]) {
      rolesAvailable = {
        admin: accountInfo.institutions[active.id].roles.admin === "APPROVED",
        coach: accountInfo.institutions[active.id].roles.coach === "APPROVED",
        manager:
          accountInfo.institutions[active.id].roles.manager === "APPROVED"
      };
    }
    if (institutions[active.id]) {
      active.institutionName = institutions[active.id].info.name;
      active.emblemURL = institutions[active.id].info.emblemURL;
    }

    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.selectWrapper}>
            <InstitutionSelectCard
              isMobile={isMobile}
              userID={userID}
              activeInstitution={{
                id: active.id,
                name: active.institutionName
              }}
              institutions={_.fromPairs(
                _.toPairs(institutions).map(([id, info]) => {
                  let rolesAvailable = {
                    admin: false,
                    coach: false,
                    manager: false
                  };
                  let isActive = false;
                  if (
                    accountInfo.institutions &&
                    accountInfo.institutions[id]
                  ) {
                    rolesAvailable = {
                      admin:
                        accountInfo.institutions[id].roles.admin === "APPROVED",
                      coach:
                        accountInfo.institutions[id].roles.coach === "APPROVED",
                      manager:
                        accountInfo.institutions[id].roles.manager ===
                        "APPROVED"
                    };
                    isActive = accountInfo.institutions[id].status === "STAFF";
                  }
                  return [
                    id,
                    {
                      name: info.info.name,
                      isActive,
                      rolesAvailable
                    }
                  ];
                })
              )}
              emblemURL={active.emblemURL}
              actions={{
                switchInstitution
              }}
            />
          </div>
          <div className={classes.selectWrapper}>
            <RoleSelectCard
              isMobile={isMobile}
              userID={userID}
              activeRole={active.role}
              rolesAvailable={rolesAvailable}
              actions={{
                switchRole
              }}
            />
          </div>
        </Toolbar>
        <BannerCarousel
          isTablet={isTablet}
          actions={{
            openUpdatesDialog
          }}
        />
        <UpdatesDialog
          isOpen={isUpdatesDialogOpen}
          actions={{
            handleClose: () => closeUpdatesDialog()
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DashboardLayout);
