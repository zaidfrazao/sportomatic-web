import React, { Component } from "react";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import backgroundImage from "./images/background-image.jpeg";
import { isValidEmail } from "../../utils/validation";
import logo from "./images/logo.png";
import hoursImage from "./images/hours.png";
import NotificationModal from "../../components/NotificationModal";
import peopleImage from "./images/people.png";
import resultsImage from "./images/results.png";
import scheduleImage from "./images/schedule.png";
import teamsImage from "./images/teams.png";
import wagesImage from "./images/wages.png";

const styles = theme => ({
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  featureImage: {
    margin: 16
  },
  featuresWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxWidth: 480
  },
  featureWrapper: {
    width: 220,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "16px 0",
    textAlign: "center",
    padding: 8
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0 24px",
    width: "100%",
    maxWidth: 200
  },
  logo: {
    width: 240,
    height: "auto",
    margin: 24
  },
  mainContent: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  paperPositioner: {
    width: "100%",
    height: "100%",
    minWidth: "300px",
    flex: 1,
    "@media (min-width: 768px)": {
      maxWidth: "30rem",
      maxHeight: "40rem"
    }
  },
  terms: {
    width: "100%",
    margin: "16px 0"
  },
  termsWrapper: {
    width: "100%",
    margin: "16px 0",
    overflow: "auto"
  },
  textField: {
    marginBottom: 16
  },
  textWrapper: {
    margin: "8px auto",
    textAlign: "center",
    maxWidth: 480
  },
  wrapper: {
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#fff"
  }
});

class SignUpLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      windowWidth: "0",
      step: 2,
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        name: {
          hasError: false,
          message: ""
        },
        surname: {
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
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    const { accountSuccessfullyCreated } = nextProps.uiConfig;
    const { history } = nextProps;

    if (
      accountSuccessfullyCreated !==
        this.props.uiConfig.accountSuccessfullyCreated &&
      accountSuccessfullyCreated
    ) {
      history.push("/sign-in");
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
    this.setState({
      step: 2,
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        name: {
          hasError: false,
          message: ""
        },
        surname: {
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
    });
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  updateStep(newStep) {
    this.setState({
      step: newStep
    });
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
        } else if (value.length > 36) {
          hasError = true;
          message = "Max. 36 characters allowed";
        }
        break;
      case "surname":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide your last name";
        } else if (value.length > 36) {
          hasError = true;
          message = "Max. 36 characters allowed";
        }
        break;
      case "email":
        if (value.length === 0) {
          hasError = true;
          message = "Please provide an email address";
        } else if (value.length > 36) {
          hasError = true;
          message = "Max. 36 characters allowed";
        } else if (!isValidEmail(value)) {
          hasError = true;
          message = "This is not a valid email address";
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

  canSignUp() {
    const {
      name,
      surname,
      email,
      password,
      confirmPassword,
      errors
    } = this.state;

    return (
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      !errors.name.hasError &&
      !errors.surname.hasError &&
      !errors.email.hasError &&
      !errors.password.hasError &&
      !errors.confirmPassword.hasError
    );
  }

  renderWelcome(isMobile) {
    const { classes } = this.props;

    return (
      <Dialog open aria-labelledby="sign-up-dialog" fullScreen={isMobile}>
        <DialogContent className={classes.content}>
          <img src={logo} alt="Sportomatic Logo" className={classes.logo} />
          <DialogContentText className={classes.textWrapper}>
            Sportomatic is the best way to manage your sports. Whether you
            manage or coach a team, or manage the sports programs for entire
            institutions, Sportomatic has what you need to get your job done.
          </DialogContentText>
          <DialogContentText className={classes.textWrapper}>
            And it's free!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => this.updateStep(1)}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderFeatures(isMobile) {
    const { classes } = this.props;

    return (
      <Dialog open aria-labelledby="sign-up-dialog" fullScreen={isMobile}>
        <DialogTitle id="sign-up-dialog-title">Features</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.textWrapper}>
            Here's a little summary of the features Sportomatic currently
            offers. You can expect a lot more in the future.
          </DialogContentText>
          <div className={classes.featuresWrapper}>
            <div className={classes.featureWrapper}>
              <Typography type="headline" component="h2">
                Schedule
              </Typography>
              <img
                src={scheduleImage}
                width={220}
                alt="Schedule screenshot"
                className={classes.featureImage}
              />
              <Typography type="body1" component="p">
                Keep all info related to fixtures and practices in one
                convenient place.
              </Typography>
            </div>
            <div className={classes.featureWrapper}>
              <Typography type="headline" component="h2">
                Hours
              </Typography>
              <img
                src={hoursImage}
                width={220}
                alt="Hours screenshot"
                className={classes.featureImage}
              />
              <Typography type="body1" component="p">
                Know exactly what time your coaches arrive and leave events.
              </Typography>
            </div>
            <div className={classes.featureWrapper}>
              <Typography type="headline" component="h2">
                Results
              </Typography>
              <img
                src={resultsImage}
                width={220}
                alt="Results screenshot"
                className={classes.featureImage}
              />
              <Typography type="body1" component="p">
                View results from all competitive fixtures your teams are
                involved in.
              </Typography>
            </div>
            <div className={classes.featureWrapper}>
              <Typography type="headline" component="h2">
                Wages
              </Typography>
              <img
                src={wagesImage}
                width={220}
                alt="Wages screenshot"
                className={classes.featureImage}
              />
              <Typography type="body1" component="p">
                Track how much you owe your coaches at the end of the month.
              </Typography>
            </div>
            <div className={classes.featureWrapper}>
              <Typography type="headline" component="h2">
                People
              </Typography>
              <img
                src={peopleImage}
                width={220}
                alt="People screenshot"
                className={classes.featureImage}
              />
              <Typography type="body1" component="p">
                See contact and fixture info related to each of your collegues.
              </Typography>
            </div>
            <div className={classes.featureWrapper}>
              <Typography type="headline" component="h2">
                Teams
              </Typography>
              <img
                src={teamsImage}
                width={220}
                alt="Teams screenshot"
                className={classes.featureImage}
              />
              <Typography type="body1" component="p">
                Organise people into teams to more easily manage them.
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.updateStep(0)}>Back</Button>
          <Button color="primary" onClick={() => this.updateStep(2)}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderPersonalInfo(isMobile) {
    const { classes, history } = this.props;
    const {
      name,
      surname,
      email,
      password,
      confirmPassword,
      errors
    } = this.state;

    return (
      <Dialog open aria-labelledby="sign-up-dialog" fullScreen={isMobile}>
        <DialogTitle id="sign-up-dialog-title">Personal Info</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.textWrapper}>
            We just need a couple of pieces of information in order to create
            your own personalised Sportomatic account.
          </DialogContentText>
          <div className={classes.infoWrapper}>
            <div>
              <TextField
                label="Name"
                value={name}
                error={errors["name"].hasError}
                onChange={e => this.updateField(e.target.value, "name")}
                onBlur={e => this.validateField(e.target.value, "name")}
                helperText={errors["name"].message}
                className={classes.textField}
              />
            </div>
            <div>
              <TextField
                label="Surname"
                value={surname}
                error={errors["surname"].hasError}
                onChange={e => this.updateField(e.target.value, "surname")}
                onBlur={e => this.validateField(e.target.value, "surname")}
                helperText={errors["surname"].message}
                className={classes.textField}
              />
            </div>
            <div>
              <TextField
                type="email"
                label="Email"
                value={email}
                error={errors["email"].hasError}
                onChange={e => this.updateField(e.target.value, "email")}
                onBlur={e => this.validateField(e.target.value, "email")}
                helperText={errors["email"].message}
                className={classes.textField}
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Password"
                value={password}
                error={errors["password"].hasError}
                onChange={e => this.updateField(e.target.value, "password")}
                onBlur={e => this.validateField(e.target.value, "password")}
                helperText={errors["password"].message}
                className={classes.textField}
              />
            </div>
            <div>
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
                className={classes.textField}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.push("/sign-in")}>
            Back to sign in
          </Button>
          <Button
            disabled={!this.canSignUp()}
            color="primary"
            onClick={() => this.updateStep(3)}
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderTermsAndConditions(isMobile) {
    const { classes } = this.props;
    const { isAccountCreationLoading } = this.props.loadingStatus;
    const { email, password, name, surname } = this.state;
    const { createUser } = this.props.actions;

    return (
      <Dialog open aria-labelledby="sign-up-dialog" fullScreen={isMobile}>
        <DialogTitle id="sign-up-dialog-title">Terms & Conditions</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.textWrapper}>
            The last thing you need to do is agree to our terms and conditions.
            Please read through them carefully and then click "Agree" if you
            agree in order to create your account.
          </DialogContentText>
          <div className={classes.termsWrapper}>
            <Typography type="body1" component="p" className={classes.terms}>
              1. By downloading or using the SPORTOMATIC App, these terms and
              conditions (“App Terms”) will automatically apply to you.
              Therefore you must make sure that you read them carefully before
              using the app. We are offering you this App to use for your own
              personal use without cost, but you should be aware that you cannot
              send it on to any third party, and you are not allowed to copy, or
              modify the app, any part of the app, or our trademarks in any way.
              You are not allowed to attempt to extract the source code of the
              app, translate the app into other languages, or make derivative
              versions. The App itself, and all the trade marks, copyright,
              database rights and other intellectual property rights related to
              it, still belong to SPORTOMATIC.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              2. Depending on the version of the Application you have
              downloaded, these App Terms incorporate Apple’s or Google
              Android’s terms and conditions and privacy policies (“Platform
              Terms”). If there is any conflict between these App Terms and the
              Platform Terms then these App Terms will prevail. At the bottom of
              these terms and conditions you will be able to find links to our
              website where we set out our Privacy Policy and Website terms
              which are incorporated in the App terms.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              3. SPORTOMATIC is committed to ensuring that the App is as useful
              and efficient as possible. For that reason, we reserve the right
              to make changes to the app at any time and for any reason.
              Sportomatic does not promise that it will always update the App so
              that it is relevant to you and/or works with the iOS/Android
              version that you have installed on your device. We may also wish
              to stop providing the app, and may terminate use of it at any time
              without giving notice of termination to you. Unless we tell you
              otherwise, upon any termination, (a) the rights and licenses
              granted to you in these terms will end; (b) you must stop using
              the App, and (if needed) delete it from your device.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              4. The SPORTOMATIC App stores and processes personal data that you
              have provided to us so that you may use the app. It is your
              responsibility to keep your phone and access to the App secure.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              5. The connection can be Wi-Fi, or provided by your mobile network
              provider, but SPORTOMATIC app cannot take responsibility for the
              App not working at full functionality if you do not have access to
              Wi-Fi, and you do not have sufficient data allowance. In the event
              that you are using the App outside of an area with Wi-Fi, your
              terms of agreement with your mobile network provider will still
              apply. As a result, you may be charged by your mobile provider for
              the cost of data for the duration of the connection while
              accessing the App, or other third party charges. In using the App,
              you are accepting sole responsibility for any such charges,
              including roaming data charges if you use the app outside of your
              home territory (i.e. region or country) without turning off data
              roaming. If you are not the bill payer for the device on which
              you’re using the App, please be aware that we assume that you have
              received permission from the bill payer for using the App.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              6. To the fullest extent permitted under applicable law, in no
              event shall SPORTOMATIC be liable to you with respect to use of
              the App and/or be liable to you for any direct, indirect, special
              or consequential damages including, without limitation, damages
              for loss of goodwill, lost profits, or loss, theft or corruption
              of your information, the inability to use the App, device failure
              or malfunction. Furthermore although we endeavour to ensure that
              it is updated and correct at all times, we do rely on third
              parties to provide information to us so that we can make it
              available to you. SPORTOMATIC accepts no liability for any loss,
              direct or indirect, you experience as a result of relying wholly
              on this functionality of the App. SPORTOMATIC shall not be liable
              even in the event that it has been advised of the possibility of
              such damages, including without limitation damages caused by
              error, omission, interruption, defect, failure of performance,
              unauthorised use, delay in operation or transmission, line
              failure, computer virus, worm or other harm.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              7. SPORTOMATIC provides the App on an ‘as is’ and ‘as available’
              basis without any promises or representations, express or implied.
              In particular, SPORTOMATIC does not warrant or make any
              representation regarding the validity, accuracy, reliability or
              availability of the App or its content. To the fullest extent
              permitted by applicable law, SPORTOMATIC hereby excludes all
              promises, whether express or implied, including any promises that
              the App is fit for purpose, of satisfactory quality,
              non-infringing, is free of defects, is able to operate on an
              uninterrupted basis, that the use of the App by you is in
              compliance with laws or that any information that you transmit in
              connection with this App will be successfully, accurately or
              securely transmitted.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              8. We may from time to time vary these App Terms. Please check
              these App Terms regularly to ensure you are aware of any
              variations made by us. If you continue to use this App, you are
              deemed to have accepted such variations. If you do not agree to
              such variations, you should not use the App.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              9. You agree not to use the SPORTOMATIC App in any way that:
            </Typography>
            <Typography type="body1" component="p">
              9.1. is unlawful, illegal or unauthorised;
            </Typography>
            <Typography type="body1" component="p">
              9.2. is defamatory of any other person;
            </Typography>
            <Typography type="body1" component="p">
              9.3. is obscene or offensive;
            </Typography>
            <Typography type="body1" component="p">
              9.4. promotes discrimination based on race, sex, religion,
              nationality, disability, sexual orientation or age;
            </Typography>
            <Typography type="body1" component="p">
              9.5. infringes any copyright, database right or trade mark of any
              other person;
            </Typography>
            <Typography type="body1" component="p">
              9.6. is likely to harass, upset, embarrass, alarm or annoy any
              other person;
            </Typography>
            <Typography type="body1" component="p">
              9.7. is likely to disrupt our service in any way;
            </Typography>
            <Typography type="body1" component="p">
              9.8. advocates, promotes or assists any unlawful act such as (by
              way of example only) copyright infringement or computer misuse.
            </Typography>
            <Typography type="body1" component="p" className={classes.terms}>
              10. You agree to indemnify SPORTOMATIC for any breach of these App
              Terms. SPORTOMATIC reserves the right to control the defence and
              settlement of any third party claim for which you indemnify
              SPORTOMATIC under these App Terms and you will assist us in
              exercising such rights.
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.updateStep(2)}>Back</Button>
          <Button
            color="primary"
            onClick={() => createUser(email, password, name, surname)}
          >
            {isAccountCreationLoading ? (
              <CircularProgress size={20} />
            ) : (
              "Agree"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const { classes, history } = this.props;
    const { isAccountExistsModalOpen } = this.props.dialogs;
    const { windowWidth, step, email } = this.state;

    const isMobile = windowWidth < 600;
    let render = this.renderWelcome(isMobile);

    switch (step) {
      case 0:
        render = this.renderWelcome(isMobile);
        break;
      case 1:
        render = this.renderFeatures(isMobile);
        break;
      case 2:
        render = this.renderPersonalInfo(isMobile);
        break;
      case 3:
        render = this.renderTermsAndConditions(isMobile);
        break;
      default:
        render = this.renderWelcome(isMobile);
        break;
    }

    return (
      <div className={classes.wrapper}>
        {render}
        <NotificationModal
          isOpen={isAccountExistsModalOpen}
          handleOkClick={() => history.push("/sign-in")}
          heading="Email Already In Use"
          message={`There is already an account connected to the email address ${email}. If you forgot your password, use the "Forgot password?" link on the sign in page to reset it.`}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SignUpLayout);
