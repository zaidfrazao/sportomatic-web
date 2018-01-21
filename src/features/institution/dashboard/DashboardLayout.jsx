import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BannerCarousel from "./components/BannerCarousel";
// import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    width: "100%"
  },
  explanation: {
    margin: "80px auto",
    maxWidth: 600,
    "@media (max-width: 760px)": {
      margin: 40
    }
  },
  paragraph: {
    margin: "24px 0"
  }
});

class DashboardLayout extends Component {
  render() {
    const { classes, isTablet } = this.props;
    // const { createInstitution } = this.props.actions;

    return (
      <div className={classes.root}>
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

DashboardLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardLayout);
