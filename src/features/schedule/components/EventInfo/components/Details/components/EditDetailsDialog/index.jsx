import React, { Component } from "react";
import injectSheet from "react-jss";
import moment from "moment-timezone";
import Button from "../../../../../../../../components/Button";
import { common, red } from "../../../../../../../../utils/colours";
import Dialog from "../../../../../../../../components/Dialog";
import Select from "../../../../../../../../components/Select";
import TextArea from "../../../../../../../../components/TextArea";
import TextField from "../../../../../../../../components/TextField";

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
    display: "flex",
    flexWrap: "wrap"
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
      times: {
        validation: "default",
        message: ""
      }
    },
    date: {
      day: {
        key: "unknown",
        label: "--"
      },
      month: {
        key: "unknown",
        label: "--"
      },
      year: {
        key: "unknown",
        label: "--"
      }
    },
    startsAt: {
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
    endsAt: {
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
    homeAway: {
      key: "HOME",
      label: "Home"
    },
    dayOptions: [],
    venue: "",
    notes: ""
  };

  componentWillMount() {
    const { info } = this.props;

    const date = moment(info.date);
    const startsAt = moment(info.startsAt);
    const endsAt = moment(info.endsAt);
    const homeAway = info.homeAway;
    const venue = info.venue;
    const notes = info.notes;
    const dayOptions = this.getDayOptions(date.daysInMonth(), true);

    this.setState({
      dayOptions,
      venue,
      notes,
      errors: {
        times: {
          validation: "default",
          message: ""
        }
      },
      date: {
        day: {
          key: date.format("DD"),
          label: date.format("DD")
        },
        month: {
          key: date.format("MM"),
          label: date.format("MMM")
        },
        year: {
          key: date.format("YYYY"),
          label: date.format("YYYY")
        }
      },
      startsAt: {
        hour: {
          key: startsAt.format("hh"),
          label: startsAt.format("hh")
        },
        minute: {
          key: startsAt.format("mm"),
          label: startsAt.format("mm")
        },
        timeOfDay: {
          key: startsAt.format("A"),
          label: startsAt.format("A")
        }
      },
      endsAt: {
        hour: {
          key: endsAt.format("hh"),
          label: endsAt.format("hh")
        },
        minute: {
          key: endsAt.format("mm"),
          label: endsAt.format("mm")
        },
        timeOfDay: {
          key: endsAt.format("A"),
          label: endsAt.format("A")
        }
      },
      homeAway: {
        key: homeAway === "HOME" ? "HOME" : "AWAY",
        label: homeAway === "HOME" ? "Home" : "Away"
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, info } = nextProps;

    if (info !== this.props.info || (isOpen && isOpen !== this.props.isOpen)) {
      const { info } = nextProps;

      const date = moment(info.date);
      const startsAt = moment(info.startsAt);
      const endsAt = moment(info.endsAt);
      const homeAway = info.homeAway;
      const venue = info.venue;
      const notes = info.notes;
      const dayOptions = this.getDayOptions(date.daysInMonth(), true);

      this.setState({
        dayOptions,
        venue,
        notes,
        errors: {
          times: {
            validation: "default",
            message: ""
          }
        },
        date: {
          day: {
            key: date.format("DD"),
            label: date.format("DD")
          },
          month: {
            key: date.format("MM"),
            label: date.format("MMM")
          },
          year: {
            key: date.format("YYYY"),
            label: date.format("YYYY")
          }
        },
        startsAt: {
          hour: {
            key: startsAt.format("hh"),
            label: startsAt.format("hh")
          },
          minute: {
            key: startsAt.format("mm"),
            label: startsAt.format("mm")
          },
          timeOfDay: {
            key: startsAt.format("A"),
            label: startsAt.format("A")
          }
        },
        endsAt: {
          hour: {
            key: endsAt.format("hh"),
            label: endsAt.format("hh")
          },
          minute: {
            key: endsAt.format("mm"),
            label: endsAt.format("mm")
          },
          timeOfDay: {
            key: endsAt.format("A"),
            label: endsAt.format("A")
          }
        },
        homeAway: {
          key: homeAway === "HOME" ? "HOME" : "AWAY",
          label: homeAway === "HOME" ? "Home" : "Away"
        }
      });
    }
  }

  getHourOptions() {
    return Array(12)
      .fill(1)
      .map((value, index) => {
        const hour = index + 1;
        return {
          key: hour.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
          label: hour.toLocaleString("en-US", {
            minimumIntegerDigits: 2
          })
        };
      });
  }

  getMinuteOptions() {
    return Array(12)
      .fill(1)
      .map((value, index) => {
        const minute = index * 5;
        return {
          key: minute.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
          label: minute.toLocaleString("en-US", {
            minimumIntegerDigits: 2
          })
        };
      });
  }

  updateStartTime(newValue, type) {
    const { startsAt } = this.state;

    this.setState({
      startsAt: {
        ...startsAt,
        [type]: {
          key: newValue,
          label: newValue
        }
      }
    });
  }

  updateEndTime(newValue, type) {
    const { endsAt } = this.state;

    this.setState({
      endsAt: {
        ...endsAt,
        [type]: {
          key: newValue,
          label: newValue
        }
      }
    });
  }

  updateHomeAway(newValue) {
    this.setState({
      homeAway: newValue
    });
  }

  updateVenue(newValue) {
    this.setState({
      venue: newValue
    });
  }

  updateNotes(newValue) {
    this.setState({
      notes: newValue
    });
  }

  getDayOptions(numberOfDays, isThisMonth) {
    const currentDay = moment()
      .tz("Africa/Johannesburg")
      .date();

    if (isThisMonth) {
      return Array(numberOfDays - currentDay)
        .fill(1)
        .map((value, index) => {
          const day = currentDay + index;
          return {
            key: day.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
            label: day.toLocaleString("en-US", { minimumIntegerDigits: 2 })
          };
        });
    } else {
      return Array(numberOfDays)
        .fill(1)
        .map((value, index) => {
          const day = index + 1;
          return {
            key: day.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
            label: day.toLocaleString("en-US", { minimumIntegerDigits: 2 })
          };
        });
    }
  }

  getMonthOptions(isThisYear) {
    const currentMonth = moment()
      .tz("Africa/Johannesburg")
      .month();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    if (isThisYear) {
      return months
        .filter((month, index) => index >= currentMonth)
        .map((month, index) => {
          return {
            key: (currentMonth + index + 1).toLocaleString("en-US", {
              minimumIntegerDigits: 2
            }),
            label: month
          };
        });
    } else {
      return months.map((month, index) => {
        return {
          key: (index + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 }),
          label: month
        };
      });
    }
  }

  getYearOptions() {
    const thisYear = moment()
      .tz("Africa/Johannesburg")
      .format("YYYY");
    const nextYear = moment()
      .tz("Africa/Johannesburg")
      .add(1, "year")
      .format("YYYY");
    const years = [thisYear, nextYear];

    return years.map(year => {
      return {
        key: year,
        label: year
      };
    });
  }

  updateDate(newValue, type) {
    const { date } = this.state;

    if (type === "month") {
      const newDateMoment = moment(
        `${newValue.key}-${date.year.key}`,
        "MM-YYYY"
      ).tz("Africa/Johannesburg");
      const daysInNewMonth = newDateMoment.daysInMonth();
      const isThisMonth =
        newDateMoment.format("MM-YYYY") ===
        moment()
          .tz("Africa/Johannesburg")
          .format("MM-YYYY");
      const dayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(date.day.key, 10);

      let newDay = date.day;
      if (
        isThisMonth &&
        currentDaySelected <
          moment()
            .tz("Africa/Johannesburg")
            .date()
      ) {
        newDay = {
          key: moment()
            .tz("Africa/Johannesburg")
            .format("DD"),
          label: moment()
            .tz("Africa/Johannesburg")
            .format("DD")
        };
      } else if (currentDaySelected > daysInNewMonth) {
        newDay = {
          key: moment(newDateMoment)
            .tz("Africa/Johannesburg")
            .endOf("month")
            .format("DD"),
          label: moment(newDateMoment)
            .tz("Africa/Johannesburg")
            .endOf("month")
            .format("DD")
        };
      }

      this.setState({
        dayOptions,
        date: {
          day: newDay,
          month: newValue,
          year: date.year
        }
      });
    } else if (type === "year") {
      const newDateMoment = moment(
        `${date.month.key}-${newValue.key}`,
        "MM-YYYY"
      ).tz("Africa/Johannesburg");
      const daysInNewMonth = newDateMoment.daysInMonth();
      const isThisMonth =
        newDateMoment.format("MM-YYYY") ===
        moment()
          .tz("Africa/Johannesburg")
          .format("MM-YYYY");
      const isThisYear =
        newDateMoment.format("YYYY") ===
        moment()
          .tz("Africa/Johannesburg")
          .format("YYYY");
      const dayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const monthOptions = this.getMonthOptions(isThisYear);
      const currentDaySelected = parseInt(date.day.key, 10);
      const currentMonthSelected = parseInt(date.month.key, 10);
      const currentMonth = parseInt(
        moment()
          .tz("Africa/Johannesburg")
          .format("MM"),
        10
      );

      let newDay = date.day;
      let newMonth = date.month;
      if (
        isThisMonth &&
        currentDaySelected <
          moment()
            .tz("Africa/Johannesburg")
            .date()
      ) {
        newDay = {
          key: moment()
            .tz("Africa/Johannesburg")
            .format("DD"),
          label: moment()
            .tz("Africa/Johannesburg")
            .format("DD")
        };
      } else if (currentDaySelected > daysInNewMonth) {
        newDay = {
          key: moment(newDateMoment)
            .tz("Africa/Johannesburg")
            .endOf("month")
            .format("DD"),
          label: moment(newDateMoment)
            .tz("Africa/Johannesburg")
            .endOf("month")
            .format("DD")
        };
      } else if (isThisYear && currentMonthSelected < currentMonth) {
        newDay = {
          key: moment(newDateMoment)
            .tz("Africa/Johannesburg")
            .endOf("month")
            .format("DD"),
          label: moment(newDateMoment)
            .tz("Africa/Johannesburg")
            .endOf("month")
            .format("DD")
        };
        newMonth = {
          key: moment()
            .tz("Africa/Johannesburg")
            .format("MM"),
          label: moment()
            .tz("Africa/Johannesburg")
            .format("MMM")
        };
      }

      this.setState({
        dayOptions,
        monthOptions,
        date: {
          day: newDay,
          month: newMonth,
          year: newValue
        }
      });
    } else {
      this.setState({
        date: {
          ...this.state.date,
          [type]: newValue
        }
      });
    }
  }

  validateTimes(date, startsAt, endsAt) {
    const startMoment = moment(
      `${date.day.key}/${date.month.key}/${date.year.key} ${startsAt.hour
        .key}:${startsAt.minute.key} ${startsAt.timeOfDay.key}`,
      "DD/MM/YYYY hh:mm A"
    );
    const endMoment = moment(
      `${date.day.key}/${date.month.key}/${date.year.key} ${endsAt.hour
        .key}:${endsAt.minute.key} ${endsAt.timeOfDay.key}`,
      "DD/MM/YYYY hh:mm A"
    );

    if (startMoment.isAfter(endMoment)) {
      this.setState({
        errors: {
          times: {
            validation: "error",
            message: "The start time must be before the end time."
          }
        }
      });
      return false;
    } else {
      this.setState({
        errors: {
          times: {
            validation: "default",
            message: ""
          }
        }
      });
      return true;
    }
  }

  editDetails() {
    const { editDetails } = this.props;
    const { date, startsAt, endsAt, homeAway, venue, notes } = this.state;

    const start = moment(
      `${date.day.key}/${date.month.key}/${date.year.key} ${startsAt.hour
        .key}:${startsAt.minute.key} ${startsAt.timeOfDay.key}`,
      "DD/MM/YYYY hh:mm A"
    ).toDate();
    const end = moment(
      `${date.day.key}/${date.month.key}/${date.year.key} ${endsAt.hour
        .key}:${endsAt.minute.key} ${endsAt.timeOfDay.key}`,
      "DD/MM/YYYY hh:mm A"
    ).toDate();

    editDetails({ start, end }, homeAway.key, venue, notes);
  }

  render() {
    const {
      classes,
      isOpen,
      closeDialog,
      isCompetitive,
      info,
      isLoading
    } = this.props;
    const {
      errors,
      date,
      startsAt,
      endsAt,
      homeAway,
      venue,
      notes,
      dayOptions
    } = this.state;

    const isDateThisYear =
      date.year.label ===
      moment()
        .tz("Africa/Johannesburg")
        .format("YYYY");
    const monthOptions = this.getMonthOptions(isDateThisYear);
    const yearOptions = this.getYearOptions();
    const hourOptions = this.getHourOptions();
    const minuteOptions = this.getMinuteOptions();
    const isUpcoming = moment().isBefore(moment(info.startsAt));

    const actions = [
      <Button
        disabled={isLoading}
        colour="primary"
        slim
        handleClick={() => closeDialog()}
      >
        Cancel
      </Button>,
      <Button
        loading={isLoading}
        colour="primary"
        filled
        slim
        handleClick={() => {
          const isValid = this.validateTimes(date, startsAt, endsAt);
          isValid && this.editDetails();
        }}
      >
        Update
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading="Edit Details" actions={actions}>
        {isUpcoming && (
          <div>
            <div className={classes.headingTime}>Date</div>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={date.day}
                  items={dayOptions}
                  handleChange={(key, label) =>
                    this.updateDate({ key, label }, "day")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={date.month}
                  items={monthOptions}
                  handleChange={(key, label) =>
                    this.updateDate({ key, label }, "month")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={date.year}
                  items={yearOptions}
                  handleChange={(key, label) =>
                    this.updateDate({ key, label }, "year")}
                />
              </div>
            </div>
            <div className={classes.sectionSeparator} />
            <div className={classes.headingTime}>Starts at</div>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={startsAt.hour}
                  items={hourOptions}
                  validation={errors.times.validation}
                  handleChange={(key, label) =>
                    this.updateStartTime(key, "hour")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={startsAt.minute}
                  items={minuteOptions}
                  validation={errors.times.validation}
                  handleChange={(key, label) =>
                    this.updateStartTime(key, "minute")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={startsAt.timeOfDay}
                  validation={errors.times.validation}
                  items={[
                    {
                      key: "AM",
                      label: "AM"
                    },
                    {
                      key: "PM",
                      label: "PM"
                    }
                  ]}
                  handleChange={(key, label) =>
                    this.updateStartTime(key, "timeOfDay")}
                />
              </div>
            </div>
            <div className={classes.sectionSeparator} />
            <div className={classes.headingTime}>Ends at</div>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={endsAt.hour}
                  items={hourOptions}
                  validation={errors.times.validation}
                  handleChange={(key, label) => this.updateEndTime(key, "hour")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={endsAt.minute}
                  items={minuteOptions}
                  validation={errors.times.validation}
                  handleChange={(key, label) =>
                    this.updateEndTime(key, "minute")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={endsAt.timeOfDay}
                  validation={errors.times.validation}
                  items={[
                    {
                      key: "AM",
                      label: "AM"
                    },
                    {
                      key: "PM",
                      label: "PM"
                    }
                  ]}
                  handleChange={(key, label) =>
                    this.updateEndTime(key, "timeOfDay")}
                />
              </div>
            </div>
            {errors.times.message.length > 0 && (
              <div className={classes.errorWrapper}>{errors.times.message}</div>
            )}
          </div>
        )}
        {isCompetitive && (
          <div>
            <div className={classes.sectionSeparator} />
            <div className={classes.headingTime}>Home or Away</div>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={homeAway}
                  items={[
                    {
                      key: "HOME",
                      label: "Home"
                    },
                    {
                      key: "AWAY",
                      label: "Away"
                    }
                  ]}
                  handleChange={(key, label) =>
                    this.updateHomeAway({ key, label })}
                />
              </div>
            </div>
          </div>
        )}
        {isUpcoming && <div className={classes.sectionSeparator} />}
        <div className={classes.headingTime}>Venue</div>
        <div className={classes.timeInputGroupWrapper}>
          <div className={classes.timeInputWrapper}>
            <TextField
              value={venue}
              placeholder="No venue given"
              handleChange={newValue => this.updateVenue(newValue)}
            />
          </div>
        </div>
        <div className={classes.sectionSeparator} />
        <div className={classes.headingTime}>Notes</div>
        <div className={classes.timeInputGroupWrapper}>
          <div className={classes.timeInputWrapper}>
            <TextArea
              rows={3}
              value={notes}
              placeholder="No notes given"
              handleChange={newValue => this.updateNotes(newValue)}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default injectSheet(styles)(EditTimesDialog);
