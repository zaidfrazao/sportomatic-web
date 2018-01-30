/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { grey } from "material-ui/colors";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";
import BannerCarousel from "./components/BannerCarousel";
import InstitutionSelectCard from "./components/InstitutionSelectCard";
import RoleSelectCard from "./components/RoleSelectCard";
// import Button from "material-ui/Button";

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
  render() {
    const {
      classes,
      isTablet,
      isMobile,
      accountInfo,
      institutions,
      userID
    } = this.props;
    const { switchInstitution, switchRole } = this.props.actions;

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
      active.institutionName = institutions[active.id].name;
      active.emblemURL = institutions[active.id].emblemURL;
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
                  }
                  return [
                    id,
                    {
                      name: info.name,
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
        <BannerCarousel isTablet={isTablet} />
        {/*<Button
          onClick={() =>
            createInstitution({
              info: {
                abbreviation: "RWC",
                ageGroups: [
                  "Open",
                  18,
                  17,
                  16,
                  15,
                  14,
                  13,
                  12,
                  11,
                  10,
                  9,
                  8,
                  7,
                  6
                ],
                divisions: ["1st Team", "2nd Team", "A", "B", "C", "D"],
                emblemURL: "",
                gender: "MIXED",
                name: "Rowan's Personal Institution",
                phoneNumber: "",
                physicalAddress: "",
                publicEmail: "",
                sports: [
                  "Athletics",
                  "Cricket",
                  "Hockey",
                  "Netball",
                  "Rugby",
                  "Soccer",
                  "Swimming",
                  "Tennis"
                ],
                type: "Personal"
              },
              metadata: {
                creationDate: new Date(Date.now()),
                status: "ACTIVE"
              },
              paymentDefaults: {
                hourlyRates: {
                  overtime: 150,
                  standard: 100,
                  salaray: 6000
                },
                maxOvertimeHours: 3,
                payDay: {
                  day: 1,
                  isEndOfTheMonth: false
                },
                type: "HOURLY"
              },
              permissions: {
                coaches: {
                  events: {
                    canCancel: true,
                    canCreate: true,
                    canEdit: true
                  },
                  results: {
                    canApprove: true,
                    canEdit: true
                  },
                  teams: {
                    canEdit: true
                  }
                },
                managers: {
                  events: {
                    canCancel: true,
                    canCreate: true,
                    canEdit: true
                  },
                  teams: {
                    canEdit: true
                  },
                  wages: {
                    canCreate: true,
                    canEdit: true,
                    canView: true
                  }
                }
              }
            })}
        >
          Create institution
        </Button>*/}
      </div>
    );
  }
}

export default withStyles(styles)(DashboardLayout);
