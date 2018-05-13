/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AddIcon from "material-ui-icons/Add";
import Avatar from "material-ui/Avatar";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";
import { grey, lightBlue, orange, red } from "material-ui/colors";
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
import Button from "../../../../components/Button";

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
  errorMessage: {
    color: red[500],
    fontSize: 12,
    width: "80%",
    margin: "0 8% 0 12%"
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
  iconAdjacentText: {
    marginRight: 8
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
  timeInput: {
    width: 56,
    margin: "0 4px"
  },
  timeWrapper: {
    width: "80%",
    margin: "24px 10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
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
    startTime: {
      hours: "01",
      minutes: "00",
      ampm: "PM"
    },
    endTime: {
      hours: "02",
      minutes: "00",
      ampm: "PM"
    },
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
      times: {
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

      const startTimeMoment = moment(initialEventInfo.requiredInfo.times.start);
      const startTime = {
        hours: startTimeMoment.format("hh"),
        minutes: startTimeMoment.format("mm"),
        ampm: startTimeMoment.format("A")
      };
      const endTimeMoment = moment(initialEventInfo.requiredInfo.times.end);
      const endTime = {
        hours: endTimeMoment.format("hh"),
        minutes: endTimeMoment.format("mm"),
        ampm: endTimeMoment.format("A")
      };

      this.setState({
        selectedTeams,
        selectedManagers,
        selectedCoaches,
        opponents,
        startTime,
        endTime,
        type,
        date: initialDate,
        title: initialEventInfo.requiredInfo.title,
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
          times: {
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

      const startTimeMoment = moment(initialEventInfo.requiredInfo.times.start);
      const startTime = {
        hours: startTimeMoment.format("hh"),
        minutes: startTimeMoment.format("mm"),
        ampm: startTimeMoment.format("A")
      };
      const endTimeMoment = moment(initialEventInfo.requiredInfo.times.end);
      const endTime = {
        hours: endTimeMoment.format("hh"),
        minutes: endTimeMoment.format("mm"),
        ampm: endTimeMoment.format("A")
      };

      this.setState({
        selectedTeams,
        selectedManagers,
        selectedCoaches,
        opponents,
        startTime,
        endTime,
        type,
        date: initialDate,
        title: initialEventInfo.requiredInfo.title,
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
          times: {
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
                colour="primary"
                slim
                handleClick={() => this.removeTeam(id)}
              >
                Remove team
              </Button>
              {!isMobile && isCompetitive && <div className={classes.flex} />}
              {isCompetitive && (
                <Button
                  colour="primary"
                  filled
                  handleClick={() =>
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
            <div className={classes.teamButtonsWrapper}>
              <Button
                colour="primary"
                slim
                handleClick={() => this.removeCoach(id)}
              >
                Remove coach
              </Button>
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
            <div className={classes.teamButtonsWrapper}>
              <Button
                colour="primary"
                slim
                handleClick={() => this.removeManager(id)}
              >
                Remove manager
              </Button>
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
    const { errors } = this.state;

    let hasError = false;
    let message = "";

    switch (field) {
      case "date":
        if (moment(minDate).isAfter(moment(value))) {
          hasError = true;
          message = "Cannot schedule events before today";
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

  validateTimes(startTime, endTime) {
    const startTimeMoment = moment()
      .hour(
        startTime.ampm === "AM" || parseInt(startTime.hours, 10) === 12
          ? parseInt(startTime.hours, 10)
          : parseInt(startTime.hours, 10) + 12
      )
      .minute(parseInt(startTime.minutes, 10));
    const endTimeMoment = moment()
      .hour(
        endTime.ampm === "AM" || parseInt(endTime.hours, 10) === 12
          ? parseInt(endTime.hours, 10)
          : parseInt(endTime.hours, 10) + 12
      )
      .minute(parseInt(endTime.minutes, 10));

    let hasError = false;
    let message = "";

    if (startTimeMoment.isAfter(endTimeMoment)) {
      hasError = true;
      message = "Start time must be before end time";
    }

    this.setState({
      errors: {
        ...this.state.errors,
        times: {
          hasError,
          message
        }
      }
    });
  }

  handleTimeChange(timeType, timeSector, newValue) {
    const { startTime, endTime } = this.state;

    if (timeType === "startTime") {
      this.validateTimes({ ...startTime, [timeSector]: newValue }, endTime);
    } else {
      this.validateTimes(startTime, { ...endTime, [timeSector]: newValue });
    }

    this.setState({
      [timeType]: {
        ...this.state[timeType],
        [timeSector]: newValue
      }
    });
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
                    <FormControl
                      className={classes.timeWrapper}
                      error={errors.times.hasError}
                    >
                      <InputLabel htmlFor="startTime">Start time</InputLabel>
                      <Select
                        native
                        value={startTime.hours}
                        input={<Input id="startTime-hours" />}
                        onChange={e =>
                          this.handleTimeChange(
                            "startTime",
                            "hours",
                            e.target.value
                          )}
                        className={classes.timeInput}
                      >
                        <option value="12">{"12"}</option>
                        <option value="01">{"01"}</option>
                        <option value="02">{"02"}</option>
                        <option value="03">{"03"}</option>
                        <option value="04">{"04"}</option>
                        <option value="05">{"05"}</option>
                        <option value="06">{"06"}</option>
                        <option value="07">{"07"}</option>
                        <option value="08">{"08"}</option>
                        <option value="09">{"09"}</option>
                        <option value="10">{"10"}</option>
                        <option value="11">{"11"}</option>
                      </Select>
                      <Select
                        native
                        value={startTime.minutes}
                        input={<Input id="startTime-minutes" />}
                        onChange={e =>
                          this.handleTimeChange(
                            "startTime",
                            "minutes",
                            e.target.value
                          )}
                        className={classes.timeInput}
                      >
                        <option value="00">{"00"}</option>
                        <option value="05">{"05"}</option>
                        <option value="10">{"10"}</option>
                        <option value="15">{"15"}</option>
                        <option value="20">{"20"}</option>
                        <option value="25">{"25"}</option>
                        <option value="30">{"30"}</option>
                        <option value="35">{"35"}</option>
                        <option value="40">{"40"}</option>
                        <option value="45">{"45"}</option>
                        <option value="50">{"50"}</option>
                        <option value="55">{"55"}</option>
                      </Select>
                      <Select
                        native
                        value={startTime.ampm}
                        input={<Input id="startTime-ampm" />}
                        onChange={e =>
                          this.handleTimeChange(
                            "startTime",
                            "ampm",
                            e.target.value
                          )}
                        className={classes.timeInput}
                      >
                        <option value="AM">{"AM"}</option>
                        <option value="PM">{"PM"}</option>
                      </Select>
                    </FormControl>
                    <FormControl
                      className={classes.timeWrapper}
                      error={errors.times.hasError}
                    >
                      <InputLabel htmlFor="endTime">End time</InputLabel>
                      <Select
                        native
                        value={endTime.hours}
                        input={<Input id="endTime-hours" />}
                        onChange={e =>
                          this.handleTimeChange(
                            "endTime",
                            "hours",
                            e.target.value
                          )}
                        className={classes.timeInput}
                      >
                        <option value="12">{"12"}</option>
                        <option value="01">{"01"}</option>
                        <option value="02">{"02"}</option>
                        <option value="03">{"03"}</option>
                        <option value="04">{"04"}</option>
                        <option value="05">{"05"}</option>
                        <option value="06">{"06"}</option>
                        <option value="07">{"07"}</option>
                        <option value="08">{"08"}</option>
                        <option value="09">{"09"}</option>
                        <option value="10">{"10"}</option>
                        <option value="11">{"11"}</option>
                      </Select>
                      <Select
                        native
                        value={endTime.minutes}
                        input={<Input id="endTime-minutes" />}
                        onChange={e =>
                          this.handleTimeChange(
                            "endTime",
                            "minutes",
                            e.target.value
                          )}
                        className={classes.timeInput}
                      >
                        <option value="00">{"00"}</option>
                        <option value="05">{"05"}</option>
                        <option value="10">{"10"}</option>
                        <option value="15">{"15"}</option>
                        <option value="20">{"20"}</option>
                        <option value="25">{"25"}</option>
                        <option value="30">{"30"}</option>
                        <option value="35">{"35"}</option>
                        <option value="40">{"40"}</option>
                        <option value="45">{"45"}</option>
                        <option value="50">{"50"}</option>
                        <option value="55">{"55"}</option>
                      </Select>
                      <Select
                        native
                        value={endTime.ampm}
                        input={<Input id="endTime-ampm" />}
                        onChange={e =>
                          this.handleTimeChange(
                            "endTime",
                            "ampm",
                            e.target.value
                          )}
                        className={classes.timeInput}
                      >
                        <option value="AM">{"AM"}</option>
                        <option value="PM">{"PM"}</option>
                      </Select>
                    </FormControl>
                    {errors.times.hasError && (
                      <p className={classes.errorMessage}>
                        {errors.times.message}
                      </p>
                    )}
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
                          this.validateField("notes", e.target.value);
                          this.handleChange("notes", e.target.value);
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
                      colour="primary"
                      filled
                      handleClick={() => this.addTeam()}
                    >
                      <i
                        className={`fas fa-plus ${classes.iconAdjacentText}`}
                      />Add team
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
                      colour="primary"
                      filled
                      handleClick={() =>
                        this.addManager(_.keys(managers).length)}
                    >
                      <i
                        className={`fas fa-plus ${classes.iconAdjacentText}`}
                      />Add manager
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
                      colour="primary"
                      filled
                      handleClick={() => this.addCoach(_.keys(coaches).length)}
                    >
                      <i
                        className={`fas fa-plus ${classes.iconAdjacentText}`}
                      />Add coach
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
            <Button
              disabled={isLoading}
              colour="primary"
              slim
              handleClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || hasErrors}
              colour="primary"
              slim
              filled
              handleClick={() => {
                let eventType = type;
                if (eventType === "OTHER") {
                  eventType = otherEventType;
                }
                eventType = _.capitalize(eventType);
                const isCompetitive = this.isEventCompetitive();
                const recurrencePattern = initialEventInfo.recurrencePattern;

                const startTimeMoment = moment(date)
                  .hour(
                    startTime.ampm === "AM" ||
                    parseInt(startTime.hours, 10) === 12
                      ? parseInt(startTime.hours, 10)
                      : parseInt(startTime.hours, 10) + 12
                  )
                  .minute(parseInt(startTime.minutes, 10));
                const endTimeMoment = moment(date)
                  .hour(
                    endTime.ampm === "AM" || parseInt(endTime.hours, 10) === 12
                      ? parseInt(endTime.hours, 10)
                      : parseInt(endTime.hours, 10) + 12
                  )
                  .minute(parseInt(endTime.minutes, 10));

                const requiredInfo = {
                  isCompetitive,
                  title,
                  status: "ACTIVE",
                  times: {
                    end: endTimeMoment.toDate(),
                    start: startTimeMoment.toDate()
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
                          signIn: startTimeMoment.toDate(),
                          signOut: endTimeMoment.toDate()
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
            <Button
              colour="primary"
              slim
              filled
              handleClick={() => this.handleEditAllEvents()}
            >
              Edit all events
            </Button>
            <Button
              colour="primary"
              slim
              filled
              handleClick={() => this.handleEditThisEvent()}
            >
              Only edit this event
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EditEventDialog);
