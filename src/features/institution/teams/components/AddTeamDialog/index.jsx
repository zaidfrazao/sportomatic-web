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
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import Avatar from "material-ui/Avatar";
import { CircularProgress } from "material-ui/Progress";

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
  teamNameWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  teamName: {
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

class AddTeamDialog extends Component {
  state = {
    teamName: "U/12 A Cricket Boys",
    ageGroup: 12,
    division: "A",
    sport: "Cricket",
    gender: "Boys",
    selectedManagers: [],
    selectedCoaches: []
  };

  componentWillMount() {
    const { options } = this.props;
    this.initDropDowns(options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.initDropDowns(nextProps.options);
    }
  }

  handleChange = name => event => {
    const update = event.target.value;
    const { ageGroup, division, sport, gender } = this.state;
    const { ageGroups, divisions, sports, genderType } = this.props.options;

    let genderOptions = this.setGenderOptions(ageGroup, genderType);
    if (name === "ageGroup") {
      genderOptions = this.setGenderOptions(update, genderType);
    }

    this.setState({ [name]: event.target.value });
    switch (name) {
      case "ageGroup":
        this.setState({
          teamName: `${ageGroups[update]} ${divisions[division]} ${sports[
            sport
          ]} ${genderOptions[gender]}`
        });
        break;
      case "division":
        this.setState({
          teamName: `${ageGroups[ageGroup]} ${divisions[update]} ${sports[
            sport
          ]} ${genderOptions[gender]}`
        });
        break;
      case "sport":
        this.setState({
          teamName: `${ageGroups[ageGroup]} ${divisions[division]} ${sports[
            update
          ]} ${genderOptions[gender]}`
        });
        break;
      case "gender":
        this.setState({
          teamName: `${ageGroups[ageGroup]} ${divisions[division]} ${sports[
            sport
          ]} ${genderOptions[update]}`
        });
        break;
      default:
        break;
    }
  };

  handleNameUpdate(newName) {
    this.setState({
      teamName: newName
    });
  }

  setGenderOptions(ageGroup, genderType) {
    let genderOptions = {
      MIXED: "Mixed",
      MALE: "Boys",
      FEMALE: "Girls"
    };
    if (ageGroup > 17 || ageGroup === "Open") {
      genderOptions = {
        MIXED: "Mixed",
        MALE: "Men",
        FEMALE: "Women"
      };
      if (genderType === "MALE") {
        genderOptions = { MALE: "Men" };
      } else if (genderType === "FEMALE") {
        genderOptions = { FEMALE: "Women" };
      }
    } else {
      if (genderType === "MALE") {
        genderOptions = { MALE: "Men" };
      } else if (genderType === "FEMALE") {
        genderOptions = { FEMALE: "Women" };
      }
    }

    return genderOptions;
  }

  initDropDowns(options) {
    const { ageGroups, divisions, sports, genderType } = options;
    const genderOptions = this.setGenderOptions(
      _.keys(ageGroups)[0],
      genderType
    );
    this.setState({
      teamName: `${_.values(ageGroups)[0]} ${_.values(divisions)[0]} ${_.values(
        sports
      )[0]} ${_.values(genderOptions)[0]}`,
      ageGroup: _.keys(ageGroups)[0],
      division: _.keys(divisions)[0],
      sport: _.keys(sports)[0],
      gender: _.keys(genderOptions)[0]
    });
  }

  getRelevantCoaches(sport) {
    const { classes, coaches } = this.props;
    const listItems = _.toPairs(coaches)
      .filter(coach => coach[1].preferredSports[sport])
      .map(coach => {
        const id = coach[0];
        const info = coach[1];
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
                checked={this.state.selectedCoaches.indexOf(id) !== -1}
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

  getRelevantManagers(sport) {
    const { classes, managers } = this.props;
    const listItems = _.toPairs(managers)
      .filter(manager => manager[1].preferredSports[sport])
      .map(manager => {
        const id = manager[0];
        const info = manager[1];
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
                checked={this.state.selectedManagers.indexOf(id) !== -1}
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

  handleToggle = (value, type) => {
    const { selectedManagers, selectedCoaches } = this.state;
    const currentIndex =
      type === "MANAGER"
        ? selectedManagers.indexOf(value)
        : selectedCoaches.indexOf(value);
    const newChecked =
      type === "MANAGER" ? [...selectedManagers] : [...selectedCoaches];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (type === "MANAGER") {
      this.setState({
        selectedManagers: newChecked
      });
    } else {
      this.setState({
        selectedCoaches: newChecked
      });
    }
  };

  render() {
    const { classes, isOpen, isLoading } = this.props;
    const { handleClose } = this.props.actions;
    const { ageGroups, divisions, sports, genderType } = this.props.options;
    const { ageGroup, division, sport, gender, teamName } = this.state;
    const genderOptions = this.setGenderOptions(ageGroup, genderType);
    const relevantCoaches = this.getRelevantCoaches(sport);
    const relevantManagers = this.getRelevantManagers(sport);

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
              Add Team
            </Typography>
            <Button color="contrast" onClick={() => handleClose()}>
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
              className={classes.teamNameWrapper}
            >
              <TextField
                label="Team name"
                value={teamName}
                className={classes.teamName}
                onChange={e => this.handleNameUpdate(e.target.value)}
                error={teamName.length === 0}
                helperText={
                  teamName.length === 0 ? "Please provide a team name" : ""
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
                Details
              </Typography>
              <form autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-group">Age group</InputLabel>
                  <Select
                    value={ageGroup}
                    onChange={this.handleChange("ageGroup")}
                    input={<Input id="age-group" />}
                  >
                    {_.toPairs(ageGroups).map(keyValuePair => (
                      <MenuItem value={keyValuePair[0]} key={keyValuePair[0]}>
                        {keyValuePair[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="division">Division</InputLabel>
                  <Select
                    value={division}
                    onChange={this.handleChange("division")}
                    input={<Input id="division" />}
                  >
                    {_.toPairs(divisions).map(keyValuePair => (
                      <MenuItem value={keyValuePair[0]} key={keyValuePair[0]}>
                        {keyValuePair[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="sport">Sport</InputLabel>
                  <Select
                    value={sport}
                    onChange={this.handleChange("sport")}
                    input={<Input id="sport" />}
                  >
                    {_.toPairs(sports).map(keyValuePair => (
                      <MenuItem value={keyValuePair[0]} key={keyValuePair[0]}>
                        {keyValuePair[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    value={gender}
                    onChange={this.handleChange("gender")}
                    input={<Input id="gender" />}
                  >
                    {_.toPairs(genderOptions).map(keyValuePair => (
                      <MenuItem value={keyValuePair[0]} key={keyValuePair[0]}>
                        {keyValuePair[1]}
                      </MenuItem>
                    ))}
                  </Select>
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
                {sports[sport]} Managers
              </Typography>
              {relevantManagers}
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
                {sports[sport]} Coaches
              </Typography>
              {relevantCoaches}
            </Grid>
          </Grid>
        )}
      </Dialog>
    );
  }
}

AddTeamDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddTeamDialog);
