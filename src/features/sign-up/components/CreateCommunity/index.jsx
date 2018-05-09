import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { common, grey, lightBlue } from "../../../../utils/colours";
import Button from "../../../../components/Button";
import Select from "../../../../components/Select";
import TextField from "../../../../components/TextField";

const styles = theme => ({
  buttonIcon: {
    marginLeft: 8
  },
  buttonWrapper: {
    margin: "24px 0"
  },
  content: {
    padding: "60px 0 60px 0",
    maxWidth: 800,
    margin: "0 auto"
  },
  dotHighlighted: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    margin: 4,
    backgroundColor: common["white"]
  },
  dotNotHighlighted: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    margin: 4,
    backgroundColor: grey[300]
  },
  dotsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "16px 0"
  },
  form: {
    color: grey[100],
    width: 260,
    margin: "0 auto"
  },
  headline: {
    color: common["white"],
    textAlign: "center",
    margin: 24
  },
  inputMask: {
    width: "100%",
    margin: "8px 0",
    display: "inline-block",
    border: `1px solid ${grey[300]}`,
    backgroundColor: grey[300],
    borderRadius: 4,
    boxSizing: "border-box",
    height: 50
  },
  selectWrapper: {
    width: "100%"
  },
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: `linear-gradient(${lightBlue[300]}, ${lightBlue[500]})`
  }
});

type Props = {};

type State = {
  selectedType: string,
  communityName: string,
  abbreviation: string,
  selectedGender: string,
  showNameAndAbbrev: boolean,
  showGender: boolean
};

class CreateCommunity extends Component<Props, State> {
  state = {
    communityType: {
      value: "none",
      label: "N/A",
      validation: "default",
      helperText: ""
    },
    subType: {
      value: "none",
      label: "N/A",
      validation: "default",
      helperText: ""
    },
    communityName: {
      value: "",
      validation: "default",
      helperText: ""
    },
    abbreviation: {
      value: "",
      validation: "default",
      helperText: ""
    },
    otherText: {
      value: "",
      validation: "default",
      helperText: ""
    },
    athleteGender: {
      value: "none",
      label: "N/A",
      validation: "default",
      helperText: ""
    },
    typeItems: [
      {
        key: "school",
        label: "School"
      },
      {
        key: "club",
        label: "Club"
      },
      {
        key: "academy",
        label: "Academy"
      },
      {
        key: "personal",
        label: "Personal"
      },
      {
        key: "other",
        label: "Other"
      }
    ],
    genderItems: [
      {
        key: "both",
        label: "Both"
      },
      {
        key: "all-girls",
        label: "All Girls"
      },
      {
        key: "all-boys",
        label: "All Boys"
      }
    ],
    subTypeItems: [],
    subTypePlaceholder: "",
    showSubType: false,
    showOther: false,
    showNameAndAbbrev: false,
    showGender: false
  };

  handleTypeChange(key, label) {
    const coreChanges = {
      showOther: false,
      otherText: {
        value: "",
        validation: "default",
        helperText: ""
      },
      subType: {
        value: "none",
        label: "N/A",
        validation: "default",
        helperText: ""
      },
      communityType: {
        label,
        value: key,
        validation: "default",
        helperText: ""
      },
      athleteGender: {
        value: "none",
        label: "N/A",
        validation: "default",
        helperText: ""
      },
      genderItems: [
        {
          key: "both",
          label: "Both"
        },
        {
          key: "all-girls",
          label: "All Girls"
        },
        {
          key: "all-boys",
          label: "All Boys"
        }
      ]
    };
    let additionalChanges = {};

    switch (key) {
      case "school":
        additionalChanges = {
          showSubType: true,
          subTypePlaceholder: "Type of school",
          subTypeItems: [
            {
              key: "primary-school",
              label: "Primary School"
            },
            {
              key: "preparatory-school",
              label: "Preparatory School"
            },
            {
              key: "high-school",
              label: "High School"
            },
            {
              key: "college",
              label: "College"
            },
            {
              key: "university",
              label: "University"
            },
            {
              key: "other",
              label: "Other"
            }
          ]
        };
        break;
      case "club":
      case "academy":
        additionalChanges = {
          showSubType: true,
          subTypePlaceholder: "Age of athletes",
          subTypeItems: [
            {
              key: "u-18",
              label: "U/18's"
            },
            {
              key: "adults",
              label: "Adults"
            },
            {
              key: "all-ages",
              label: "All Ages"
            }
          ]
        };
        break;
      case "personal":
        additionalChanges = {
          showSubType: true,
          subTypePlaceholder: "Type of personal community",
          subTypeItems: [
            {
              key: "work-colleagues",
              label: "Work Colleagues"
            },
            {
              key: "amateur-league",
              label: "Amateur League"
            },
            {
              key: "casual",
              label: "Casual"
            },
            {
              key: "other",
              label: "Other"
            }
          ]
        };
        break;
      case "university":
        additionalChanges = {
          showSubType: false,
          subTypePlaceholder: "",
          subTypeItems: [],
          genderItems: [
            {
              key: "both",
              label: "Both"
            },
            {
              key: "all-female",
              label: "All Female"
            },
            {
              key: "all-male",
              label: "All Male"
            }
          ]
        };
        break;
      case "other":
        additionalChanges = {
          showSubType: false,
          subTypePlaceholder: "",
          showOther: true,
          subTypeItems: [],
          genderItems: [
            {
              key: "both",
              label: "Both"
            },
            {
              key: "all-female",
              label: "All Female"
            },
            {
              key: "all-male",
              label: "All Male"
            }
          ]
        };
        break;
      default:
        additionalChanges = {};
        break;
    }

    this.setState({
      ...coreChanges,
      ...additionalChanges
    });
  }

  handleSubTypeChange(key, label) {
    const coreChanges = {
      showNameAndAbbrev: true,
      showOther: false,
      otherText: {
        value: "none",
        label: "N/A",
        validation: "default",
        helperText: ""
      },
      subType: {
        label,
        value: key,
        validation: "default",
        helperText: ""
      },
      athleteGender: {
        value: "none",
        label: "N/A",
        validation: "default",
        helperText: ""
      }
    };
    let additionalChanges = {};

    switch (key) {
      case "university":
      case "adults":
      case "all-ages":
      case "work-colleagues":
      case "amateur-league":
      case "casual":
      case "other":
        additionalChanges = {
          genderItems: [
            {
              key: "both",
              label: "Both"
            },
            {
              key: "all-female",
              label: "All Female"
            },
            {
              key: "all-male",
              label: "All Male"
            }
          ]
        };
        break;
      default:
        additionalChanges = {
          genderItems: [
            {
              key: "both",
              label: "Both"
            },
            {
              key: "all-girls",
              label: "All Girls"
            },
            {
              key: "all-boys",
              label: "All Boys"
            }
          ]
        };
        break;
    }

    this.setState({
      ...coreChanges,
      ...additionalChanges
    });
  }

  handleOtherTextChange(text) {
    if (text.length === 0) {
      this.setState({
        showNameAndAbbrev: false,
        otherText: {
          value: text,
          validation: "default",
          helperText: ""
        }
      });
    } else {
      this.setState({
        showNameAndAbbrev: true,
        otherText: {
          value: text,
          validation: "default",
          helperText: ""
        }
      });
    }
  }

  handleCommunityNameChange(text) {
    if (text.length === 0) {
      this.setState({
        showGender: false,
        communityName: {
          value: text,
          validation: "default",
          helperText: ""
        },
        abbreviation: {
          value: "",
          validation: "default",
          helperText: ""
        },
        athleteGender: {
          value: "none",
          label: "N/A",
          validation: "default",
          helperText: ""
        }
      });
    } else if (text !== _.startCase(text) && text !== `${_.startCase(text)} `) {
      this.setState({
        showGender: true,
        communityName: {
          value: text,
          validation: "warning",
          helperText: "Community names are usually capitalised"
        },
        abbreviation: {
          value: this.getAbbreviation(text),
          validation: "default",
          helperText: ""
        }
      });
    } else {
      this.setState({
        showGender: true,
        communityName: {
          value: text,
          validation: "default",
          helperText: ""
        },
        abbreviation: {
          value: this.getAbbreviation(text),
          validation: "default",
          helperText: ""
        }
      });
    }
  }

  handleAbbreviationChange(text) {
    if (text.length === 0) {
      this.setState({
        showGender: false,
        abbreviation: {
          value: text,
          validation: "default",
          helperText: ""
        },
        athleteGender: {
          value: "none",
          label: "N/A",
          validation: "default",
          helperText: ""
        }
      });
    } else if (text !== _.toUpper(text)) {
      this.setState({
        showGender: true,
        abbreviation: {
          value: text,
          validation: "warning",
          helperText: "Abbreviations are usually upper-case"
        }
      });
    } else {
      this.setState({
        showGender: true,
        abbreviation: {
          value: text,
          validation: "default",
          helperText: ""
        }
      });
    }
  }

  handleGenderChange(key, label) {
    this.setState({
      athleteGender: {
        label,
        value: key,
        validation: "default",
        helperText: ""
      }
    });
  }

  getAbbreviation(text) {
    const words = _.words(text);
    return words.reduce((abbrev, word) => abbrev + _.upperFirst(word)[0], "");
  }

  validateForm() {
    let isFormValid = true;
    let communityType = {
      value: this.state.communityType.value,
      label: this.state.communityType.label,
      helperText: "",
      validation: "default"
    };
    let subType = {
      value: this.state.subType.value,
      label: this.state.subType.label,
      helperText: "",
      validation: "default"
    };
    let communityName = {
      value: this.state.communityName.value,
      helperText: "",
      validation: "default"
    };
    let abbreviation = {
      value: this.state.abbreviation.value,
      helperText: "",
      validation: "default"
    };
    let otherText = {
      value: this.state.otherText.value,
      validation: "default",
      helperText: ""
    };
    let athleteGender = {
      value: this.state.athleteGender.value,
      label: this.state.athleteGender.label,
      validation: "default",
      helperText: ""
    };

    if (communityType.value === "none") {
      communityType = {
        value: "none",
        label: "N/A",
        helperText: "Please specify a community type",
        validation: "error"
      };
      isFormValid = false;
    }
    if (communityType.value !== "other" && subType.value === "none") {
      subType = {
        value: "none",
        label: "N/A",
        helperText: "Please specify the sub-type",
        validation: "error"
      };
      isFormValid = false;
    }
    if (communityName.value === "") {
      communityName = {
        value: "",
        helperText: "Please specify the name of your community",
        validation: "error"
      };
      isFormValid = false;
    }
    if (abbreviation.value === "") {
      abbreviation = {
        value: "",
        helperText: "Please specify your community's abbreviation",
        validation: "error"
      };
      isFormValid = false;
    }
    if (communityType.value === "other" && otherText.value === "") {
      otherText = {
        value: "",
        helperText: "Please specify the type of your community",
        validation: "error"
      };
      isFormValid = false;
    }
    if (athleteGender.value === "none") {
      athleteGender = {
        value: "none",
        label: "N/A",
        helperText: "Please specify the age of athletes in your community",
        validation: "error"
      };
      isFormValid = false;
    }

    this.setState({
      ...this.state,
      communityType,
      subType,
      communityName,
      abbreviation,
      otherText,
      athleteGender
    });

    return isFormValid;
  }

  render() {
    const { classes } = this.props;
    const { handleNextClick } = this.props.actions;
    const {
      showSubType,
      showNameAndAbbrev,
      showGender,
      communityType,
      athleteGender,
      typeItems,
      genderItems,
      subTypePlaceholder,
      subTypeItems,
      subType,
      showOther,
      otherText,
      communityName,
      abbreviation
    } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.headline}>What kind of community is it?</h1>
          <form className={classes.form}>
            <Select
              helperText={communityType.helperText}
              placeholder="Type of community"
              selectedItem={{
                key: communityType.value,
                label: communityType.label
              }}
              items={typeItems}
              handleChange={(key, label) => this.handleTypeChange(key, label)}
            />
            {!showSubType &&
              !showOther && <div className={classes.inputMask} />}
            {!showSubType &&
              !showOther && <div className={classes.inputMask} />}
            {showSubType && (
              <Select
                helperText={subType.helperText}
                placeholder={subTypePlaceholder}
                selectedItem={{
                  key: subType.value,
                  label: subType.label
                }}
                items={subTypeItems}
                handleChange={(key, label) =>
                  this.handleSubTypeChange(key, label)}
              />
            )}
            {showOther && (
              <TextField
                type="text"
                placeholder="Please specify"
                value={otherText.value}
                validation={otherText.validation}
                helperText={otherText.helperText}
                handleChange={value => this.handleOtherTextChange(value)}
              />
            )}
            {!showNameAndAbbrev && <div className={classes.inputMask} />}
            {!showNameAndAbbrev && <div className={classes.inputMask} />}
            {showNameAndAbbrev && (
              <TextField
                type="text"
                placeholder="Name of community"
                value={communityName.value}
                validation={communityName.validation}
                helperText={communityName.helperText}
                handleChange={value => this.handleCommunityNameChange(value)}
              />
            )}
            {showNameAndAbbrev && (
              <TextField
                type="text"
                placeholder="Abbreviation"
                value={abbreviation.value}
                validation={abbreviation.validation}
                helperText={abbreviation.helperText}
                handleChange={value => this.handleAbbreviationChange(value)}
              />
            )}
            {!showGender && <div className={classes.inputMask} />}
            {showGender && (
              <Select
                helperText={athleteGender.helperText}
                placeholder="Gender of athletes"
                selectedItem={{
                  key: athleteGender.value,
                  label: athleteGender.label
                }}
                items={genderItems}
                handleChange={(key, label) =>
                  this.handleGenderChange(key, label)}
              />
            )}
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                colour="primary"
                filled
                fullWidth
                handleClick={() => {
                  const isFormValid = this.validateForm();
                  console.log(isFormValid);
                  isFormValid &&
                    handleNextClick(
                      communityType.label,
                      subType.label,
                      otherText.value,
                      communityName.value,
                      abbreviation.value,
                      athleteGender.label
                    );
                }}
              >
                Next{" "}
                <i className={`fas fa-arrow-right ${classes.buttonIcon}`} />
              </Button>
            </div>
          </form>
          <div className={classes.dotsWrapper}>
            <span className={classes.dotHighlighted} />
            <span className={classes.dotHighlighted} />
            <span className={classes.dotNotHighlighted} />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(CreateCommunity);
