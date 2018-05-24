import React, { Component } from "react";
import injectSheet from "react-jss";
import moment from "moment";
import Button from "../../../../components/Button";
import { common, grey, red } from "../../../../utils/colours";
import Dialog from "../../../../components/Dialog";
import Select from "../../../../components/Select";

const styles = {
  addWrapper: {
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
  sectionHeader: {
    textAlign: "right"
  },
  sectionHeaderIcon: {
    transition: "0.25s",
    cursor: "pointer",
    marginBottom: 12,
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
    color: grey[700]
  },
  sectionWrapper: {
    margin: "24px 0",
    textAlign: "center",
    padding: 24,
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
  coaches: {},
  managers: {},
  roster: {},
  startDayOptions: [],
  endDayOptions: []
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
        <div className={classes.headingTime}>Starts</div>
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
        <div className={classes.sectionSeparator} />
        <div className={classes.headingTime}>Ends</div>
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
    );
  }

  getNonCompetitiveEvents() {
    const { classes } = this.props;
    const { nonCompetitiveEvents, dateErrors } = this.state;

    return nonCompetitiveEvents.map(info => {
      return (
        <div key={`practices-${info.day}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <i className={`fas fa-times ${classes.sectionHeaderIcon}`} />
          </div>
          <div className={classes.timeInputGroupWrapper}>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={{ key: info.day, label: info.day }} />
            </div>
          </div>
          <span className={classes.sectionText}>from</span>
          <div className={classes.timeInputGroupWrapper}>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.startTime.hours} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.startTime.minutes} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.startTime.timeOfDay} />
            </div>
          </div>
          <span className={classes.sectionText}>to</span>
          <div className={classes.timeInputGroupWrapper}>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.endTime.hours} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.endTime.minutes} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.endTime.timeOfDay} />
            </div>
          </div>
          {dateErrors.validation === "error" && (
            <div className={classes.errorWrapper}>{dateErrors.message}</div>
          )}
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
        {events}
        <div className={classes.addWrapper}>
          <i className={`fas fa-plus ${classes.icon}`} />Add a practice time
        </div>
      </div>
    );
  }

  getCompetitiveEvents() {
    const { classes } = this.props;
    const { competitiveEvents, dateErrors } = this.state;

    return competitiveEvents.map(info => {
      return (
        <div key={`matches-${info.day}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <i className={`fas fa-times ${classes.sectionHeaderIcon}`} />
          </div>
          <div className={classes.timeInputGroupWrapper}>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={{ key: info.day, label: info.day }} />
            </div>
          </div>
          <span className={classes.sectionText}>from</span>
          <div className={classes.timeInputGroupWrapper}>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.startTime.hours} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.startTime.minutes} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.startTime.timeOfDay} />
            </div>
          </div>
          <span className={classes.sectionText}>to</span>
          <div className={classes.timeInputGroupWrapper}>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.endTime.hours} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.endTime.minutes} />
            </div>
            <div className={classes.timeInputWrapper}>
              <Select selectedItem={info.endTime.timeOfDay} />
            </div>
          </div>
          {dateErrors.validation === "error" && (
            <div className={classes.errorWrapper}>{dateErrors.message}</div>
          )}
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
        {events}
        <div className={classes.addWrapper}>
          <i className={`fas fa-plus ${classes.icon}`} />Add a match time
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
