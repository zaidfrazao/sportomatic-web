/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from "material-ui/Form";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import LeaveIcon from "material-ui-icons/Clear";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import MaskedInput from "react-text-mask";
import Radio, { RadioGroup } from "material-ui/Radio";
import Select from "material-ui/Select";
import Switch from "material-ui/Switch";
import TextField from "material-ui/TextField";
import { withStyles } from "material-ui/styles";
import defaultEmblem from "../../images/default-emblem.jpg";
import { isValidEmail } from "../../../../utils/validation";

const styles = {
  button: {
    margin: 8
  },
  buttonsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 8,
    maring: 8,
    backgroundColor: grey[200]
  },
  divisionsSelector: {
    margin: 8
  },
  divisionsSelectorWrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  formControl: {
    marginBottom: 24,
    minWidth: 240
  },
  formWrapper: {
    width: 260,
    display: "flex",
    flexDirection: "column"
  },
  subFormControl: {
    margin: "8px 0"
  }
};

class TextMaskCustom extends Component {
  render() {
    const { inputRef, ...other } = this.props;

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[
          "(",
          /[0-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }
}

class ManageInstitutionsDialog extends Component {
  state = {
    page: "HOME",
    institutionToJoin: "",
    selectedRoles: {
      admin: false,
      coach: false,
      manager: false
    },
    name: "",
    abbreviation: "",
    publicEmail: "",
    phoneNumber: "(   )    -    ",
    physicalAddress: "",
    type: "High School",
    gender: "MIXED",
    sports: {
      Aerobatics: false,
      Athletics: true,
      "Australian Rules Football": false,
      Basketball: false,
      Boxing: false,
      Canoeing: false,
      Chess: true,
      Cricket: true,
      "Cross Country": true,
      Cycling: false,
      Debating: false,
      Equestrian: false,
      "Field Hockey": true,
      Golf: false,
      Gymnastics: false,
      "Major Production": false,
      "Mind Sports": false,
      "Mixed Martial Arts": false,
      "Motor Sports": false,
      Netball: true,
      "Public Speaking": false,
      Rugby: true,
      Sailing: false,
      "Skydiving and Parachuting": false,
      "Obstacle Course Racing": false,
      "Soccer / Footbal": true,
      Surfing: false,
      Swimming: true,
      "Table Tennis": false,
      Tennis: true,
      Triathlon: false,
      Waterpolo: false,
      Other: false
    },
    ageGroups: {
      from: 6,
      to: 19,
      includeOpen: true
    },
    divisions: {
      letters: {
        hasLetters: true,
        to: "D"
      },
      numbers: {
        hasNumbers: true,
        to: "3rd"
      }
    },
    paymentDefaults: {
      maxOvertimeHours: 3,
      payDay: {
        day: 1,
        isEndOfTheMonth: false
      },
      rates: {
        overtime: 150,
        standard: 100,
        salary: 6000
      },
      type: "HOURLY"
    },
    permissions: {
      coaches: {
        events: {
          canCancel: false,
          canCreate: false,
          canEdit: false
        },
        results: {
          canApprove: false,
          canEdit: true
        },
        teams: {
          canEdit: false
        }
      },
      managers: {
        events: {
          canCancel: true,
          canCreate: false,
          canEdit: true
        },
        teams: {
          canEdit: false
        },
        wages: {
          canCreate: false,
          canEdit: false,
          canView: false
        }
      }
    },
    errors: {
      name: {
        hasError: false,
        message: ""
      },
      abbreviation: {
        hasError: false,
        message: ""
      },
      publicEmail: {
        hasError: false,
        message: ""
      },
      phoneNumber: {
        hasError: false,
        message: ""
      },
      physicalAddress: {
        hasError: false,
        message: ""
      },
      type: {
        hasError: false,
        message: ""
      }
    }
  };

  updatePage(newPage) {
    this.setState({
      page: newPage
    });
  }

  updateField(newValue, fieldName) {
    this.setState({
      [fieldName]: newValue
    });
  }

  validateField(value, fieldName) {
    const { errors } = this.state;
    let hasError = false;
    let message = "";

    switch (fieldName) {
      case "name":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide the institution's full name";
        } else if (value.length > 64) {
          hasError = true;
          message = "Max. 64 characters allowed";
        }
        break;
      case "abbreviation":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide the institution's abbreviation";
        } else if (value.length > 10) {
          hasError = true;
          message = "Max. 10 characters allowed";
        }
        break;
      case "publicEmail":
        if (value.length === 0) {
          hasError = true;
          message =
            "Please provide the email address used to contact the institution";
        } else if (value.length > 36) {
          hasError = true;
          message = "Max. 36 characters allowed";
        } else if (!isValidEmail(value)) {
          hasError = true;
          message = "This is not a valid email address";
        }
        break;
      case "phoneNumber":
        if (value === "(   )    -    ") {
          hasError = true;
          message = "Please provide a phone number";
        } else if (value.length > 36) {
          hasError = true;
          message = "Max. 36 characters allowed";
        }
        break;
      case "physicalAddress":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide a physical address";
        } else if (value.length > 128) {
          hasError = true;
          message = "Max. 128 characters allowed";
        }
        break;
      default:
        hasError = false;
        message = "";
        break;
    }

    this.setState({
      errors: {
        ...errors,
        [fieldName]: {
          hasError,
          message
        }
      }
    });
  }

  updateRoles(role, state) {
    const { selectedRoles } = this.state;
    this.setState({
      selectedRoles: {
        ...selectedRoles,
        [role]: state
      }
    });
  }

  renderHomePage() {
    const { classes, isOpen, isMobile, institutions, userID } = this.props;
    const { closeDialog, loadVerifiedInstitutions } = this.props.actions;

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        onRequestClose={() => closeDialog()}
      >
        <DialogTitle>Manage Institutions</DialogTitle>
        <DialogContent>
          <div className={classes.buttonsWrapper}>
            <Button
              className={classes.button}
              onClick={() => {
                loadVerifiedInstitutions();
                this.updatePage("JOIN");
              }}
            >
              Join an institution
            </Button>
            <Button
              className={classes.button}
              onClick={() => this.updatePage("CREATE")}
            >
              Create an institution
            </Button>
          </div>
          <List>
            {_.toPairs(institutions).map(([id, info]) => {
              return (
                <ListItem key={id}>
                  <Avatar
                    src={
                      info.info.emblemURL === ""
                        ? defaultEmblem
                        : info.info.emblemURL
                    }
                  />
                  <ListItemText
                    primary={info.info.name}
                    secondary={
                      info.metadata.status === "REQUESTED"
                        ? "Awaiting approval"
                        : ""
                    }
                  />
                  {id !== userID &&
                    info.metadata.status === "ACTIVE" && (
                      <ListItemSecondaryAction>
                        <IconButton aria-label="leave institution">
                          <LeaveIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderJoinPage() {
    const {
      classes,
      isOpen,
      isMobile,
      isLoading,
      verifiedInstitutions,
      institutions,
      userID
    } = this.props;
    const { joinInstitution } = this.props.actions;
    const { institutionToJoin, selectedRoles } = this.state;

    let listItems = [];
    _.toPairs(verifiedInstitutions).map(([id, info]) => {
      if (!_.keys(institutions).includes(id) && info.info.type !== "Personal") {
        listItems.push(
          <ListItem
            key={id}
            button
            onClick={() =>
              this.setState({
                institutionToJoin: id
              })}
          >
            <Avatar
              src={
                info.info.emblemURL === "" ? defaultEmblem : info.info.emblemURL
              }
            />
            <ListItemText primary={info.info.name} />
          </ListItem>
        );
      }
    });

    if (institutionToJoin === "") {
      return (
        <Dialog open={isOpen} fullScreen={isMobile}>
          <DialogTitle>Join Institution</DialogTitle>
          <DialogContent>
            {isLoading ? (
              <CircularProgress />
            ) : listItems.length > 0 ? (
              listItems
            ) : (
              <ListItem>
                <ListItemText primary="No verified institutions available" />
              </ListItem>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.updatePage("HOME")}>Back</Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={isOpen} fullScreen={isMobile}>
          <DialogTitle>Join Institution</DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <FormGroup component="fieldset">
                <FormLabel component="legend">Select desired roles:</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRoles.admin}
                      onChange={(e, isChecked) =>
                        this.updateRoles("admin", isChecked)}
                      value="admin"
                    />
                  }
                  label="Admin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRoles.coach}
                      onChange={(e, isChecked) =>
                        this.updateRoles("coach", isChecked)}
                      value="coach"
                    />
                  }
                  label="Coach"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRoles.manager}
                      onChange={(e, isChecked) =>
                        this.updateRoles("manager", isChecked)}
                      value="manager"
                    />
                  }
                  label="Manager"
                />
              </FormGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({
                  institutionToJoin: "",
                  selectedRoles: {
                    admin: false,
                    coach: false,
                    manager: false
                  }
                })}
            >
              Back
            </Button>
            <Button
              disabled={
                !selectedRoles.admin &&
                !selectedRoles.coach &&
                !selectedRoles.manager
              }
              color="primary"
              onClick={() =>
                joinInstitution(userID, institutionToJoin, {
                  admin: selectedRoles.admin ? "REQUESTED" : "N/A",
                  coach: selectedRoles.coach ? "REQUESTED" : "N/A",
                  manager: selectedRoles.manager ? "REQUESTED" : "N/A"
                })}
            >
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                "Apply to institution"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }

  renderCreatePage() {
    const { classes, isOpen, isMobile, userID, isLoading } = this.props;
    const { createInstitution } = this.props.actions;
    const {
      errors,
      name,
      abbreviation,
      phoneNumber,
      physicalAddress,
      publicEmail,
      type,
      gender,
      sports,
      ageGroups,
      divisions,
      permissions,
      paymentDefaults
    } = this.state;

    return (
      <Dialog open={isOpen} fullScreen={isMobile}>
        <DialogTitle>Create Institution</DialogTitle>
        <DialogContent>
          <form autoComplete="off" className={classes.formWrapper}>
            <TextField
              label="Name"
              value={name}
              error={errors["name"].hasError}
              placeholder="Sportomatic Academy"
              onChange={e => this.updateField(e.target.value, "name")}
              onBlur={e => this.validateField(e.target.value, "name")}
              helperText={errors["name"].message}
              className={classes.formControl}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Abbreviation"
              value={abbreviation}
              error={errors["abbreviation"].hasError}
              placeholder="SA"
              onChange={e => this.updateField(e.target.value, "abbreviation")}
              onBlur={e => this.validateField(e.target.value, "abbreviation")}
              helperText={errors["abbreviation"].message}
              className={classes.formControl}
              InputLabelProps={{
                shrink: true
              }}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="phoneNumber" shrink>
                Phone number
              </InputLabel>
              <Input
                value={phoneNumber}
                inputComponent={TextMaskCustom}
                onChange={e => this.updateField(e.target.value, "phoneNumber")}
                onBlur={e => this.validateField(e.target.value, "phoneNumber")}
                className={classes.input}
                inputProps={{
                  "aria-label": "phone number"
                }}
              />
            </FormControl>
            <TextField
              label="Physical address"
              value={physicalAddress}
              error={errors["physicalAddress"].hasError}
              placeholder="1 Streetname Road, Suburb, City"
              onChange={e =>
                this.updateField(e.target.value, "physicalAddress")}
              onBlur={e =>
                this.validateField(e.target.value, "physicalAddress")}
              helperText={errors["physicalAddress"].message}
              className={classes.formControl}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Public email address"
              value={publicEmail}
              error={errors["publicEmail"].hasError}
              placeholder="info@sportomaticapp.com"
              onChange={e => this.updateField(e.target.value, "publicEmail")}
              onBlur={e => this.validateField(e.target.value, "publicEmail")}
              helperText={errors["publicEmail"].message}
              className={classes.formControl}
              InputLabelProps={{
                shrink: true
              }}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="typeSelection" shrink>
                Institution type
              </InputLabel>
              <Select
                native
                value={type}
                onChange={e => this.updateField(e.target.value, "type")}
                input={<Input id="type" />}
              >
                <option value="High School">High School</option>
                <option value="Primary School">Primary School</option>
                <option value="College">College</option>
                <option value="Sports Academy">Sports Academy</option>
                <option value="Sports Club">Sports Club</option>
                <option value="Sports Academy">Sports Academy</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Athlete Genders</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={e => this.updateField(e.target.value, "gender")}
              >
                <FormControlLabel
                  value="MIXED"
                  control={<Radio />}
                  label="Males and females"
                />
                <FormControlLabel
                  value="MALE"
                  control={<Radio />}
                  label="All males"
                />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="All females"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Athlete Age Groups</FormLabel>
              <FormControl className={classes.subFormControl}>
                <InputLabel htmlFor="startAge">From</InputLabel>
                <Input
                  value={ageGroups.from}
                  type="number"
                  onChange={e =>
                    this.setState({
                      ageGroups: {
                        ...ageGroups,
                        from: parseInt(e.target.value, 10)
                      }
                    })}
                  inputProps={{
                    min: "4",
                    max: `${ageGroups.to}`
                  }}
                  startAdornment={
                    <InputAdornment position="start">U/</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={classes.subFormControl}>
                <InputLabel htmlFor="endAge">To</InputLabel>
                <Input
                  value={ageGroups.to}
                  type="number"
                  onChange={e =>
                    this.setState({
                      ageGroups: {
                        ...ageGroups,
                        to: parseInt(e.target.value, 10)
                      }
                    })}
                  inputProps={{
                    min: `${ageGroups.from}`,
                    max: "30"
                  }}
                  startAdornment={
                    <InputAdornment position="start">U/</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={classes.subFormControl}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ageGroups.includeOpen}
                      onChange={e =>
                        this.setState({
                          ageGroups: {
                            ...ageGroups,
                            includeOpen: e.target.checked
                          }
                        })}
                    />
                  }
                  label="Include an &quot;Open&quot; age group"
                />
              </FormControl>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Team Divisions</FormLabel>
              <FormControl className={classes.subFormControl}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={divisions.letters.hasLetters}
                      onChange={(event, checked) =>
                        this.setState({
                          divisions: {
                            ...divisions,
                            letters: {
                              ...divisions.letters,
                              hasLetters: checked
                            }
                          }
                        })}
                    />
                  }
                  label="Divisions have letter names"
                />
                {divisions.letters.hasLetters && (
                  <div className={classes.divisionsSelectorWrapper}>
                    <span>From A to </span>
                    <Select
                      native
                      value={divisions.letters.to}
                      onChange={e =>
                        this.setState({
                          divisions: {
                            ...divisions,
                            letters: {
                              ...divisions.letters,
                              to: e.target.value
                            }
                          }
                        })}
                      input={<Input id="letterDivisions" />}
                      className={classes.divisionsSelector}
                    >
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                      <option value="H">H</option>
                      <option value="I">I</option>
                      <option value="J">J</option>
                      <option value="K">K</option>
                      <option value="L">L</option>
                      <option value="M">M</option>
                      <option value="N">N</option>
                    </Select>
                    <span> team</span>
                  </div>
                )}
              </FormControl>
              <FormControl className={classes.subFormControl}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={divisions.numbers.hasNumbers}
                      onChange={(event, checked) =>
                        this.setState({
                          divisions: {
                            ...divisions,
                            numbers: {
                              ...divisions.numbers,
                              hasNumbers: checked
                            }
                          }
                        })}
                    />
                  }
                  label="Divisions have number names"
                />
                {divisions.numbers.hasNumbers && (
                  <div className={classes.divisionsSelectorWrapper}>
                    <span>{"From 1st to "}</span>
                    <Select
                      native
                      value={divisions.numbers.to}
                      onChange={e => {
                        this.setState({
                          divisions: {
                            ...divisions,
                            numbers: {
                              ...divisions.numbers,
                              to: e.target.value
                            }
                          }
                        });
                      }}
                      input={<Input id="numberDivisions" />}
                      className={classes.divisionsSelector}
                    >
                      <option value="2nd">{"2nd"}</option>
                      <option value="3rd">{"3rd"}</option>
                      <option value="4th">{"4th"}</option>
                      <option value="5th">{"5th"}</option>
                      <option value="6th">{"6th"}</option>
                      <option value="7th">{"7th"}</option>
                      <option value="8th">{"8th"}</option>
                      <option value="9th">{"9th"}</option>
                    </Select>
                    <span>{" team"}</span>
                  </div>
                )}
              </FormControl>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Sports</FormLabel>
              {_.toPairs(sports).map(([sport, checked]) => {
                return (
                  <FormControlLabel
                    key={sport}
                    value={sport}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={e =>
                          this.setState({
                            sports: {
                              ...sports,
                              [sport]: e.target.checked
                            }
                          })}
                        value={sport}
                      />
                    }
                    label={sport}
                  />
                );
              })}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.updatePage("HOME")}>Back</Button>
          <Button
            disabled={isLoading}
            color="primary"
            onClick={() => {
              const possibleDivisions = [
                "1st Team",
                "2nd Team",
                "3rd Team",
                "4th Team",
                "5th Team",
                "6th Team",
                "7th Team",
                "8th Team",
                "9th Team",
                "A Team",
                "B Team",
                "C Team",
                "D Team",
                "E Team",
                "F Team",
                "G Team",
                "H Team",
                "I Team",
                "J Team",
                "K Team",
                "L Team",
                "M Team",
                "N Team"
              ];
              const maxNumberDivisionIndex = _.indexOf(
                possibleDivisions,
                `${divisions.numbers.to} Team`
              );
              const maxLetterDivisionIndex = _.indexOf(
                possibleDivisions,
                `${divisions.letters.to} Team`
              );

              let dbDivisions = [];
              possibleDivisions.map((division, index) => {
                if (index < 9) {
                  if (
                    divisions.numbers.hasNumbers &&
                    maxNumberDivisionIndex >= index
                  ) {
                    dbDivisions.push(division);
                  }
                } else {
                  if (
                    divisions.letters.hasLetters &&
                    maxLetterDivisionIndex >= index
                  ) {
                    dbDivisions.push(division);
                  }
                }
              });

              let dbAgeGroups = [];
              if (ageGroups.includeOpen) {
                dbAgeGroups.push("Open");
              }
              for (let i = ageGroups.from; i <= ageGroups.to; i++) {
                dbAgeGroups.push(i);
              }

              let dbSports = [];
              _.toPairs(sports).map(([sport, isSelected]) => {
                if (isSelected) {
                  dbSports.push(sport);
                }
              });

              createInstitution({
                paymentDefaults,
                permissions,
                completeness: {
                  hasEvents: false,
                  hasHours: false,
                  hasPeople: false,
                  hasResults: false,
                  hasTeams: false,
                  hasWages: false
                },
                info: {
                  abbreviation,
                  name,
                  phoneNumber,
                  physicalAddress,
                  publicEmail,
                  type,
                  gender,
                  ageGroups: dbAgeGroups,
                  divisions: dbDivisions,
                  sports: dbSports,
                  emblemURL: ""
                },
                metadata: {
                  creationDate: new Date(Date.now()),
                  createdBy: userID,
                  status: "ACTIVE"
                }
              });
            }}
          >
            {isLoading ? <CircularProgress size={20} /> : "Create institution"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const { page } = this.state;

    switch (page) {
      case "HOME":
        return this.renderHomePage();
      case "JOIN":
        return this.renderJoinPage();
      case "CREATE":
        return this.renderCreatePage();
      default:
        return this.renderHomePage();
    }
  }
}

export default withStyles(styles)(ManageInstitutionsDialog);
