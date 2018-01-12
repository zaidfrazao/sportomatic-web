import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import { CircularProgress } from "material-ui/Progress";
import CloseIcon from "material-ui-icons/Close";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";
import { grey } from "material-ui/colors";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import Input, { InputLabel } from "material-ui/Input";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import { MenuItem } from "material-ui/Menu";
import Radio, { RadioGroup } from "material-ui/Radio";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
import Switch from "material-ui/Switch";
import TextField from "material-ui/TextField";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  appBar: {
    position: "relative"
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
    backgroundColor: grey[300],
    color: grey[700]
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mainContent: {
    height: "100%",
    overflow: "auto"
  },
  section: {
    backgroundColor: grey[100]
  },
  subheading: {
    width: "100%",
    textAlign: "center",
    margin: "24px 0"
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
    venue: "To be specified",
    opponents: {
      institution: "To be specified",
      isSignedUp: false
    },
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
    const { initialEventInfo, initialDate, isOpen } = this.props;

    if (initialEventInfo) {
      const timeOptions = { hour12: false, hour: "2-digit", minute: "2-digit" };
      let type = initialEventInfo.requiredInfo.type;
      let otherEventType = "";
      let isOtherEventTypeCompetitive = false;
      if (type === "Practice") {
        type = "PRACTICE";
      } else if (type === "Match") {
        type = "MATCH";
      } else {
        otherEventType = initialEventInfo.requiredInfo.type;
        isOtherEventTypeCompetitive =
          initialEventInfo.requiredInfo.isCompetitive;
        type = "OTHER";
      }

      this.setState({
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
        opponents: initialEventInfo.optionalInfo.opponents,
        homeAway: initialEventInfo.optionalInfo.homeAway,
        frequency: initialEventInfo.recurrencePattern.frequency,
        numberOfEvents: initialEventInfo.recurrencePattern.numberOfEvents,
        otherEventType: otherEventType,
        notes: initialEventInfo.optionalInfo.notes,
        isOtherEventTypeCompetitive: isOtherEventTypeCompetitive,
        selectedTeams: _.keys(initialEventInfo.teams),
        selectedManagers: _.keys(initialEventInfo.managers),
        selectedCoaches: _.keys(initialEventInfo.coaches),
        isRecurringEventModalOpen:
          initialEventInfo.recurrencePattern.frequency !== "ONCE" && isOpen
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { initialEventInfo, initialDate, isOpen } = nextProps;

    if (this.props.initialEventInfo !== initialEventInfo) {
      const timeOptions = { hour12: false, hour: "2-digit", minute: "2-digit" };
      let type = initialEventInfo.requiredInfo.type;
      let otherEventType = "";
      let isOtherEventTypeCompetitive = false;
      if (type === "Practice") {
        type = "PRACTICE";
      } else if (type === "Match") {
        type = "MATCH";
      } else {
        otherEventType = initialEventInfo.requiredInfo.type;
        isOtherEventTypeCompetitive =
          initialEventInfo.requiredInfo.isCompetitive;
        type = "OTHER";
      }

      this.setState({
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
        opponents: initialEventInfo.optionalInfo.opponents,
        homeAway: initialEventInfo.optionalInfo.homeAway,
        frequency: initialEventInfo.recurrencePattern.frequency,
        numberOfEvents: initialEventInfo.recurrencePattern.numberOfEvents,
        otherEventType: otherEventType,
        notes: initialEventInfo.optionalInfo.notes,
        isOtherEventTypeCompetitive: isOtherEventTypeCompetitive,
        selectedTeams: _.keys(initialEventInfo.teams),
        selectedManagers: _.keys(initialEventInfo.managers),
        selectedCoaches: _.keys(initialEventInfo.coaches)
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

  createTeamsList() {
    const { classes, teams } = this.props;
    const { selectedTeams } = this.state;
    const listItems = _.toPairs(teams).map(([id, team]) => {
      return (
        <ListItem
          key={id}
          dense
          button
          className={classes.listItem}
          onClick={() => this.handleToggle(id, "TEAM")}
        >
          <ListItemText primary={team.info.name} secondary={team.info.sport} />
          <ListItemSecondaryAction>
            <Checkbox
              onClick={() => this.handleToggle(id, "TEAM")}
              checked={selectedTeams.indexOf(id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <List>
        {listItems.length > 0 ? (
          listItems
        ) : (
          <Typography
            type="subheading"
            component="p"
            className={classes.subheading}
          >
            None
          </Typography>
        )}
      </List>
    );
  }

  createCoachesList() {
    const { classes, coaches } = this.props;
    const { selectedCoaches } = this.state;
    const listItems = _.toPairs(coaches).map(([id, coach]) => {
      return (
        <ListItem
          key={id}
          dense
          button
          className={classes.listItem}
          onClick={() => this.handleToggle(id, "COACH")}
        >
          <Avatar
            alt={`${coach.info.name} ${coach.info.surname}`}
            src={coach.info.profilePictureURL}
          />
          <ListItemText primary={`${coach.info.name} ${coach.info.surname}`} />
          <ListItemSecondaryAction>
            <Checkbox
              onClick={() => this.handleToggle(id, "COACH")}
              checked={selectedCoaches.indexOf(id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <List>
        {listItems.length > 0 ? (
          listItems
        ) : (
          <Typography
            type="subheading"
            component="p"
            className={classes.subheading}
          >
            None
          </Typography>
        )}
      </List>
    );
  }

  createManagersList() {
    const { classes, managers } = this.props;
    const { selectedManagers } = this.state;
    const listItems = _.toPairs(managers).map(([id, manager]) => {
      return (
        <ListItem
          key={id}
          dense
          button
          className={classes.listItem}
          onClick={() => this.handleToggle(id, "MANAGER")}
        >
          <Avatar
            alt={`${manager.info.name} ${manager.info.surname}`}
            src={manager.info.profilePictureURL}
          />
          <ListItemText
            primary={`${manager.info.name} ${manager.info.surname}`}
          />
          <ListItemSecondaryAction>
            <Checkbox
              onClick={() => this.handleToggle(id, "MANAGER")}
              checked={selectedManagers.indexOf(id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <List>
        {listItems.length > 0 ? (
          listItems
        ) : (
          <Typography
            type="subheading"
            component="p"
            className={classes.subheading}
          >
            None
          </Typography>
        )}
      </List>
    );
  }

  handleTitleUpdate(newTitle) {
    this.setState({
      title: newTitle
    });
  }

  setNewAutomatedTitle(selectedTeams, update = "", value = "") {
    const { teams } = this.props;
    const { type, otherEventType } = this.state;

    let newTitle = "";
    if (selectedTeams.length === 1) {
      newTitle = teams[selectedTeams[0]].info.name + " ";
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

    if (update === "opponents") {
      newTitle = newTitle + " vs " + value;
    }

    this.setState({ title: newTitle });
  }

  handleChange = name => event => {
    const { selectedTeams, startTime, endTime } = this.state;
    switch (name) {
      case "opponents":
        this.setNewAutomatedTitle(selectedTeams, name, event.target.value);
        break;
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

    if (name === "opponents") {
      this.setState({
        [name]: {
          institution: event.target.value,
          isSignedUp: false
        }
      });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleToggle = (value, type) => {
    const { selectedTeams, selectedManagers, selectedCoaches } = this.state;
    const { teams } = this.props;

    if (type === "TEAM") {
      const currentIndex = selectedTeams.indexOf(value);
      const newChecked = [...selectedTeams];
      let newManagers = [...selectedManagers];
      let newCoaches = [...selectedCoaches];

      if (currentIndex === -1) {
        newChecked.push(value);
        newManagers = [...newManagers, ..._.keys(teams[value].managers)];
        newCoaches = [...newCoaches, ..._.keys(teams[value].coaches)];
      } else {
        newChecked.splice(currentIndex, 1);
        newManagers = selectedManagers.filter(managerID => {
          if (!teams[value].managers[managerID]) {
            return true;
          } else {
            return newChecked.reduce((keep, teamID) => {
              if (!keep) {
                if (teams[teamID].managers[managerID]) {
                  return true;
                }
                return false;
              }
              return true;
            }, false);
          }
        });
        newCoaches = selectedCoaches.filter(coachID => {
          if (!teams[value].coaches[coachID]) {
            return true;
          } else {
            return newChecked.reduce((keep, teamID) => {
              if (!keep) {
                if (teams[teamID].coaches[coachID]) {
                  return true;
                }
                return false;
              }
              return true;
            }, false);
          }
        });
      }

      this.setNewAutomatedTitle(newChecked);
      this.setState({
        selectedTeams: newChecked,
        selectedCoaches: newCoaches,
        selectedManagers: newManagers
      });
    } else if (type === "MANAGER") {
      const currentIndex = selectedManagers.indexOf(value);
      const newChecked = [...selectedManagers];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      this.setState({
        selectedManagers: newChecked
      });
    } else {
      const currentIndex = selectedCoaches.indexOf(value);
      const newChecked = [...selectedCoaches];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      this.setState({
        selectedCoaches: newChecked
      });
    }
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

  render() {
    const {
      classes,
      isOpen,
      isLoading,
      minDate,
      institutionID,
      initialEventID,
      initialEventInfo
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
          fullScreen
          open={isOpen}
          onRequestClose={() => handleClose()}
          transition={this.state.Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                onClick={() => handleClose()}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Edit Event
              </Typography>
              <Button
                disabled={isLoading}
                color="contrast"
                onClick={() => {
                  let eventType = _.capitalize(type);
                  if (eventType === "OTHER") {
                    eventType = otherEventType;
                  }
                  const isCompetitive =
                    eventType === "Match" || isOtherEventTypeCompetitive;
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
                    venue,
                    opponents: {
                      institution: opponents,
                      isSignedUp: false
                    }
                  };

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
                      _.fromPairs(selectedTeams.map(teamID => [teamID, true])),
                      _.fromPairs(
                        selectedManagers.map(managerID => [managerID, true])
                      ),
                      _.fromPairs(
                        selectedCoaches.map(coachID => [
                          coachID,
                          initialEventInfo.coaches[coachID]
                        ])
                      ),
                      shouldEditAllEvents
                    );
                  }
                }}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container className={classes.mainContent}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className={classes.titleWrapper}
              >
                <TextField
                  label="Event title"
                  value={title}
                  className={classes.title}
                  onChange={e => this.handleTitleUpdate(e.target.value)}
                  error={hasTitleError}
                  helperText={
                    hasTitleError ? "Please provide an event title" : ""
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className={classes.section}
              >
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Teams
                </Typography>
                {teamsList}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className={classes.section}
              >
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Details
                </Typography>
                <form autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                      value={type}
                      onChange={this.handleChange("type")}
                      input={<Input id="type" />}
                    >
                      <MenuItem value="PRACTICE">Practice</MenuItem>
                      <MenuItem value="MATCH">Match</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {type === "OTHER" && (
                    <div>
                      <FormControl className={classes.formControl}>
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
                      <FormControl className={classes.formControl}>
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
                </form>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className={classes.section}
              >
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Additional Info
                </Typography>
                <form autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="venue"
                      label="Venue"
                      value={venue}
                      onChange={this.handleChange("venue")}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </FormControl>
                  {(type === "MATCH" ||
                    (type === "OTHER" && isOtherEventTypeCompetitive)) &&
                    !shouldEditAllEvents && (
                      <div>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="opponents"
                            label="Opponents"
                            value={opponents.institution}
                            onChange={this.handleChange("opponents")}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </FormControl>
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
                      </div>
                    )}
                </form>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className={classes.section}
              >
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Notes
                </Typography>
                <form autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="multiline-static"
                      label="Event notes"
                      multiline
                      rows="4"
                      value={notes}
                      onChange={this.handleChange("notes")}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </FormControl>
                </form>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className={classes.section}
              >
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Managers
                </Typography>
                {managersList}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className={classes.section}
              >
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Coaches
                </Typography>
                {coachesList}
              </Grid>
            </Grid>
          )}
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
