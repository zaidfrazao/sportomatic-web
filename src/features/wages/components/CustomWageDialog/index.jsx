/* eslint-disable array-callback-return */
import React, { Component } from "react";
import accounting from "accounting";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { FormControl } from "material-ui/Form";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  additionalInfoWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  basicInfoTextField: {
    margin: 8
  },
  calculatedWage: {
    width: "100%",
    margin: "16px 0",
    textAlign: "center"
  },
  contentWrapper: {
    minWidth: 280,
    maxWidth: 320,
    margin: "0 auto"
  },
  formControl: {
    margin: "16px 0"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  subFormControl: {
    margin: "8px 0"
  }
});

class CustomWageDialog extends Component {
  state = {
    type: "HOURLY",
    fixed: 500,
    deduction: 500,
    details: "",
    hours: {
      standard: 1,
      overtime: 0
    },
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

  changeType(newType) {
    this.setState({
      type: newType
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

  updateFixedAmount(amount) {
    this.setState({
      fixed: amount
    });
  }

  updateDeductionAmount(amount) {
    this.setState({
      deduction: amount
    });
  }

  updateDetails(newDetails) {
    this.setState({
      details: newDetails
    });
  }

  updateStandardHoursWorked(newHours) {
    const { hours } = this.state;

    this.setState({
      hours: {
        ...hours,
        standard: newHours
      }
    });
  }

  updateOvertimeHoursWorked(newHours) {
    const { hours } = this.state;

    this.setState({
      hours: {
        ...hours,
        overtime: newHours
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
      coachID,
      institutionID,
      coachName,
      isLoading
    } = this.props;
    const { closeDialog, logCustomWage } = this.props.actions;
    const {
      paymentDefaults,
      type,
      deduction,
      fixed,
      hours,
      details
    } = this.state;

    const calculatedWage =
      hours.standard * paymentDefaults.rates.standard +
      hours.overtime * paymentDefaults.rates.overtime;

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        transition={this.state.Transition}
      >
        <DialogTitle>{`Add Custom Wage for ${coachName}`}</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <div className={classes.contentWrapper}>
              <form autoComplete="off">
                <div className={classes.additionalInfoWrapper}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                      native
                      value={type}
                      onChange={e => this.changeType(e.target.value)}
                      input={<Input id="type" />}
                    >
                      <option value="HOURLY">Hour-based addition</option>
                      <option value="FIXED">Fixed addition</option>
                      <option value="DEDUCTION">Fixed deduction</option>
                    </Select>
                  </FormControl>
                  <p>Please enter the reason for the wage entry:</p>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="details" shrink>
                      Details
                    </InputLabel>
                    <Input
                      id="details"
                      value={details}
                      onChange={e => this.updateDetails(e.target.value)}
                      className={classes.basicInfoTextField}
                      placeholder="e.g. Helped out at the weekend clinic"
                    />
                  </FormControl>
                  {type === "HOURLY" && (
                    <p>Please enter complete the following fields:</p>
                  )}
                  {type === "HOURLY" && (
                    <FormControl className={classes.formControl}>
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
                  {type === "HOURLY" && (
                    <FormControl className={classes.formControl}>
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
                  {type === "HOURLY" && (
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="standardHoursWorked">
                        Standard hours worked
                      </InputLabel>
                      <Input
                        id="standardHours"
                        type="number"
                        inputProps={{
                          step: "1",
                          min: "0"
                        }}
                        value={hours.standard}
                        onChange={e =>
                          this.updateStandardHoursWorked(
                            parseFloat(e.target.value)
                          )}
                        className={classes.basicInfoTextField}
                        endAdornment={
                          <InputAdornment position="end">hrs</InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                  {type === "HOURLY" && (
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="overtimeHoursWorked">
                        Overtime hours worked
                      </InputLabel>
                      <Input
                        id="overtimeHours"
                        type="number"
                        inputProps={{
                          step: "1",
                          min: "0"
                        }}
                        value={hours.overtime}
                        onChange={e =>
                          this.updateOvertimeHoursWorked(
                            parseFloat(e.target.value)
                          )}
                        className={classes.basicInfoTextField}
                        endAdornment={
                          <InputAdornment position="end">hrs</InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                  {type === "HOURLY" && (
                    <Typography
                      type="title"
                      component="p"
                      className={classes.calculatedWage}
                    >
                      {accounting.formatMoney(calculatedWage, "R")}
                    </Typography>
                  )}
                  {type === "FIXED" && <p>Please enter an amount add:</p>}
                  {type === "FIXED" && (
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="fixedAmount">Amount</InputLabel>
                      <Input
                        id="fixedAmount"
                        type="number"
                        inputProps={{
                          step: "100",
                          min: "0"
                        }}
                        value={fixed}
                        onChange={e =>
                          this.updateFixedAmount(parseFloat(e.target.value))}
                        className={classes.basicInfoTextField}
                        startAdornment={
                          <InputAdornment position="start">R</InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                  {type === "DEDUCTION" && (
                    <p>Please enter an amount to deduct:</p>
                  )}
                  {type === "DEDUCTION" && (
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="deductionAmount">Amount</InputLabel>
                      <Input
                        id="deductionAmount"
                        type="number"
                        inputProps={{
                          step: "100",
                          min: "0"
                        }}
                        value={deduction}
                        onChange={e =>
                          this.updateDeductionAmount(
                            parseFloat(e.target.value)
                          )}
                        className={classes.basicInfoTextField}
                        startAdornment={
                          <InputAdornment position="start">R</InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                </div>
              </form>
            </div>
          )}
        </DialogContent>
        {!isLoading && (
          <DialogActions>
            <Button
              onClick={() => {
                closeDialog();
                this.resetState();
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                const rates = {
                  overtime: paymentDefaults.rates.overtime,
                  salary: paymentDefaults.rates.salary,
                  standard: paymentDefaults.rates.standard
                };
                const formattedHours = {
                  exceededMaxOvertimeHours: false,
                  overtime: hours.overtime,
                  standard: hours.standard
                };
                let wage = calculatedWage;
                if (type === "FIXED") {
                  wage = fixed;
                } else if (type === "DEDUCTION") {
                  wage = -deduction;
                }

                logCustomWage(
                  coachID,
                  institutionID,
                  rates,
                  formattedHours,
                  type,
                  wage,
                  details
                );
              }}
            >
              Log wage
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

export default withStyles(styles)(CustomWageDialog);
