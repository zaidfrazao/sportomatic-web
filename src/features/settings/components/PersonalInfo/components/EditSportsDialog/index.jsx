/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import Button from "../../../../../../components/Button";
import { common, grey, lightBlue } from "../../../../../../utils/colours";
import Dialog from "../../../../../../components/Dialog";

import hockeyIcon from "../../../../images/hockey.png";
import netballIcon from "../../../../images/netball.png";
import rugbyIcon from "../../../../images/rugby.png";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  flexGrow: {
    flexGrow: 1
  },
  heading: {
    width: "calc(100% - 24px)",
    margin: 12,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  iconAdjacentText: {
    marginRight: 12
  },
  sportIcon: {
    width: 40,
    height: 40,
    marginBottom: 12
  },
  sportName: {
    transition: "0.25s",
    color: grey[800],
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "25px",
    fontSize: 18
  },
  sportNameSelected: {
    transition: "0.25s",
    color: common["white"],
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "25px",
    fontSize: 18
  },
  sportOptionSelectedWrapper: {
    transition: "0.25s",
    margin: 24,
    padding: 24,
    width: "calc(33% - 96px)",
    borderRadius: 16,
    backgroundColor: lightBlue[500],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: ${tabletBreakpoint}px)`]: {
      width: "calc(50% - 96px)"
    },
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: "calc(100% - 96px)"
    }
  },
  sportOptionWrapper: {
    transition: "0.25s",
    margin: 24,
    padding: 24,
    width: "calc(33% - 96px)",
    borderRadius: 16,
    backgroundColor: grey[100],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[300]
    },
    [`@media (max-width: ${tabletBreakpoint}px)`]: {
      width: "calc(50% - 96px)"
    },
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: "calc(100% - 96px)"
    }
  },
  sportSelectionWrapper: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
};

const initialState = {
  sports: []
};

class EditSportsDialog extends Component {
  state = initialState;

  componentWillReceiveProps(nextProps) {
    const { isOpen, initialSports } = nextProps;

    if (isOpen !== this.props.isOpen && isOpen) {
      this.setState({
        sports: initialSports
      });
    }
  }

  addSport(newSport) {
    this.setState({
      sports: [...this.state.sports, newSport]
    });
  }

  removeSport(newSport) {
    const newSports = _.without(this.state.sports, newSport);

    this.setState({
      sports: newSports
    });
  }

  renderSportSelection() {
    const { classes } = this.props;
    const { sports } = this.state;

    return (
      <div className={classes.sportSelectionWrapper}>
        <div className={classes.heading}>
          <i className={`fas fa-futbol ${classes.iconAdjacentText}`} />Select
          Sport
        </div>
        <div
          className={
            sports.includes("Hockey")
              ? classes.sportOptionSelectedWrapper
              : classes.sportOptionWrapper
          }
          onClick={() => {
            if (sports.includes("Hockey")) {
              this.removeSport("Hockey");
            } else {
              this.addSport("Hockey");
            }
          }}
        >
          <img
            className={classes.sportIcon}
            alt="Hockey icon"
            src={hockeyIcon}
          />
          <div
            className={
              sports.includes("Hockey")
                ? classes.sportNameSelected
                : classes.sportName
            }
          >
            Hockey
          </div>
        </div>
        <div
          className={
            sports.includes("Netball")
              ? classes.sportOptionSelectedWrapper
              : classes.sportOptionWrapper
          }
          onClick={() => {
            if (sports.includes("Netball")) {
              this.removeSport("Netball");
            } else {
              this.addSport("Netball");
            }
          }}
        >
          <img
            className={classes.sportIcon}
            alt="Netball icon"
            src={netballIcon}
          />
          <div
            className={
              sports.includes("Netball")
                ? classes.sportNameSelected
                : classes.sportName
            }
          >
            Netball
          </div>
        </div>
        <div
          className={
            sports.includes("Rugby")
              ? classes.sportOptionSelectedWrapper
              : classes.sportOptionWrapper
          }
          onClick={() => {
            if (sports.includes("Rugby")) {
              this.removeSport("Rugby");
            } else {
              this.addSport("Rugby");
            }
          }}
        >
          <img className={classes.sportIcon} alt="Rugby icon" src={rugbyIcon} />
          <div
            className={
              sports.includes("Rugby")
                ? classes.sportNameSelected
                : classes.sportName
            }
          >
            Rugby
          </div>
        </div>
        <div className={classes.flexGrow} />
      </div>
    );
  }

  getActionButtons() {
    const { closeDialog, editSports } = this.props;
    const { sports } = this.state;

    return [
      <Button colour="primary" slim handleClick={() => closeDialog()}>
        Cancel
      </Button>,
      <Button
        colour="primary"
        filled
        slim
        handleClick={() =>
          editSports(
            _.fromPairs(
              sports.map(sport => {
                return [sport, true];
              })
            )
          )}
      >
        Update
      </Button>
    ];
  }

  render() {
    const { isOpen } = this.props;

    const actions = this.getActionButtons();
    const content = this.renderSportSelection();

    return (
      <Dialog
        isOpen={isOpen}
        size="medium"
        heading="Edit Preferred Sports"
        actions={actions}
      >
        {content}
      </Dialog>
    );
  }
}

export default injectSheet(styles)(EditSportsDialog);
