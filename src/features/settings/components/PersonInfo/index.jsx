/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AvatarEditor from "react-avatar-editor";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import Checkbox from "material-ui/Checkbox";
import { FormControl, FormControlLabel } from "material-ui/Form";
import { grey } from "material-ui/colors";
import Grid from "material-ui/Grid";
import Input, { InputLabel } from "material-ui/Input";
import MaskedInput from "react-text-mask";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../components/BannerAd";
import { isValidEmail } from "../../../../utils/validation";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LargeRectangleAd from "../../../../components/LargeRectangleAd";
import defaultProfilePicture from "../../image/default-profile-picture.png";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
    marginBottom: 24,
    width: 240
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
  input: {
    display: "none"
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
  noItems: {
    textAlign: "center"
  },
  picture: {
    backgroundColor: grey[300],
    margin: 24
  },
  pictureUploader: {
    margin: "16px 0"
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
    height: "100%"
  },
  sectionContent: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  sportSectionContent: {
    padding: 16,
    display: "flex",
    flexDirection: "column"
  },
  wrapper: {
    padding: 24
  }
});

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

class PersonInfo extends Component {
  state = {
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    width: 220,
    height: 220,
    name: "",
    surname: "",
    email: "",
    profilePictureURL: "",
    phoneNumber: "(   )    -    ",
    password: "",
    confirmPassword: "",
    sports: {
      Aerobatics: false,
      Athletics: false,
      "Australian Rules Football": false,
      Basketball: false,
      Boxing: false,
      Canoeing: false,
      Chess: false,
      Cricket: false,
      "Cross Country": false,
      Cycling: false,
      Debating: false,
      Equestrian: false,
      "Field Hockey": false,
      Golf: false,
      Gymnastics: false,
      "Major Production": false,
      "Mind Sports": false,
      "Mixed Martial Arts": false,
      "Motor Sports": false,
      Netball: false,
      "Public Speaking": false,
      Rugby: false,
      Sailing: false,
      "Skydiving and Parachuting": false,
      "Obstacle Course Racing": false,
      "Soccer / Football": false,
      Surfing: false,
      Swimming: false,
      "Table Tennis": false,
      Tennis: false,
      Triathlon: false,
      Waterpolo: false,
      Other: false
    },
    errors: {
      name: {
        hasError: false,
        message: ""
      },
      surname: {
        hasError: false,
        message: ""
      },
      phoneNumber: {
        hasError: false,
        message: ""
      },
      email: {
        hasError: false,
        message: ""
      },
      password: {
        hasError: false,
        message: ""
      },
      confirmPassword: {
        hasError: false,
        message: ""
      }
    }
  };

  componentWillMount() {
    const { accountInfo } = this.props;

    if (accountInfo.info) {
      let sports = {
        Aerobatics: false,
        Athletics: false,
        "Australian Rules Football": false,
        Basketball: false,
        Boxing: false,
        Canoeing: false,
        Chess: false,
        Cricket: false,
        "Cross Country": false,
        Cycling: false,
        Debating: false,
        Equestrian: false,
        "Field Hockey": false,
        Golf: false,
        Gymnastics: false,
        "Major Production": false,
        "Mind Sports": false,
        "Mixed Martial Arts": false,
        "Motor Sports": false,
        Netball: false,
        "Public Speaking": false,
        Rugby: false,
        Sailing: false,
        "Skydiving and Parachuting": false,
        "Obstacle Course Racing": false,
        "Soccer / Football": false,
        Surfing: false,
        Swimming: false,
        "Table Tennis": false,
        Tennis: false,
        Triathlon: false,
        Waterpolo: false,
        Other: false
      };

      _.toPairs(accountInfo.info.sports).map(([sport, prefers]) => {
        if (prefers && sport !== "Unknown") {
          sports[sport] = true;
        }
      });

      this.setState({
        name: accountInfo.info.name,
        surname: accountInfo.info.surname,
        email: accountInfo.info.email,
        profilePictureURL: accountInfo.info.profilePictureURL,
        phoneNumber: accountInfo.info.phoneNumber,
        sports
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { accountInfo } = nextProps;

    if (accountInfo !== this.props.accountInfo && accountInfo.info) {
      let sports = {
        Aerobatics: false,
        Athletics: false,
        "Australian Rules Football": false,
        Basketball: false,
        Boxing: false,
        Canoeing: false,
        Chess: false,
        Cricket: false,
        "Cross Country": false,
        Cycling: false,
        Debating: false,
        Equestrian: false,
        "Field Hockey": false,
        Golf: false,
        Gymnastics: false,
        "Major Production": false,
        "Mind Sports": false,
        "Mixed Martial Arts": false,
        "Motor Sports": false,
        Netball: false,
        "Public Speaking": false,
        Rugby: false,
        Sailing: false,
        "Skydiving and Parachuting": false,
        "Obstacle Course Racing": false,
        "Soccer / Football": false,
        Surfing: false,
        Swimming: false,
        "Table Tennis": false,
        Tennis: false,
        Triathlon: false,
        Waterpolo: false,
        Other: false
      };

      _.toPairs(accountInfo.info.sports).map(([sport, prefers]) => {
        if (prefers && sport !== "Unknown") {
          sports[sport] = true;
        }
      });

      this.setState({
        name: accountInfo.info.name,
        surname: accountInfo.info.surname,
        email: accountInfo.info.email,
        profilePictureURL: accountInfo.info.profilePictureURL,
        phoneNumber: accountInfo.info.phoneNumber,
        sports
      });
    }
  }

  updateField(newValue, fieldName) {
    this.setState({
      [fieldName]: newValue
    });
  }

  validateField(value, fieldName) {
    const { errors, password } = this.state;
    let hasError = false;
    let message = "";

    switch (fieldName) {
      case "name":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide your first name";
        } else if (value.length > 32) {
          hasError = true;
          message = "Max. 32 characters allowed";
        }
        break;
      case "surname":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide your last name";
        } else if (value.length > 64) {
          hasError = true;
          message = "Max. 64 characters allowed";
        }
        break;
      case "email":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide your email address";
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
      case "password":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide a password";
        } else if (value.length > 36) {
          hasError = true;
          message = "Max. 36 characters allowed";
        } else if (value.length < 6) {
          hasError = true;
          message = "Must be at least 6 characters long";
        }
        break;
      case "confirmPassword":
        if (value.length === 0) {
          hasError = true;
          message = "Please re-enter the password entered above";
        } else if (value !== password) {
          hasError = true;
          message = "Does not match password";
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

    let ad = <LargeRectangleAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  canSaveBasicInfo() {
    const { accountInfo } = this.props;
    const { errors, name, surname, phoneNumber } = this.state;

    return (
      (accountInfo.info.name !== name && !errors.name.hasError) ||
      (accountInfo.info.surname !== surname && !errors.surname.hasError) ||
      (accountInfo.info.phoneNumber !== phoneNumber &&
        !errors.phoneNumber.hasError)
    );
  }

  canSaveLoginDetails() {
    const { accountInfo } = this.props;
    const { errors, email, password, confirmPassword } = this.state;

    if (accountInfo.info.email !== email) {
      return (
        !errors.email.hasError &&
        password !== "" &&
        !errors.password.hasError &&
        confirmPassword !== "" &&
        !errors.confirmPassword.hasError
      );
    } else {
      return (
        password !== "" &&
        !errors.password.hasError &&
        confirmPassword !== "" &&
        !errors.confirmPassword.hasError
      );
    }
  }

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleSave = data => {
    const { userID } = this.props;
    const { updateProfilePicture } = this.props.actions;

    this.editor.getImageScaledToCanvas().toBlob(blob => {
      updateProfilePicture(userID, blob);
    }, "image/jpeg");
  };

  handleScale = e => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  setEditorRef = editor => {
    if (editor) this.editor = editor;
  };

  handlePositionChange = position => {
    this.setState({ position });
  };

  render() {
    const {
      classes,
      accountInfo,
      isUpdateBasicInfoLoading,
      isUpdateSportsLoading,
      isUpdateLoginDetailsLoading,
      isUpdateProfilePictureLoading,
      userID
    } = this.props;
    const {
      name,
      surname,
      profilePictureURL,
      email,
      phoneNumber,
      sports,
      password,
      confirmPassword,
      errors
    } = this.state;
    const {
      updateBasicInfo,
      updateSports,
      updateLoginDetails
    } = this.props.actions;

    const ad = this.createAd();

    let canSaveBasicInfo = false;
    if (accountInfo.info) {
      canSaveBasicInfo = this.canSaveBasicInfo();
    }
    let canSaveLoginDetails = false;
    if (accountInfo.info) {
      canSaveLoginDetails = this.canSaveLoginDetails();
    }

    return (
      <div className={classes.root}>
        <div className={classes.outerWrapper}>
          <div className={classes.wrapper}>
            <Grid
              container
              direction="row"
              align="stretch"
              className={classes.contentWrapper}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className={classes.pictureWrapper}>
                  <div className={classes.pictureUploader}>
                    <AvatarEditor
                      ref={this.setEditorRef}
                      scale={parseFloat(this.state.scale)}
                      width={this.state.width}
                      height={this.state.height}
                      border={16}
                      position={this.state.position}
                      onPositionChange={this.handlePositionChange}
                      onSave={this.handleSave}
                      image={
                        this.state.image ||
                        profilePictureURL ||
                        defaultProfilePicture
                      }
                    />
                  </div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="zoom" shrink>
                      Zoom
                    </InputLabel>
                    <Input
                      name="scale"
                      type="range"
                      onChange={this.handleScale}
                      inputProps={{
                        min: this.state.allowZoomOut ? "0.1" : "1",
                        max: "2",
                        step: "0.01",
                        defaultValue: "1"
                      }}
                    />
                  </FormControl>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={this.handleNewImage}
                  />
                  <label htmlFor="icon-button-file">
                    <Button
                      className={classes.button}
                      color="primary"
                      component="span"
                    >
                      Change profile picture
                    </Button>
                  </label>
                  <Button
                    disabled={!this.state.image}
                    className={classes.button}
                    color="primary"
                    onClick={this.handleSave}
                  >
                    {isUpdateProfilePictureLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Save new picture"
                    )}
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className={classes.adWrapper}>{ad}</div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Paper className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Basic Info
                  </Typography>
                  <div className={classes.sectionContent}>
                    <TextField
                      label="Name"
                      value={name}
                      error={errors["name"].hasError}
                      onChange={e => this.updateField(e.target.value, "name")}
                      onBlur={e => this.validateField(e.target.value, "name")}
                      helperText={errors["name"].message}
                      className={classes.formControl}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      label="Surname"
                      value={surname}
                      error={errors["surname"].hasError}
                      onChange={e =>
                        this.updateField(e.target.value, "surname")}
                      onBlur={e =>
                        this.validateField(e.target.value, "surname")}
                      helperText={errors["surname"].message}
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
                        onChange={e =>
                          this.updateField(e.target.value, "phoneNumber")}
                        onBlur={e =>
                          this.validateField(e.target.value, "phoneNumber")}
                        className={classes.input}
                        inputProps={{
                          "aria-label": "phone number"
                        }}
                      />
                    </FormControl>
                    <div className={classes.flexGrow} />
                    <Button
                      className={classes.button}
                      color="primary"
                      disabled={!canSaveBasicInfo || isUpdateBasicInfoLoading}
                      onClick={() =>
                        updateBasicInfo(userID, name, surname, phoneNumber)}
                    >
                      {isUpdateBasicInfoLoading ? (
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
                    Login Details
                  </Typography>
                  <div className={classes.sectionContent}>
                    <TextField
                      label="Email"
                      value={email}
                      error={errors["email"].hasError}
                      onChange={e => this.updateField(e.target.value, "email")}
                      onBlur={e => this.validateField(e.target.value, "email")}
                      helperText={errors["email"].message}
                      className={classes.formControl}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      type="password"
                      label="Password"
                      value={password}
                      error={errors["password"].hasError}
                      onChange={e =>
                        this.updateField(e.target.value, "password")}
                      onBlur={e =>
                        this.validateField(e.target.value, "password")}
                      helperText={errors["password"].message}
                      className={classes.formControl}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      type="password"
                      label="Confirm password"
                      value={confirmPassword}
                      error={errors["confirmPassword"].hasError}
                      onChange={e =>
                        this.updateField(e.target.value, "confirmPassword")}
                      onBlur={e =>
                        this.validateField(e.target.value, "confirmPassword")}
                      helperText={errors["confirmPassword"].message}
                      className={classes.formControl}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <div className={classes.flexGrow} />
                    <Button
                      className={classes.button}
                      color="primary"
                      disabled={
                        !canSaveLoginDetails || isUpdateLoginDetailsLoading
                      }
                      onClick={() => {
                        updateLoginDetails(userID, email, password);
                        this.setState({
                          password: "",
                          confirmPassword: ""
                        });
                      }}
                    >
                      {isUpdateLoginDetailsLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Preferred Sports
                  </Typography>
                  <div className={classes.sportSectionContent}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
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
                    <Button
                      className={classes.button}
                      color="primary"
                      disabled={isUpdateSportsLoading}
                      onClick={() => {
                        let sportsUnknown = true;
                        _.toPairs(sports).map(([sport, selected]) => {
                          if (selected) {
                            sportsUnknown = false;
                          }
                        });

                        if (sportsUnknown) {
                          updateSports(userID, { Unknown: true });
                        } else {
                          updateSports(userID, sports);
                        }
                      }}
                    >
                      {isUpdateSportsLoading ? (
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
    );
  }
}

export default withStyles(styles)(PersonInfo);
