/* eslint-disable array-callback-return */
import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
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
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import Select from "material-ui/Select";
import { withStyles } from "material-ui/styles";
import Button from "../../../../components/Button";

const styles = theme => ({
  additionalInfoWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  basicInfoTextField: {
    margin: 8
  },
  contentWrapper: {
    minWidth: 280,
    maxWidth: 320,
    margin: "0 auto"
  },
  formControl: {
    margin: "16px 0"
  },
  subFormControl: {
    margin: "8px 0"
  }
});

class EditPersonDialog extends Component {
  state = {
    paymentDefaults: {
      type: "N/A",
      rates: {
        standard: 100,
        overtime: 150,
        salary: 6000
      }
    },
    type: {
      coach: false,
      manager: false,
      admin: false
    }
  };

  componentWillMount() {
    const { personInfo, institutionID } = this.props;

    if (personInfo) {
      this.setState({
        paymentDefaults: personInfo.institutions[institutionID].paymentDefaults,
        type: {
          admin:
            personInfo.institutions[institutionID].roles.admin === "APPROVED",
          coach:
            personInfo.institutions[institutionID].roles.coach === "APPROVED",
          manager:
            personInfo.institutions[institutionID].roles.manager === "APPROVED"
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, personInfo, institutionID } = nextProps;

    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }

    if (personInfo !== this.props.personInfo) {
      this.setState({
        paymentDefaults: personInfo.institutions[institutionID].paymentDefaults,
        type: {
          admin:
            personInfo.institutions[institutionID].roles.admin === "APPROVED",
          coach:
            personInfo.institutions[institutionID].roles.coach === "APPROVED",
          manager:
            personInfo.institutions[institutionID].roles.manager === "APPROVED"
        }
      });
    }
  }

  updateType(typeToUpdate, isSelected) {
    const { type } = this.state;

    this.setState({
      type: {
        ...type,
        [typeToUpdate]: isSelected
      }
    });
  }

  changePaymentType(newType) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        type: newType
      }
    });
  }

  updateStandard(standard) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        rates: {
          ...paymentDefaults.rates,
          standard
        }
      }
    });
  }

  updateOvertime(overtime) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        rates: {
          ...paymentDefaults.rates,
          overtime
        }
      }
    });
  }

  updateSalary(salary) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        rates: {
          ...paymentDefaults.rates,
          salary
        }
      }
    });
  }

  resetState() {
    const { personInfo, institutionID } = this.props;

    if (personInfo) {
      this.setState({
        paymentDefaults: personInfo.institutions[institutionID].paymentDefaults,
        type: {
          admin:
            personInfo.institutions[institutionID].roles.admin === "APPROVED",
          coach:
            personInfo.institutions[institutionID].roles.coach === "APPROVED",
          manager:
            personInfo.institutions[institutionID].roles.manager === "APPROVED"
        }
      });
    }
  }

  render() {
    const {
      classes,
      isOpen,
      isLoading,
      personID,
      institutionID,
      isMobile
    } = this.props;
    const { closeModal, editPerson } = this.props.actions;
    const { type, paymentDefaults } = this.state;

    let personInfo = {
      info: {
        profilePictureURL: "",
        name: "Loading...",
        surname: ""
      }
    };
    if (this.props.personInfo) {
      personInfo = this.props.personInfo;
    }

    return (
      <Dialog open={isOpen} fullScreen={isMobile}>
        <DialogTitle>Edit Person's Info</DialogTitle>
        <DialogContent>
          <div className={classes.contentWrapper}>
            <form autoComplete="off">
              <div className={classes.additionalInfoWrapper}>
                {!isLoading && (
                  <FormControl className={classes.formControl}>
                    <FormGroup component="fieldset">
                      <FormLabel component="legend">Select roles</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={type.admin}
                            onChange={(e, isChecked) =>
                              this.updateType("admin", isChecked)}
                            value="admin"
                          />
                        }
                        label="Admin"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={type.coach}
                            onChange={(e, isChecked) => {
                              this.setState({
                                paymentDefaults: {
                                  type: "N/A",
                                  rates: {
                                    standard: 100,
                                    overtime: 150,
                                    salary: 6000
                                  }
                                }
                              });
                              this.updateType("coach", isChecked);
                            }}
                            value="coach"
                          />
                        }
                        label="Coach"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={type.manager}
                            onChange={(e, isChecked) =>
                              this.updateType("manager", isChecked)}
                            value="manager"
                          />
                        }
                        label="Manager"
                      />
                    </FormGroup>
                  </FormControl>
                )}
                {!isLoading &&
                  type.coach && (
                    <FormControl className={classes.formControl}>
                      <FormGroup component="fieldset">
                        <FormLabel component="legend">
                          Specify coach payment settings
                        </FormLabel>
                        <FormControl className={classes.subFormControl}>
                          <InputLabel htmlFor="terms">Terms</InputLabel>
                          <Select
                            native
                            value={paymentDefaults.type}
                            onChange={e =>
                              this.changePaymentType(e.target.value)}
                            input={<Input id="paymentType" />}
                          >
                            <option value="N/A">Not applicable</option>
                            <option value="HOURLY">Paid per hour</option>
                            <option value="MONTHLY">
                              Earns monthly salary
                            </option>
                          </Select>
                        </FormControl>
                        {paymentDefaults.type === "HOURLY" && (
                          <FormControl className={classes.subFormControl}>
                            <InputLabel htmlFor="standardHourlyRate">
                              Standard hourly rate
                            </InputLabel>
                            <Input
                              id="standard"
                              type="number"
                              inputProps={{
                                step: "50",
                                min: "0"
                              }}
                              value={paymentDefaults.rates.standard}
                              onChange={e =>
                                this.updateStandard(parseFloat(e.target.value))}
                              className={classes.basicInfoTextField}
                              startAdornment={
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                        {paymentDefaults.type === "HOURLY" && (
                          <FormControl className={classes.subFormControl}>
                            <InputLabel htmlFor="overtimeHourlyRate">
                              Overtime hourly rate
                            </InputLabel>
                            <Input
                              id="overtime"
                              type="number"
                              inputProps={{
                                step: "50",
                                min: "0"
                              }}
                              value={paymentDefaults.rates.overtime}
                              onChange={e =>
                                this.updateOvertime(parseFloat(e.target.value))}
                              className={classes.basicInfoTextField}
                              startAdornment={
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                        {paymentDefaults.type === "MONTHLY" && (
                          <FormControl className={classes.subFormControl}>
                            <InputLabel htmlFor="monthlySalary">
                              Monthly salary
                            </InputLabel>
                            <Input
                              id="salary"
                              type="number"
                              inputProps={{
                                step: "1000",
                                min: "0"
                              }}
                              value={paymentDefaults.rates.salary}
                              onChange={e =>
                                this.updateSalary(parseFloat(e.target.value))}
                              className={classes.basicInfoTextField}
                              startAdornment={
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                      </FormGroup>
                    </FormControl>
                  )}
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            colour="primary"
            slim
            handleClick={() => {
              closeModal();
              this.resetState();
            }}
          >
            Cancel
          </Button>
          <Button
            loading={isLoading || !(type.admin || type.coach || type.manager)}
            colour="primary"
            slim
            filled
            handleClick={() => {
              editPerson(personID, {
                ...personInfo,
                institutions: {
                  ...personInfo.institutions,
                  [institutionID]: {
                    roles: {
                      admin: type.admin ? "APPROVED" : "N/A",
                      coach: type.coach ? "APPROVED" : "N/A",
                      manager: type.manager ? "APPROVED" : "N/A"
                    },
                    paymentDefaults,
                    status: "STAFF"
                  }
                }
              });
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EditPersonDialog);
