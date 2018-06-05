/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment-timezone";
import Button from "../../../../components/Button";
import {
  common,
  grey,
  lightBlue,
  red,
  yellow
} from "../../../../utils/colours";
import Dialog from "../../../../components/Dialog";
import { isValidEmail } from "../../../../utils/validation";
import Select from "../../../../components/Select";
import TextField from "../../../../components/TextField";
import { toPhoneFormat } from "../../../../utils/format";

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
  matchIcon: {
    marginRight: 12,
    color: yellow[800]
  },
  practiceIcon: {
    marginRight: 12,
    color: grey[600]
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
      phoneNumber: "",
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
      phoneNumber: "",
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
    const {
      userID,
      userEmail,
      userFirstName,
      userLastName,
      people
    } = this.props;

    const peopleOptions = this.getPeopleOptions(people);

    this.setState({
      peopleOptions,
      coaches: [
        {
          id: userID,
          type: {
            key: "ME",
            label: "Me"
          },
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          phoneNumber: "",
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
          email: userEmail,
          phoneNumber: "",
          errorAt: "",
          validation: "default",
          message: ""
        }
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      isOpen,
      people,
      userID,
      userFirstName,
      userLastName,
      userEmail
    } = nextProps;

    let stateUpdates = {};

    if (isOpen !== this.props.isOpen) {
      if (isOpen) {
        const initialStartDate = moment().tz("Africa/Johannesburg");
        const initialEndDate = moment()
          .tz("Africa/Johannesburg")
          .add(2, "months");

        const startDayOptions = this.getDayOptions(
          initialStartDate.daysInMonth(),
          true
        );
        const endDayOptions = this.getDayOptions(
          initialEndDate.daysInMonth(),
          false
        );
        const peopleOptions = this.getPeopleOptions(people);

        stateUpdates = {
          startDayOptions,
          endDayOptions,
          peopleOptions,
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
          },
          coaches: [
            {
              id: userID,
              type: {
                key: "ME",
                label: "Me"
              },
              firstName: userFirstName,
              lastName: userLastName,
              email: userEmail,
              phoneNumber: "",
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
              email: userEmail,
              phoneNumber: "",
              errorAt: "",
              validation: "default",
              message: ""
            }
          ]
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
      ).tz("Africa/Johannesburg");
      const daysInNewMonth = newDateMoment.daysInMonth();
      const isThisMonth =
        newDateMoment.format("MM-YYYY") ===
        moment()
          .tz("Africa/Johannesburg")
          .format("MM-YYYY");
      const startDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(startDate.day.key, 10);

      let newDay = startDate.day;
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
      ).tz("Africa/Johannesburg");
      const daysInNewMonth = newDateMoment.daysInMonth();
      const isThisMonth =
        newDateMoment.format("MM-YYYY") ===
        moment()
          .tz("Africa/Johannesburg")
          .format("MM-YYYY");
      const startDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(startDate.day.key, 10);

      let newDay = startDate.day;
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
      ).tz("Africa/Johannesburg");
      const daysInNewMonth = newDateMoment.daysInMonth();
      const isThisMonth =
        newDateMoment.format("MM-YYYY") ===
        moment()
          .tz("Africa/Johannesburg")
          .format("MM-YYYY");
      const endDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(endDate.day.key, 10);

      let newDay = endDate.day;
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
      ).tz("Africa/Johannesburg");
      const daysInNewMonth = newDateMoment.daysInMonth();
      const isThisMonth =
        newDateMoment.format("MM-YYYY") ===
        moment()
          .tz("Africa/Johannesburg")
          .format("MM-YYYY");
      const endDayOptions = this.getDayOptions(daysInNewMonth, isThisMonth);
      const currentDaySelected = parseInt(endDate.day.key, 10);

      let newDay = endDate.day;
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
      startDate.year.label ===
      moment()
        .tz("Africa/Johannesburg")
        .format("YYYY");
    const startMonthOptions = this.getMonthOptions(isStartDateThisYear);
    const isEndDateThisYear =
      endDate.year.label ===
      moment()
        .tz("Africa/Johannesburg")
        .format("YYYY");
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
          phoneNumber: "",
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
          phoneNumber: "",
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
          <i className={`fas fa-dumbbell ${classes.practiceIcon}`} />Practice
          Times
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
          <i className={`fas fa-trophy ${classes.matchIcon}`} />Match Times
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
    const { userID, userEmail, userFirstName, userLastName } = this.props;
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
              email: userEmail,
              phoneNumber: "",
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
              phoneNumber: "",
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
            phoneNumber: people[id].info.phoneNumber,
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
    const { managers, allowMeManager, peopleOptions } = this.state;

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
                    validation={
                      info.errorAt === "personSelect" ? "error" : "default"
                    }
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
                    validation={
                      info.errorAt === "firstName" ? "error" : "default"
                    }
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
                    validation={
                      info.errorAt === "lastName" ? "error" : "default"
                    }
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
                    validation={info.errorAt === "email" ? "error" : "default"}
                    handleChange={newValue =>
                      this.updateManagerInfo(index, "email", newValue)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="Phone number"
                    value={info.phoneNumber}
                    validation={
                      info.errorAt === "phoneNumber" ? "error" : "default"
                    }
                    handleChange={newValue =>
                      this.updateManagerInfo(
                        index,
                        "phoneNumber",
                        toPhoneFormat(newValue)
                      )}
                  />
                </div>
              </div>
            )}
            {info.validation === "error" && (
              <div className={classes.errorWrapper}>{info.message}</div>
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
    const { userID, userEmail, userFirstName, userLastName } = this.props;
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
              email: userEmail,
              phoneNumber: "",
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
              phoneNumber: "",
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
            phoneNumber: people[id].info.phoneNumber,
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
    const { coaches, allowMeCoach, peopleOptions } = this.state;

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
                    validation={
                      info.errorAt === "personSelect" ? "error" : "default"
                    }
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
                    validation={
                      info.errorAt === "firstName" ? "error" : "default"
                    }
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
                    validation={
                      info.errorAt === "lastName" ? "error" : "default"
                    }
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
                    validation={info.errorAt === "email" ? "error" : "default"}
                    handleChange={newValue =>
                      this.updateCoachInfo(index, "email", newValue)}
                  />
                </div>
              </div>
            )}
            {info.type.key === "NEW" && (
              <div className={classes.timeInputGroupWrapper}>
                <div className={classes.timeInputWrapper}>
                  <TextField
                    placeholder="Phone number"
                    value={info.phoneNumber}
                    validation={
                      info.errorAt === "phoneNumber" ? "error" : "default"
                    }
                    handleChange={newValue =>
                      this.updateCoachInfo(
                        index,
                        "phoneNumber",
                        toPhoneFormat(newValue)
                      )}
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
                    placeholder=""
                    value={info.payment.rates.standard}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "standard", newValue)}
                    step={10}
                    max={1000}
                    validation={
                      info.errorAt === "standard" ? "error" : "default"
                    }
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
                    placeholder=""
                    value={info.payment.rates.overtime}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "overtime", newValue)}
                    step={10}
                    max={1000}
                    validation={
                      info.errorAt === "overtime" ? "error" : "default"
                    }
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
                    placeholder=""
                    value={info.payment.rates.nonCompetitive}
                    handleChange={newValue =>
                      this.updatePaymentAmount(
                        index,
                        "nonCompetitive",
                        newValue
                      )}
                    step={10}
                    max={10000}
                    validation={
                      info.errorAt === "nonCompetitive" ? "error" : "default"
                    }
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
                    placeholder=""
                    value={info.payment.rates.competitive}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "competitive", newValue)}
                    step={10}
                    max={10000}
                    validation={
                      info.errorAt === "competitive" ? "error" : "default"
                    }
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
                    placeholder=""
                    value={info.payment.rates.salary}
                    handleChange={newValue =>
                      this.updatePaymentAmount(index, "salary", newValue)}
                    step={500}
                    max={1000000}
                    validation={info.errorAt === "salary" ? "error" : "default"}
                  />
                </div>
              </div>
            )}
            {info.validation === "error" && (
              <div className={classes.errorWrapper}>{info.message}</div>
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
    ).tz("Africa/Johannesburg");
    const endDateMoment = moment(
      `${endDate.day.label}-${endDate.month.label}-${endDate.year.label}`,
      "DD-MMM-YYYY"
    ).tz("Africa/Johannesburg");

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
      ).tz("Africa/Johannesburg");
      const endTimeMoment = moment(
        `${day}, ${endTime.hours.label}:${endTime.minutes.label} ${endTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      ).tz("Africa/Johannesburg");

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
      ).tz("Africa/Johannesburg");
      const endTimeMoment = moment(
        `${day}, ${endTime.hours.label}:${endTime.minutes.label} ${endTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      ).tz("Africa/Johannesburg");

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
      ).tz("Africa/Johannesburg");
      const endTimeMoment = moment(
        `${day}, ${endTime.hours.label}:${endTime.minutes.label} ${endTime
          .timeOfDay.label}`,
        "dddd, hh:mm A"
      ).tz("Africa/Johannesburg");

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

  validateManagers() {
    const { managers } = this.state;

    let isValid = true;

    const newManagers = managers.map(info => {
      const { type, firstName, lastName, email, phoneNumber, id } = info;

      switch (type.key) {
        case "CURRENT":
          if (id === "none") {
            isValid = false;
            return {
              ...info,
              errorAt: "personSelect",
              validation: "error",
              message: "Please select a person"
            };
          } else {
            return {
              ...info,
              errorAt: "",
              validation: "default",
              message: ""
            };
          }
        case "NEW":
          if (firstName === "") {
            isValid = false;
            return {
              ...info,
              errorAt: "firstName",
              validation: "error",
              message: "Please enter a first name"
            };
          } else if (firstName.length > 32) {
            isValid = false;
            return {
              ...info,
              errorAt: "firstName",
              validation: "error",
              message: "Max. 32 characters allowed"
            };
          } else if (lastName === "") {
            isValid = false;
            return {
              ...info,
              errorAt: "lastName",
              validation: "error",
              message: "Please enter a last name"
            };
          } else if (lastName.length > 32) {
            isValid = false;
            return {
              ...info,
              errorAt: "lastName",
              validation: "error",
              message: "Max. 32 characters allowed"
            };
          } else if (phoneNumber === "") {
            isValid = false;
            return {
              ...info,
              errorAt: "phoneNumber",
              validation: "error",
              message: "Please enter a phone number"
            };
          } else if (phoneNumber.length !== 14) {
            isValid = false;
            return {
              ...info,
              errorAt: "phoneNumber",
              validation: "error",
              message: "This is not a valid phone number"
            };
          } else if (email === "") {
            isValid = false;
            return {
              ...info,
              errorAt: "email",
              validation: "error",
              message: "Please enter an email address"
            };
          } else if (email.length > 64) {
            isValid = false;
            return {
              ...info,
              errorAt: "email",
              validation: "error",
              message: "Max. 64 characters allowed"
            };
          } else if (!isValidEmail(email)) {
            isValid = false;
            return {
              ...info,
              errorAt: "email",
              validation: "error",
              message: "This email address is not valid"
            };
          } else {
            return {
              ...info,
              errorAt: "",
              validation: "default",
              message: ""
            };
          }
        default:
          return {
            ...info,
            errorAt: "",
            validation: "default",
            message: ""
          };
      }
    });

    this.setState({
      managers: newManagers
    });

    return isValid;
  }

  validateCoaches() {
    const { coaches } = this.state;

    let isValid = true;

    const newCoaches = coaches.map(info => {
      const {
        type,
        firstName,
        lastName,
        email,
        phoneNumber,
        id,
        payment
      } = info;

      let newCoach = info;

      switch (type.key) {
        case "CURRENT":
          if (id === "none") {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "personSelect",
              validation: "error",
              message: "Please select a person"
            };
          } else {
            newCoach = {
              ...info,
              errorAt: "",
              validation: "default",
              message: ""
            };
          }
          break;
        case "NEW":
          if (firstName === "") {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "firstName",
              validation: "error",
              message: "Please enter a first name"
            };
          } else if (firstName.length > 32) {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "firstName",
              validation: "error",
              message: "Max. 32 characters allowed"
            };
          } else if (lastName === "") {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "lastName",
              validation: "error",
              message: "Please enter a last name"
            };
          } else if (lastName.length > 32) {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "lastName",
              validation: "error",
              message: "Max. 32 characters allowed"
            };
          } else if (phoneNumber === "") {
            isValid = false;
            return {
              ...info,
              errorAt: "phoneNumber",
              validation: "error",
              message: "Please enter a phone number"
            };
          } else if (phoneNumber.length !== 14) {
            isValid = false;
            return {
              ...info,
              errorAt: "phoneNumber",
              validation: "error",
              message: "This is not a valid phone number"
            };
          } else if (email === "") {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "email",
              validation: "error",
              message: "Please enter an email address"
            };
          } else if (email.length > 64) {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "email",
              validation: "error",
              message: "Max. 64 characters allowed"
            };
          } else if (!isValidEmail(email)) {
            isValid = false;
            newCoach = {
              ...info,
              errorAt: "email",
              validation: "error",
              message: "This email address is not valid"
            };
          } else {
            newCoach = {
              ...info,
              errorAt: "",
              validation: "default",
              message: ""
            };
          }
          break;
        default:
          newCoach = {
            ...info,
            errorAt: "",
            validation: "default",
            message: ""
          };
          break;
      }

      if (isValid) {
        switch (payment.type.key) {
          case "HOURLY":
            if (isNaN(parseFloat(payment.rates.standard))) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "standard",
                validation: "error",
                message: "This is not a valid number"
              };
            } else if (parseFloat(payment.rates.standard) < 0) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "standard",
                validation: "error",
                message: "Wages can't be negative"
              };
            } else if (isNaN(parseFloat(payment.rates.overtime))) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "overtime",
                validation: "error",
                message: "This is not a valid number"
              };
            } else if (parseFloat(payment.rates.overtime) < 0) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "overtime",
                validation: "error",
                message: "Wages can't be negative"
              };
            } else {
              newCoach = {
                ...info,
                errorAt: "",
                validation: "default",
                message: ""
              };
            }
            break;
          case "FIXED":
            if (isNaN(parseFloat(payment.rates.nonCompetitive))) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "nonCompetitive",
                validation: "error",
                message: "This is not a valid number"
              };
            } else if (parseFloat(payment.rates.nonCompetitive) < 0) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "nonCompetitive",
                validation: "error",
                message: "Wages can't be negative"
              };
            } else if (isNaN(parseFloat(payment.rates.competitive))) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "competitive",
                validation: "error",
                message: "This is not a valid number"
              };
            } else if (parseFloat(payment.rates.competitive) < 0) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "competitive",
                validation: "error",
                message: "Wages can't be negative"
              };
            } else {
              newCoach = {
                ...info,
                errorAt: "",
                validation: "default",
                message: ""
              };
            }
            break;
          case "MONTHLY":
            if (isNaN(parseFloat(payment.rates.salary))) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "salary",
                validation: "error",
                message: "This is not a valid number"
              };
            } else if (parseFloat(payment.rates.salary) < 0) {
              isValid = false;
              newCoach = {
                ...info,
                errorAt: "salary",
                validation: "error",
                message: "Wages can't be negative"
              };
            } else {
              newCoach = {
                ...info,
                errorAt: "",
                validation: "default",
                message: ""
              };
            }
            break;
          default:
            newCoach = {
              ...info,
              errorAt: "",
              validation: "default",
              message: ""
            };
            break;
        }
      }

      return newCoach;
    });

    this.setState({
      coaches: newCoaches
    });

    return isValid;
  }

  getSeasonInfo() {
    const {
      coaches,
      competitiveEvents,
      endDate,
      managers,
      nonCompetitiveEvents,
      roster,
      startDate
    } = this.state;

    const dates = {
      start: `${startDate.day.label} ${startDate.month.label} ${startDate.year
        .label}`,
      end: `${endDate.day.label} ${endDate.month.label} ${endDate.year.label}`
    };

    const reformattedCompetitiveEvents = competitiveEvents.map(info => {
      const startTime = `${info.startTime.hours.label}:${info.startTime.minutes
        .label} ${info.startTime.timeOfDay.label}`;
      const endTime = `${info.endTime.hours.label}:${info.endTime.minutes
        .label} ${info.endTime.timeOfDay.label}`;
      return {
        day: info.day,
        times: {
          start: startTime,
          end: endTime
        }
      };
    });

    const reformattedNonCompetitiveEvents = nonCompetitiveEvents.map(info => {
      const startTime = `${info.startTime.hours.label}:${info.startTime.minutes
        .label} ${info.startTime.timeOfDay.label}`;
      const endTime = `${info.endTime.hours.label}:${info.endTime.minutes
        .label} ${info.endTime.timeOfDay.label}`;
      return {
        day: info.day,
        times: {
          start: startTime,
          end: endTime
        }
      };
    });

    const reformattedManagers = managers.map(info => {
      return {
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        phoneNumber: info.phoneNumber
      };
    });

    const reformattedCoaches = coaches.map(info => {
      const paymentType = info.payment.type.key;

      let rates = {};
      switch (paymentType) {
        case "HOURLY":
          rates = {
            standard: parseFloat(info.payment.rates.standard),
            overtime: parseFloat(info.payment.rates.overtime)
          };
          break;
        case "FIXED":
          rates = {
            nonCompetitive: parseFloat(
              info.payment.rates.nonCompetitive
            ).toFixed(2),
            competitive: parseFloat(info.payment.rates.competitive)
          };
          break;
        case "MONTHLY":
          rates = {
            salary: parseFloat(info.payment.rates.salary)
          };
          break;
        default:
          rates = {};
          break;
      }

      return {
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        phoneNumber: info.phoneNumber,
        payment: {
          rates,
          type: paymentType
        }
      };
    });

    return {
      dates,
      roster,
      managers: reformattedManagers,
      coaches: reformattedCoaches,
      competitiveEvents: reformattedCompetitiveEvents,
      nonCompetitiveEvents: reformattedNonCompetitiveEvents
    };
  }

  getActionButtons() {
    const { closeDialog, createSeason, isLoading } = this.props;
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
          <Button
            disabled={isLoading}
            colour="primary"
            slim
            handleClick={() => this.prevStep()}
          >
            Back
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
          <Button
            disabled={isLoading}
            colour="primary"
            slim
            handleClick={() => this.prevStep()}
          >
            Back
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
      case 4:
        return [
          <Button
            disabled={isLoading}
            colour="primary"
            slim
            handleClick={() => this.prevStep()}
          >
            Back
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => {
              const isValid = this.validateManagers();
              isValid && this.nextStep();
            }}
          >
            Next
          </Button>
        ];
      case 5:
        return [
          <Button
            disabled={isLoading}
            colour="primary"
            slim
            handleClick={() => this.prevStep()}
          >
            Back
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            loading={isLoading}
            handleClick={() => {
              const isValid = this.validateCoaches();
              isValid && createSeason(this.getSeasonInfo());
            }}
          >
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
