import React, { Component } from "react";
import _ from "lodash";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";
import Select from "../Select";

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
  form: {
    color: grey[100],
    width: 260,
    margin: "0 auto"
  },
  headline: {
    color: "white",
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

type Props = {
  classes: {}
};

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
    selectedType: {
      key: "none",
      label: "N/A"
    },
    selectedSubType: {
      key: "none",
      label: "N/A"
    },
    communityName: "",
    abbreviation: "",
    otherText: "",
    selectedGender: {
      key: "none",
      label: "N/A"
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
      otherText: "",
      selectedSubType: {
        key: "none",
        label: "N/A"
      },
      selectedType: {
        key,
        label
      },
      selectedGender: {
        key: "none",
        label: "N/A"
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
          subTypePlaceholder: "Type of community",
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
      otherText: "",
      selectedSubType: {
        key,
        label
      },
      selectedGender: {
        key: "none",
        label: "N/A"
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
        otherText: text
      });
    } else {
      this.setState({
        showNameAndAbbrev: true,
        otherText: text
      });
    }
  }

  handleCommunityNameChange(text) {
    if (text.length === 0) {
      this.setState({
        showGender: false,
        communityName: text,
        abbreviation: "",
        selectedGender: {
          key: "none",
          label: "N/A"
        }
      });
    } else {
      this.setState({
        showGender: true,
        communityName: text,
        abbreviation: this.getAbbreviation(text)
      });
    }
  }

  handleAbbreviationChange(text) {
    if (text.length === 0) {
      this.setState({
        showGender: false,
        abbreviation: text,
        selectedGender: {
          key: "none",
          label: "N/A"
        }
      });
    } else {
      this.setState({
        showGender: true,
        abbreviation: text
      });
    }
  }

  handleGenderChange(key, label) {
    this.setState({
      selectedGender: {
        key,
        label
      }
    });
  }

  getAbbreviation(text) {
    const words = _.words(text);
    return words.reduce((abbrev, word) => abbrev + _.upperFirst(word)[0], "");
  }

  render() {
    const { classes } = this.props;
    const { handleNextClick } = this.props.actions;
    const {
      showSubType,
      showNameAndAbbrev,
      showGender,
      selectedType,
      selectedGender,
      typeItems,
      genderItems,
      subTypePlaceholder,
      subTypeItems,
      selectedSubType,
      showOther,
      otherText,
      communityName,
      abbreviation
    } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.headline}>What kind of community is it?</h1>
          <div className={classes.form}>
            <Select
              placeholder="Type of community"
              selectedItem={selectedType}
              items={typeItems}
              actions={{
                handleChange: (key, label) => this.handleTypeChange(key, label)
              }}
            />
            {!showSubType &&
              !showOther && <div className={classes.inputMask} />}
            {!showSubType &&
              !showOther && <div className={classes.inputMask} />}
            {showSubType && (
              <Select
                placeholder={subTypePlaceholder}
                selectedItem={selectedSubType}
                items={subTypeItems}
                actions={{
                  handleChange: (key, label) =>
                    this.handleSubTypeChange(key, label)
                }}
              />
            )}
            {showOther && (
              <input
                type="text"
                id="other"
                name="other"
                placeholder="Please specify"
                value={otherText}
                onChange={e => this.handleOtherTextChange(e.target.value)}
              />
            )}
            {!showNameAndAbbrev && <div className={classes.inputMask} />}
            {!showNameAndAbbrev && <div className={classes.inputMask} />}
            {showNameAndAbbrev && (
              <input
                type="text"
                id="communityname"
                name="communityname"
                placeholder="Name of community"
                value={communityName}
                onChange={e => this.handleCommunityNameChange(e.target.value)}
              />
            )}
            {showNameAndAbbrev && (
              <input
                type="text"
                id="abbreviation"
                name="abbreviation"
                placeholder="Abbreviation"
                value={abbreviation}
                onChange={e => this.handleAbbreviationChange(e.target.value)}
              />
            )}
            {!showGender && <div className={classes.inputMask} />}
            {showGender && (
              <Select
                placeholder="Gender of athletes"
                selectedItem={selectedGender}
                items={genderItems}
                actions={{
                  handleChange: (key, label) =>
                    this.handleGenderChange(key, label)
                }}
              />
            )}
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                fullWidth
                actions={{ handleClick: handleNextClick }}
              >
                Next{" "}
                <i className={`fas fa-arrow-right ${classes.buttonIcon}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CreateCommunity);
