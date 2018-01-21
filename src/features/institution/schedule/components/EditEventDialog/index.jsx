/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AddIcon from "material-ui-icons/Add";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";
import { grey, lightBlue, orange } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import Input, { InputLabel } from "material-ui/Input";
import Radio, { RadioGroup } from "material-ui/Radio";
import RemoveIcon from "material-ui-icons/Delete";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
import Switch from "material-ui/Switch";
import TextField from "material-ui/TextField";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  addButtonWrapper: {
    width: "100%",
    textAlign: "center",
    marginBottom: 16
  },
  appBar: {
    position: "relative"
  },
  competitiveEvent: {
    backgroundColor: orange[500],
    marginRight: 16
  },
  eventTypeControl: {
    flexGrow: 1
  },
  eventTypeControlWrapper: {
    width: "80%",
    margin: "24px 10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  flex: {
    flex: 1
  },
  formControl: {
    width: "80%",
    margin: "24px 10%"
  },
  heading: {
    fontWeight: "normal",
    fontSize: "1.2rem",
    padding: "20px 0",
    margin: 0,
    width: "100%",
    textAlign: "center",
    backgroundColor: grey[200],
    color: grey[700]
  },
  innerContentWrapper: {
    maxWidth: 1600,
    margin: "0 auto"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mainContent: {
    height: "100%",
    width: "100%",
    overflow: "auto"
  },
  nonCompetitiveEvent: {
    backgroundColor: lightBlue[500],
    marginRight: 16
  },
  opponentsHeading: {
    color: grey[700]
  },
  opponentsHeadingWrapper: {
    margin: "0 10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  opponentsTextField: {
    flexGrow: 1
  },
  opponentsTextFieldWrapper: {
    width: "80%",
    margin: "10px 10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  section: {
    border: `1px solid ${grey[300]}`,
    margin: "24px 0"
  },
  subFormControl: {
    width: "75%",
    margin: "24px 10% 24px 15%"
  },
  subheading: {
    width: "100%",
    textAlign: "center",
    margin: "24px 0"
  },
  teamWrapper: {
    backgroundColor: grey[100],
    padding: 16,
    margin: 24,
    border: `1px solid ${grey[200]}`
  },
  title: {
    margin: 24,
    fontSize: "1.4rem"
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

class EditEventDialog extends Component {
  state = {
    title: "Practice",
    type: "PRACTICE",
    date: new Date(Date.now()).toISOString().slice(0, 10),
    startTime: "12:00",
    endTime: "13:00",
    venue: "",
    opponents: {},
    homeAway: "UNKNOWN",
    frequency: "ONCE",
    numberOfEvents: "1",
    otherEventType: "",
    notes: "",
    isOtherEventTypeCompetitive: false,
    selectedTeams: [],
    selectedManagers: [],
    selectedCoaches: [],
    isRecurringEventModalOpen: false,
    shouldEditAllEvents: false,
    Transition: props => <Slide direction="up" {...props} />
  };

  componentWillMount() {
    const {
      initialEventInfo,
      initialDate,
      isOpen,
      teams,
      coaches,
      managers
    } = this.props;

    if (initialEventInfo) {
      const timeOptions = { hour12: false, hour: "2-digit", minute: "2-digit" };
      let type = initialEventInfo.requiredInfo.type;
      let otherEventType = "";
      let isOtherEventTypeCompetitive = false;
      if (type === "Practice") {
        type = "PRACTICE";
      } else if (type === "Training") {
        type = "TRAINING";
      } else if (type === "Match") {
        type = "MATCH";
      } else if (type === "Meeting") {
        type = "MEETING";
      } else if (type === "Gala") {
        type = "GALA";
      } else if (type === "Scrim") {
        type = "SCRIM";
      } else if (type === "Exhibition") {
        type = "EXHIBITION";
      } else if (type === "Friendly") {
        type = "FRIENDLY";
      } else {
        otherEventType = initialEventInfo.requiredInfo.type;
        isOtherEventTypeCompetitive =
          initialEventInfo.requiredInfo.isCompetitive;
        type = "OTHER";
      }

      const selectedTeams = _.fromPairs(
        _.keys(initialEventInfo.teams).map(teamID => [teamID, teams[teamID]])
      );
      const selectedCoaches = _.fromPairs(
        _.keys(initialEventInfo.coaches).map(coachID => [
          coachID,
          coaches[coachID]
        ])
      );
      const selectedManagers = _.fromPairs(
        _.keys(initialEventInfo.managers).map(managerID => [
          managerID,
          managers[managerID]
        ])
      );

      let opponents = {};
      if (initialEventInfo.requiredInfo.isCompetitive) {
        opponents = _.fromPairs(
          _.keys(selectedTeams).map(teamID => [
            teamID,
            initialEventInfo.teams[teamID].opponents
          ])
        );
      }

      this.setState({
        selectedTeams,
        selectedManagers,
        selectedCoaches,
        opponents,
        date: initialDate,
        title: initialEventInfo.requiredInfo.title,
        type: type,
        startTime: initialEventInfo.requiredInfo.times.start.toLocaleTimeString(
          "en-US",
          timeOptions
        ),
        endTime: initialEventInfo.requiredInfo.times.end.toLocaleTimeString(
          "en-US",
          timeOptions
        ),
        venue: initialEventInfo.optionalInfo.venue,
        homeAway: initialEventInfo.optionalInfo.homeAway,
        frequency: initialEventInfo.recurrencePattern.frequency,
        numberOfEvents: initialEventInfo.recurrencePattern.numberOfEvents,
        otherEventType: otherEventType,
        notes: initialEventInfo.optionalInfo.notes,
        isOtherEventTypeCompetitive: isOtherEventTypeCompetitive,
        isRecurringEventModalOpen:
          initialEventInfo.recurrencePattern.frequency !== "ONCE" && isOpen
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      initialEventInfo,
      initialDate,
      isOpen,
      teams,
      coaches,
      managers
    } = nextProps;

    if (this.props.initialEventInfo !== initialEventInfo) {
      const timeOptions = { hour12: false, hour: "2-digit", minute: "2-digit" };
      let type = initialEventInfo.requiredInfo.type;
      let otherEventType = "";
      let isOtherEventTypeCompetitive = false;
      if (type === "Practice") {
        type = "PRACTICE";
      } else if (type === "Training") {
        type = "TRAINING";
      } else if (type === "Match") {
        type = "MATCH";
      } else if (type === "Meeting") {
        type = "MEETING";
      } else if (type === "Gala") {
        type = "GALA";
      } else if (type === "Scrim") {
        type = "SCRIM";
      } else if (type === "Exhibition") {
        type = "EXHIBITION";
      } else if (type === "Friendly") {
        type = "FRIENDLY";
      } else {
        otherEventType = initialEventInfo.requiredInfo.type;
        isOtherEventTypeCompetitive =
          initialEventInfo.requiredInfo.isCompetitive;
        type = "OTHER";
      }

      const selectedTeams = _.fromPairs(
        _.keys(initialEventInfo.teams).map(teamID => [teamID, teams[teamID]])
      );
      const selectedCoaches = _.fromPairs(
        _.keys(initialEventInfo.coaches).map(coachID => [
          coachID,
          coaches[coachID]
        ])
      );
      const selectedManagers = _.fromPairs(
        _.keys(initialEventInfo.managers).map(managerID => [
          managerID,
          managers[managerID]
        ])
      );

      let opponents = {};
      if (initialEventInfo.requiredInfo.isCompetitive) {
        opponents = _.fromPairs(
          _.keys(selectedTeams).map(teamID => [
            teamID,
            initialEventInfo.teams[teamID].opponents
          ])
        );
      }

      this.setState({
        selectedTeams,
        selectedManagers,
        selectedCoaches,
        opponents,
        date: initialDate,
        title: initialEventInfo.requiredInfo.title,
        type: type,
        startTime: initialEventInfo.requiredInfo.times.start.toLocaleTimeString(
          "en-US",
          timeOptions
        ),
        endTime: initialEventInfo.requiredInfo.times.end.toLocaleTimeString(
          "en-US",
          timeOptions
        ),
        venue: initialEventInfo.optionalInfo.venue,
        homeAway: initialEventInfo.optionalInfo.homeAway,
        frequency: initialEventInfo.recurrencePattern.frequency,
        numberOfEvents: initialEventInfo.recurrencePattern.numberOfEvents,
        otherEventType: otherEventType,
        notes: initialEventInfo.optionalInfo.notes,
        isOtherEventTypeCompetitive: isOtherEventTypeCompetitive,
        isRecurringEventModalOpen:
          initialEventInfo.recurrencePattern.frequency !== "ONCE" && isOpen
      });
    }

    if (this.props.isOpen !== isOpen && isOpen) {
      this.setState({
        isRecurringEventModalOpen:
          initialEventInfo.recurrencePattern.frequency !== "ONCE" && isOpen
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      isRecurringEventModalOpen: false,
      shouldEditAllEvents: false
    });
  }

  isEventCompetitive() {
    const { type, isOtherEventTypeCompetitive } = this.state;

    return (
      type === "MATCH" ||
      type === "MEETING" ||
      type === "GALA" ||
      type === "SCRIM" ||
      type === "EXHIBITION" ||
      type === "FRIENDLY" ||
      (type === "OTHER" && isOtherEventTypeCompetitive)
    );
  }

  createTeamsList() {
    const { classes, teams, isMobile } = this.props;
    const { selectedTeams, opponents } = this.state;

    const isCompetitive = this.isEventCompetitive();

    let teamsBySport = {};
    _.toPairs(teams).map(([teamID, teamInfo]) => {
      if (teamsBySport[teamInfo.info.sport]) {
        teamsBySport[teamInfo.info.sport] = {
          ...teamsBySport[teamInfo.info.sport],
          [teamID]: teamInfo.info.name
        };
      } else {
        teamsBySport[teamInfo.info.sport] = {
          [teamID]: teamInfo.info.name
        };
      }
    });

    const listItems = _.toPairs(selectedTeams).map(([id, info]) => {
      return (
        <div key={`selectedTeam:${id}`}>
          <div className={classes.teamWrapper}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="teamSelection">Team</InputLabel>
              <Select
                native
                value={id}
                onChange={this.changeTeam(id)}
                input={<Input id="team selection" />}
              >
                {_.toPairs(teamsBySport).map(([sport, sportTeams]) => {
                  return (
                    <optgroup label={sport} key={`${id}${sport}`}>
                      {_.toPairs(sportTeams).map(([teamID, teamName]) => {
                        return (
                          <option
                            key={`${id}${sport}${teamID}`}
                            value={teamID}
                            disabled={
                              teamID !== id &&
                              _.keys(selectedTeams).includes(teamID)
                            }
                          >
                            {teamName}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
              </Select>
            </FormControl>
            {isCompetitive && (
              <div>
                <div className={classes.opponentsHeadingWrapper}>
                  <Typography
                    className={classes.opponentsHeading}
                    type="body1"
                    component="h4"
                  >
                    Opponents
                  </Typography>
                  <Button
                    aria-label="add opponent"
                    onClick={() =>
                      this.addOpponent(id, _.keys(opponents[id]).length)}
                  >
                    <AddIcon /> {isMobile ? "" : "Add opponent"}
                  </Button>
                </div>
                {_.toPairs(opponents[id]).map(([opponentID, info], index) => (
                  <FormControl
                    className={classes.opponentsTextFieldWrapper}
                    key={`${id}${opponentID}`}
                  >
                    <TextField
                      id="opponents"
                      className={classes.opponentsTextField}
                      placeholder="Currently unknown"
                      value={info.name}
                      onChange={this.handleOpponentsChange(id, opponentID)}
                    />
                    <Tooltip title="Remove opponent" placement="bottom">
                      <IconButton
                        disabled={index === 0}
                        aria-label="remove opponent"
                        onClick={() => this.removeOpponent(id, opponentID)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Tooltip>
                  </FormControl>
                ))}
              </div>
            )}
            <Button
              aria-label="remove team"
              onClick={() => this.removeTeam(id)}
            >
              Remove team
            </Button>
          </div>
        </div>
      );
    });

    return (
      <div>
        {listItems.length > 0 ? (
          listItems
        ) : (
          <div className={classes.teamWrapper}>
            <Typography
              type="subheading"
              component="p"
              className={classes.subheading}
            >
              None
            </Typography>
          </div>
        )}
      </div>
    );
  }

  createCoachesList() {
    const { classes, coaches } = this.props;
    const { selectedCoaches } = this.state;

    let coachesBySport = {};
    _.toPairs(coaches).map(([coachID, coachInfo]) => {
      _.keys(coachInfo.info.sports).map(sport => {
        if (coachesBySport[sport]) {
          coachesBySport[sport] = {
            ...coachesBySport[sport],
            [coachID]: `${coachInfo.info.name} ${coachInfo.info.surname}`
          };
        } else {
          coachesBySport[sport] = {
            [coachID]: `${coachInfo.info.name} ${coachInfo.info.surname}`
          };
        }
      });
    });

    const listItems = _.toPairs(selectedCoaches).map(([id, info]) => {
      return (
        <div key={`selectedCoach:${id}`}>
          <div className={classes.teamWrapper}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="coachSelection">Coach</InputLabel>
              <Select
                native
                value={id}
                onChange={this.changeCoach(id)}
                input={<Input id="coach selection" />}
              >
                {_.toPairs(coachesBySport).map(([sport, sportCoaches]) => {
                  return (
                    <optgroup label={sport} key={`${id}${sport}`}>
                      {_.toPairs(sportCoaches).map(([coachID, coachName]) => {
                        return (
                          <option
                            key={`${id}${sport}${coachID}`}
                            value={coachID}
                            disabled={
                              coachID !== id &&
                              _.keys(selectedCoaches).includes(coachID)
                            }
                          >
                            {coachName}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              aria-label="remove coach"
              onClick={() => this.removeCoach(id)}
            >
              Remove coach
            </Button>
          </div>
        </div>
      );
    });

    return (
      <div>
        {listItems.length > 0 ? (
          listItems
        ) : (
          <div className={classes.teamWrapper}>
            <Typography
              type="subheading"
              component="p"
              className={classes.subheading}
            >
              None
            </Typography>
          </div>
        )}
      </div>
    );
  }

  createManagersList() {
    const { classes, managers } = this.props;
    const { selectedManagers } = this.state;

    let managersBySport = {};
    _.toPairs(managers).map(([managerID, managerInfo]) => {
      _.keys(managerInfo.info.sports).map(sport => {
        if (managersBySport[sport]) {
          managersBySport[sport] = {
            ...managersBySport[sport],
            [managerID]: `${managerInfo.info.name} ${managerInfo.info.surname}`
          };
        } else {
          managersBySport[sport] = {
            [managerID]: `${managerInfo.info.name} ${managerInfo.info.surname}`
          };
        }
      });
    });

    const listItems = _.toPairs(selectedManagers).map(([id, info]) => {
      return (
        <div key={`selectedManager:${id}`}>
          <div className={classes.teamWrapper}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="managerSelection">Manager</InputLabel>
              <Select
                native
                value={id}
                onChange={this.changeManager(id)}
                input={<Input id="manager selection" />}
              >
                {_.toPairs(managersBySport).map(([sport, sportManagers]) => {
                  return (
                    <optgroup label={sport} key={`${id}${sport}`}>
                      {_.toPairs(
                        sportManagers
                      ).map(([managerID, managerName]) => {
                        return (
                          <option
                            key={`${id}${sport}${managerID}`}
                            value={managerID}
                            disabled={
                              managerID !== id &&
                              _.keys(selectedManagers).includes(managerID)
                            }
                          >
                            {managerName}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              aria-label="remove manager"
              onClick={() => this.removeManager(id)}
            >
              Remove manager
            </Button>
          </div>
        </div>
      );
    });

    return (
      <div>
        {listItems.length > 0 ? (
          listItems
        ) : (
          <div className={classes.teamWrapper}>
            <Typography
              type="subheading"
              component="p"
              className={classes.subheading}
            >
              None
            </Typography>
          </div>
        )}
      </div>
    );
  }

  handleTitleUpdate(newTitle) {
    this.setState({
      title: newTitle
    });
  }

  setNewAutomatedTitle(selectedTeams, update = "", value = "", teamOpponents) {
    const { teams } = this.props;
    const { type, otherEventType } = this.state;

    let newTitle = "";
    const selectedTeamIDs = _.keys(selectedTeams);
    if (selectedTeamIDs.length === 1) {
      newTitle = teams[selectedTeamIDs[0]].info.name + " ";
      if (update === "type") {
        if (value === "OTHER") {
          newTitle = newTitle + otherEventType;
        } else {
          newTitle = newTitle + _.capitalize(value);
        }
      } else if (update === "otherEventType") {
        newTitle = newTitle + value;
      } else if (type === "OTHER") {
        newTitle = newTitle + otherEventType;
      } else {
        newTitle = newTitle + _.capitalize(type);
      }
    } else {
      if (update === "type") {
        if (value === "OTHER") {
          newTitle = otherEventType;
        } else {
          newTitle = _.capitalize(value);
        }
      } else if (update === "otherEventType") {
        newTitle = value;
      } else if (type === "OTHER") {
        newTitle = otherEventType;
      } else {
        newTitle = _.capitalize(type);
      }
    }

    if (
      update === "opponents" &&
      _.keys(teamOpponents).length === 1 &&
      value !== ""
    ) {
      newTitle = newTitle + " vs " + value;
    }

    this.setState({ title: newTitle });
  }

  handleChange = name => event => {
    const { selectedTeams, startTime, endTime } = this.state;
    switch (name) {
      case "type":
        this.setNewAutomatedTitle(selectedTeams, name, event.target.value);
        break;
      case "otherEventType":
        this.setNewAutomatedTitle(selectedTeams, name, event.target.value);
        break;
      case "startTime":
        if (event.target.value > endTime)
          this.setState({ endTime: event.target.value });
        break;
      case "endTime":
        if (event.target.value < startTime)
          this.setState({ startTime: event.target.value });
        break;
      case "frequency":
        if (event.target.value === "ONCE") {
          this.setState({ numberOfEvents: "1" });
        } else {
          this.setState({ numberOfEvents: "2" });
        }
        break;
      default:
        break;
    }

    this.setState({ [name]: event.target.value });
  };

  handleEditAllEvents() {
    this.setState({
      isRecurringEventModalOpen: false,
      shouldEditAllEvents: true
    });
  }

  handleEditThisEvent() {
    this.setState({
      isRecurringEventModalOpen: false,
      shouldEditAllEvents: false
    });
  }

  handleOpponentsChange = (teamID, id) => event => {
    const { opponents, selectedTeams } = this.state;

    this.setNewAutomatedTitle(
      selectedTeams,
      "opponents",
      event.target.value,
      opponents[teamID]
    );
    this.setState({
      opponents: {
        ...opponents,
        [teamID]: {
          ...opponents[teamID],
          [id]: {
            name: event.target.value,
            isSignedUp: false
          }
        }
      }
    });
  };

  addOpponent(teamID, id) {
    const { selectedTeams, opponents } = this.state;

    this.setNewAutomatedTitle(selectedTeams);
    this.setState({
      opponents: {
        ...opponents,
        [teamID]: {
          ...opponents[teamID],
          [id]: {
            name: "",
            isSignedUp: false
          }
        }
      }
    });
  }

  removeOpponent(teamID, removeID) {
    const { selectedTeams, opponents } = this.state;

    const newTeamOpponents = _.fromPairs(
      _.toPairs(opponents[teamID]).filter(([id, info]) => {
        if (id === removeID) {
          return false;
        } else {
          return true;
        }
      })
    );

    this.setNewAutomatedTitle(
      selectedTeams,
      "opponents",
      newTeamOpponents[_.keys(newTeamOpponents)[0]].name,
      newTeamOpponents
    );
    this.setState({
      opponents: {
        ...opponents,
        [teamID]: newTeamOpponents
      }
    });
  }

  addTeam() {
    const { teams, coaches, managers } = this.props;
    const {
      selectedTeams,
      selectedCoaches,
      selectedManagers,
      opponents
    } = this.state;

    const teamIDs = _.keys(teams);
    const selectedTeamIDs = _.keys(selectedTeams);

    let idCount = 0;
    let newID = teamIDs[idCount];
    let teamAlreadySelected = selectedTeamIDs.includes(newID);

    while (teamAlreadySelected) {
      idCount = idCount + 1;
      newID = teamIDs[idCount];
      teamAlreadySelected = selectedTeamIDs.includes(newID);
    }

    let newSelectedCoaches = selectedCoaches;
    let newSelectedManagers = selectedManagers;
    _.keys(teams[newID].coaches).map(coachID => {
      newSelectedCoaches = {
        ...newSelectedCoaches,
        [coachID]: coaches[coachID]
      };
    });
    _.keys(teams[newID].managers).map(managerID => {
      newSelectedManagers = {
        ...newSelectedManagers,
        [managerID]: managers[managerID]
      };
    });

    const newSelectedTeams = {
      ...this.state.selectedTeams,
      [newID]: teams[newID]
    };

    const newOpponents = {
      ...opponents,
      [newID]: {
        "0": {
          name: "",
          isSignedUp: false
        }
      }
    };

    this.setNewAutomatedTitle(newSelectedTeams);
    this.setState({
      opponents: newOpponents,
      selectedTeams: newSelectedTeams,
      selectedCoaches: newSelectedCoaches,
      selectedManagers: newSelectedManagers
    });
  }

  changeTeam = oldID => event => {
    const { teams, coaches, managers } = this.props;
    const {
      selectedTeams,
      selectedCoaches,
      selectedManagers,
      opponents
    } = this.state;
    const newID = event.target.value;

    const newTeams = _.fromPairs(
      _.toPairs(selectedTeams).filter(([id, info]) => {
        if (id === oldID) {
          return false;
        } else {
          return true;
        }
      })
    );

    let newCoaches = _.fromPairs(
      _.toPairs(selectedCoaches).filter(([id, info]) => {
        let allowThroughFilter = false;
        if (_.keys(teams[oldID].coaches).includes(id)) {
          _.toPairs(selectedTeams).map(([teamID, teamInfo]) => {
            if (teamID !== oldID && _.keys(teamInfo.coaches).includes(id)) {
              allowThroughFilter = true;
            }
          });
        } else {
          allowThroughFilter = true;
        }
        return allowThroughFilter;
      })
    );
    _.keys(teams[newID].coaches).map(coachID => {
      newCoaches = {
        ...newCoaches,
        [coachID]: coaches[coachID]
      };
    });

    let newManagers = _.fromPairs(
      _.toPairs(selectedManagers).filter(([id, info]) => {
        let allowThroughFilter = false;
        if (_.keys(teams[oldID].managers).includes(id)) {
          _.toPairs(selectedTeams).map(([teamID, teamInfo]) => {
            if (teamID !== oldID && _.keys(teamInfo.managers).includes(id)) {
              allowThroughFilter = true;
            }
          });
        } else {
          allowThroughFilter = true;
        }
        return allowThroughFilter;
      })
    );
    _.keys(teams[newID].managers).map(managerID => {
      newManagers = {
        ...newManagers,
        [managerID]: managers[managerID]
      };
    });

    const newSelectedTeams = {
      ...newTeams,
      [newID]: teams[newID]
    };

    const newOpponents = _.fromPairs(
      _.toPairs(opponents).map(([id, info]) => {
        if (id === oldID) {
          return [newID, info];
        } else {
          return [id, info];
        }
      })
    );

    this.setNewAutomatedTitle(newSelectedTeams);
    this.setState({
      opponents: newOpponents,
      selectedTeams: newSelectedTeams,
      selectedCoaches: newCoaches,
      selectedManagers: newManagers
    });
  };

  removeTeam(removeID) {
    const { teams } = this.props;
    const {
      selectedTeams,
      selectedCoaches,
      selectedManagers,
      opponents
    } = this.state;

    const newTeams = _.fromPairs(
      _.toPairs(selectedTeams).filter(([id, info]) => {
        if (id === removeID) {
          return false;
        } else {
          return true;
        }
      })
    );

    const newCoaches = _.fromPairs(
      _.toPairs(selectedCoaches).filter(([id, info]) => {
        let allowThroughFilter = false;
        if (_.keys(teams[removeID].coaches).includes(id)) {
          _.toPairs(selectedTeams).map(([teamID, teamInfo]) => {
            if (teamID !== removeID && _.keys(teamInfo.coaches).includes(id)) {
              allowThroughFilter = true;
            }
          });
        } else {
          allowThroughFilter = true;
        }
        return allowThroughFilter;
      })
    );

    const newManagers = _.fromPairs(
      _.toPairs(selectedManagers).filter(([id, info]) => {
        let allowThroughFilter = false;
        if (_.keys(teams[removeID].managers).includes(id)) {
          _.toPairs(selectedTeams).map(([teamID, teamInfo]) => {
            if (teamID !== removeID && _.keys(teamInfo.managers).includes(id)) {
              allowThroughFilter = true;
            }
          });
        } else {
          allowThroughFilter = true;
        }
        return allowThroughFilter;
      })
    );

    const newOpponents = _.fromPairs(
      _.toPairs(opponents).filter(([id, info]) => {
        if (id === removeID) {
          return false;
        } else {
          return true;
        }
      })
    );

    this.setNewAutomatedTitle(newTeams);
    this.setState({
      opponents: newOpponents,
      selectedTeams: newTeams,
      selectedCoaches: newCoaches,
      selectedManagers: newManagers
    });
  }

  addCoach() {
    const { coaches } = this.props;
    const { selectedCoaches } = this.state;

    const coachIDs = _.keys(coaches);
    const selectedCoachIDs = _.keys(selectedCoaches);

    let idCount = 0;
    let newID = coachIDs[idCount];
    let coachAlreadySelected = selectedCoachIDs.includes(newID);

    while (coachAlreadySelected) {
      idCount = idCount + 1;
      newID = coachIDs[idCount];
      coachAlreadySelected = selectedCoachIDs.includes(newID);
    }

    this.setState({
      selectedCoaches: {
        ...selectedCoaches,
        [newID]: coaches[newID]
      }
    });
  }

  changeCoach = oldID => event => {
    const { coaches } = this.props;
    const { selectedCoaches } = this.state;

    const newCoaches = _.fromPairs(
      _.toPairs(selectedCoaches).filter(([id, info]) => {
        if (id === oldID) {
          return false;
        } else {
          return true;
        }
      })
    );

    this.setState({
      selectedCoaches: {
        ...newCoaches,
        [event.target.value]: coaches[event.target.value]
      }
    });
  };

  removeCoach(removeID) {
    const { selectedCoaches } = this.state;

    const newCoaches = _.fromPairs(
      _.toPairs(selectedCoaches).filter(([id, info]) => {
        if (id === removeID) {
          return false;
        } else {
          return true;
        }
      })
    );

    this.setState({
      selectedCoaches: newCoaches
    });
  }

  addManager() {
    const { managers } = this.props;
    const { selectedManagers } = this.state;

    const managerIDs = _.keys(managers);
    const selectedManagerIDs = _.keys(selectedManagers);

    let idCount = 0;
    let newID = managerIDs[idCount];
    let managerAlreadySelected = selectedManagerIDs.includes(newID);

    while (managerAlreadySelected) {
      idCount = idCount + 1;
      newID = managerIDs[idCount];
      managerAlreadySelected = selectedManagerIDs.includes(newID);
    }

    this.setState({
      selectedManagers: {
        ...selectedManagers,
        [newID]: managers[newID]
      }
    });
  }

  changeManager = oldID => event => {
    const { managers } = this.props;
    const { selectedManagers } = this.state;

    const newManagers = _.fromPairs(
      _.toPairs(selectedManagers).filter(([id, info]) => {
        if (id === oldID) {
          return false;
        } else {
          return true;
        }
      })
    );

    this.setState({
      selectedManagers: {
        ...newManagers,
        [event.target.value]: managers[event.target.value]
      }
    });
  };

  removeManager(removeID) {
    const { selectedManagers } = this.state;

    const newManagers = _.fromPairs(
      _.toPairs(selectedManagers).filter(([id, info]) => {
        if (id === removeID) {
          return false;
        } else {
          return true;
        }
      })
    );

    this.setState({
      selectedManagers: newManagers
    });
  }

  render() {
    const {
      classes,
      isOpen,
      isLoading,
      minDate,
      institutionID,
      initialEventID,
      initialEventInfo,
      teams,
      coaches,
      managers,
      isMobile
    } = this.props;
    const {
      handleClose,
      editEvent,
      openAddEventErrorAlert
    } = this.props.actions;
    const {
      title,
      type,
      date,
      startTime,
      endTime,
      venue,
      opponents,
      homeAway,
      notes,
      otherEventType,
      isOtherEventTypeCompetitive,
      selectedTeams,
      selectedCoaches,
      selectedManagers,
      isRecurringEventModalOpen,
      shouldEditAllEvents
    } = this.state;

    const teamsList = this.createTeamsList();
    const coachesList = this.createCoachesList();
    const managersList = this.createManagersList();

    const hasTitleError = title.length === 0;
    const hasOtherEventTypeError =
      type === "OTHER" && otherEventType.length === 0;
    const hasDateError = new Date(date) < new Date(minDate);

    return (
      <div>
        <Dialog
          fullScreen={isMobile}
          open={isOpen}
          onRequestClose={() => handleClose()}
          transition={this.state.Transition}
        >
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            {isLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <div className={classes.innerContentWrapper}>
                <div className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Details
                  </Typography>
                  <form autoComplete="off">
                    <div className={classes.eventTypeControlWrapper}>
                      <Avatar
                        className={
                          this.isEventCompetitive()
                            ? classes.competitiveEvent
                            : classes.nonCompetitiveEvent
                        }
                      />
                      <FormControl className={classes.eventTypeControl}>
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                          native
                          value={type}
                          onChange={this.handleChange("type")}
                          input={<Input id="type" />}
                        >
                          <optgroup label="Non-competitive">
                            <option value="PRACTICE">Practice</option>
                            <option value="TRAINING">Training</option>
                          </optgroup>
                          <optgroup label="Competitive">
                            <option value="MATCH">Match</option>
                            <option value="MEETING">Meeting</option>
                            <option value="GALA">Gala</option>
                            <option value="SCRIM">Scrim</option>
                            <option value="EXHIBITION">Exhibition</option>
                            <option value="FRIENDLY">Friendly</option>
                          </optgroup>
                          <option value="OTHER">Other</option>
                        </Select>
                      </FormControl>
                    </div>
                    {type === "OTHER" && (
                      <div>
                        <FormControl className={classes.subFormControl}>
                          <TextField
                            id="other-event-type"
                            label="Event type name"
                            value={otherEventType}
                            placeholder="E.g. Gym Session, Sports Day, Meeting"
                            error={hasOtherEventTypeError}
                            helperText={
                              hasOtherEventTypeError
                                ? "Please specify the event type"
                                : ""
                            }
                            onChange={this.handleChange("otherEventType")}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </FormControl>
                        <FormControl className={classes.subFormControl}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={isOtherEventTypeCompetitive}
                                onChange={(event, checked) =>
                                  this.setState({
                                    isOtherEventTypeCompetitive: checked
                                  })}
                              />
                            }
                            label="Competitive event"
                          />
                        </FormControl>
                      </div>
                    )}
                    {!shouldEditAllEvents && (
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="date"
                          label="Date"
                          type="date"
                          value={date}
                          error={hasDateError}
                          helperText={
                            hasDateError
                              ? "You cannot schedule events in the past"
                              : ""
                          }
                          onChange={this.handleChange("date")}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    )}
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="time"
                        label="Starts at"
                        type="time"
                        value={startTime}
                        onChange={this.handleChange("startTime")}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="time"
                        label="Ends at"
                        type="time"
                        value={endTime}
                        onChange={this.handleChange("endTime")}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="venue"
                        label="Venue (Optional)"
                        value={venue}
                        placeholder="Currently unknown"
                        onChange={this.handleChange("venue")}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                    {this.isEventCompetitive() &&
                      !shouldEditAllEvents && (
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                        >
                          <FormLabel component="legend">Home / away</FormLabel>
                          <RadioGroup
                            aria-label="home"
                            name="home"
                            value={homeAway}
                            onChange={this.handleChange("homeAway")}
                          >
                            <FormControlLabel
                              value="UNKNOWN"
                              control={<Radio />}
                              label="To be specified"
                            />
                            <FormControlLabel
                              value="HOME"
                              control={<Radio />}
                              label="Home"
                            />
                            <FormControlLabel
                              value="AWAY"
                              control={<Radio />}
                              label="Away"
                            />
                            <FormControlLabel
                              value="NEUTRAL"
                              control={<Radio />}
                              label="Neutral"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="multiline-static"
                        label="Notes (Optional)"
                        multiline
                        rows="4"
                        placeholder="E.g. Please remember to bring your A game."
                        value={notes}
                        onChange={this.handleChange("notes")}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                  </form>
                </div>
                <div className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Teams
                  </Typography>
                  {teamsList}
                  <div className={classes.addButtonWrapper}>
                    <Button
                      disabled={
                        _.keys(teams).length === _.keys(selectedTeams).length
                      }
                      aria-label="add team"
                      onClick={() => this.addTeam()}
                    >
                      <AddIcon /> Add team
                    </Button>
                  </div>
                </div>
                <div className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Managers
                  </Typography>
                  {managersList}
                  <div className={classes.addButtonWrapper}>
                    <Button
                      disabled={
                        _.keys(managers).length ===
                        _.keys(selectedManagers).length
                      }
                      aria-label="add manager"
                      onClick={() => this.addManager(_.keys(managers).length)}
                    >
                      <AddIcon /> Add manager
                    </Button>
                  </div>
                </div>
                <div className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Coaches
                  </Typography>
                  {coachesList}
                  <div className={classes.addButtonWrapper}>
                    <Button
                      disabled={
                        _.keys(coaches).length ===
                        _.keys(selectedCoaches).length
                      }
                      aria-label="add coach"
                      onClick={() => this.addCoach(_.keys(coaches).length)}
                    >
                      <AddIcon /> Add coach
                    </Button>
                  </div>
                </div>
                <div className={classes.titleWrapper}>
                  <TextField
                    label="Event title"
                    value={title}
                    multiline
                    rows={title.length > 24 ? "2" : "1"}
                    className={classes.title}
                    onChange={e => this.handleTitleUpdate(e.target.value)}
                    error={hasTitleError}
                    helperText={
                      hasTitleError ? "Please provide an event title" : ""
                    }
                  />
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button
              disabled={isLoading}
              color="primary"
              onClick={() => {
                let eventType = type;
                if (eventType === "OTHER") {
                  eventType = otherEventType;
                }
                eventType = _.capitalize(eventType);
                const isCompetitive = this.isEventCompetitive();
                const recurrencePattern = initialEventInfo.recurrencePattern;

                const requiredInfo = {
                  isCompetitive,
                  title,
                  status: "ACTIVE",
                  times: {
                    end: new Date(`${date}T${endTime}:00`),
                    start: new Date(`${date}T${startTime}:00`)
                  },
                  type: eventType
                };
                const optionalInfo = {
                  homeAway,
                  notes,
                  venue
                };
                const eventTeams = _.fromPairs(
                  _.keys(selectedTeams).map(teamID => {
                    if (isCompetitive) {
                      return [
                        teamID,
                        {
                          resultsStatus: "AWAITING_APPROVAL",
                          opponents: opponents[teamID]
                        }
                      ];
                    } else {
                      return [teamID, true];
                    }
                  })
                );
                const eventManagers = _.fromPairs(
                  _.keys(selectedManagers).map(managerID => [managerID, true])
                );
                const eventCoaches = _.fromPairs(
                  _.keys(selectedCoaches).map(coachID => [
                    coachID,
                    {
                      attendance: {
                        didAttend: true,
                        hasSubstitute: false,
                        substitute: "",
                        willAttend: true
                      },
                      absenteeism: {
                        rating: "GOOD",
                        reason: ""
                      },
                      hours: {
                        status: "AWAITING_SIGN_IN",
                        times: {
                          signIn: new Date(`${date}T${startTime}:00`),
                          signOut: new Date(`${date}T${endTime}:00`)
                        }
                      }
                    }
                  ])
                );

                if (hasTitleError || hasOtherEventTypeError || hasDateError) {
                  let errorType = "TITLE";
                  if (hasOtherEventTypeError) errorType = "EVENT_TYPE";
                  if (hasDateError) errorType = "DATE";
                  openAddEventErrorAlert(errorType);
                } else {
                  editEvent(
                    institutionID,
                    initialEventID,
                    requiredInfo,
                    optionalInfo,
                    recurrencePattern,
                    eventTeams,
                    eventManagers,
                    eventCoaches,
                    shouldEditAllEvents
                  );
                }
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isRecurringEventModalOpen}>
          <DialogTitle>Recurring Event</DialogTitle>
          <DialogContent>
            <Typography type="body1" component="p">
              This event is a recurring event. How would you like to edit it?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleEditAllEvents()}>
              Edit all events
            </Button>
            <Button onClick={() => this.handleEditThisEvent()}>
              Only edit this event
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EditEventDialog);
