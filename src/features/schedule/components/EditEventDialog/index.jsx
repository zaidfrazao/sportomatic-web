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
import moment from "moment";
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
    width: "100%",
    margin: 8,
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
  teamButtonsWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  teamWrapper: {
    backgroundColor: grey[100],
    padding: 16,
    margin: 24,
    border: `1px solid ${grey[200]}`
  },
  title: {
    width: "100%",
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
    date: moment().format("YYYY-MM-DD"),
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
    errors: {
      date: {
        hasError: false,
        message: ""
      },
      startTime: {
        hasError: false,
        message: ""
      },
      endTime: {
        hasError: false,
        message: ""
      },
      title: {
        hasError: false,
        message: ""
      },
      numberOfEvents: {
        hasError: false,
        message: ""
      },
      notes: {
        hasError: false,
        message: ""
      },
      venue: {
        hasError: false,
        message: ""
      },
      otherEventType: {
        hasError: false,
        message: ""
      }
    },
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
          initialEventInfo.recurrencePattern.frequency !== "ONCE" && isOpen,
        errors: {
          date: {
            hasError: false,
            message: ""
          },
          startTime: {
            hasError: false,
            message: ""
          },
          endTime: {
            hasError: false,
            message: ""
          },
          title: {
            hasError: false,
            message: ""
          },
          numberOfEvents: {
            hasError: false,
            message: ""
          },
          notes: {
            hasError: false,
            message: ""
          },
          venue: {
            hasError: false,
            message: ""
          },
          otherEventType: {
            hasError: false,
            message: ""
          }
        }
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
          initialEventInfo.recurrencePattern.frequency !== "ONCE" && isOpen,
        errors: {
          date: {
            hasError: false,
            message: ""
          },
          startTime: {
            hasError: false,
            message: ""
          },
          endTime: {
            hasError: false,
            message: ""
          },
          title: {
            hasError: false,
            message: ""
          },
          numberOfEvents: {
            hasError: false,
            message: ""
          },
          notes: {
            hasError: false,
            message: ""
          },
          venue: {
            hasError: false,
            message: ""
          },
          otherEventType: {
            hasError: false,
            message: ""
          }
        }
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
                {_.toPairs(teams).map(([teamID, teamInfo]) => {
                  return (
                    <option
                      key={`${id}-${teamID}`}
                      value={teamID}
                      disabled={
                        teamID !== id && _.keys(selectedTeams).includes(teamID)
                      }
                    >
                      {teamInfo.info.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {isCompetitive && (
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Opponents</FormLabel>
                  {_.toPairs(opponents[id]).map(([opponentID, info], index) => (
                    <FormControl
                      className={classes.opponentsTextFieldWrapper}
                      key={`${id}${opponentID}`}
                    >
                      <TextField
                        id="opponents"
                        className={classes.opponentsTextField}
                        placeholder="Enter opponent name (Optional)"
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
                </FormControl>
              </div>
            )}
            <div className={classes.teamButtonsWrapper}>
              <Button
                aria-label="remove team"
                onClick={() => this.removeTeam(id)}
              >
                Remove team
              </Button>
              {!isMobile && isCompetitive && <div className={classes.flex} />}
              {isCompetitive && (
                <Button
                  aria-label="add opponent"
                  onClick={() =>
                    this.addOpponent(id, _.keys(opponents[id]).length)}
                >
                  <AddIcon /> Add opponent
                </Button>
              )}
            </div>
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
                {_.toPairs(coaches).map(([coachID, coachInfo]) => {
                  return (
                    <option
                      key={`${id}-${coachID}`}
                      value={coachID}
                      disabled={
                        coachID !== id &&
                        _.keys(selectedCoaches).includes(coachID)
                      }
                    >
                      {`${coachInfo.info.name} ${coachInfo.info.surname}`}
                    </option>
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
                {_.toPairs(managers).map(([managerID, managerInfo]) => {
                  return (
                    <option
                      key={`${id}-${managerID}`}
                      value={managerID}
                      disabled={
                        managerID !== id &&
                        _.keys(selectedManagers).includes(managerID)
                      }
                    >
                      {`${managerInfo.info.name} ${managerInfo.info.surname}`}
                    </option>
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

  validateField(field, value) {
    const { minDate } = this.props;
    const { errors, startTime, endTime } = this.state;

    let hasError = false;
    let message = "";

    switch (field) {
      case "date":
        if (moment(minDate).isAfter(moment(value))) {
          hasError = true;
          message = "Cannot schedule events before today";
        }
        break;
      case "startTime":
        if (value >= endTime) {
          hasError = true;
          message = "Start time must be before end time";
        }
        break;
      case "endTime":
        if (value <= startTime) {
          hasError = true;
          message = "Start time must be before end time";
        }
        break;
      case "title":
        if (value === "") {
          hasError = true;
          message = "Please provide an event title";
        } else if (value.length > 64) {
          hasError = true;
          message = "Event title too long";
        }
        break;
      case "numberOfEvents":
        if (parseInt(value, 10) < 1) {
          hasError = true;
          message = "Must be positive";
        } else if (parseInt(value, 10) > 54) {
          hasError = true;
          message = "Max. of 54 events allowed";
        }
        break;
      case "notes":
        if (value.length > 250) {
          hasError = true;
          message = "Max. 250 characters allowed";
        }
        break;
      case "venue":
        if (value.length > 64) {
          hasError = true;
          message = "Venue location too long";
        }
        break;
      case "otherEventType":
        if (value === "") {
          hasError = true;
          message = "Please provide an event type";
        } else if (value.length > 32) {
          hasError = true;
          message = "Event type too long";
        }
        break;
      default:
        console.log(`${field}: ${value}`);
        break;
    }

    if (field === "startTime" || field === "endTime") {
      this.setState({
        ...this.state,
        errors: {
          ...errors,
          startTime: {
            hasError,
            message
          },
          endTime: {
            hasError,
            message
          }
        }
      });
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...errors,
          [field]: {
            hasError,
            message
          }
        }
      });
    }
  }

  handleChange(field, value) {
    const { selectedTeams } = this.state;
    switch (field) {
      case "type":
        this.setNewAutomatedTitle(selectedTeams, field, value);
        break;
      case "otherEventType":
        this.setNewAutomatedTitle(selectedTeams, field, value);
        break;
      case "frequency":
        if (value === "ONCE") {
          this.setState({ numberOfEvents: "1" });
        } else {
          this.setState({ numberOfEvents: "2" });
        }
        break;
      default:
        break;
    }

    this.setState({ [field]: value });
  }

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

  hasErrors() {
    const { errors } = this.state;
    let hasErrors = false;
    _.values(errors).map(error => (hasErrors = hasErrors || error.hasError));
    return hasErrors;
  }

  render() {
    const {
      classes,
      isOpen,
      isLoading,
      institutionID,
      initialEventID,
      initialEventInfo,
      teams,
      coaches,
      managers,
      isMobile
    } = this.props;
    const { handleClose, editEvent } = this.props.actions;
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
      shouldEditAllEvents,
      errors
    } = this.state;

    const teamsList = this.createTeamsList();
    const coachesList = this.createCoachesList();
    const managersList = this.createManagersList();
    const hasErrors = this.hasErrors();

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
                          onChange={e => {
                            if (e.target.value === "OTHER") {
                              this.validateField(
                                "otherEventType",
                                otherEventType
                              );
                            } else {
                              this.validateField("otherEventType", "N/A");
                            }
                            this.handleChange("type", e.target.value);
                          }}
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
                            error={errors.otherEventType.hasError}
                            helperText={errors.otherEventType.message}
                            onChange={e => {
                              this.validateField(
                                "otherEventType",
                                e.target.value
                              );
                              this.handleChange(
                                "otherEventType",
                                e.target.value
                              );
                            }}
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
                          error={errors.date.hasError}
                          helperText={errors.date.message}
                          onChange={e => {
                            this.validateField("date", e.target.value);
                            this.handleChange("date", e.target.value);
                          }}
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
                        error={errors.startTime.hasError}
                        helperText={errors.startTime.message}
                        onChange={e => {
                          this.validateField("startTime", e.target.value);
                          this.handleChange("startTime", e.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="time"
                        label="Ends at"
                        type="time"
                        value={endTime}
                        error={errors.endTime.hasError}
                        helperText={errors.endTime.message}
                        onChange={e => {
                          this.validateField("endTime", e.target.value);
                          this.handleChange("endTime", e.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="venue"
                        label="Venue (Optional)"
                        value={venue}
                        placeholder="Currently unknown"
                        error={errors.venue.hasError}
                        helperText={errors.venue.message}
                        onChange={e => {
                          this.validateField("venue", e.target.value);
                          this.handleChange("venue", e.target.value);
                        }}
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
                            onChange={() => this.handleChange("homeAway")}
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
                        error={errors.numberOfEvents.hasError}
                        helperText={errors.numberOfEvents.message}
                        onChange={e => {
                          this.validateField("numberOfEvents", e.target.value);
                          this.handleChange("numberOfEvents", e.target.value);
                        }}
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
                    className={classes.title}
                    onChange={e => {
                      this.validateField("title", e.target.value);
                      this.handleTitleUpdate(e.target.value);
                    }}
                    error={errors.title.hasError}
                    helperText={errors.title.message}
                  />
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button disabled={isLoading} onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button
              disabled={isLoading || hasErrors}
              color="primary"
              onClick={() => {
                let eventType = type;
                if (eventType === "OTHER") {
                  eventType = otherEventType;
                }
                eventType = _.capitalize(eventType);
                const isCompetitive = this.isEventCompetitive();
                const recurrencePattern = initialEventInfo.recurrencePattern;

                let startTimeObject = new Date(date);
                startTimeObject.setHours(startTime.slice(0, 2));
                startTimeObject.setMinutes(startTime.slice(3, 5));
                let endTimeObject = new Date(date);
                endTimeObject.setHours(endTime.slice(0, 2));
                endTimeObject.setMinutes(endTime.slice(3, 5));

                const requiredInfo = {
                  isCompetitive,
                  title,
                  status: "ACTIVE",
                  times: {
                    end: endTimeObject,
                    start: startTimeObject
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
                          status: "ACTIVE",
                          resultsStatus: "AWAITING_START",
                          opponents: opponents[teamID]
                        }
                      ];
                    } else {
                      return [teamID, { status: "ACTIVE" }];
                    }
                  })
                );
                const eventManagers = _.fromPairs(
                  _.keys(selectedManagers).map(managerID => [
                    managerID,
                    { status: "ACTIVE" }
                  ])
                );
                const eventCoaches = _.fromPairs(
                  _.keys(selectedCoaches).map(coachID => [
                    coachID,
                    {
                      status: "ACTIVE",
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
                          signIn: startTimeObject,
                          signOut: endTimeObject
                        }
                      }
                    }
                  ])
                );

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
