/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import Button from "../../../../components/Button";
import {
  common,
  grey,
  lightBlue,
  red,
  yellow
} from "../../../../utils/colours";
import Dialog from "../../../../components/Dialog";
import Select from "../../../../components/Select";
import Slider from "../../../../components/Slider";
import TextField from "../../../../components/TextField";

import hockeyIcon from "../../images/hockey.png";
import netballIcon from "../../images/netball.png";
import rugbyIcon from "../../images/rugby.png";
import otherIcon from "../../images/other.png";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  addCustomWrapper: {
    transition: "0.25s",
    textAlign: "center",
    fontSize: 14,
    borderRadius: 12,
    border: `2px dotted ${grey[300]}`,
    color: grey[300],
    cursor: "pointer",
    padding: 12,
    margin: 24,
    "&:hover": {
      border: `2px solid ${grey[400]}`,
      color: grey[400]
    }
  },
  ageSelectorsWrapper: {
    padding: 24,
    backgroundColor: grey[50],
    borderRadius: "16px 16px 0 0"
  },
  contentWrapper: {
    padding: 12
  },
  customFieldWrapper: {
    marginLeft: 24,
    flexGrow: 1
  },
  deleteButton: {
    margin: 24,
    transition: "0.25s",
    cursor: "pointer",
    fontSize: 24,
    color: grey[300],
    "&:hover": {
      color: red[500]
    }
  },
  divisionSelectorsWrapper: {
    padding: 24,
    backgroundColor: grey[50]
  },
  errorWrapper: {
    backgroundColor: red[500],
    width: "calc(100% - 24px)",
    color: common["white"],
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 8,
    padding: 12
  },
  flexGrow: {
    flexGrow: 1
  },
  heading: {
    width: "calc(100% - 24px)",
    margin: 12,
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
  infoItemText: {
    flex: 1,
    padding: 24,
    color: grey[700]
  },
  infoItemWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  lastInfoItemText: {
    flex: 1,
    padding: 24,
    color: grey[700]
  },
  lastInfoItemWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  matchIcon: {
    marginRight: 12,
    color: yellow[800]
  },
  outerErrorWrapper: {
    padding: "24px 24px 0 24px"
  },
  practiceIcon: {
    marginRight: 12,
    color: grey[600]
  },
  section: {
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    marginBottom: 24,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionHeading: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800]
  },
  sliderLabel: {
    fontSize: 16,
    color: grey[500],
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    margin: "8px 0 24px 0"
  },
  sportIcon: {
    width: 40,
    height: 40,
    marginBottom: 12
  },
  sportName: {
    transition: "0.25s",
    color: grey[800],
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "25px",
    fontSize: 18
  },
  sportNameSelected: {
    transition: "0.25s",
    color: common["white"],
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "25px",
    fontSize: 18
  },
  sportOptionSelectedWrapper: {
    transition: "0.25s",
    margin: 24,
    padding: 24,
    width: "calc(33% - 96px)",
    borderRadius: 16,
    backgroundColor: lightBlue[500],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: ${tabletBreakpoint}px)`]: {
      width: "calc(50% - 96px)"
    },
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: "calc(100% - 96px)"
    }
  },
  sportOptionWrapper: {
    transition: "0.25s",
    margin: 24,
    padding: 24,
    width: "calc(33% - 96px)",
    borderRadius: 16,
    backgroundColor: grey[100],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[300]
    },
    [`@media (max-width: ${tabletBreakpoint}px)`]: {
      width: "calc(50% - 96px)"
    },
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: "calc(100% - 96px)"
    }
  },
  sportSelectionWrapper: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
};

const initialState = {
  step: 1,
  sport: "",
  info: {
    name: "",
    nonCompetitive: "",
    competitive: "",
    gender: {
      key: "BOTH",
      label: "Girls & boys teams"
    }
  },
  ageGroups: {
    start: 6,
    end: 19,
    selected: [],
    custom: []
  },
  divisions: {
    6: {
      letters: {
        end: "D",
        selected: ["A", "B", "C", "D"]
      },
      numbers: {
        end: "4th",
        selected: ["1st", "2nd", "3rd", "4th"]
      },
      custom: []
    }
  },
  sportError: {
    validation: "default",
    helperText: ""
  },
  customErrors: {
    name: {
      validation: "default",
      helperText: ""
    },
    nonCompetitive: {
      validation: "default",
      helperText: ""
    },
    competitive: {
      validation: "default",
      helperText: ""
    }
  },
  ageGroupErrors: {
    custom: {},
    validation: "default",
    message: ""
  },
  divisionsErrors: {
    custom: {},
    validation: "default",
    message: ""
  }
};

class AddSportDialog extends Component {
  state = initialState;

  componentWillMount() {
    const { ageGroupOptions, genders } = this.props;

    let info = {
      name: "",
      nonCompetitive: "",
      competitive: "",
      gender: {
        key: "BOTH",
        label: "Girls & boys teams"
      }
    };
    let ageGroups = {
      start: 0,
      end: 0,
      selected: [],
      custom: []
    };

    if (genders === "male") {
      info = {
        ...info,
        gender: {
          key: "MALE",
          label: "Boys teams only"
        }
      };
    } else if (genders === "female") {
      info = {
        ...info,
        gender: {
          key: "FEMALE",
          label: "Girls teams only"
        }
      };
    }

    ageGroupOptions.map((ageGroup, index) => {
      const ageGroupNumber = ageGroup.key;

      if (!isNaN(ageGroupNumber)) {
        if (ageGroup.start === 0) {
          ageGroups.start = ageGroupNumber;
          ageGroups.end = ageGroupNumber;
        } else if (ageGroupNumber <= ageGroups.start) {
          ageGroups.start = ageGroupNumber;
        } else if (ageGroupNumber >= ageGroups.end) {
          ageGroups.end = ageGroupNumber;
        }
        ageGroups.selected.push(ageGroup.label);
      } else {
        ageGroups.custom.push({ id: index, label: ageGroup.label });
      }
    });

    let divisions = {};
    ageGroups.selected.map(age => {
      divisions[age] = {
        letters: {
          end: "D",
          selected: ["A", "B", "C", "D"]
        },
        numbers: {
          end: "4th",
          selected: ["1st", "2nd", "3rd", "4th"]
        },
        custom: []
      };
    });
    ageGroups.custom.map(age => {
      divisions[age.label] = {
        letters: {
          end: "D",
          selected: ["A", "B", "C", "D"]
        },
        numbers: {
          end: "4th",
          selected: ["1st", "2nd", "3rd", "4th"]
        },
        custom: []
      };
    });

    this.setState({
      info,
      ageGroups,
      divisions
    });
  }

  componentWillReceiveProps(nextProps) {
    const { divisionOptions, ageGroupOptions, genders, isOpen } = nextProps;

    let updates = {};

    if (genders !== this.props.genders) {
      let info = {
        name: "",
        nonCompetitive: "",
        competitive: "",
        gender: {
          key: "BOTH",
          label: "Girls & boys teams"
        }
      };

      if (genders === "male") {
        info = {
          ...info,
          gender: {
            key: "MALE",
            label: "Boys teams only"
          }
        };
      } else if (genders === "female") {
        info = {
          ...info,
          gender: {
            key: "FEMALE",
            label: "Girls teams only"
          }
        };
      }

      updates = {
        ...updates,
        info
      };
    }

    if (isOpen !== this.props.isOpen && !isOpen) {
      let ageGroups = {
        start: 0,
        end: 0,
        selected: [],
        custom: []
      };

      ageGroupOptions.map((ageGroup, index) => {
        const ageGroupNumber = ageGroup.key;

        if (!isNaN(ageGroupNumber)) {
          if (ageGroup.start === 0) {
            ageGroups.start = ageGroupNumber;
            ageGroups.end = ageGroupNumber;
          } else if (ageGroupNumber <= ageGroups.start) {
            ageGroups.start = ageGroupNumber;
          } else if (ageGroupNumber >= ageGroups.end) {
            ageGroups.end = ageGroupNumber;
          }
          ageGroups.selected.push(ageGroup.label);
        } else {
          ageGroups.custom.push({ id: index, label: ageGroup.label });
        }
      });

      let divisions = {};
      ageGroups.selected.map(age => {
        divisions[age] = {
          letters: {
            end: "D",
            selected: ["A", "B", "C", "D"]
          },
          numbers: {
            end: "4th",
            selected: ["1st", "2nd", "3rd", "4th"]
          },
          custom: []
        };
      });
      ageGroups.custom.map(age => {
        divisions[age.label] = {
          letters: {
            end: "D",
            selected: ["A", "B", "C", "D"]
          },
          numbers: {
            end: "4th",
            selected: ["1st", "2nd", "3rd", "4th"]
          },
          custom: []
        };
      });

      updates = {
        ...initialState,
        ageGroups,
        divisions
      };
    }

    if (
      divisionOptions !== this.props.divisionOptions ||
      ageGroupOptions !== this.props.ageGroupOptions
    ) {
      let ageGroups = {
        start: 0,
        end: 0,
        selected: [],
        custom: []
      };

      ageGroupOptions.map((ageGroup, index) => {
        const ageGroupNumber = ageGroup.key;

        if (!isNaN(ageGroupNumber)) {
          if (ageGroup.start === 0) {
            ageGroups.start = ageGroupNumber;
            ageGroups.end = ageGroupNumber;
          } else if (ageGroupNumber <= ageGroups.start) {
            ageGroups.start = ageGroupNumber;
          } else if (ageGroupNumber >= ageGroups.end) {
            ageGroups.end = ageGroupNumber;
          }
          ageGroups.selected.push(ageGroup.label);
        } else {
          ageGroups.custom.push({ id: index, label: ageGroup.label });
        }
      });

      let divisions = {};
      ageGroups.selected.map(age => {
        divisions[age] = {
          letters: {
            end: "D",
            selected: ["A", "B", "C", "D"]
          },
          numbers: {
            end: "4th",
            selected: ["1st", "2nd", "3rd", "4th"]
          },
          custom: []
        };
      });
      ageGroups.custom.map(age => {
        divisions[age.label] = {
          letters: {
            end: "D",
            selected: ["A", "B", "C", "D"]
          },
          numbers: {
            end: "4th",
            selected: ["1st", "2nd", "3rd", "4th"]
          },
          custom: []
        };
      });

      updates = {
        ...updates,
        ageGroups,
        divisions
      };
    }

    this.setState(updates);
  }

  updateStep(newStep) {
    this.setState({
      step: newStep
    });
  }

  updateSport(newSport) {
    const { info } = this.state;

    if (newSport === "Custom") {
      this.setState({
        sport: newSport,
        info: {
          ...info,
          name: "",
          competitive: "",
          nonCompetitive: ""
        }
      });
    } else {
      this.setState({
        sport: newSport,
        info: {
          ...info,
          name: newSport,
          competitive: "Match",
          nonCompetitive: "Practice"
        }
      });
    }
  }

  updateCustomSport(field, newValue) {
    const { info, customErrors } = this.state;

    this.setState({
      info: {
        ...info,
        [field]: newValue
      },
      customErrors: {
        ...customErrors,
        [field]: {
          validation: "default",
          helperText: ""
        }
      }
    });
  }

  renderSportSelection() {
    const { classes, sportsAllowed } = this.props;
    const { sport, sportError } = this.state;

    return (
      <div className={classes.sportSelectionWrapper}>
        <div className={classes.heading}>
          <i className={`fas fa-futbol ${classes.iconAdjacentText}`} />Select
          Sport
        </div>
        {sportsAllowed["Hockey"] && (
          <div
            className={
              sport === "Hockey"
                ? classes.sportOptionSelectedWrapper
                : classes.sportOptionWrapper
            }
            onClick={() => this.updateSport("Hockey")}
          >
            <img
              className={classes.sportIcon}
              alt="Hockey icon"
              src={hockeyIcon}
            />
            <div
              className={
                sport === "Hockey"
                  ? classes.sportNameSelected
                  : classes.sportName
              }
            >
              Hockey
            </div>
          </div>
        )}
        {sportsAllowed["Netball"] && (
          <div
            className={
              sport === "Netball"
                ? classes.sportOptionSelectedWrapper
                : classes.sportOptionWrapper
            }
            onClick={() => this.updateSport("Netball")}
          >
            <img
              className={classes.sportIcon}
              alt="Netball icon"
              src={netballIcon}
            />
            <div
              className={
                sport === "Netball"
                  ? classes.sportNameSelected
                  : classes.sportName
              }
            >
              Netball
            </div>
          </div>
        )}
        {sportsAllowed["Rugby"] && (
          <div
            className={
              sport === "Rugby"
                ? classes.sportOptionSelectedWrapper
                : classes.sportOptionWrapper
            }
            onClick={() => this.updateSport("Rugby")}
          >
            <img
              className={classes.sportIcon}
              alt="Rugby icon"
              src={rugbyIcon}
            />
            <div
              className={
                sport === "Rugby"
                  ? classes.sportNameSelected
                  : classes.sportName
              }
            >
              Rugby
            </div>
          </div>
        )}
        <div
          className={
            sport === "Custom"
              ? classes.sportOptionSelectedWrapper
              : classes.sportOptionWrapper
          }
          onClick={() => this.updateSport("Custom")}
        >
          <img
            className={classes.sportIcon}
            alt="Custom icon"
            src={otherIcon}
          />
          <div
            className={
              sport === "Custom" ? classes.sportNameSelected : classes.sportName
            }
          >
            Custom
          </div>
        </div>
        <div className={classes.flexGrow} />
        {sportError.validation === "error" && (
          <div className={classes.errorWrapper}>{sportError.helperText}</div>
        )}
      </div>
    );
  }

  updateGender(newGender) {
    const { info } = this.state;

    this.setState({
      info: {
        ...info,
        gender: newGender
      }
    });
  }

  renderCustomInfoEditing() {
    const { classes } = this.props;
    const { customErrors, info, sport, gender } = this.state;

    return (
      <div className={classes.customInfoWrapper}>
        {sport === "Custom" && (
          <div className={classes.heading}>
            <i className={`fas fa-edit ${classes.iconAdjacentText}`} />Sport
            Name
          </div>
        )}
        {sport === "Custom" && (
          <TextField
            placeholder=""
            value={info.name}
            validation={customErrors.name.validation}
            helperText={customErrors.name.helperText}
            handleChange={newValue => this.updateCustomSport("name", newValue)}
          />
        )}
        {gender !== "male" &&
          gender !== "female" && (
            <div className={classes.heading}>
              <i
                className={`fas fa-venus-mars ${classes.iconAdjacentText}`}
              />Athlete Genders
            </div>
          )}
        {gender !== "male" &&
          gender !== "female" && (
            <Select
              items={[
                {
                  key: "BOTH",
                  label: "Girls & boys teams"
                },
                {
                  key: "BOTH_MIXED",
                  label: "Girls, boys, & mixed teams"
                },
                {
                  key: "FEMALE",
                  label: "Girls teams only"
                },
                {
                  key: "MALE",
                  label: "Boys teams only"
                },
                {
                  key: "MIXED",
                  label: "Mixed teams only"
                }
              ]}
              selectedItem={info.gender}
              handleChange={(key, label) => this.updateGender({ key, label })}
            />
          )}
        <div className={classes.heading}>
          <i
            className={`fas fa-dumbbell ${classes.practiceIcon}`}
          />Non-Competitive Event Name
        </div>
        <TextField
          placeholder="e.g. Practice"
          value={info.nonCompetitive}
          validation={customErrors.nonCompetitive.validation}
          helperText={customErrors.nonCompetitive.helperText}
          handleChange={newValue =>
            this.updateCustomSport("nonCompetitive", newValue)}
        />
        <div className={classes.heading}>
          <i className={`fas fa-trophy ${classes.matchIcon}`} />Competitive
          Event Name
        </div>
        <TextField
          placeholder="e.g. Match"
          value={info.competitive}
          validation={customErrors.competitive.validation}
          helperText={customErrors.competitive.helperText}
          handleChange={newValue =>
            this.updateCustomSport("competitive", newValue)}
        />
      </div>
    );
  }

  getAgeGroupItems() {
    const { classes } = this.props;
    const { ageGroups, ageGroupErrors } = this.state;

    const ageGroupsSelected = [...ageGroups.selected, ...ageGroups.custom];
    const lastIndex = ageGroupsSelected.length - 1;

    return ageGroupsSelected.map((ageGroup, index) => {
      if (index !== lastIndex) {
        if (ageGroups.selected.includes(ageGroup)) {
          return (
            <div key={ageGroup} className={classes.infoItemWrapper}>
              <span className={classes.infoItemText}>{ageGroup}</span>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeAgeGroup(ageGroup)}
              />
            </div>
          );
        } else {
          return (
            <div key={ageGroup.id} className={classes.infoItemWrapper}>
              <div className={classes.customFieldWrapper}>
                <TextField
                  placeholder="Please label this age group"
                  value={ageGroup.label}
                  validation={
                    ageGroupErrors.custom[ageGroup.id] ? "error" : "default"
                  }
                  handleChange={newValue =>
                    this.updateCustomAgeGroup(
                      { id: ageGroup.id, label: newValue },
                      _.findIndex(ageGroups.custom, value => {
                        return value.id === ageGroup.id;
                      })
                    )}
                />
              </div>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeAgeGroup(ageGroup)}
              />
            </div>
          );
        }
      } else {
        if (ageGroups.selected.includes(ageGroup)) {
          return (
            <div key={ageGroup} className={classes.lastInfoItemWrapper}>
              <span className={classes.infoItemText}>{ageGroup}</span>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeAgeGroup(ageGroup)}
              />
            </div>
          );
        } else {
          return (
            <div key={ageGroup.id} className={classes.lastInfoItemWrapper}>
              <div className={classes.customFieldWrapper}>
                <TextField
                  placeholder="Please label this age group"
                  value={ageGroup.label}
                  validation={
                    ageGroupErrors.custom[ageGroup.id] ? "error" : "default"
                  }
                  handleChange={newValue =>
                    this.updateCustomAgeGroup(
                      { id: ageGroup.id, label: newValue },
                      _.findIndex(ageGroups.custom, value => {
                        return value.id === ageGroup.id;
                      })
                    )}
                />
              </div>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeAgeGroup(ageGroup)}
              />
            </div>
          );
        }
      }
    });
  }

  updateAgeStart(newValue) {
    const { ageGroups } = this.state;

    const newNumber = parseInt(newValue, 10);
    let newAgeGroups = {
      start: newNumber,
      end: newNumber > ageGroups.end ? newNumber : ageGroups.end,
      selected: [],
      custom: ageGroups.custom
    };

    if (newNumber > 5) {
      let i;
      for (i = newAgeGroups.start; i <= newAgeGroups.end; i++) {
        newAgeGroups.selected.push(`U/${i}`);
      }
    } else {
      newAgeGroups.end = 5;
    }

    let newDivisions = {};
    newAgeGroups.selected.map(age => {
      newDivisions[age] = {
        letters: {
          end: "D",
          selected: ["A", "B", "C", "D"]
        },
        numbers: {
          end: "4th",
          selected: ["1st", "2nd", "3rd", "4th"]
        },
        custom: []
      };
    });
    newAgeGroups.custom.map(age => {
      newDivisions[age.label] = {
        letters: {
          end: "D",
          selected: ["A", "B", "C", "D"]
        },
        numbers: {
          end: "4th",
          selected: ["1st", "2nd", "3rd", "4th"]
        },
        custom: []
      };
    });

    this.setState({
      ageGroups: newAgeGroups,
      divisions: newDivisions
    });
  }

  updateAgeEnd(newValue) {
    const { ageGroups } = this.state;

    const newNumber = parseInt(newValue, 10);
    let newAgeGroups = {
      start: newNumber < ageGroups.start ? newNumber : ageGroups.start,
      end: newNumber,
      selected: [],
      custom: ageGroups.custom
    };

    if (newNumber > 5) {
      for (let i = newAgeGroups.start; i <= newAgeGroups.end; i++) {
        newAgeGroups.selected.push(`U/${i}`);
      }
    }

    let newDivisions = {};
    newAgeGroups.selected.map(age => {
      newDivisions[age] = {
        letters: {
          end: "D",
          selected: ["A", "B", "C", "D"]
        },
        numbers: {
          end: "4th",
          selected: ["1st", "2nd", "3rd", "4th"]
        },
        custom: []
      };
    });
    newAgeGroups.custom.map(age => {
      newDivisions[age.label] = {
        letters: {
          end: "D",
          selected: ["A", "B", "C", "D"]
        },
        numbers: {
          end: "4th",
          selected: ["1st", "2nd", "3rd", "4th"]
        },
        custom: []
      };
    });

    this.setState({
      ageGroups: newAgeGroups,
      divisions: newDivisions
    });
  }

  addCustomAgeGroup() {
    const { ageGroups } = this.state;

    const newAgeGroups = {
      ...ageGroups,
      custom: [
        ...ageGroups.custom,
        { id: ageGroups.custom.length + 1, label: "" }
      ]
    };

    this.setState({
      ageGroups: newAgeGroups
    });
  }

  removeAgeGroup(ageGroup) {
    const { ageGroups } = this.state;

    const newAgeGroups = {
      ...ageGroups,
      selected: _.without(ageGroups.selected, ageGroup),
      custom: _.filter(ageGroups.custom, value => value.id !== ageGroup.id)
    };

    this.setState({
      ageGroups: newAgeGroups
    });
  }

  addCustomDivision(ageGroup) {
    const { divisions } = this.state;

    const newDivisions = {
      ...divisions,
      [ageGroup]: {
        ...divisions[ageGroup],
        custom: [
          ...divisions[ageGroup].custom,
          { id: divisions[ageGroup].custom.length + 1, label: "" }
        ]
      }
    };

    this.setState({
      divisions: newDivisions
    });
  }

  removeDivision(ageGroup, division) {
    const { divisions } = this.state;

    const newDivisions = {
      ...divisions,
      [ageGroup]: {
        ...divisions[ageGroup],
        numbers: {
          ...divisions[ageGroup].numbers,
          selected: _.without(divisions[ageGroup].numbers.selected, division)
        },
        letters: {
          ...divisions[ageGroup].letters,
          selected: _.without(divisions[ageGroup].letters.selected, division)
        },
        custom: _.filter(
          divisions[ageGroup].custom,
          value => value.id !== division.id
        )
      }
    };

    this.setState({
      divisions: newDivisions
    });
  }

  updateCustomAgeGroup(newValue, index) {
    const { ageGroups } = this.state;

    let newCustom = ageGroups.custom;
    newCustom[index] = newValue;

    this.setState({
      ageGroups: {
        ...ageGroups,
        custom: newCustom
      }
    });
  }

  renderAgeGroups() {
    const { classes } = this.props;
    const { ageGroups } = this.state;

    const ageGroupItems = this.getAgeGroupItems();
    const ageGroupStartText =
      ageGroups.start === 0 || ageGroups.start === 5
        ? "None"
        : `U/${ageGroups.start}`;
    const ageGroupEndText =
      ageGroups.end === 0 || ageGroups.end === 5 ? "N/A" : `U/${ageGroups.end}`;

    return (
      <div className={classes.ageGroupsWrapper}>
        <div className={classes.heading}>
          <i
            className={`fas fa-hourglass-half ${classes.iconAdjacentText}`}
          />Age Groups
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.section}>
            <div className={classes.ageSelectorsWrapper}>
              <div className={classes.heading}>{"Start"}</div>
              <Slider
                min={5}
                max={30}
                value={ageGroups.start}
                handleChange={newValue => this.updateAgeStart(newValue)}
              />
              <div className={classes.sliderLabel}>{ageGroupStartText}</div>
              <div className={classes.heading}>{"End"}</div>
              <Slider
                min={5}
                max={30}
                value={ageGroups.end}
                disabled={ageGroups.end === 5 || ageGroups.end === 0}
                handleChange={newValue => this.updateAgeEnd(newValue)}
              />
              <div className={classes.sliderLabel}>{ageGroupEndText}</div>
            </div>
            {ageGroupItems.length === 0 ? (
              <div className={classes.outerErrorWrapper}>
                <div className={classes.errorWrapper}>
                  {"Please add at least 1 age group"}
                </div>
              </div>
            ) : (
              <div className={classes.itemsListWrapper}>{ageGroupItems}</div>
            )}
            <div
              className={classes.addCustomWrapper}
              onClick={() => this.addCustomAgeGroup()}
            >
              <i className={`fas fa-plus ${classes.icon}`} />Add custom
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateCustomDivision(ageGroup, newValue, index) {
    const { divisions } = this.state;

    let newCustom = divisions[ageGroup].custom;
    newCustom[index] = newValue;

    this.setState({
      divisions: {
        ...divisions,
        [ageGroup]: {
          ...divisions[ageGroup],
          custom: newCustom
        }
      }
    });
  }

  getDivisionsItems(ageGroup) {
    const { classes } = this.props;
    const { divisions, divisionsErrors } = this.state;

    const divisionsSelected = [
      ...divisions[ageGroup].numbers.selected,
      ...divisions[ageGroup].letters.selected,
      ...divisions[ageGroup].custom
    ];
    const lastIndex = divisionsSelected.length - 1;

    return divisionsSelected.map((division, index) => {
      if (index !== lastIndex) {
        if (
          divisions[ageGroup].numbers.selected.includes(division) ||
          divisions[ageGroup].letters.selected.includes(division)
        ) {
          return (
            <div
              key={`${ageGroup}-${division}`}
              className={classes.infoItemWrapper}
            >
              <span className={classes.infoItemText}>{`${division} team`}</span>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeDivision(ageGroup, division)}
              />
            </div>
          );
        } else {
          return (
            <div
              key={`${ageGroup}-${division.id}`}
              className={classes.lastInfoItemWrapper}
            >
              <div className={classes.customFieldWrapper}>
                <TextField
                  placeholder="Please label this division"
                  value={division.label}
                  validation={
                    divisionsErrors.custom[ageGroup] &&
                    divisionsErrors.custom[ageGroup][division.id]
                      ? "error"
                      : "default"
                  }
                  handleChange={newValue =>
                    this.updateCustomDivision(
                      ageGroup,
                      { id: division.id, label: newValue },
                      _.findIndex(divisions[ageGroup].custom, value => {
                        return value.id === division.id;
                      })
                    )}
                />
              </div>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeDivision(ageGroup, division)}
              />
            </div>
          );
        }
      } else {
        if (
          divisions[ageGroup].numbers.selected.includes(division) ||
          divisions[ageGroup].letters.selected.includes(division)
        ) {
          return (
            <div
              key={`${ageGroup}-${division}`}
              className={classes.lastInfoItemWrapper}
            >
              <span
                className={classes.lastInfoItemText}
              >{`${division} team`}</span>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeDivision(ageGroup, division)}
              />
            </div>
          );
        } else {
          return (
            <div
              key={`${ageGroup}-${division.id}`}
              className={classes.lastInfoItemWrapper}
            >
              <div className={classes.customFieldWrapper}>
                <TextField
                  placeholder="Please label this division"
                  value={division.label}
                  validation={
                    divisionsErrors.custom[ageGroup] &&
                    divisionsErrors.custom[ageGroup][division.id]
                      ? "error"
                      : "default"
                  }
                  handleChange={newValue =>
                    this.updateCustomDivision(
                      ageGroup,
                      { id: division.id, label: newValue },
                      _.findIndex(divisions[ageGroup].custom, value => {
                        return value.id === division.id;
                      })
                    )}
                />
              </div>
              <i
                className={`fas fa-minus-circle ${classes.deleteButton}`}
                onClick={() => this.removeDivision(ageGroup, division)}
              />
            </div>
          );
        }
      }
    });
  }

  updateDivisionLetters(ageGroup, newValue) {
    const { divisions } = this.state;

    const newNumber = parseInt(newValue, 10);
    const letterOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const newLetter = newNumber === -1 ? "None" : letterOptions[newNumber];

    let newDivisions = {
      ...divisions,
      [ageGroup]: {
        letters: {
          end: newLetter,
          selected: []
        },
        numbers: divisions[ageGroup].numbers,
        custom: divisions[ageGroup].custom
      }
    };

    if (newNumber > -1) {
      let i;
      for (i = 0; i <= newNumber; i++) {
        newDivisions[ageGroup].letters.selected.push(letterOptions[i]);
      }
    }

    this.setState({
      divisions: newDivisions
    });
  }

  updateDivisionNumbers(ageGroup, newValue) {
    const { divisions } = this.state;

    const newNumber = parseInt(newValue, 10);
    const numberOptions = [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th"
    ];
    const newNumberSuffix =
      newNumber === -1 ? "None" : numberOptions[newNumber];

    let newDivisions = {
      ...divisions,
      [ageGroup]: {
        numbers: {
          end: newNumberSuffix,
          selected: []
        },
        letters: divisions[ageGroup].letters,
        custom: divisions[ageGroup].custom
      }
    };

    if (newNumber > -1) {
      let i;
      for (i = 0; i <= newNumber; i++) {
        newDivisions[ageGroup].numbers.selected.push(numberOptions[i]);
      }
    }

    this.setState({
      divisions: newDivisions
    });
  }

  renderDivisions() {
    const { classes } = this.props;
    const { divisions } = this.state;

    const letterOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const numberOptions = [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th"
    ];

    return (
      <div className={classes.ageGroupsWrapper}>
        <div className={classes.heading}>
          <i
            className={`fas fa-sort-alpha-down ${classes.iconAdjacentText}`}
          />Divisions
        </div>
        <div className={classes.contentWrapper}>
          {_.toPairs(divisions).map(([ageGroup, divisionInfo]) => {
            const divisionsItems = this.getDivisionsItems(ageGroup);

            let numberSliderText =
              divisionInfo.numbers.end === "1st"
                ? `Only 1st team`
                : `1st to ${divisionInfo.numbers.end} teams`;
            if (divisionInfo.numbers.end === "None") numberSliderText = "None";
            let letterSliderText =
              divisionInfo.letters.end === "A"
                ? `Only A team`
                : `A to ${divisionInfo.letters.end} teams`;
            if (divisionInfo.letters.end === "None") letterSliderText = "None";

            return (
              <div key={ageGroup} className={classes.section}>
                <div
                  className={classes.sectionHeading}
                >{`${ageGroup} Divisions`}</div>
                <div className={classes.divisionSelectorsWrapper}>
                  <div className={classes.heading}>{"Numbered"}</div>
                  <Slider
                    min={-1}
                    max={numberOptions.length - 1}
                    value={_.indexOf(numberOptions, divisionInfo.numbers.end)}
                    handleChange={newValue =>
                      this.updateDivisionNumbers(ageGroup, newValue)}
                  />
                  <div className={classes.sliderLabel}>{numberSliderText}</div>
                  <div className={classes.heading}>{"Lettered"}</div>
                  <Slider
                    min={-1}
                    max={letterOptions.length - 1}
                    value={_.indexOf(letterOptions, divisionInfo.letters.end)}
                    handleChange={newValue =>
                      this.updateDivisionLetters(ageGroup, newValue)}
                  />
                  <div className={classes.sliderLabel}>{letterSliderText}</div>
                </div>
                {divisionsItems.length === 0 ? (
                  <div className={classes.outerErrorWrapper}>
                    <div className={classes.errorWrapper}>
                      {"Please add at least 1 division"}
                    </div>
                  </div>
                ) : (
                  <div className={classes.itemsListWrapper}>
                    {divisionsItems}
                  </div>
                )}
                <div
                  className={classes.addCustomWrapper}
                  onClick={() => this.addCustomDivision(ageGroup)}
                >
                  <i className={`fas fa-plus ${classes.icon}`} />Add custom
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  validateSportSelection() {
    const { sport } = this.state;

    if (sport === "") {
      this.setState({
        sportError: {
          validation: "error",
          helperText: "Please select a sport"
        }
      });
      return false;
    } else {
      this.setState({
        sportError: {
          validation: "default",
          helperText: ""
        }
      });
      return true;
    }
  }

  validateCustomSport() {
    const { info } = this.state;

    let isValid = true;
    let updates = {
      name: {
        validation: "default",
        helperText: ""
      },
      nonCompetitive: {
        validation: "default",
        helperText: ""
      },
      competitive: {
        validation: "default",
        helperText: ""
      }
    };

    if (info.name === "") {
      updates.name = {
        validation: "error",
        helperText: "Please enter a name for this sport"
      };
      isValid = false;
    } else if (info.name.length > 64) {
      updates.name = {
        validation: "error",
        helperText: "Max. 64 characters allowed"
      };
      isValid = false;
    }

    if (info.nonCompetitive === "") {
      updates.nonCompetitive = {
        validation: "error",
        helperText: "Please enter a name for non-competitive events"
      };
      isValid = false;
    } else if (info.nonCompetitive.length > 64) {
      updates.nonCompetitive = {
        validation: "error",
        helperText: "Max. 64 characters allowed"
      };
      isValid = false;
    }

    if (info.competitive === "") {
      updates.competitive = {
        validation: "error",
        helperText: "Please enter a name for competitive events"
      };
      isValid = false;
    } else if (info.competitive.length > 64) {
      updates.competitive = {
        validation: "error",
        helperText: "Max. 64 characters allowed"
      };
      isValid = false;
    }

    this.setState({
      customErrors: updates
    });
    return isValid;
  }

  validateAgeGroups() {
    const { ageGroups } = this.state;

    let isValid = true;
    let customErrors = {};

    if (ageGroups.custom.length === 0 && ageGroups.selected.length === 0) {
      isValid = false;
    }
    ageGroups.custom.map(ageGroup => {
      if (ageGroup.label === "") {
        isValid = false;
        customErrors[ageGroup.id] = true;
      } else {
        customErrors[ageGroup.id] = false;
      }
    });

    this.setState({
      ageGroupErrors: {
        custom: customErrors,
        validation: "default",
        message: ""
      }
    });

    return isValid;
  }

  validateDivisions() {
    const { divisions } = this.state;

    let isValid = true;
    let customErrors = {};

    _.toPairs(divisions).map(([ageGroup, divisionInfo]) => {
      if (
        divisionInfo.custom.length === 0 &&
        divisionInfo.letters.selected.length === 0 &&
        divisionInfo.numbers.selected.length === 0
      ) {
        isValid = false;
      }
      divisionInfo.custom.map(division => {
        if (division.label === "") {
          isValid = false;
          if (customErrors[ageGroup]) {
            customErrors[ageGroup][division.id] = true;
          } else {
            customErrors[ageGroup] = {
              [division.id]: true
            };
          }
        } else {
          if (customErrors[ageGroup]) {
            customErrors[ageGroup][division.id] = false;
          } else {
            customErrors[ageGroup] = {
              [division.id]: false
            };
          }
        }
      });
    });

    this.setState({
      divisionsErrors: {
        custom: customErrors,
        validation: "default",
        message: ""
      }
    });

    return isValid;
  }

  getSportInfo() {
    const { establishedSports } = this.props;
    const { info, ageGroups, divisions } = this.state;

    const standardAgeGroups = ageGroups.selected.map(item => item);
    const customAgeGroups = ageGroups.custom.map(item => item.label);

    let formattedDivisions = {};
    _.toPairs(divisions).map(([ageGroup, divisionInfo]) => {
      const letterDivisions = divisionInfo.letters.selected.map(item => item);
      const numberDivisions = divisionInfo.numbers.selected.map(item => item);
      const customDivisions = divisionInfo.custom.map(item => item.label);
      formattedDivisions[ageGroup] = [
        ...letterDivisions,
        ...numberDivisions,
        ...customDivisions
      ];
    });

    return {
      info,
      establishedSports,
      ageGroups: [...standardAgeGroups, ...customAgeGroups],
      divisions: formattedDivisions
    };
  }

  getActionButtons() {
    const { closeDialog, addSport, isLoading } = this.props;
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
              const isValid = this.validateSportSelection();
              isValid && this.updateStep(2);
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
            handleClick={() => this.updateStep(1)}
          >
            Back
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => {
              const isValid = this.validateCustomSport();
              isValid && this.updateStep(3);
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
            handleClick={() => this.updateStep(2)}
          >
            Back
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => {
              const isValid = this.validateAgeGroups();
              isValid && this.updateStep(4);
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
            handleClick={() => this.updateStep(3)}
          >
            Back
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            loading={isLoading}
            handleClick={() => {
              const isValid = this.validateDivisions();
              isValid && addSport(this.getSportInfo());
            }}
          >
            Add sport
          </Button>
        ];
      default:
        return [
          <Button colour="primary" slim handleClick={() => this.updateStep(1)}>
            Back
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            handleClick={() => this.updateStep(1)}
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
        content = this.renderSportSelection();
        break;
      case 2:
        content = this.renderCustomInfoEditing();
        break;
      case 3:
        content = this.renderAgeGroups();
        break;
      case 4:
        content = this.renderDivisions();
        break;
      default:
        content = this.renderSportSelection();
        break;
    }

    return (
      <Dialog
        isOpen={isOpen}
        size="medium"
        heading="Add Sport"
        actions={actions}
        hasSteps
        numberOfSteps={4}
        currentStep={step}
      >
        {content}
      </Dialog>
    );
  }
}

export default injectSheet(styles)(AddSportDialog);
