import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";
import Select from "material-ui/Select";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import Avatar from "material-ui/Avatar";
import { CircularProgress } from "material-ui/Progress";
import Switch from "material-ui/Switch";

import _ from "lodash";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  mainContent: {
    height: "100%",
    overflow: "auto"
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    margin: 24,
    fontSize: "1.4rem"
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
  formControl: {
    width: "80%",
    margin: "24px 10%"
  },
  subheading: {
    width: "100%",
    textAlign: "center",
    margin: "24px 0"
  },
  section: {
    backgroundColor: grey[100]
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

class AddEventDialog extends Component {
  state = {
    title: "Practice",
    type: "PRACTICE",
    date: new Date(Date.now()).toISOString().slice(0, 10),
    startTime: "12:00",
    endTime: "13:00",
    venue: "To be specified",
    opponents: "To be specified",
    homeAway: "UNKNOWN",
    frequency: "ONCE",
    numberOfEvents: "1",
    otherEventType: "",
    notes: "",
    isOtherEventTypeCompetitive: false,
    selectedTeams: [],
    selectedManagers: [],
    selectedCoaches: []
  };

  componentWillMount() {
    this.setState({ date: this.props.initialDate });
  }

  createTeamsList() {
    const { classes, teams } = this.props;
    const { selectedTeams } = this.state;
    const listItems = _.toPairs(teams).map(([id, info]) => {
      return (
        <ListItem
          key={id}
          dense
          button
          className={classes.listItem}
          onClick={() => this.handleToggle(id, "TEAM")}
        >
          <ListItemText
            primary={info.metadata.name}
            secondary={info.metadata.sport}
          />
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
    const listItems = _.toPairs(coaches).map(([id, info]) => {
      return (
        <ListItem
          key={id}
          dense
          button
          className={classes.listItem}
          onClick={() => this.handleToggle(id, "COACH")}
        >
          <Avatar
            alt={`${info.metadata.name} ${info.metadata.surname}`}
            src={info.metadata.profilePictureURL}
          />
          <ListItemText
            primary={`${info.metadata.name} ${info.metadata.surname}`}
          />
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
    const listItems = _.toPairs(managers).map(([id, info]) => {
      return (
        <ListItem
          key={id}
          dense
          button
          className={classes.listItem}
          onClick={() => this.handleToggle(id, "MANAGER")}
        >
          <Avatar
            alt={`${info.metadata.name} ${info.metadata.surname}`}
            src={info.metadata.profilePictureURL}
          />
          <ListItemText
            primary={`${info.metadata.name} ${info.metadata.surname}`}
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
      newTitle = teams[selectedTeams[0]].metadata.name + " ";
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

  render() {
    const {
      classes,
      isOpen,
      isLoading,
      minDate,
      teams,
      coaches,
      managers,
      institutionID
    } = this.props;
    const {
      handleClose,
      addEvent,
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
      frequency,
      notes,
      numberOfEvents,
      otherEventType,
      isOtherEventTypeCompetitive,
      selectedTeams,
      selectedCoaches,
      selectedManagers
    } = this.state;

    const teamsList = this.createTeamsList();
    const coachesList = this.createCoachesList();
    const managersList = this.createManagersList();

    const hasTitleError = title.length === 0;
    const hasOtherEventTypeError =
      type === "OTHER" && otherEventType.length === 0;
    const hasDateError = new Date(date) < new Date(minDate);

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onRequestClose={() => handleClose()}
        transition={<Slide direction="up" />}
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
              Add Event
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
                  eventType === "MATCH" || isOtherEventTypeCompetitive;
                const recurrencePattern = {
                  frequency,
                  numberOfEvents
                };

                const eventInfo = {
                  title,
                  isCompetitive,
                  date,
                  startTime,
                  endTime,
                  type: eventType,
                  additionalInfo: {
                    venue,
                    opponents,
                    homeAway,
                    notes
                  }
                };
                if (hasTitleError || hasOtherEventTypeError || hasDateError) {
                  let errorType = "TITLE";
                  if (hasOtherEventTypeError) errorType = "EVENT_TYPE";
                  if (hasDateError) errorType = "DATE";
                  openAddEventErrorAlert(errorType);
                } else {
                  addEvent(
                    institutionID,
                    eventInfo,
                    recurrencePattern,
                    _.fromPairs(
                      selectedTeams.map(teamID => [teamID, teams[teamID]])
                    ),
                    _.fromPairs(
                      selectedManagers.map(managerID => [
                        managerID,
                        managers[managerID]
                      ])
                    ),
                    _.fromPairs(
                      selectedCoaches.map(coachID => [
                        coachID,
                        coaches[coachID]
                      ])
                    )
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
                          hasOtherEventTypeError ? (
                            "Please specify the event type"
                          ) : (
                            ""
                          )
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
                <FormControl className={classes.formControl}>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    error={hasDateError}
                    helperText={
                      hasDateError ? (
                        "You cannot schedule events in the past"
                      ) : (
                        ""
                      )
                    }
                    onChange={this.handleChange("date")}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
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
                  <InputLabel htmlFor="frequency">Frequency</InputLabel>
                  <Select
                    value={frequency}
                    onChange={this.handleChange("frequency")}
                    input={<Input id="frequency" />}
                  >
                    <MenuItem value="ONCE">Once</MenuItem>
                    <MenuItem value="WEEKLY">Weekly</MenuItem>
                    <MenuItem value="MONTHLY">Monthly</MenuItem>
                  </Select>
                </FormControl>
                {frequency !== "ONCE" && (
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="numberOfEvents"
                      label={
                        frequency === "WEEKLY" ? (
                          "Number of weeks"
                        ) : (
                          "Number of months"
                        )
                      }
                      type="number"
                      value={numberOfEvents}
                      onChange={this.handleChange("numberOfEvents")}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </FormControl>
                )}
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
                frequency === "ONCE" && (
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="opponents"
                        label="Opponents"
                        value={opponents}
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
    );
  }
}

AddEventDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddEventDialog);
