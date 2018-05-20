import React, { Component } from "react";
import injectSheet from "react-jss";
import moment from "moment";
import Button from "../../../../../../../../../../components/Button";
import { common, red } from "../../../../../../../../../../utils/colours";
import Dialog from "../../../../../../../../../../components/Dialog";
import Select from "../../../../../../../../../../components/Select";

const styles = {
  errorWrapper: {
    backgroundColor: red[500],
    color: common["white"],
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
    borderRadius: 8,
    margin: 12
  },
  headingTime: {
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  timeInputGroupWrapper: {
    display: "flex"
  },
  timeInputWrapper: {
    flexGrow: 1
  },
  sectionSeparator: {
    height: 24
  }
};

class EditTimesDialog extends Component {
  state = {
    errors: {
      signIn: {
        hasError: false,
        message: ""
      },
      signOut: {
        hasError: false,
        message: ""
      }
    },
    signInTime: {
      hour: {
        key: "unknown",
        label: "--"
      },
      minute: {
        key: "unknown",
        label: "--"
      },
      timeOfDay: {
        key: "unknown",
        label: "--"
      }
    },
    signOutTime: {
      hour: {
        key: "unknown",
        label: "--"
      },
      minute: {
        key: "unknown",
        label: "--"
      },
      timeOfDay: {
        key: "unknown",
        label: "--"
      }
    }
  };

  componentWillMount() {
    const { status, signInTime, signOutTime } = this.props;

    const signInObject = this.getSignInTime(signInTime);
    const signOutObject = this.getSignOutTime(signOutTime);
    const isSignOutTimeSet = status !== "AWAITING_SIGN_OUT";

    if (isSignOutTimeSet) {
      this.setState({
        signInTime: signInObject,
        signOutTime: signOutObject
      });
    } else {
      this.setState({
        signInTime: signInObject
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { signInTime, signOutTime } = nextProps;

    let stateUpdates = {};

    if (signInTime !== this.props.signInTime) {
      stateUpdates.signInTime = this.getSignInTime(signInTime);
    }
    if (signOutTime !== this.props.signOutTime) {
      stateUpdates.signOutTime = this.getSignOutTime(signOutTime);
    }

    this.setState(stateUpdates);
  }

  getTimeOptions() {
    const minutes = [
      {
        key: "00",
        label: "00"
      },
      {
        key: "05",
        label: "05"
      },
      {
        key: "10",
        label: "10"
      },
      {
        key: "15",
        label: "15"
      },
      {
        key: "20",
        label: "20"
      },
      {
        key: "25",
        label: "25"
      },
      {
        key: "30",
        label: "30"
      },
      {
        key: "35",
        label: "35"
      },
      {
        key: "40",
        label: "40"
      },
      {
        key: "45",
        label: "45"
      },
      {
        key: "50",
        label: "50"
      },
      {
        key: "55",
        label: "55"
      }
    ];
    const hours = [
      {
        key: "01",
        label: "01"
      },
      {
        key: "02",
        label: "02"
      },
      {
        key: "03",
        label: "03"
      },
      {
        key: "04",
        label: "04"
      },
      {
        key: "05",
        label: "05"
      },
      {
        key: "06",
        label: "06"
      },
      {
        key: "07",
        label: "07"
      },
      {
        key: "08",
        label: "08"
      },
      {
        key: "09",
        label: "09"
      },
      {
        key: "10",
        label: "10"
      },
      {
        key: "11",
        label: "11"
      },
      {
        key: "12",
        label: "12"
      }
    ];
    const timeOfDay = [
      {
        key: "AM",
        label: "AM"
      },
      {
        key: "PM",
        label: "PM"
      }
    ];

    return { minutes, hours, timeOfDay };
  }

  getSignInTime(signInTime) {
    const signInMoment = moment(signInTime);

    return {
      hour: {
        key: signInMoment.format("hh"),
        label: signInMoment.format("hh")
      },
      minute: {
        key: signInMoment.format("mm"),
        label: signInMoment.format("mm")
      },
      timeOfDay: {
        key: signInMoment.format("A"),
        label: signInMoment.format("A")
      }
    };
  }

  getSignOutTime(signOutTime) {
    const signOutMoment = moment(signOutTime);

    return {
      hour: {
        key: signOutMoment.format("hh"),
        label: signOutMoment.format("hh")
      },
      minute: {
        key: signOutMoment.format("mm"),
        label: signOutMoment.format("mm")
      },
      timeOfDay: {
        key: signOutMoment.format("A"),
        label: signOutMoment.format("A")
      }
    };
  }

  updateSignInTime(newValue, type) {
    const { signInTime } = this.state;

    this.setState({
      signInTime: {
        ...signInTime,
        [type]: {
          key: newValue,
          label: newValue
        }
      }
    });
  }

  updateSignOutTime(newValue, type) {
    const { signOutTime } = this.state;

    this.setState({
      signOutTime: {
        ...signOutTime,
        [type]: {
          key: newValue,
          label: newValue
        }
      }
    });
  }

  validateTimes(signInTime, signOutTime) {
    const { eventTimes, closeDialog, updateTimes } = this.props;

    const eventStartMoment = moment(eventTimes.start);
    const minSignInMoment = moment(eventTimes.start).subtract(1, "hour");
    const eventEndMoment = moment(eventTimes.end);
    const maxSignOutMoment = moment(eventTimes.end).add(3, "hour");

    if (
      signOutTime.hour.key === "unknown" ||
      signOutTime.minute.key === "unknown" ||
      signOutTime.timeOfDay.key === "unknown"
    ) {
      this.setState({
        errors: {
          signIn: {
            hasError: false,
            message: ""
          },
          signOut: {
            hasError: true,
            message: "Please provide a sign out time"
          }
        }
      });
    } else {
      const eventDate = moment(eventTimes.start).format("DD/MM/YYYY");
      const signInMoment = moment(
        `${signInTime.hour.key}:${signInTime.minute.key} ${signInTime.timeOfDay
          .key} ${eventDate}`,
        "hh:mm A DD/MM/YYYY"
      );
      const signOutMoment = moment(
        `${signOutTime.hour.key}:${signOutTime.minute.key} ${signOutTime
          .timeOfDay.key} ${eventDate}`,
        "hh:mm A DD/MM/YYYY"
      );

      if (signOutMoment.isBefore(signInMoment)) {
        this.setState({
          errors: {
            signIn: {
              hasError: true,
              message: ""
            },
            signOut: {
              hasError: true,
              message: "Sign out time must be after sign in time"
            }
          }
        });
      } else if (signInMoment.isBefore(minSignInMoment)) {
        this.setState({
          errors: {
            signIn: {
              hasError: true,
              message: `Cannot sign in more than an hour before an event (starts at ${eventStartMoment.format(
                "h:mm A"
              )})`
            },
            signOut: {
              hasError: false,
              message: ""
            }
          }
        });
      } else if (signOutMoment.isAfter(maxSignOutMoment)) {
        this.setState({
          errors: {
            signIn: {
              hasError: false,
              message: ""
            },
            signOut: {
              hasError: true,
              message: `Cannot sign out more than 3 hours after an event ends (ends at ${eventEndMoment.format(
                "h:mm A"
              )})`
            }
          }
        });
      } else {
        this.setState({
          errors: {
            signIn: {
              hasError: false,
              message: ""
            },
            signOut: {
              hasError: false,
              message: ""
            }
          }
        });
        updateTimes(signInMoment.toDate(), signOutMoment.toDate());
        closeDialog();
      }
    }
  }

  render() {
    const { classes, isOpen, closeDialog, name } = this.props;
    const { errors, signInTime, signOutTime } = this.state;

    const { minutes, hours, timeOfDay } = this.getTimeOptions();
    const actions = [
      <Button colour="primary" slim handleClick={() => closeDialog()}>
        Cancel
      </Button>,
      <Button
        colour="primary"
        filled
        slim
        handleClick={() => this.validateTimes(signInTime, signOutTime)}
      >
        Update
      </Button>
    ];

    return (
      <Dialog
        isOpen={isOpen}
        heading={`Edit Times for ${name}`}
        actions={actions}
      >
        <div className={classes.headingTime}>Sign in</div>
        <div className={classes.timeInputGroupWrapper}>
          <div className={classes.timeInputWrapper}>
            <Select
              selectedItem={signInTime.hour}
              items={hours}
              validation={errors.signIn.hasError ? "error" : "default"}
              handleChange={(key, label) =>
                this.updateSignInTime(label, "hour")}
            />
          </div>
          <div className={classes.timeInputWrapper}>
            <Select
              selectedItem={signInTime.minute}
              items={minutes}
              validation={errors.signIn.hasError ? "error" : "default"}
              handleChange={(key, label) =>
                this.updateSignInTime(label, "minute")}
            />
          </div>
          <div className={classes.timeInputWrapper}>
            <Select
              selectedItem={signInTime.timeOfDay}
              items={timeOfDay}
              validation={errors.signIn.hasError ? "error" : "default"}
              handleChange={(key, label) =>
                this.updateSignInTime(label, "timeOfDay")}
            />
          </div>
        </div>
        {errors.signIn.message.length > 0 && (
          <div className={classes.errorWrapper}>{errors.signIn.message}</div>
        )}
        <div className={classes.sectionSeparator} />
        <div className={classes.headingTime}>Sign out</div>
        <div className={classes.timeInputGroupWrapper}>
          <div className={classes.timeInputWrapper}>
            <Select
              selectedItem={signOutTime.hour}
              items={hours}
              validation={errors.signOut.hasError ? "error" : "default"}
              handleChange={(key, label) =>
                this.updateSignOutTime(label, "hour")}
            />
          </div>
          <div className={classes.timeInputWrapper}>
            <Select
              selectedItem={signOutTime.minute}
              items={minutes}
              validation={errors.signOut.hasError ? "error" : "default"}
              handleChange={(key, label) =>
                this.updateSignOutTime(label, "minute")}
            />
          </div>
          <div className={classes.timeInputWrapper}>
            <Select
              selectedItem={signOutTime.timeOfDay}
              items={timeOfDay}
              validation={errors.signOut.hasError ? "error" : "default"}
              handleChange={(key, label) =>
                this.updateSignOutTime(label, "timeOfDay")}
            />
          </div>
        </div>
        {errors.signOut.message.length > 0 && (
          <div className={classes.errorWrapper}>{errors.signOut.message}</div>
        )}
      </Dialog>
    );
  }
}

export default injectSheet(styles)(EditTimesDialog);
