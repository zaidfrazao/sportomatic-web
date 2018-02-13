/* eslint-disable array-callback-return */
import React, { Component } from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { FormControl, FormGroup, FormLabel } from "material-ui/Form";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
import { withStyles } from "material-ui/styles";

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

class AcceptCoachModal extends Component {
  state = {
    paymentDefaults: {
      type: "HOURLY",
      rates: {
        standard: 100,
        overtime: 150,
        salary: 6000
      }
    },
    Transition: props => <Slide direction="up" {...props} />
  };

  componentWillMount() {
    const { paymentDefaults } = this.props;

    this.setState({
      paymentDefaults: {
        type: paymentDefaults.type,
        rates: paymentDefaults.rates
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, paymentDefaults } = nextProps;

    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }

    if (paymentDefaults !== this.props.paymentDefaults) {
      this.setState({
        paymentDefaults: {
          type: paymentDefaults.type,
          rates: paymentDefaults.rates
        }
      });
    }
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
    const { paymentDefaults } = this.props;

    this.setState({
      paymentDefaults: {
        type: paymentDefaults.type,
        rates: paymentDefaults.rates
      }
    });
  }

  render() {
    const {
      classes,
      isOpen,
      isMobile,
      applicantID,
      institutionID,
      roles
    } = this.props;
    const { closeModal, approvePerson } = this.props.actions;
    const { paymentDefaults } = this.state;

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        transition={this.state.Transition}
      >
        <DialogTitle>Accept Person</DialogTitle>
        <DialogContent>
          <div className={classes.contentWrapper}>
            <form autoComplete="off">
              <div className={classes.additionalInfoWrapper}>
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
                        onChange={e => this.changePaymentType(e.target.value)}
                        input={<Input id="paymentType" />}
                      >
                        <option value="N/A">Not applicable</option>
                        <option value="HOURLY">Paid per hour</option>
                        <option value="MONTHLY">Earns monthly salary</option>
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
                            <InputAdornment position="start">R</InputAdornment>
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
                            <InputAdornment position="start">R</InputAdornment>
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
                            <InputAdornment position="start">R</InputAdornment>
                          }
                        />
                      </FormControl>
                    )}
                  </FormGroup>
                </FormControl>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeModal();
              this.resetState();
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              approvePerson(applicantID, institutionID, paymentDefaults, roles);
              closeModal();
            }}
          >
            Accept application
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AcceptCoachModal);
