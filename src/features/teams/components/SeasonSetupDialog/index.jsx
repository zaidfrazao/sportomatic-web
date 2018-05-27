import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import Button from "../../../../components/Button";
import { common, grey, lightBlue, red } from "../../../../utils/colours";
import Dialog from "../../../../components/Dialog";
import Select from "../../../../components/Select";
import TextField from "../../../../components/TextField";

const styles = {
  addWrapper: {
    transition: "0.25s",
    textAlign: "center",
    fontSize: 14,
    borderRadius: 12,
    border: `2px dotted ${grey[300]}`,
    color: grey[300],
    cursor: "pointer",
    padding: 12,
    margin: 8,
    "&:hover": {
      border: `2px solid ${grey[400]}`,
      color: grey[400]
    }
  },
  divider: {
    height: 1,
    backgroundColor: grey[300],
    margin: "24px 0"
  },
  emptyState: {
    fontWeight: "bold",
    color: grey[500],
    textAlign: "center",
    padding: 24,
    margin: "24px 6px",
    borderRadius: 16,
    fontSize: 14,
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`
  },
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
  icon: {
    marginRight: 8
  },
  timeInputGroupWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  timeInputWrapper: {
    flexGrow: 1
  },
  sectionContent: {
    padding: 12,
    textAlign: "center",
    backgroundColor: grey[100],
    borderRadius: "0 0 16px 16px"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "16px 16px 0 0",
    padding: "18px 24px",
    backgroundColor: lightBlue[800],
    color: common["white"],
    border: `1px solid grey[300]`,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 16
  },
  sectionHeaderIcon: {
    transition: "0.25s",
    cursor: "pointer",
    marginLeft: 12,
    "&:hover": {
      color: red[500]
    }
  },
  sectionSeparator: {
    height: 24
  },
  sectionText: {
    margin: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: grey[800]
  },
  sectionWrapper: {
    margin: "24px 0",
    textAlign: "center",
    borderRadius: 16,
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`
  }
};

const initialState = {
  step: 1,
  nonCompetitiveEvents: [
    {
      day: "Monday",
      startTime: {
        hours: {
          key: "01",
          label: "01"
        },
        minutes: {
          key: "00",
          label: "00"
        },
        timeOfDay: {
          key: "PM",
          label: "PM"
        },
        validation: "default",
        message: ""
      },
      endTime: {
        hours: {
          key: "02",
          label: "02"
        },
        minutes: {
          key: "00",
          label: "00"
        },
        timeOfDay: {
          key: "PM",
          label: "PM"
        },
        validation: "default",
        message: ""
      }
    }
  ],
  competitiveEvents: [
    {
      day: "Tuesday",
      startTime: {
        hours: {
          key: "01",
          label: "01"
        },
        minutes: {
          key: "00",
          label: "00"
        },
        timeOfDay: {
          key: "PM",
          label: "PM"
        },
        validation: "default",
        message: ""
      },
      endTime: {
        hours: {
          key: "02",
          label: "02"
        },
        minutes: {
          key: "00",
          label: "00"
        },
        timeOfDay: {
          key: "PM",
          label: "PM"
        },
        validation: "default",
        message: ""
      }
    }
  ],
  startDate: {
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
  endDate: {
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
  dateErrors: {
    validation: "default",
    message: ""
  },
  coaches: [
    {
      id: "default",
      type: {
        key: "ME",
        label: "Me"
      },
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      payment: {
        type: {
          key: "HOURLY",
          label: "Paid per hour"
        },
        rates: {
          standard: "100.00",
          overtime: "150.00",
          nonCompetitive: "250.00",
          competitive: "500.00",
          salary: "3000.00"
        }
      }
    }
  ],
  managers: [
    {
      id: "default",
      type: {
        key: "ME",
        label: "Me"
      },
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@doe.com"
    }
  ],
  roster: [],
  startDayOptions: [],
  endDayOptions: [],
  allowMeManager: false,
  allowMeCoach: false
};

class SeasonSetupDialog extends Component {
  state = initialState;

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (isOpen !== this.props.isOpen) {
      if (isOpen) {
        const initialStartDate = moment();
        const initialEndDate = moment().add(2, "months");

        const startDayOptions = this.getDayOptions(
          initialStartDate.daysInMonth()
        );
        const endDayOptions = this.getDayOptions(initialEndDate.daysInMonth());

        this.setState({
          startDayOptions,
          endDayOptions,
          startDate: {
            day: {
              key: initialStartDate.format("DD"),
              label: initialStartDate.format("DD")
            },
            month: {
              key: initialStartDate.format("MM"),
              label: initialStartDate.format("MMM")
            },
            year: {
              key: initialStartDate.format("YYYY"),
              label: initialStartDate.format("YYYY")
            }
          },
          endDate: {
            day: {
              key: initialEndDate.format("DD"),
              label: initialEndDate.format("DD")
            },
            month: {
              key: initialEndDate.format("MM"),
              label: initialEndDate.format("MMM")
            },
            year: {
              key: initialEndDate.format("YYYY"),
              label: initialEndDate.format("YYYY")
            }
          }
        });
      } else {
        this.setState(initialState);
      }
    }
  }

  getDayOptions(numberOfDays) {
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

  getMonthOptions() {
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

    return months.map((month, index) => {
      return {
        key: (index + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        label: month
      };
    });
  }

  getYearOptions() {
    const thisYear = moment().format("YYYY");
    const nextYear = moment()
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

  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  prevStep() {
    this.setState({
      step: this.state.step - 1
    });
  }

  updateStartDate(newValue, type) {
    const { startDate } = this.state;

    if (type === "month") {
      const newDateMoment = moment(
        `${newValue.key}-${startDate.year.key}`,
        "MM-YYYY"
      );
      const daysInNewMonth = newDateMoment.daysInMonth();
      const startDayOptions = this.getDayOptions(daysInNewMonth);
      const currentDaySelected = parseInt(startDate.day.key, 10);

      let newDay = startDate.day;
      if (currentDaySelected > daysInNewMonth) {
        newDay = {
          key: moment(newDateMoment)
            .endOf("month")
            .format("DD"),
          label: moment(newDateMoment)
            .endOf("month")
            .format("DD")
        };
      }

      this.setState({
        startDayOptions,
        startDate: {
          day: newDay,
          month: newValue,
          year: startDate.year
        }
      });
    } else if (type === "year") {
      const newDateMoment = moment(
        `${startDate.month.key}-${newValue.key}`,
        "MM-YYYY"
      );
      const daysInNewMonth = newDateMoment.daysInMonth();
      const startDayOptions = this.getDayOptions(daysInNewMonth);
      const currentDaySelected = parseInt(startDate.day.key, 10);

      let newDay = startDate.day;
      if (currentDaySelected > daysInNewMonth) {
        newDay = {
          key: moment(newDateMoment)
            .endOf("month")
            .format("DD"),
          label: moment(newDateMoment)
            .endOf("month")
            .format("DD")
        };
      }

      this.setState({
        startDayOptions,
        startDate: {
          day: newDay,
          month: startDate.month,
          year: newValue
        }
      });
    } else {
      this.setState({
        startDate: {
          ...this.state.startDate,
          [type]: newValue
        }
      });
    }
  }

  updateEndDate(newValue, type) {
    const { endDate } = this.state;

    if (type === "month") {
      const newDateMoment = moment(
        `${newValue.key}-${endDate.year.key}`,
        "MM-YYYY"
      );
      const daysInNewMonth = newDateMoment.daysInMonth();
      const endDayOptions = this.getDayOptions(daysInNewMonth);
      const currentDaySelected = parseInt(endDate.day.key, 10);

      let newDay = endDate.day;
      if (currentDaySelected > daysInNewMonth) {
        newDay = {
          key: moment(newDateMoment)
            .endOf("month")
            .format("DD"),
          label: moment(newDateMoment)
            .endOf("month")
            .format("DD")
        };
      }

      this.setState({
        endDayOptions,
        endDate: {
          day: newDay,
          month: newValue,
          year: endDate.year
        }
      });
    } else if (type === "year") {
      const newDateMoment = moment(
        `${endDate.month.key}-${newValue.key}`,
        "MM-YYYY"
      );
      const daysInNewMonth = newDateMoment.daysInMonth();
      const endDayOptions = this.getDayOptions(daysInNewMonth);
      const currentDaySelected = parseInt(endDate.day.key, 10);

      let newDay = endDate.day;
      if (currentDaySelected > daysInNewMonth) {
        newDay = {
          key: moment(newDateMoment)
            .endOf("month")
            .format("DD"),
          label: moment(newDateMoment)
            .endOf("month")
            .format("DD")
        };
      }

      this.setState({
        endDayOptions,
        endDate: {
          day: newDay,
          month: endDate.month,
          year: newValue
        }
      });
    } else {
      this.setState({
        endDate: {
          ...this.state.endDate,
          [type]: newValue
        }
      });
    }
  }

  renderDates() {
    const { classes } = this.props;
    const {
      startDate,
      endDate,
      dateErrors,
      startDayOptions,
      endDayOptions
    } = this.state;

    const monthOptions = this.getMonthOptions();
    const yearOptions = this.getYearOptions();

    return (
      <div>
        <div className={classes.headingTime}>Dates</div>
        <div className={classes.sectionWrapper}>
          <div className={classes.sectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={startDate.day}
                  items={startDayOptions}
                  validation={dateErrors.validation}
                  handleChange={(key, label) =>
                    this.updateStartDate({ key, label }, "day")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={startDate.month}
                  items={monthOptions}
                  validation={dateErrors.validation}
                  handleChange={(key, label) =>
                    this.updateStartDate({ key, label }, "month")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={startDate.year}
                  items={yearOptions}
                  validation={dateErrors.validation}
                  handleChange={(key, label) =>
                    this.updateStartDate({ key, label }, "year")}
                />
              </div>
            </div>
            <span className={classes.sectionText}>to</span>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={endDate.day}
                  items={endDayOptions}
                  validation={dateErrors.validation}
                  handleChange={(key, label) =>
                    this.updateEndDate({ key, label }, "day")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={endDate.month}
                  items={monthOptions}
                  validation={dateErrors.validation}
                  handleChange={(key, label) =>
                    this.updateEndDate({ key, label }, "month")}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  selectedItem={endDate.year}
                  items={yearOptions}
                  validation={dateErrors.validation}
                  handleChange={(key, label) =>
                    this.updateEndDate({ key, label }, "year")}
                />
              </div>
            </div>
            {dateErrors.validation === "error" && (
              <div className={classes.errorWrapper}>{dateErrors.message}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  addNonCompetitive() {
    const { nonCompetitiveEvents } = this.state;

    this.setState({
      nonCompetitiveEvents: [
        ...nonCompetitiveEvents,
        initialState.nonCompetitiveEvents[0]
      ]
    });
  }

  removeNonCompetitive(removeIndex) {
    const { nonCompetitiveEvents } = this.state;

    let newEvents = new Array(...nonCompetitiveEvents);
    _.pullAt(newEvents, [removeIndex]);

    this.setState({
      nonCompetitiveEvents: newEvents
    });
  }

  addCompetitive() {
    const { competitiveEvents } = this.state;

    this.setState({
      competitiveEvents: [
        ...competitiveEvents,
        initialState.competitiveEvents[0]
      ]
    });
  }

  removeCompetitive(removeIndex) {
    const { competitiveEvents } = this.state;

    let newEvents = new Array(...competitiveEvents);
    _.pullAt(newEvents, [removeIndex]);

    this.setState({
      competitiveEvents: newEvents
    });
  }

  addManager() {
    const { managers } = this.state;

    this.setState({
      managers: [
        ...managers,
        {
          id: "",
          type: {
            key: "CURRENT",
            label: "Current community member"
          },
          firstName: "",
          lastName: "",
          email: ""
        }
      ]
    });
  }

  removeManager(removeIndex) {
    const { managers } = this.state;

    let newManagers = new Array(...managers);
    _.pullAt(newManagers, [removeIndex]);

    this.setState({
      managers: newManagers
    });
  }

  addCoaches() {
    const { coaches } = this.state;

    this.setState({
      coaches: [
        ...coaches,
        {
          id: "",
          type: {
            key: "CURRENT",
            label: "Current community member"
          },
          firstName: "",
          lastName: "",
          email: ""
        }
      ]
    });
  }

  removeCoach(removeIndex) {
    const { coaches } = this.state;

    let newCoaches = new Array(...coaches);
    _.pullAt(newCoaches, [removeIndex]);

    this.setState({
      coaches: newCoaches
    });
  }

  getDayOfWeekOptions() {
    return [
      {
        key: "Sunday",
        label: "Sunday"
      },
      {
        key: "Monday",
        label: "Monday"
      },
      {
        key: "Tuesday",
        label: "Tuesday"
      },
      {
        key: "Wednesday",
        label: "Wednesday"
      },
      {
        key: "Thursday",
        label: "Thursday"
      },
      {
        key: "Friday",
        label: "Friday"
      },
      {
        key: "Saturday",
        label: "Saturday"
      }
    ];
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

  updateNonCompetitive(newValue, type, changeIndex, isTime, timeType) {
    const { nonCompetitiveEvents } = this.state;

    this.setState({
      nonCompetitiveEvents: nonCompetitiveEvents.map((value, index) => {
        if (isTime) {
          if (index === changeIndex) {
            return {
              ...value,
              [type]: {
                ...value[type],
                [timeType]: newValue
              }
            };
          } else {
            return value;
          }
        } else {
          if (index === changeIndex) {
            return {
              ...value,
              [type]: newValue.label
            };
          } else {
            return value;
          }
        }
      })
    });
  }

  updateCompetitive(newValue, type, changeIndex, isTime, timeType) {
    const { competitiveEvents } = this.state;

    this.setState({
      competitiveEvents: competitiveEvents.map((value, index) => {
        if (isTime) {
          if (index === changeIndex) {
            return {
              ...value,
              [type]: {
                ...value[type],
                [timeType]: newValue
              }
            };
          } else {
            return value;
          }
        } else {
          if (index === changeIndex) {
            return {
              ...value,
              [type]: newValue.label
            };
          } else {
            return value;
          }
        }
      })
    });
  }

  getTimeHeaderText(info) {
    return `${info.day.slice(0, 3)}, ${info.startTime.hours.label}:${info
      .startTime.minutes.label} ${info.startTime.timeOfDay.label} - ${info
      .endTime.hours.label}:${info.endTime.minutes.label} ${info.endTime
      .timeOfDay.label}`;
  }

  getNonCompetitiveEvents() {
    const { classes } = this.props;
    const { nonCompetitiveEvents, dateErrors } = this.state;

    const dayOfWeekOptions = this.getDayOfWeekOptions();
    const hourOptions = this.getHourOptions();
    const minuteOptions = this.getMinuteOptions();

    return nonCompetitiveEvents.map((info, index) => {
      const headerText = this.getTimeHeaderText(info);

      return (
        <div
          key={`practices-${info.day}-${index}`}
          className={classes.sectionWrapper}
        >
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            <i
              className={`fas fa-times ${classes.sectionHeaderIcon}`}
              onClick={() => this.removeNonCompetitive(index)}
            />
          </div>
          <div className={classes.sectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={dayOfWeekOptions}
                  selectedItem={{ key: info.day, label: info.day }}
                  handleChange={(key, label) =>
                    this.updateNonCompetitive(
                      { key, label },
                      "day",
                      index,
                      false
                    )}
                />
              </div>
            </div>
            <span className={classes.sectionText}>from</span>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={hourOptions}
                  selectedItem={info.startTime.hours}
                  handleChange={(key, label) =>
                    this.updateNonCompetitive(
                      { key, label },
                      "startTime",
                      index,
                      true,
                      "hours"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={minuteOptions}
                  selectedItem={info.startTime.minutes}
                  handleChange={(key, label) =>
                    this.updateNonCompetitive(
                      { key, label },
                      "startTime",
                      index,
                      true,
                      "minutes"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
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
                  selectedItem={info.startTime.timeOfDay}
                  handleChange={(key, label) =>
                    this.updateNonCompetitive(
                      { key, label },
                      "startTime",
                      index,
                      true,
                      "timeOfDay"
                    )}
                />
              </div>
            </div>
            <span className={classes.sectionText}>to</span>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={hourOptions}
                  selectedItem={info.endTime.hours}
                  handleChange={(key, label) =>
                    this.updateNonCompetitive(
                      { key, label },
                      "endTime",
                      index,
                      true,
                      "hours"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={minuteOptions}
                  selectedItem={info.endTime.minutes}
                  handleChange={(key, label) =>
                    this.updateNonCompetitive(
                      { key, label },
                      "endTime",
                      index,
                      true,
                      "minutes"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
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
                  selectedItem={info.endTime.timeOfDay}
                  handleChange={(key, label) =>
                    this.updateNonCompetitive(
                      { key, label },
                      "endTime",
                      index,
                      true,
                      "timeOfDay"
                    )}
                />
              </div>
            </div>
            {dateErrors.validation === "error" && (
              <div className={classes.errorWrapper}>{dateErrors.message}</div>
            )}
          </div>
        </div>
      );
    });
  }

  renderNonCompetitiveEvents() {
    const { classes } = this.props;

    const events = this.getNonCompetitiveEvents();

    return (
      <div>
        <div className={classes.headingTime}>Practice Times</div>
        {events.length === 0 ? (
          <div className={classes.emptyState}>No practices this season</div>
        ) : (
          events
        )}
        <div
          className={classes.addWrapper}
          onClick={() => this.addNonCompetitive()}
        >
          <i className={`fas fa-plus ${classes.icon}`} />Add a practice time
        </div>
      </div>
    );
  }

  getCompetitiveEvents() {
    const { classes } = this.props;
    const { competitiveEvents, dateErrors } = this.state;

    const dayOfWeekOptions = this.getDayOfWeekOptions();
    const hourOptions = this.getHourOptions();
    const minuteOptions = this.getMinuteOptions();

    return competitiveEvents.map((info, index) => {
      const headerText = this.getTimeHeaderText(info);

      return (
        <div
          key={`matches-${info.day}-${index}`}
          className={classes.sectionWrapper}
        >
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            <i
              className={`fas fa-times ${classes.sectionHeaderIcon}`}
              onClick={() => this.removeCompetitive(index)}
            />
          </div>
          <div className={classes.sectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={dayOfWeekOptions}
                  selectedItem={{ key: info.day, label: info.day }}
                  handleChange={(key, label) =>
                    this.updateCompetitive({ key, label }, "day", index, false)}
                />
              </div>
            </div>
            <span className={classes.sectionText}>from</span>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={hourOptions}
                  selectedItem={info.startTime.hours}
                  handleChange={(key, label) =>
                    this.updateCompetitive(
                      { key, label },
                      "startTime",
                      index,
                      true,
                      "hours"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={minuteOptions}
                  selectedItem={info.startTime.minutes}
                  handleChange={(key, label) =>
                    this.updateCompetitive(
                      { key, label },
                      "startTime",
                      index,
                      true,
                      "minutes"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
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
                  selectedItem={info.startTime.timeOfDay}
                  handleChange={(key, label) =>
                    this.updateCompetitive(
                      { key, label },
                      "startTime",
                      index,
                      true,
                      "timeOfDay"
                    )}
                />
              </div>
            </div>
            <span className={classes.sectionText}>to</span>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={hourOptions}
                  selectedItem={info.endTime.hours}
                  handleChange={(key, label) =>
                    this.updateCompetitive(
                      { key, label },
                      "endTime",
                      index,
                      true,
                      "hours"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={minuteOptions}
                  selectedItem={info.endTime.minutes}
                  handleChange={(key, label) =>
                    this.updateCompetitive(
                      { key, label },
                      "endTime",
                      index,
                      true,
                      "minutes"
                    )}
                />
              </div>
              <div className={classes.timeInputWrapper}>
                <Select
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
                  selectedItem={info.endTime.timeOfDay}
                  handleChange={(key, label) =>
                    this.updateCompetitive(
                      { key, label },
                      "endTime",
                      index,
                      true,
                      "timeOfDay"
                    )}
                />
              </div>
            </div>
            {dateErrors.validation === "error" && (
              <div className={classes.errorWrapper}>{dateErrors.message}</div>
            )}
          </div>
        </div>
      );
    });
  }

  renderCompetitiveEvents() {
    const { classes } = this.props;

    const events = this.getCompetitiveEvents();

    return (
      <div>
        <div className={classes.headingTime}>Match Times</div>
        {events.length === 0 ? (
          <div className={classes.emptyState}>No matches this season</div>
        ) : (
          events
        )}
        <div
          className={classes.addWrapper}
          onClick={() => this.addCompetitive()}
        >
          <i className={`fas fa-plus ${classes.icon}`} />Add a match time
        </div>
      </div>
    );
  }

  getNameHeaderText(info) {
    return `${info.firstName} ${info.lastName}`;
  }

  getPersonTypes(allowMe) {
    if (allowMe) {
      return [
        {
          key: "ME",
          label: "Me"
        },
        {
          key: "CURRENT",
          label: "Current community member"
        },
        {
          key: "NEW",
          label: "Invite new person"
        }
      ];
    } else {
      return [
        {
          key: "CURRENT",
          label: "Current community member"
        },
        {
          key: "NEW",
          label: "Invite new person"
        }
      ];
    }
  }

  getManagers() {
    const { classes } = this.props;
    const { managers, dateErrors, allowMeManager } = this.state;

    return managers.map((info, index) => {
      const headerText = this.getNameHeaderText(info);
      const typeOptions = this.getPersonTypes(allowMeManager);

      return (
        <div key={`managers-${info.id}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            {index !== 0 && (
              <i
                className={`fas fa-times ${classes.sectionHeaderIcon}`}
                onClick={() => this.removeManager(index)}
              />
            )}
          </div>
          <div className={classes.sectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select items={typeOptions} selectedItem={info.type} />
              </div>
            </div>
            {dateErrors.validation === "error" && (
              <div className={classes.errorWrapper}>{dateErrors.message}</div>
            )}
          </div>
        </div>
      );
    });
  }

  renderManagers() {
    const { classes } = this.props;

    const managers = this.getManagers();

    return (
      <div>
        <div className={classes.headingTime}>Managers</div>
        {managers}
        <div className={classes.addWrapper} onClick={() => this.addManager()}>
          <i className={`fas fa-plus ${classes.icon}`} />Add a manager
        </div>
      </div>
    );
  }

  getPaymentOptions() {
    return [
      {
        key: "HOURLY",
        label: "Paid per hour"
      },
      {
        key: "FIXED",
        label: "Paid fixed amount per session"
      },
      {
        key: "MONTHLY",
        label: "Paid salary per month"
      },
      {
        key: "N/A",
        label: "Don't track wages"
      }
    ];
  }

  updatePaymentAmount(changeIndex, type, amount) {
    const { coaches } = this.state;

    this.setState({
      coaches: coaches.map((value, index) => {
        if (index === changeIndex) {
          return {
            ...value,
            payment: {
              ...value.payment,
              rates: {
                ...value.payment.rates,
                [type]: amount
              }
            }
          };
        } else {
          return value;
        }
      })
    });
  }

  updatePaymentType(changeIndex, newValue) {
    const { coaches } = this.state;

    this.setState({
      coaches: coaches.map((value, index) => {
        if (index === changeIndex) {
          return {
            ...value,
            payment: {
              ...value.payment,
              type: newValue
            }
          };
        } else {
          return value;
        }
      })
    });
  }

  getCoaches() {
    const { classes } = this.props;
    const { coaches, dateErrors, allowMeCoach } = this.state;

    const paymentOptions = this.getPaymentOptions();

    return coaches.map((info, index) => {
      const headerText = this.getNameHeaderText(info);
      const typeOptions = this.getPersonTypes(allowMeCoach);

      return (
        <div key={`coaches-${info.id}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            {index !== 0 && (
              <i
                className={`fas fa-times ${classes.sectionHeaderIcon}`}
                onClick={() => this.removeCoach(index)}
              />
            )}
          </div>
          <div className={classes.sectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select items={typeOptions} selectedItem={info.type} />
              </div>
            </div>
            <div className={classes.divider} />
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={paymentOptions}
                  selectedItem={info.payment.type}
                  handleChange={(key, label) =>
                    this.updatePaymentType(index, { key, label })}
                />
              </div>
            </div>
            {info.payment.type.key === "HOURLY" && (
              <div className={classes.sectionText}>Standard rate</div>
            )}
            {info.payment.type.key === "HOURLY" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    type="number"
                    placeholder="0.00"
                    value={info.payment.rates.standard}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "standard", newValue)}
                    step={10}
                    max={1000}
                  />
                </div>
              </div>
            )}
            {info.payment.type.key === "HOURLY" && (
              <div className={classes.sectionText}>Overtime rate</div>
            )}
            {info.payment.type.key === "HOURLY" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    type="number"
                    placeholder="0.00"
                    value={info.payment.rates.overtime}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "overtime", newValue)}
                    step={10}
                    max={1000}
                  />
                </div>
              </div>
            )}
            {info.payment.type.key === "FIXED" && (
              <div className={classes.sectionText}>Wage per practice</div>
            )}
            {info.payment.type.key === "FIXED" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    type="number"
                    placeholder="0.00"
                    value={info.payment.rates.nonCompetitive}
                    handleChange={newValue =>
                      this.updatePaymentAmount(
                        index,
                        "nonCompetitive",
                        newValue
                      )}
                    step={10}
                    max={10000}
                  />
                </div>
              </div>
            )}
            {info.payment.type.key === "FIXED" && (
              <div className={classes.sectionText}>Wage per match</div>
            )}
            {info.payment.type.key === "FIXED" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    type="number"
                    placeholder="0.00"
                    value={info.payment.rates.competitive}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "competitive", newValue)}
                    step={10}
                    max={10000}
                  />
                </div>
              </div>
            )}
            {info.payment.type.key === "MONTHLY" && (
              <div className={classes.sectionText}>Salary per month</div>
            )}
            {info.payment.type.key === "MONTHLY" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    type="number"
                    placeholder="0.00"
                    value={info.payment.rates.salary}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "salary", newValue)}
                    step={500}
                    max={1000000}
                  />
                </div>
              </div>
            )}
            {dateErrors.validation === "error" && (
              <div className={classes.errorWrapper}>{dateErrors.message}</div>
            )}
          </div>
        </div>
      );
    });
  }

  renderCoaches() {
    const { classes } = this.props;

    const coaches = this.getCoaches();

    return (
      <div>
        <div className={classes.headingTime}>Coaches</div>
        {coaches}
        <div className={classes.addWrapper} onClick={() => this.addCoach()}>
          <i className={`fas fa-plus ${classes.icon}`} />Add a coach
        </div>
      </div>
    );
  }

  getActionButtons() {
    const { closeDialog } = this.props;
    const { step } = this.state;

    switch (step) {
      case 1:
        return [
          <Button colour="primary" slim handleClick={() => closeDialog()}>
            Cancel
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => this.nextStep()}
          >
            Next
          </Button>
        ];
      case 5:
        return [
          <Button colour="primary" slim handleClick={() => this.prevStep()}>
            Back
          </Button>,
          <Button colour="primary" filled slim>
            Create season
          </Button>
        ];
      default:
        return [
          <Button colour="primary" slim handleClick={() => this.prevStep()}>
            Back
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => this.nextStep()}
          >
            Next
          </Button>
        ];
    }
  }

  render() {
    const { isOpen } = this.props;
    const { step } = this.state;

    const actions = this.getActionButtons();
    let content = <div />;

    switch (step) {
      case 1:
        content = this.renderDates();
        break;
      case 2:
        content = this.renderNonCompetitiveEvents();
        break;
      case 3:
        content = this.renderCompetitiveEvents();
        break;
      case 4:
        content = this.renderManagers();
        break;
      case 5:
        content = this.renderCoaches();
        break;
      default:
        content = this.renderDates();
        break;
    }

    return (
      <Dialog
        isOpen={isOpen}
        heading="Set Up Season"
        actions={actions}
        hasSteps
        numberOfSteps={5}
        currentStep={step}
      >
        {content}
      </Dialog>
    );
  }
}

export default injectSheet(styles)(SeasonSetupDialog);
