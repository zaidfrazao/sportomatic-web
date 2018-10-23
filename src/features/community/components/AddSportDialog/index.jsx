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

import athleticsIcon from "../../images/athletics.png";
import hockeyIcon from "../../images/hockey.png";
import netballIcon from "../../images/netball.png";
import rugbyIcon from "../../images/rugby.png";

const styles = {
  addCustomTeamButtonWrapper: {
    padding: "24px 24px 0 24px"
  },
  ageSelectorsWrapper: {
    padding: 12,
    backgroundColor: grey[50],
    borderRadius: 16
  },
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "stretch"
  },
  sidebar: {
    width: "30%"
  },
  nonSidebar: {
    width: "70%",
    display: "flex",
    flexDirection: "column"
  },
  deleteButton: {
    marginLeft: 12,
    transition: "0.25s",
    cursor: "pointer",
    fontSize: 24,
    color: grey[300],
    "&:hover": {
      color: red[500]
    }
  },
  divisionSelectorsWrapper: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: grey[50]
  },
  errorWrapper: {
    backgroundColor: red[500],
    width: "calc(100% - 72px)",
    color: common["white"],
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 8,
    padding: 12,
    margin: "0 24px 24px 24px"
  },
  flexGrow: {
    flexGrow: 1
  },
  heading: {
    width: "calc(100% - 24px)",
    margin: 12,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14
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
  section: {
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    margin: "24px 24px 0 24px",
    height: "100%",
    width: "calc(100% - 48px)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionHeading: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: 16,
    borderRadius: "16px 16px 0 0",
    padding: "12px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  sliderLabel: {
    fontSize: 14,
    color: grey[500],
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    margin: "8px 0 24px 0"
  },
  sportIcon: {
    width: 32,
    height: 32,
    marginBottom: 12
  },
  sportName: {
    transition: "0.25s",
    color: grey[800],
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "23px",
    fontSize: 16
  },
  sportNameSelected: {
    transition: "0.25s",
    color: common["white"],
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "23px",
    fontSize: 16
  },
  sportOptionSelectedWrapper: {
    transition: "0.25s",
    margin: "24px 12px",
    padding: 24,
    width: 60,
    borderRadius: 16,
    backgroundColor: lightBlue[500],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  sportOptionWrapper: {
    transition: "0.25s",
    margin: "24px 12px",
    padding: 24,
    width: 60,
    borderRadius: 16,
    backgroundColor: grey[200],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  sportSelectionWrapper: {
    border: `1px solid ${grey[300]}`,
    backgroundColor: grey[50],
    margin: 24,
    borderRadius: 16,
    padding: "0 12px",
    display: "flex",
    flexWrap: "wrap"
  },
  teamInfoWrapper: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: `1px solid ${grey[300]}`
  },
  teamNumberWrapper: {
    backgroundColor: grey[500],
    width: "calc(100% - 72px)",
    color: common["white"],
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 8,
    padding: 12,
    margin: "0 24px"
  },
  teamsInnerWrapper: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  teamsWrapper: {
    flex: 1,
    overflow: "auto"
  },
  teamNameWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  teamWrapper: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${grey[300]}`,
    width: "calc(33% - 74px)",
    backgroundColor: grey[100],
    borderRadius: 16,
    margin: 24,
    padding: 12
  }
};

const initialState = {
  sport: "",
  info: {
    name: "",
    nonCompetitive: "",
    competitive: "",
    gender: "BOTH"
  },
  ageGroups: {
    start: 6,
    end: 19
  },
  divisions: {
    letters: {
      end: "D"
    },
    numbers: {
      end: "4th"
    }
  },
  sportError: {
    validation: "error",
    helperText: "Please select a sport"
  },
  teamsError: {
    validation: "default",
    helperText: ""
  },
  generatedTeams: [],
  customTeams: []
};

class AddSportDialog extends Component {
  state = initialState;

  componentWillMount() {
    const { ageGroupOptions, genders } = this.props;

    let info = {
      name: "",
      nonCompetitive: "",
      competitive: "",
      gender: "BOTH"
    };
    let ageGroups = {
      start: 0,
      end: 0
    };

    if (genders === "male") {
      info = {
        ...info,
        gender: "MALE"
      };
    } else if (genders === "female") {
      info = {
        ...info,
        gender: "FEMALE"
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
      }
    });

    this.setState({
      info,
      ageGroups
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
        gender: "BOTH"
      };

      if (genders === "male") {
        info = {
          ...info,
          gender: "MALE"
        };
      } else if (genders === "female") {
        info = {
          ...info,
          gender: "FEMALE"
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
        end: 0
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
        }
      });

      updates = {
        ...initialState,
        ageGroups
      };
    }

    if (
      divisionOptions !== this.props.divisionOptions ||
      ageGroupOptions !== this.props.ageGroupOptions
    ) {
      let ageGroups = {
        start: 0,
        end: 0
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
        }
      });

      updates = {
        ...updates,
        ageGroups
      };
    }

    this.setState(updates);
  }

  getNumberSuffix(number) {
    switch (number) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  generateTeams(ageGroups, divisions, sport) {
    const { genders } = this.props;

    let generatedTeams = [];
    let gender = "MIXED";
    const letterOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let ageGroupCounter = ageGroups.start;

    switch (sport) {
      case "Athletics":
        gender = genders === "mixed" ? "MIXED" : _.toUpper(genders);
        break;
      case "Hockey":
        gender = "BOTH";
        break;
      case "Rugby":
        gender = "MALE";
        break;
      case "Netball":
        gender = "FEMALE";
        break;
      default:
        gender = "BOTH";
        break;
    }

    if (ageGroupCounter !== 0) {
      let divisionCounter = 1;
      const numbersEnd = divisions.numbers.end;

      if (numbersEnd !== "None") {
        while (divisionCounter <= parseInt(numbersEnd[0], 10)) {
          const suffix = this.getNumberSuffix(divisionCounter);

          switch (gender) {
            case "MALE":
              generatedTeams.push({
                name: `${sport} Men's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "MALE",
                  label: "Men"
                },
                sport
              });
              break;
            case "FEMALE":
              generatedTeams.push({
                name: `${sport} Women's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "FEMALE",
                  label: "Women"
                },
                sport
              });
              break;
            case "BOTH":
              generatedTeams.push({
                name: `${sport} Men's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "MALE",
                  label: "Men"
                },
                sport
              });
              generatedTeams.push({
                name: `${sport} Women's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "FEMALE",
                  label: "Women"
                },
                sport
              });
              break;
            default:
              generatedTeams.push({
                name: `${sport} Mixed ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "MIXED",
                  label: "Mixed"
                },
                sport
              });
              break;
          }
          divisionCounter++;
        }
      }

      while (ageGroupCounter <= ageGroups.end) {
        const lettersEnd = divisions.letters.end;

        divisionCounter = 0;
        if (lettersEnd !== "None") {
          while (divisionCounter <= _.indexOf(letterOptions, lettersEnd)) {
            switch (gender) {
              case "MALE":
                if (ageGroupCounter < 18) {
                  generatedTeams.push({
                    name: `${sport} Boys' U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "MALE",
                      label: "Boys"
                    },
                    sport
                  });
                } else {
                  generatedTeams.push({
                    name: `${sport} Men's U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "MALE",
                      label: "Men"
                    },
                    sport
                  });
                }
                break;
              case "FEMALE":
                if (ageGroupCounter < 18) {
                  generatedTeams.push({
                    name: `${sport} Girls' U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "FEMALE",
                      label: "Girls"
                    },
                    sport
                  });
                } else {
                  generatedTeams.push({
                    name: `${sport} Women's U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "FEMALE",
                      label: "Women"
                    },
                    sport
                  });
                }
                break;
              case "BOTH":
                if (ageGroupCounter < 18) {
                  generatedTeams.push({
                    name: `${sport} Boys' U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "MALE",
                      label: "Boys"
                    },
                    sport
                  });
                  generatedTeams.push({
                    name: `${sport} Girls' U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "FEMALE",
                      label: "Girls"
                    },
                    sport
                  });
                } else {
                  generatedTeams.push({
                    name: `${sport} Men's U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "MALE",
                      label: "Men"
                    },
                    sport
                  });
                  generatedTeams.push({
                    name: `${sport} Women's U/${ageGroupCounter} ${letterOptions[
                      divisionCounter
                    ]} Team`,
                    ageGroup: `U/${ageGroupCounter}`,
                    division: letterOptions[divisionCounter],
                    gender: {
                      key: "FEMALE",
                      label: "Women"
                    },
                    sport
                  });
                }
                break;
              default:
                generatedTeams.push({
                  name: `${sport} Mixed U/${ageGroupCounter} ${letterOptions[
                    divisionCounter
                  ]} Team`,
                  ageGroup: `U/${ageGroupCounter}`,
                  division: letterOptions[divisionCounter],
                  gender: {
                    key: "MIXED",
                    label: "Mixed"
                  },
                  sport
                });
                break;
            }
            divisionCounter++;
          }
        }
        ageGroupCounter++;
      }
    } else {
      let divisionCounter = 1;
      const numbersEnd = divisions.numbers.end;
      const lettersEnd = divisions.letters.end;

      if (numbersEnd !== "None") {
        while (divisionCounter <= parseInt(numbersEnd[0], 10)) {
          const suffix = this.getNumberSuffix(divisionCounter);

          switch (gender) {
            case "MALE":
              generatedTeams.push({
                name: `${sport} Men's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "MALE",
                  label: "Men"
                },
                sport
              });
              break;
            case "FEMALE":
              generatedTeams.push({
                name: `${sport} Women's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "FEMALE",
                  label: "Women"
                },
                sport
              });
              break;
            case "BOTH":
              generatedTeams.push({
                name: `${sport} Men's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "FEMALE",
                  label: "Men"
                },
                sport
              });
              generatedTeams.push({
                name: `${sport} Women's ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "FEMALE",
                  label: "Women"
                },
                sport
              });
              break;
            default:
              generatedTeams.push({
                name: `${sport} Mixed ${divisionCounter}${suffix} Team`,
                ageGroup: "Open",
                division: `${divisionCounter}${suffix}`,
                gender: {
                  key: "MIXED",
                  label: "Mixed"
                },
                sport
              });
              break;
          }
          divisionCounter++;
        }
      }

      divisionCounter = 0;
      if (lettersEnd !== "None") {
        while (divisionCounter <= _.indexOf(letterOptions, lettersEnd)) {
          switch (gender) {
            case "MALE":
              generatedTeams.push({
                name: `${sport} Men's ${letterOptions[divisionCounter]} Team`,
                ageGroup: "Open",
                division: letterOptions[divisionCounter],
                gender: {
                  key: "MALE",
                  label: "Men"
                },
                sport
              });
              break;
            case "FEMALE":
              generatedTeams.push({
                name: `${sport} Women's ${letterOptions[divisionCounter]} Team`,
                ageGroup: "Open",
                division: letterOptions[divisionCounter],
                gender: {
                  key: "FEMALE",
                  label: "Women"
                },
                sport
              });
              break;
            case "BOTH":
              generatedTeams.push({
                name: `${sport} Men's ${letterOptions[divisionCounter]} Team`,
                ageGroup: "Open",
                division: letterOptions[divisionCounter],
                gender: {
                  key: "MALE",
                  label: "Men"
                },
                sport
              });
              generatedTeams.push({
                name: `${sport} Women's ${letterOptions[divisionCounter]} Team`,
                ageGroup: "Open",
                division: letterOptions[divisionCounter],
                gender: {
                  key: "FEMALE",
                  label: "Women"
                },
                sport
              });
              break;
            default:
              generatedTeams.push({
                name: `${sport} Mixed ${letterOptions[divisionCounter]} Team`,
                ageGroup: "Open",
                division: letterOptions[divisionCounter],
                gender: {
                  key: "MIXED",
                  label: "Mixed"
                },
                sport
              });
              break;
          }
          divisionCounter++;
        }
      }
    }

    return generatedTeams;
  }

  updateSport(newSport) {
    const { info, ageGroups, divisions } = this.state;

    let generatedTeams = [];

    switch (newSport) {
      case "Athletics":
        generatedTeams = this.generateTeams(ageGroups, divisions, newSport);
        this.setState({
          sport: newSport,
          info: {
            ...info,
            name: newSport,
            competitive: "Meeting",
            nonCompetitive: "Training"
          },
          sportError: {
            validation: "default",
            message: ""
          },
          customTeams: [],
          generatedTeams
        });
        break;
      case "Hockey":
        generatedTeams = this.generateTeams(ageGroups, divisions, newSport);
        this.setState({
          sport: newSport,
          info: {
            ...info,
            name: newSport,
            competitive: "Match",
            nonCompetitive: "Practice"
          },
          sportError: {
            validation: "default",
            message: ""
          },
          customTeams: [],
          generatedTeams
        });
        break;
      case "Rugby":
        generatedTeams = this.generateTeams(ageGroups, divisions, newSport);
        this.setState({
          sport: newSport,
          info: {
            ...info,
            name: newSport,
            competitive: "Match",
            nonCompetitive: "Practice"
          },
          sportError: {
            validation: "default",
            message: ""
          },
          customTeams: [],
          generatedTeams
        });
        break;
      case "Netball":
        generatedTeams = this.generateTeams(ageGroups, divisions, newSport);
        this.setState({
          sport: newSport,
          info: {
            ...info,
            name: newSport,
            competitive: "Match",
            nonCompetitive: "Practice"
          },
          sportError: {
            validation: "default",
            message: ""
          },
          customTeams: [],
          generatedTeams
        });
        break;
      default:
        this.setState({
          sport: newSport,
          info: {
            ...info,
            name: "Custom",
            competitive: "Match",
            nonCompetitive: "Practice"
          },
          sportError: {
            validation: "default",
            message: ""
          },
          customTeams: []
        });
        break;
    }
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

  updateAgeStart(newValue) {
    const { ageGroups, divisions, sport } = this.state;

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

    const generatedTeams = this.generateTeams(newAgeGroups, divisions, sport);

    this.setState({
      ageGroups: newAgeGroups,
      generatedTeams
    });
  }

  updateAgeEnd(newValue) {
    const { ageGroups, divisions, sport } = this.state;

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

    const generatedTeams = this.generateTeams(newAgeGroups, divisions, sport);

    this.setState({
      ageGroups: newAgeGroups,
      generatedTeams
    });
  }

  renderAgeGroups() {
    const { classes } = this.props;
    const { ageGroups } = this.state;

    const ageGroupStartText =
      ageGroups.start === 0 || ageGroups.start === 5
        ? "None"
        : `U/${ageGroups.start}`;
    const ageGroupEndText =
      ageGroups.end === 0 || ageGroups.end === 5 ? "N/A" : `U/${ageGroups.end}`;

    return (
      <div className={classes.ageGroupsWrapper}>
        <div className={classes.contentWrapper}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>
              <i
                className={`fas fa-hourglass-half ${classes.iconAdjacentText}`}
              />Age Groups
            </div>
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
          </div>
        </div>
      </div>
    );
  }

  updateDivisionLetters(newValue) {
    const { ageGroups, divisions, sport } = this.state;

    const newNumber = parseInt(newValue, 10);
    const letterOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const newLetter = newNumber === -1 ? "None" : letterOptions[newNumber];

    let newDivisions = {
      ...divisions,
      letters: {
        end: newLetter,
        selected: []
      },
      numbers: divisions.numbers,
      custom: divisions.custom
    };

    if (newNumber > -1) {
      let i;
      for (i = 0; i <= newNumber; i++) {
        newDivisions.letters.selected.push(letterOptions[i]);
      }
    }

    const generatedTeams = this.generateTeams(ageGroups, newDivisions, sport);

    this.setState({
      divisions: newDivisions,
      generatedTeams
    });
  }

  updateDivisionNumbers(newValue) {
    const { ageGroups, divisions, sport } = this.state;

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
      numbers: {
        end: newNumberSuffix,
        selected: []
      },
      letters: divisions.letters,
      custom: divisions.custom
    };

    if (newNumber > -1) {
      let i;
      for (i = 0; i <= newNumber; i++) {
        newDivisions.numbers.selected.push(numberOptions[i]);
      }
    }

    const generatedTeams = this.generateTeams(ageGroups, newDivisions, sport);

    this.setState({
      divisions: newDivisions,
      generatedTeams
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
    let numberSliderText =
      divisions.numbers.end === "1st"
        ? `Only 1st team`
        : `1st to ${divisions.numbers.end} teams`;
    if (divisions.numbers.end === "None") numberSliderText = "None";
    let letterSliderText =
      divisions.letters.end === "A"
        ? `Only A team`
        : `A to ${divisions.letters.end} teams`;
    if (divisions.letters.end === "None") letterSliderText = "None";

    return (
      <div className={classes.ageGroupsWrapper}>
        <div className={classes.contentWrapper}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>
              <i
                className={`fas fa-sort-alpha-down ${classes.iconAdjacentText}`}
              />Divisions
            </div>
            <div className={classes.divisionSelectorsWrapper}>
              <div className={classes.heading}>{"Numbered"}</div>
              <Slider
                min={-1}
                max={numberOptions.length - 1}
                value={_.indexOf(numberOptions, divisions.numbers.end)}
                handleChange={newValue => this.updateDivisionNumbers(newValue)}
              />
              <div className={classes.sliderLabel}>{numberSliderText}</div>
              <div className={classes.heading}>{"Lettered"}</div>
              <Slider
                min={-1}
                max={letterOptions.length - 1}
                value={_.indexOf(letterOptions, divisions.letters.end)}
                handleChange={newValue => this.updateDivisionLetters(newValue)}
              />
              <div className={classes.sliderLabel}>{letterSliderText}</div>
            </div>
          </div>
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

  validateTeams() {
    const { customTeams, generatedTeams } = this.state;

    let isValid = true;

    if (customTeams.length === 0 && generatedTeams.length === 0) {
      isValid = false;
    } else {
      customTeams.map(teamInfo => {
        if (
          teamInfo.name.length === 0 ||
          teamInfo.ageGroup.length === 0 ||
          teamInfo.division.length === 0
        ) {
          isValid = false;
        }
      });
      generatedTeams.map(teamInfo => {
        if (
          teamInfo.name.length === 0 ||
          teamInfo.ageGroup.length === 0 ||
          teamInfo.division.length === 0
        ) {
          isValid = false;
        }
      });
    }

    return isValid;
  }

  getSportInfo() {
    const { establishedSports } = this.props;
    const { info, generatedTeams, customTeams } = this.state;

    let formattedTeams = [];
    formattedTeams = customTeams.map(teamInfo => {
      return {
        ...teamInfo,
        gender: teamInfo.gender.key
      };
    });
    formattedTeams = [
      ...formattedTeams,
      ...generatedTeams.map(teamInfo => {
        return {
          ...teamInfo,
          gender: teamInfo.gender.key
        };
      })
    ];

    return {
      info,
      establishedSports,
      teams: formattedTeams
    };
  }

  resetDialog() {
    const { ageGroupOptions, genders } = this.props;

    let updates = initialState;

    let info = {
      name: "",
      nonCompetitive: "",
      competitive: "",
      gender: "BOTH"
    };

    if (genders === "male") {
      info = {
        ...info,
        gender: "MALE"
      };
    } else if (genders === "female") {
      info = {
        ...info,
        gender: "FEMALE"
      };
    }

    updates = {
      ...updates,
      info
    };

    let ageGroups = {
      start: 0,
      end: 0
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
      }
    });

    updates = {
      ...updates,
      ageGroups
    };

    this.setState(updates);
  }

  getActionButtons() {
    const { closeDialog, addSport, isLoading } = this.props;

    return [
      <Button colour="primary" slim handleClick={() => closeDialog()}>
        Cancel
      </Button>,
      <Button colour="primary" slim handleClick={() => this.resetDialog()}>
        Reset
      </Button>,
      <Button
        colour="primary"
        filled
        slim
        loading={isLoading}
        handleClick={() => {
          const isValid = this.validateTeams();
          isValid && addSport(this.getSportInfo());
        }}
      >
        Add sport
      </Button>
    ];
  }

  renderTeam(index, teamInfo, isCustom) {
    const { classes, genders } = this.props;

    let genderOptions = [
      {
        key: "MALE",
        label: "Boys"
      },
      {
        key: "FEMALE",
        label: "Girls"
      },
      {
        key: "MIXED",
        label: "Mixed"
      }
    ];

    if (genders === "male") {
      if (teamInfo.ageGroup[0] === "U" && teamInfo.ageGroup < "U/18") {
        genderOptions = [
          {
            key: "MALE",
            label: "Boys"
          }
        ];
      } else {
        genderOptions = [
          {
            key: "MALE",
            label: "Men"
          }
        ];
      }
    } else if (genders === "female") {
      if (teamInfo.ageGroup[0] === "U" && teamInfo.ageGroup < "U/18") {
        genderOptions = [
          {
            key: "FEMALE",
            label: "Girls"
          }
        ];
      } else {
        genderOptions = [
          {
            key: "FEMALE",
            label: "Women"
          }
        ];
      }
    } else {
      if (teamInfo.ageGroup[0] === "U" && teamInfo.ageGroup < "U/18") {
        genderOptions = [
          {
            key: "MALE",
            label: "Boys"
          },
          {
            key: "FEMALE",
            label: "Girls"
          },
          {
            key: "MIXED",
            label: "Mixed"
          }
        ];
      } else {
        genderOptions = [
          {
            key: "MALE",
            label: "Men"
          },
          {
            key: "FEMALE",
            label: "Women"
          },
          {
            key: "MIXED",
            label: "Mixed"
          }
        ];
      }
    }

    return (
      <div key={`potential-team-${index}`} className={classes.teamWrapper}>
        <div className={classes.teamNameWrapper}>
          <TextField
            type="text"
            placeholder="Team name"
            value={teamInfo.name}
            validation={teamInfo.name.length === 0 ? "error" : "default"}
            handleChange={newValue =>
              this.handleTeamInfoChange("name", newValue, index, isCustom)}
          />
          <i
            className={`fas fa-minus-circle ${classes.deleteButton}`}
            onClick={() => this.removeTeam(index, isCustom)}
          />
        </div>
        {isCustom && (
          <div className={classes.teamInfoWrapper}>
            <TextField
              type="text"
              placeholder="Age group"
              value={teamInfo.ageGroup}
              validation={teamInfo.ageGroup.length === 0 ? "error" : "default"}
              handleChange={newValue =>
                this.handleTeamInfoChange(
                  "ageGroup",
                  newValue,
                  index,
                  isCustom
                )}
            />
            <TextField
              type="text"
              placeholder="Division"
              value={teamInfo.division}
              validation={teamInfo.division.length === 0 ? "error" : "default"}
              handleChange={newValue =>
                this.handleTeamInfoChange(
                  "division",
                  newValue,
                  index,
                  isCustom
                )}
            />
            <Select
              placeholder="Gender"
              items={genderOptions}
              selectedItem={teamInfo.gender}
              handleChange={(key, label) =>
                this.handleTeamInfoChange(
                  "gender",
                  { key, label },
                  index,
                  isCustom
                )}
            />
          </div>
        )}
      </div>
    );
  }

  handleTeamInfoChange(type, newValue, index, isCustom) {
    const { generatedTeams, customTeams } = this.state;

    if (isCustom) {
      let newTeams = new Array(...customTeams);
      newTeams[index] = {
        ...customTeams[index],
        [type]: newValue
      };
      if (type !== "name") {
        newTeams[index] = {
          ...newTeams[index],
          name: `${newTeams[index].sport} ${newTeams[index].gender
            .label} ${newTeams[index].ageGroup} ${newTeams[index]
            .division} Team`
        };
      }
      this.setState({
        customTeams: newTeams
      });
    } else {
      let newTeams = new Array(...generatedTeams);
      newTeams[index] = {
        ...generatedTeams[index],
        [type]: newValue
      };
      if (type !== "name") {
        newTeams[index] = {
          ...newTeams[index],
          name: `${newTeams[index].sport} ${newTeams[index].gender
            .label} ${newTeams[index].ageGroup} ${newTeams[index]
            .division} Team`
        };
      }
      this.setState({
        generatedTeams: newTeams
      });
    }
  }

  addCustomTeam() {
    const { genders } = this.props;
    const { sport, customTeams } = this.state;

    let gender = "MIXED";
    let genderSelected = {
      key: "MALE",
      label: "Boys"
    };

    switch (sport) {
      case "Athletics":
        gender = genders === "mixed" ? "MIXED" : _.toUpper(genders);
        break;
      case "Hockey":
        gender = "BOTH";
        break;
      case "Rugby":
        gender = "MALE";
        break;
      case "Netball":
        gender = "FEMALE";
        break;
      default:
        gender = "BOTH";
        break;
    }

    switch (gender) {
      case "MALE":
        genderSelected = {
          key: "MALE",
          label: "Boys"
        };
        break;
      case "FEMALE":
        genderSelected = {
          key: "FEMALE",
          label: "Girls"
        };
        break;
      default:
        genderSelected = {
          key: "MALE",
          label: "Boys"
        };
        break;
    }

    this.setState({
      customTeams: [
        ...customTeams,
        {
          name: "",
          ageGroup: "",
          division: "",
          gender: genderSelected,
          sport
        }
      ]
    });
  }

  removeTeam(removeIndex, isCustom) {
    const { generatedTeams, customTeams } = this.state;

    if (isCustom) {
      let newTeams = new Array(...customTeams);
      _.pullAt(newTeams, [removeIndex]);

      this.setState({
        customTeams: newTeams
      });
    } else {
      let newTeams = new Array(...generatedTeams);
      _.pullAt(newTeams, [removeIndex]);

      this.setState({
        generatedTeams: newTeams
      });
    }
  }

  renderContent() {
    const { classes, sportsAllowed } = this.props;
    const { sport, sportError, generatedTeams, customTeams } = this.state;

    return (
      <div className={classes.contentWrapper}>
        <div className={classes.sidebar}>
          {sport.length !== 0 && (
            <div className={classes.addCustomTeamButtonWrapper}>
              <Button
                colour="primary"
                fullWidth
                handleClick={() => this.addCustomTeam()}
              >
                Add custom team
              </Button>
            </div>
          )}
          {this.renderAgeGroups()}
          {this.renderDivisions()}
        </div>
        <div className={classes.nonSidebar}>
          <div className={classes.sportSelectionWrapper}>
            {sportsAllowed["Athletics"] && (
              <div
                className={
                  sport === "Athletics"
                    ? classes.sportOptionSelectedWrapper
                    : classes.sportOptionWrapper
                }
                onClick={() => this.updateSport("Athletics")}
              >
                <img
                  className={classes.sportIcon}
                  alt="Athletics icon"
                  src={athleticsIcon}
                />
                <div
                  className={
                    sport === "Athletics"
                      ? classes.sportNameSelected
                      : classes.sportName
                  }
                >
                  Athletics
                </div>
              </div>
            )}
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
          </div>
          {sport.length === 0 ? (
            <div className={classes.errorWrapper}>{sportError.helperText}</div>
          ) : generatedTeams.length + customTeams.length === 0 ? (
            <div className={classes.errorWrapper}>{"Please add a team"}</div>
          ) : (
            <div
              className={classes.teamNumberWrapper}
            >{`${generatedTeams.length +
              customTeams.length} teams will be created`}</div>
          )}
          {sport.length > 0 && (
            <div className={classes.teamsWrapper}>
              <div className={classes.teamsInnerWrapper}>
                {customTeams.map((teamInfo, index) => {
                  return this.renderTeam(index, teamInfo, true);
                })}
                {generatedTeams.map((teamInfo, index) => {
                  return this.renderTeam(index, teamInfo, false);
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { isOpen } = this.props;

    const actions = this.getActionButtons();
    const content = this.renderContent();

    return (
      <Dialog
        isOpen={isOpen}
        size="fullscreen"
        heading="Add Sport"
        actions={actions}
      >
        {content}
      </Dialog>
    );
  }
}

export default injectSheet(styles)(AddSportDialog);
