/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AddIcon from "material-ui-icons/Add";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { FormControl } from "material-ui/Form";
import { grey } from "material-ui/colors";
import Input, { InputLabel } from "material-ui/Input";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
import TextField from "material-ui/TextField";
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
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mainContent: {
    height: "100%",
    width: "100%",
    overflow: "auto"
  },
  section: {
    border: `1px solid ${grey[300]}`,
    margin: "24px 0"
  },
  subheading: {
    width: "100%",
    textAlign: "center",
    margin: "24px 0"
  },
  teamName: {
    margin: 24,
    fontSize: "1.4rem"
  },
  teamNameWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  teamWrapper: {
    backgroundColor: grey[100],
    padding: 16,
    margin: 24,
    border: `1px solid ${grey[200]}`
  }
};

class AddTeamDialog extends Component {
  state = {
    teamName: "U/12 A Cricket Boys",
    ageGroup: 12,
    division: "A",
    sport: "Cricket",
    gender: "Boys",
    selectedManagers: {},
    selectedCoaches: {},
    Transition: props => <Slide direction="up" {...props} />
  };

  componentWillMount() {
    const { options } = this.props;
    this.initDropDowns(options);
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (nextProps.options !== this.props.options) {
      this.initDropDowns(nextProps.options);
    }
    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }
  }

  resetState() {
    this.setState({
      teamName: "U/12 A Cricket Boys",
      ageGroup: 12,
      division: "A",
      sport: "Cricket",
      gender: "Boys",
      selectedManagers: {},
      selectedCoaches: {}
    });
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
        genderOptions = { MALE: "Boys" };
      } else if (genderType === "FEMALE") {
        genderOptions = { FEMALE: "Girls" };
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
      institutionID,
      coaches,
      managers,
      isMobile
    } = this.props;
    const { handleClose, addTeam, openTeamErrorAlert } = this.props.actions;
    const { ageGroups, divisions, sports, genderType } = this.props.options;
    const {
      ageGroup,
      division,
      sport,
      gender,
      teamName,
      selectedCoaches,
      selectedManagers
    } = this.state;

    let genderOptions = <div />;
    let coachesList = <div />;
    let managersList = <div />;

    if (!isLoading) {
      genderOptions = this.setGenderOptions(ageGroup, genderType);
    }
    coachesList = this.createCoachesList();
    managersList = this.createManagersList();

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        transition={this.state.Transition}
      >
        <DialogTitle>Add New Team</DialogTitle>
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
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-group">Age group</InputLabel>
                    <Select
                      native
                      value={ageGroup}
                      onChange={this.handleChange("ageGroup")}
                      input={<Input id="age-group" />}
                    >
                      {_.toPairs(ageGroups).map(keyValuePair => (
                        <option value={keyValuePair[0]} key={keyValuePair[0]}>
                          {keyValuePair[1]}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="division">Division</InputLabel>
                    <Select
                      native
                      value={division}
                      onChange={this.handleChange("division")}
                      input={<Input id="division" />}
                    >
                      {_.toPairs(divisions).map(keyValuePair => (
                        <option value={keyValuePair[0]} key={keyValuePair[0]}>
                          {keyValuePair[1]}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="sport">Sport</InputLabel>
                    <Select
                      native
                      value={sport}
                      onChange={this.handleChange("sport")}
                      input={<Input id="sport" />}
                    >
                      {_.toPairs(sports).map(keyValuePair => (
                        <option value={keyValuePair[0]} key={keyValuePair[0]}>
                          {keyValuePair[1]}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select
                      native
                      value={gender}
                      onChange={this.handleChange("gender")}
                      input={<Input id="gender" />}
                    >
                      {_.toPairs(genderOptions).map(keyValuePair => (
                        <option value={keyValuePair[0]} key={keyValuePair[0]}>
                          {keyValuePair[1]}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </form>
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
                      _.keys(coaches).length === _.keys(selectedCoaches).length
                    }
                    aria-label="add coach"
                    onClick={() => this.addCoach(_.keys(coaches).length)}
                  >
                    <AddIcon /> Add coach
                  </Button>
                </div>
              </div>
              <div className={classes.teamNameWrapper}>
                <TextField
                  label="Team name"
                  value={teamName}
                  multiline
                  rows={teamName.length > 24 ? "2" : "1"}
                  className={classes.teamName}
                  onChange={e => this.handleNameUpdate(e.target.value)}
                  error={teamName.length === 0}
                  helperText={
                    teamName.length === 0 ? "Please provide a team name" : ""
                  }
                />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button colour="primary" slim handleClick={() => handleClose()}>
            Cancel
          </Button>
          <Button
            loading={isLoading}
            colour="primary"
            slim
            filled
            handleClick={() => {
              if (teamName.length === 0) {
                openTeamErrorAlert("TITLE");
              } else {
                const teamManagers = _.fromPairs(
                  _.keys(selectedManagers).map(managerID => [managerID, true])
                );
                const teamCoaches = _.fromPairs(
                  _.keys(selectedCoaches).map(coachID => [coachID, true])
                );
                addTeam(
                  institutionID,
                  {
                    ageGroup,
                    division,
                    sport,
                    gender,
                    name: teamName
                  },
                  teamManagers,
                  teamCoaches
                );
              }
            }}
          >
            Add team
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddTeamDialog);
