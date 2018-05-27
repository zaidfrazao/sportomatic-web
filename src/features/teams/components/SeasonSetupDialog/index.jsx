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
    maxWidth: 398,
    margin: "8px auto",
    transition: "0.25s",
    textAlign: "center",
    fontSize: 14,
    borderRadius: 12,
    border: `2px dotted ${grey[300]}`,
    color: grey[300],
    cursor: "pointer",
    padding: 12,
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
    marginTop: 12,
    borderRadius: 8
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
  iconAdjacentText: {
    marginRight: 12
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
    maxWidth: 420,
    margin: "24px auto",
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
        }
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
        }
      },
      validation: "default",
      message: ""
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
        }
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
        }
      },
      validation: "default",
      message: ""
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
      },
      errorAt: "",
      validation: "default",
      message: ""
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
      email: "jane@doe.com",
      errorAt: "",
      validation: "default",
      message: ""
    }
  ],
  peopleOptions: [],
  roster: [],
  startDayOptions: [],
  endDayOptions: [],
  allowMeManager: false,
  allowMeCoach: false
};

class SeasonSetupDialog extends Component {
  state = initialState;

  componentWillMount() {
    const { userID, userFirstName, userLastName, people } = this.props;

    const peopleOptions = this.getPeopleOptions(people);

    this.setState({
      peopleOptions,
      coaches: [
        {
          id: "default",
          type: {
            key: "ME",
            label: "Me"
          },
          firstName: userFirstName,
          lastName: userLastName,
          email: "",
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
          },
          errorAt: "",
          validation: "default",
          message: ""
        }
      ],
      managers: [
        {
          id: userID,
          type: {
            key: "ME",
            label: "Me"
          },
          firstName: userFirstName,
          lastName: userLastName,
          email: "",
          errorAt: "",
          validation: "default",
          message: ""
        }
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, people } = nextProps;

    let stateUpdates = {};

    if (isOpen !== this.props.isOpen) {
      if (isOpen) {
        const initialStartDate = moment();
        const initialEndDate = moment().add(2, "months");

        const startDayOptions = this.getDayOptions(
          initialStartDate.daysInMonth(),
          true
        );
        const endDayOptions = this.getDayOptions(
          initialEndDate.daysInMonth(),
          false
        );

        stateUpdates = {
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
        };
      } else {
        stateUpdates = initialState;
      }
    }

    if (people !== this.props.people) {
      const peopleOptions = this.getPeopleOptions(people);

      stateUpdates = {
        ...stateUpdates,
        peopleOptions
      };
    }

    this.setState(stateUpdates);
  }

  getPeopleOptions(people) {
    const { userID } = this.props;

    return _.toPairs(people)
      .filter(([personID, personInfo]) => personID !== userID)
      .sort((personA, personB) => {
        if (personA[1].info.name > personB[1].info.name) return +1;
        if (personA[1].info.name < personB[1].info.name) return -1;
        if (personA[1].info.surname > personB[1].info.surname) return +1;
        if (personA[1].info.surname < personB[1].info.surname) return -1;
        return 0;
      })
      .map(([personID, personInfo]) => {
        return {
          key: personID,
          label: `${personInfo.info.name} ${personInfo.info.surname}`
        };
      });
  }

  getDayOptions(numberOfDays, isThisMonth) {
    const currentDay = moment().date();

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
    const currentMonth = moment().month();
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
      const isThisMonth =
        newDateMoment.format("MM-YYYY") === moment().format("MM-YYYY");
      const startDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(startDate.day.key, 10);

      let newDay = startDate.day;
      if (isThisMonth && currentDaySelected < moment().date()) {
        newDay = {
          key: moment().format("DD"),
          label: moment().format("DD")
        };
      } else if (currentDaySelected > daysInNewMonth) {
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
      const isThisMonth =
        newDateMoment.format("MM-YYYY") === moment().format("MM-YYYY");
      const startDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(startDate.day.key, 10);

      let newDay = startDate.day;
      if (isThisMonth && currentDaySelected < moment().date()) {
        newDay = {
          key: moment().format("DD"),
          label: moment().format("DD")
        };
      } else if (currentDaySelected > daysInNewMonth) {
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
      const isThisMonth =
        newDateMoment.format("MM-YYYY") === moment().format("MM-YYYY");
      const endDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(endDate.day.key, 10);

      let newDay = endDate.day;
      if (isThisMonth && currentDaySelected < moment().date()) {
        newDay = {
          key: moment().format("DD"),
          label: moment().format("DD")
        };
      } else if (currentDaySelected > daysInNewMonth) {
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
      const isThisMonth =
        newDateMoment.format("MM-YYYY") === moment().format("MM-YYYY");
      const endDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(endDate.day.key, 10);

      let newDay = endDate.day;
      if (isThisMonth && currentDaySelected < moment().date()) {
        newDay = {
          key: moment().format("DD"),
          label: moment().format("DD")
        };
      } else if (currentDaySelected > daysInNewMonth) {
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

    const isStartDateThisYear =
      startDate.year.label === moment().format("YYYY");
    const startMonthOptions = this.getMonthOptions(isStartDateThisYear);
    const isEndDateThisYear = endDate.year.label === moment().format("YYYY");
    const endMonthOptions = this.getMonthOptions(isEndDateThisYear);
    const yearOptions = this.getYearOptions();

    return (
      <div>
        <div className={classes.headingTime}>
          <i className={`fas fa-calendar ${classes.iconAdjacentText}`} />Dates
        </div>
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
                  items={startMonthOptions}
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
                  items={endMonthOptions}
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
          id: "none",
          type: {
            key: "CURRENT",
            label: "Current community member"
          },
          firstName: "",
          lastName: "",
          email: "",
          errorAt: "",
          validation: "default",
          message: ""
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

  addCoach() {
    const { coaches } = this.state;

    this.setState({
      coaches: [
        ...coaches,
        {
          id: "none",
          type: {
            key: "CURRENT",
            label: "Current community member"
          },
          firstName: "",
          lastName: "",
          email: "",
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
          },
          errorAt: "",
          validation: "default",
          message: ""
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
    const { nonCompetitiveEvents } = this.state;

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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
            {info.validation === "error" && (
              <div className={classes.errorWrapper}>{info.message}</div>
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
        <div className={classes.headingTime}>
          <i
            className={`fas fa-dumbbell ${classes.iconAdjacentText}`}
          />Practice Times
        </div>
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
    const { competitiveEvents } = this.state;

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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
                  validation={info.validation}
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
            {info.validation === "error" && (
              <div className={classes.errorWrapper}>{info.message}</div>
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
        <div className={classes.headingTime}>
          <i className={`fas fa-trophy ${classes.iconAdjacentText}`} />Match
          Times
        </div>
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

  updateManagerType(changeIndex, newValue) {
    const { userID, userFirstName, userLastName } = this.props;
    const { managers } = this.state;

    if (newValue.key === "ME") {
      this.setState({
        managers: managers.map((value, index) => {
          if (index === changeIndex) {
            return {
              id: userID,
              type: newValue,
              firstName: userFirstName,
              lastName: userLastName,
              email: "",
              errorAt: "",
              validation: "default",
              message: ""
            };
          } else {
            return value;
          }
        }),
        allowMeManager: false
      });
    } else {
      this.setState({
        managers: managers.map((value, index) => {
          if (index === changeIndex) {
            return {
              id: "none",
              type: newValue,
              firstName: "",
              lastName: "",
              email: "",
              errorAt: "",
              validation: "default",
              message: ""
            };
          } else {
            return value;
          }
        }),
        allowMeManager: true
      });
    }
  }

  selectNewManager(id, changeIndex) {
    const { people } = this.props;
    const { managers } = this.state;

    this.setState({
      managers: managers.map((value, index) => {
        if (index === changeIndex) {
          return {
            id,
            type: {
              key: "CURRENT",
              label: "Current community member"
            },
            firstName: people[id].info.name,
            lastName: people[id].info.surname,
            email: people[id].info.email,
            errorAt: "",
            validation: "default",
            message: ""
          };
        } else {
          return value;
        }
      })
    });
  }

  updateManagerInfo(changeIndex, type, newValue) {
    const { managers } = this.state;

    this.setState({
      managers: managers.map((value, index) => {
        if (index === changeIndex) {
          return {
            ...value,
            [type]: newValue
          };
        } else {
          return value;
        }
      })
    });
  }

  getManagers() {
    const { classes } = this.props;
    const { managers, dateErrors, allowMeManager, peopleOptions } = this.state;

    return managers.map((info, index) => {
      const headerText = this.getNameHeaderText(info);
      const typeOptions = this.getPersonTypes(allowMeManager);

      return (
        <div key={`managers-${info.id}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            {managers.length !== 1 && (
              <i
                className={`fas fa-times ${classes.sectionHeaderIcon}`}
                onClick={() => this.removeManager(index)}
              />
            )}
          </div>
          <div className={classes.sectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={typeOptions}
                  selectedItem={info.type}
                  handleChange={(key, label) =>
                    this.updateManagerType(index, { key, label })}
                />
              </div>
            </div>
            {info.type.key !== "ME" && <div className={classes.divider} />}
            {info.type.key === "CURRENT" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <Select
                    items={peopleOptions}
                    placeholder="Select person"
                    selectedItem={{
                      key: info.id,
                      label: `${info.firstName} ${info.lastName}`
                    }}
                    handleChange={(key, label) =>
                      this.selectNewManager(key, index)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="First name"
                    value={info.firstName}
                    handleChange={newValue =>
                      this.updateManagerInfo(index, "firstName", newValue)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="Last name"
                    value={info.lastName}
                    handleChange={newValue =>
                      this.updateManagerInfo(index, "lastName", newValue)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="Email"
                    value={info.email}
                    handleChange={newValue =>
                      this.updateManagerInfo(index, "email", newValue)}
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

  renderManagers() {
    const { classes } = this.props;

    const managers = this.getManagers();

    return (
      <div>
        <div className={classes.headingTime}>
          <i className={`fas fa-user ${classes.iconAdjacentText}`} />Managers
        </div>
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

  updateCoachType(changeIndex, newValue) {
    const { userID, userFirstName, userLastName } = this.props;
    const { coaches } = this.state;

    if (newValue.key === "ME") {
      this.setState({
        coaches: coaches.map((value, index) => {
          if (index === changeIndex) {
            return {
              id: userID,
              type: newValue,
              firstName: userFirstName,
              lastName: userLastName,
              email: "",
              payment: {
                type: {
                  key: "HOURLY",
                  label: "Paid per hour"
                },
                rates: {
                  standard: "100.00",
                  overtime: "150.00",
                  competitive: "250.00",
                  nonCompetitive: "500.00",
                  salary: "3000.00"
                }
              },
              errorAt: "",
              validation: "default",
              message: ""
            };
          } else {
            return value;
          }
        }),
        allowMeCoach: false
      });
    } else {
      this.setState({
        coaches: coaches.map((value, index) => {
          if (index === changeIndex) {
            return {
              id: "none",
              type: newValue,
              firstName: "",
              lastName: "",
              email: "",
              payment: {
                type: {
                  key: "HOURLY",
                  label: "Paid per hour"
                },
                rates: {
                  standard: "100.00",
                  overtime: "150.00",
                  competitive: "250.00",
                  nonCompetitive: "500.00",
                  salary: "3000.00"
                }
              },
              errorAt: "",
              validation: "default",
              message: ""
            };
          } else {
            return value;
          }
        }),
        allowMeCoach: true
      });
    }
  }

  selectNewCoach(id, changeIndex) {
    const { people } = this.props;
    const { coaches } = this.state;

    this.setState({
      coaches: coaches.map((value, index) => {
        if (index === changeIndex) {
          return {
            id,
            type: {
              key: "CURRENT",
              label: "Current community member"
            },
            firstName: people[id].info.name,
            lastName: people[id].info.surname,
            email: people[id].info.email,
            payment: {
              type: {
                key: "HOURLY",
                label: "Paid per hour"
              },
              rates: {
                standard: "100.00",
                overtime: "150.00",
                competitive: "250.00",
                nonCompetitive: "500.00",
                salary: "3000.00"
              }
            },
            errorAt: "",
            validation: "default",
            message: ""
          };
        } else {
          return value;
        }
      })
    });
  }

  updateCoachInfo(changeIndex, type, newValue) {
    const { coaches } = this.state;

    this.setState({
      coaches: coaches.map((value, index) => {
        if (index === changeIndex) {
          return {
            ...value,
            [type]: newValue
          };
        } else {
          return value;
        }
      })
    });
  }

  getCoaches() {
    const { classes } = this.props;
    const { coaches, dateErrors, allowMeCoach, peopleOptions } = this.state;

    const paymentOptions = this.getPaymentOptions();

    return coaches.map((info, index) => {
      const headerText = this.getNameHeaderText(info);
      const typeOptions = this.getPersonTypes(allowMeCoach);

      return (
        <div key={`coaches-${info.id}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            {coaches.length !== 1 && (
              <i
                className={`fas fa-times ${classes.sectionHeaderIcon}`}
                onClick={() => this.removeCoach(index)}
              />
            )}
          </div>
          <div className={classes.sectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={typeOptions}
                  selectedItem={info.type}
                  handleChange={(key, label) =>
                    this.updateCoachType(index, { key, label })}
                />
              </div>
            </div>
            {info.type.key !== "ME" && <div className={classes.divider} />}
            {info.type.key === "CURRENT" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <Select
                    items={peopleOptions}
                    placeholder="Select person"
                    selectedItem={{
                      key: info.id,
                      label: `${info.firstName} ${info.lastName}`
                    }}
                    handleChange={(key, label) =>
                      this.selectNewCoach(key, index)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="First name"
                    value={info.firstName}
                    handleChange={newValue =>
                      this.updateCoachInfo(index, "firstName", newValue)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="Last name"
                    value={info.lastName}
                    handleChange={newValue =>
                      this.updateCoachInfo(index, "lastName", newValue)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="Email"
                    value={info.email}
                    handleChange={newValue =>
                      this.updateCoachInfo(index, "email", newValue)}
                  />
                </div>
              </div>
            )}
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
        <div className={classes.headingTime}>
          <i className={`fas fa-user ${classes.iconAdjacentText}`} />Coaches
        </div>
        {coaches}
        <div className={classes.addWrapper} onClick={() => this.addCoach()}>
          <i className={`fas fa-plus ${classes.icon}`} />Add a coach
        </div>
      </div>
    );
  }

  validateDates() {
    const { startDate, endDate } = this.state;

    let isValid = true;
    let newState = {};

    const startDateMoment = moment(
      `${startDate.day.label}-${startDate.month.label}-${startDate.year.label}`,
      "DD-MMM-YYYY"
    );
    const endDateMoment = moment(
      `${endDate.day.label}-${endDate.month.label}-${endDate.year.label}`,
      "DD-MMM-YYYY"
    );

    if (!endDateMoment.isAfter(startDateMoment)) {
      isValid = false;
      newState.dateErrors = {
        validation: "error",
        message: "Start date must be before end date"
      };
    } else {
      newState.dateErrors = {
        validation: "default",
        message: ""
      };
    }

    this.setState(newState);

    return isValid;
  }

  validateNonCompetitiveTimes() {
    const { nonCompetitiveEvents } = this.state;

    let isValid = true;
    let disallowedRanges = [];

    const newNonCompetitiveEvents = nonCompetitiveEvents.map(info => {
      const { day, startTime, endTime } = info;

      const startTimeMoment = moment(
        `${day}, ${startTime.hours.label}:${startTime.minutes.label} ${startTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      );
      const endTimeMoment = moment(
        `${day}, ${endTime.hours.label}:${endTime.minutes.label} ${endTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      );

      if (!endTimeMoment.isAfter(startTimeMoment)) {
        isValid = false;
        return {
          ...info,
          validation: "error",
          message: "Start time must be before end time"
        };
      } else {
        let newValidationState = {
          ...info,
          validation: "default",
          message: ""
        };
        disallowedRanges.map(range => {
          const isStartTimeAllowed = !startTimeMoment.isBetween(
            range.start,
            range.end,
            null,
            "[]"
          );
          const isEndTimeAllowed = !endTimeMoment.isBetween(
            range.start,
            range.end,
            null,
            "[]"
          );
          if (!isStartTimeAllowed || !isEndTimeAllowed) {
            isValid = false;
            newValidationState = {
              ...info,
              validation: "error",
              message: "This clashes with another practice time"
            };
          }
        });
        disallowedRanges.push({
          start: startTimeMoment,
          end: endTimeMoment
        });
        return newValidationState;
      }
    });

    this.setState({
      nonCompetitiveEvents: newNonCompetitiveEvents
    });

    return isValid;
  }

  validateCompetitiveTimes() {
    const { nonCompetitiveEvents, competitiveEvents } = this.state;

    let isValid = true;
    let disallowedRanges = [];
    let disallowedPracticeRanges = nonCompetitiveEvents.map(info => {
      const { day, startTime, endTime } = info;

      const startTimeMoment = moment(
        `${day}, ${startTime.hours.label}:${startTime.minutes.label} ${startTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      );
      const endTimeMoment = moment(
        `${day}, ${endTime.hours.label}:${endTime.minutes.label} ${endTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      );

      return {
        start: startTimeMoment,
        end: endTimeMoment
      };
    });

    const newCompetitiveEvents = competitiveEvents.map(info => {
      const { day, startTime, endTime } = info;
      const startTimeMoment = moment(
        `${day}, ${startTime.hours.label}:${startTime.minutes.label} ${startTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      );
      const endTimeMoment = moment(
        `${day}, ${endTime.hours.label}:${endTime.minutes.label} ${endTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      );

      if (!endTimeMoment.isAfter(startTimeMoment)) {
        isValid = false;
        return {
          ...info,
          validation: "error",
          message: "Start time must be before end time"
        };
      } else {
        let newValidationState = {
          ...info,
          validation: "default",
          message: ""
        };
        disallowedPracticeRanges.map(range => {
          const isStartTimeAllowed = !startTimeMoment.isBetween(
            range.start,
            range.end,
            null,
            "[]"
          );
          const isEndTimeAllowed = !endTimeMoment.isBetween(
            range.start,
            range.end,
            null,
            "[]"
          );
          if (!isStartTimeAllowed || !isEndTimeAllowed) {
            isValid = false;
            newValidationState = {
              ...info,
              validation: "error",
              message: "This match clashes with a practice"
            };
          }
        });
        disallowedRanges.map(range => {
          const isStartTimeAllowed = !startTimeMoment.isBetween(
            range.start,
            range.end,
            null,
            "[]"
          );
          const isEndTimeAllowed = !endTimeMoment.isBetween(
            range.start,
            range.end,
            null,
            "[]"
          );
          if (!isStartTimeAllowed || !isEndTimeAllowed) {
            isValid = false;
            newValidationState = {
              ...info,
              validation: "error",
              message: "This clashes with another match time"
            };
          }
        });
        disallowedRanges.push({
          start: startTimeMoment,
          end: endTimeMoment
        });
        return newValidationState;
      }
    });

    this.setState({
      competitiveEvents: newCompetitiveEvents
    });

    return isValid;
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
            handleClick={() => {
              const isValid = this.validateDates();
              isValid && this.nextStep();
            }}
          >
            Next
          </Button>
        ];
      case 2:
        return [
          <Button colour="primary" slim handleClick={() => closeDialog()}>
            Cancel
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => {
              const isValid = this.validateNonCompetitiveTimes();
              isValid && this.nextStep();
            }}
          >
            Next
          </Button>
        ];
      case 3:
        return [
          <Button colour="primary" slim handleClick={() => closeDialog()}>
            Cancel
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => {
              const isValid = this.validateCompetitiveTimes();
              isValid && this.nextStep();
            }}
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
    const { isOpen, teamName } = this.props;
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
        size="medium"
        heading={`Set Up Season for ${teamName}`}
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
