/* eslint-disable array-callback-return */
import React, { Component } from "react";
import BackIcon from "material-ui-icons/ArrowBack";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import { CircularProgress } from "material-ui/Progress";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from "material-ui/Form";
import { grey } from "material-ui/colors";
import Grid from "material-ui/Grid";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";
import Select from "material-ui/Select";
import Switch from "material-ui/Switch";
import TextField from "material-ui/TextField";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 24
  },
  bold: {
    fontWeight: "bold",
    color: grey[600]
  },
  button: {
    width: "100%"
  },
  contentWrapper: {
    "@media (min-width: 1200px)": {
      width: 1200,
      margin: "0 auto"
    }
  },
  flexGrow: {
    flexGrow: 2
  },
  formControl: {
    margin: "16px 0",
    width: 200
  },
  heading: {
    fontWeight: "normal",
    fontSize: "1.2rem",
    padding: "20px 0",
    margin: 0,
    width: "100%",
    textAlign: "center",
    backgroundColor: grey[700],
    color: grey[50],
    borderBottom: `1px solid ${grey[200]}`
  },
  iconAdjacentText: {
    marginRight: 8
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`
  },
  message: {
    border: `1px solid ${grey[300]}`,
    padding: 16,
    maxWidth: 970,
    margin: "24px auto 0 auto",
    textAlign: "center",
    color: grey[500]
  },
  noItems: {
    textAlign: "center"
  },
  picture: {
    backgroundColor: grey[300],
    width: 240,
    height: "auto",
    margin: 24
  },
  pictureWrapper: {
    padding: 16,
    height: "calc(100% - 32px)",
    backgroundColor: grey[50],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${grey[200]}`
  },
  outerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  section: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  sectionContent: {
    padding: 24,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  wrapper: {
    padding: 24
  }
});

class InstitutionInfo extends Component {
  state = {
    paymentDefaults: {
      maxOvertimeHours: 3,
      payDay: {
        day: 1,
        isEndOfTheMonth: false
      },
      rates: {
        overtime: 150,
        salary: 6000,
        standard: 100
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
      maxOvertimeHours: {
        hasError: false,
        message: ""
      },
      payDay: {
        hasError: false,
        message: ""
      },
      overtimeRate: {
        hasError: false,
        message: ""
      },
      standardRate: {
        hasError: false,
        message: ""
      },
      salary: {
        hasError: false,
        message: ""
      }
    }
  };

  componentWillMount() {
    const { info } = this.props;

    if (info) {
      this.setState({
        paymentDefaults: info.paymentDefaults,
        permissions: info.permissions
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { info } = nextProps;

    if (info !== this.props.info && info) {
      this.setState({
        paymentDefaults: info.paymentDefaults,
        permissions: info.permissions
      });
    }
  }

  updatePaymentDefaults(newValue, fieldName) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        [fieldName]: newValue
      }
    });
  }

  updatePermissions(newValue, fieldName, role, category) {
    const { permissions } = this.state;

    this.setState({
      permissions: {
        ...permissions,
        [role]: {
          ...permissions[role],
          [category]: {
            ...permissions[role][category],
            [fieldName]: newValue
          }
        }
      }
    });
  }

  validateField(value, fieldName) {
    const { errors } = this.state;
    const { standard, overtime } = this.state.paymentDefaults.rates;

    let hasError = false;
    let message = "";

    switch (fieldName) {
      case "payDay":
        if (value < 1 || value > 28) {
          hasError = true;
          message = "Must be a value from 1 and 28";
        }
        break;
      case "standardRate":
        if (value <= 0) {
          hasError = true;
          message = "Must be a positive value";
        } else if (value > overtime) {
          hasError = true;
          message = "Cannot be greater than overtime hourly rate";
        }
        break;
      case "overtimeRate":
        if (value <= 0) {
          hasError = true;
          message = "Must be a positive value";
        } else if (value < standard) {
          hasError = true;
          message = "Cannot be less than standard hourly rate";
        }
        break;
      case "salary":
        if (value <= 0) {
          hasError = true;
          message = "Must be a positive value";
        }
        break;
      case "maxOvertimeHours":
        if (value < 0) {
          hasError = true;
          message = "Cannot be a negative number";
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

  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  canSavePaymentDefaults() {
    const { errors } = this.state;
    const { paymentDefaults } = this.props.info;
    const {
      maxOvertimeHours,
      payDay,
      rates,
      type
    } = this.state.paymentDefaults;

    return (
      (maxOvertimeHours !== paymentDefaults.maxOvertimeHours &&
        !errors.maxOvertimeHours.hasErrors) ||
      (payDay.day !== paymentDefaults.payDay.day && !errors.payDay.hasErrors) ||
      payDay.isEndOfTheMonth !== paymentDefaults.payDay.isEndOfTheMonth ||
      (rates.standard !== paymentDefaults.rates.standard &&
        !errors.standardRate.hasErrors) ||
      (rates.overtime !== paymentDefaults.rates.overtime &&
        !errors.overtimeRate.hasErrors) ||
      (rates.salary !== paymentDefaults.rates.salary &&
        !errors.salary.hasErrors) ||
      type !== paymentDefaults.type
    );
  }

  canSavePermissions() {
    const { permissions } = this.props.info;

    return permissions !== this.state.permissions;
  }

  render() {
    const {
      classes,
      info,
      isUpdatePermissionsLoading,
      isUpdatePaymentDefaultsLoading,
      institutionID
    } = this.props;
    const {
      updatePermissions,
      updatePaymentDefaults,
      updateTab
    } = this.props.actions;
    const { paymentDefaults, permissions, errors } = this.state;

    let canSavePaymentDefaults = false;
    let canSavePermissions = false;
    if (info) {
      canSavePaymentDefaults = this.canSavePaymentDefaults();
      canSavePermissions = this.canSavePermissions();
    }

    const ad = this.createAd();

    return (
      <div className={classes.root}>
        <div className={classes.outerWrapper}>
          <Toolbar className={classes.actionsBar}>
            <Route
              render={({ history }) => (
                <Button
                  aria-label="back"
                  onClick={() => {
                    updateTab("INSTITUTIONS");
                    history.push("/myaccount/settings");
                  }}
                >
                  <BackIcon className={classes.iconAdjacentText} /> Back
                </Button>
              )}
            />
          </Toolbar>
          <div className={classes.wrapper}>
            <div className={classes.adWrapper}>{ad}</div>
            <Typography type="title" component="p" className={classes.message}>
              If you would like to change more of the community's details,
              please contact us at{" "}
              <span className={classes.bold}>support@sportomaticapp.com</span>
            </Typography>
            <div className={classes.wrapper}>
              <Grid
                container
                direction="row"
                align="stretch"
                className={classes.contentWrapper}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Paper className={classes.section}>
                    <Typography
                      className={classes.heading}
                      type="title"
                      component="h3"
                    >
                      Coach Payment Defaults
                    </Typography>
                    <div className={classes.sectionContent}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="terms">Terms</InputLabel>
                        <Select
                          native
                          value={paymentDefaults.type}
                          onChange={e =>
                            this.updatePaymentDefaults(e.target.value, "type")}
                          input={<Input id="paymentType" />}
                        >
                          <option value="N/A">Not applicable</option>
                          <option value="HOURLY">Paid per hour</option>
                          <option value="MONTHLY">Earn monthly salary</option>
                        </Select>
                      </FormControl>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <FormLabel component="legend">Rates</FormLabel>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="standard"
                            type="number"
                            label="Standard hourly rate"
                            value={paymentDefaults.rates.standard}
                            onChange={e =>
                              this.updatePaymentDefaults(
                                {
                                  overtime: paymentDefaults.rates.overtime,
                                  standard: parseFloat(e.target.value),
                                  salary: paymentDefaults.rates.salary
                                },
                                "rates"
                              )}
                            onBlur={e =>
                              this.validateField(
                                parseFloat(e.target.value),
                                "standardRate"
                              )}
                            error={errors.standardRate.hasError}
                            helperText={errors.standardRate.message}
                            className={classes.basicInfoTextField}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              ),
                              inputProps: {
                                step: "50",
                                min: "0"
                              }
                            }}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="overtime"
                            type="number"
                            label="Overtime hourly rate"
                            value={paymentDefaults.rates.overtime}
                            onChange={e =>
                              this.updatePaymentDefaults(
                                {
                                  overtime: parseFloat(e.target.value),
                                  standard: paymentDefaults.rates.standard,
                                  salary: paymentDefaults.rates.salary
                                },
                                "rates"
                              )}
                            onBlur={e =>
                              this.validateField(
                                parseFloat(e.target.value),
                                "overtimeRate"
                              )}
                            error={errors.overtimeRate.hasError}
                            helperText={errors.overtimeRate.message}
                            className={classes.basicInfoTextField}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              ),
                              inputProps: {
                                step: "50",
                                min: "0"
                              }
                            }}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="salary"
                            type="number"
                            label="Monthly salary"
                            value={paymentDefaults.rates.salary}
                            onChange={e =>
                              this.updatePaymentDefaults(
                                {
                                  overtime: paymentDefaults.rates.overtime,
                                  standard: paymentDefaults.rates.standard,
                                  salary: parseFloat(e.target.value)
                                },
                                "rates"
                              )}
                            onBlur={e =>
                              this.validateField(
                                parseFloat(e.target.value),
                                "salary"
                              )}
                            error={errors.salary.hasError}
                            helperText={errors.salary.message}
                            className={classes.basicInfoTextField}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              ),
                              inputProps: {
                                step: "1000",
                                min: "0"
                              }
                            }}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </FormControl>
                      </FormControl>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <FormLabel component="legend">Pay Day</FormLabel>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={paymentDefaults.payDay.isEndOfTheMonth}
                              onChange={(event, checked) =>
                                this.updatePaymentDefaults(
                                  {
                                    day: paymentDefaults.payDay.day,
                                    isEndOfTheMonth: checked
                                  },
                                  "payDay"
                                )}
                            />
                          }
                          label="End of the month"
                        />
                        {!paymentDefaults.payDay.isEndOfTheMonth && (
                          <FormControl className={classes.formControl}>
                            <TextField
                              id="dayOfTheMonth"
                              type="number"
                              label="Day of the month"
                              value={paymentDefaults.payDay.day}
                              onChange={e =>
                                this.updatePaymentDefaults(
                                  {
                                    day: parseInt(e.target.value, 10),
                                    isEndOfTheMonth:
                                      paymentDefaults.payDay.isEndOfTheMonth
                                  },
                                  "payDay"
                                )}
                              onBlur={e =>
                                this.validateField(
                                  parseInt(e.target.value, 10),
                                  "payDay"
                                )}
                              error={errors.payDay.hasError}
                              helperText={errors.payDay.message}
                              className={classes.basicInfoTextField}
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: "1",
                                max: "28"
                              }}
                            />
                          </FormControl>
                        )}
                        <TextField
                          type="number"
                          label="Max. overtime hours"
                          value={paymentDefaults.maxOvertimeHours}
                          onChange={e =>
                            this.updatePaymentDefaults(
                              parseInt(e.target.value, 10),
                              "maxOvertimeHours"
                            )}
                          onBlur={e =>
                            this.validateField(
                              parseInt(e.target.value, 10),
                              "maxOvertimeHours"
                            )}
                          error={errors.maxOvertimeHours.hasError}
                          helperText={errors.maxOvertimeHours.message}
                          className={classes.formControl}
                          InputLabelProps={{
                            shrink: true
                          }}
                          inputProps={{
                            min: "0"
                          }}
                        />
                      </FormControl>
                      <div className={classes.flexGrow} />
                      <Button
                        className={classes.button}
                        color="primary"
                        disabled={
                          isUpdatePermissionsLoading || !canSavePaymentDefaults
                        }
                        onClick={() =>
                          updatePaymentDefaults(institutionID, paymentDefaults)}
                      >
                        {isUpdatePaymentDefaultsLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Paper className={classes.section}>
                    <Typography
                      className={classes.heading}
                      type="title"
                      component="h3"
                    >
                      Permissions
                    </Typography>
                    <div className={classes.sectionContent}>
                      <FormControl className={classes.formControl}>
                        <FormGroup component="fieldset">
                          <FormLabel component="legend">Coaches</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.coaches.events.canCancel}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canCancel",
                                    "coaches",
                                    "events"
                                  )}
                                value={permissions.coaches.events.canCancel}
                              />
                            }
                            label="Can cancel events"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.coaches.events.canCreate}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canCreate",
                                    "coaches",
                                    "events"
                                  )}
                                value={permissions.coaches.events.canCreate}
                              />
                            }
                            label="Can create events"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.coaches.events.canEdit}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canEdit",
                                    "coaches",
                                    "events"
                                  )}
                                value={permissions.coaches.events.canEdit}
                              />
                            }
                            label="Can edit events"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.coaches.results.canEdit}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canEdit",
                                    "coaches",
                                    "results"
                                  )}
                                value={permissions.coaches.results.canEdit}
                              />
                            }
                            label="Can edit results"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.coaches.results.canApprove}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canApprove",
                                    "coaches",
                                    "results"
                                  )}
                                value={permissions.coaches.results.canApprove}
                              />
                            }
                            label="Can finalise results"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.coaches.teams.canEdit}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canEdit",
                                    "coaches",
                                    "teams"
                                  )}
                                value={permissions.coaches.teams.canEdit}
                              />
                            }
                            label="Can edit teams"
                          />
                        </FormGroup>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <FormGroup component="fieldset">
                          <FormLabel component="legend">Managers</FormLabel>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.managers.events.canCancel}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canCancel",
                                    "managers",
                                    "events"
                                  )}
                                value={permissions.managers.events.canCancel}
                              />
                            }
                            label="Can cancel events"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.managers.events.canCreate}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canCreate",
                                    "managers",
                                    "events"
                                  )}
                                value={permissions.coaches.events.canCreate}
                              />
                            }
                            label="Can create events"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.managers.events.canEdit}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canEdit",
                                    "managers",
                                    "events"
                                  )}
                                value={permissions.managers.events.canEdit}
                              />
                            }
                            label="Can edit events"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.managers.teams.canEdit}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canEdit",
                                    "managers",
                                    "teams"
                                  )}
                                value={permissions.managers.teams.canEdit}
                              />
                            }
                            label="Can edit teams"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={permissions.managers.wages.canView}
                                onChange={(e, isChecked) =>
                                  this.updatePermissions(
                                    isChecked,
                                    "canView",
                                    "managers",
                                    "wages"
                                  )}
                                value={permissions.managers.wages.canView}
                              />
                            }
                            label="Can view wages"
                          />
                          {permissions.managers.wages.canView && (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={permissions.managers.wages.canCreate}
                                  onChange={(e, isChecked) =>
                                    this.updatePermissions(
                                      isChecked,
                                      "canCreate",
                                      "managers",
                                      "wages"
                                    )}
                                  value={permissions.managers.wages.canCreate}
                                />
                              }
                              label="Can add custom wages"
                            />
                          )}
                        </FormGroup>
                      </FormControl>
                      <Button
                        className={classes.button}
                        color="primary"
                        disabled={
                          isUpdatePermissionsLoading || !canSavePermissions
                        }
                        onClick={() =>
                          updatePermissions(institutionID, permissions)}
                      >
                        {isUpdatePermissionsLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(InstitutionInfo);
