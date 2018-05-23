/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import Dialog from "../../../../components/Dialog";
import Select from "../../../../components/Select";
import TextField from "../../../../components/TextField";

const styles = theme => ({
  contentWrapper: {
    minWidth: 280,
    maxWidth: 320,
    margin: "0 auto"
  }
});

class AddTeamModal extends Component {
  state = {
    ageGroup: {
      value: {
        key: "none",
        label: ""
      },
      validation: "default",
      message: ""
    },
    division: {
      value: {
        key: "none",
        label: ""
      },
      validation: "default",
      message: ""
    },
    sport: {
      value: {
        key: "none",
        label: ""
      },
      validation: "default",
      message: ""
    },
    gender: {
      value: {
        key: "none",
        label: ""
      },
      validation: "default",
      message: ""
    },
    name: {
      value: "",
      validation: "default",
      message: ""
    },
    genderOptions: [
      {
        key: "MIXED",
        label: "Mixed"
      },
      {
        key: "FEMALE",
        label: "Girls"
      },
      {
        key: "MALE",
        label: "Boys"
      }
    ]
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }
  }

  componentWillMount() {
    const { options } = this.props;

    if (options.genders === "all boys" || options.genders === "all male") {
      this.setState({
        gender: {
          value: {
            key: "MALE",
            label: "Men"
          },
          validation: "default",
          message: ""
        }
      });
    } else if (
      options.genders === "all girls" ||
      options.genders === "all female"
    ) {
      this.setState({
        gender: {
          value: {
            key: "FEMALE",
            label: "Women"
          },
          validation: "default",
          message: ""
        }
      });
    }

    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  onKeyPressed(e) {
    const { isOpen, isLoading } = this.props;
    const { addTeam } = this.props.actions;
    const { ageGroup, division, sport, gender, name } = this.state;

    if (isOpen && !isLoading && e.keyCode === 13) {
      const isValid = this.validateForm(
        ageGroup,
        division,
        sport,
        gender,
        name
      );

      if (isValid) {
        addTeam(
          ageGroup.value.key,
          division.value.key,
          sport.value.key,
          gender.value.key,
          name.value
        );
      }
    }
  }

  resetState() {
    this.setState({
      ageGroup: {
        value: {
          key: "none",
          label: ""
        },
        validation: "default",
        message: ""
      },
      division: {
        value: {
          key: "none",
          label: ""
        },
        validation: "default",
        message: ""
      },
      sport: {
        value: {
          key: "none",
          label: ""
        },
        validation: "default",
        message: ""
      },
      gender: {
        value: {
          key: "none",
          label: ""
        },
        validation: "default",
        message: ""
      },
      name: {
        value: "",
        validation: "default",
        message: ""
      },
      genderOptions: [
        {
          key: "MIXED",
          label: "Mixed"
        },
        {
          key: "FEMALE",
          label: "Girls"
        },
        {
          key: "MALE",
          label: "Boys"
        }
      ]
    });
  }

  handleChange(input, newValue) {
    const { ageGroup, division, sport, gender } = this.state;

    let update = {
      [input]: {
        ...this.state[input],
        value: newValue
      }
    };

    switch (input) {
      case "ageGroup":
        let isAdult = false;

        if (isNaN(parseInt(newValue.key, 10))) {
          if (
            newValue.key === "Adults" ||
            newValue.key === "All Ages" ||
            newValue.key === "Open"
          ) {
            isAdult = true;
          }
        } else {
          if (newValue.key >= 18) {
            isAdult = true;
          }
        }

        update = {
          ...update,
          genderOptions: [
            {
              key: "MIXED",
              label: "Mixed"
            },
            {
              key: "FEMALE",
              label: isAdult ? "Women" : "Girls"
            },
            {
              key: "MALE",
              label: isAdult ? "Men" : "Boys"
            }
          ]
        };

        if (
          division.value.key !== "none" &&
          sport.value.key !== "none" &&
          gender.value.key !== "none"
        ) {
          update = {
            ...update,
            name: {
              ...this.state.name,
              value: `${newValue.label} ${division.value.label} ${sport.value
                .label} ${gender.value.label}`
            }
          };
        }
        break;
      case "division":
        if (
          ageGroup.value.key !== "none" &&
          sport.value.key !== "none" &&
          gender.value.key !== "none"
        ) {
          update = {
            ...update,
            name: {
              ...this.state.name,
              value: `${ageGroup.value.label} ${newValue.label} ${sport.value
                .label} ${gender.value.label}`
            }
          };
        }
        break;
      case "sport":
        if (
          ageGroup.value.key !== "none" &&
          division.value.key !== "none" &&
          gender.value.key !== "none"
        ) {
          update = {
            ...update,
            name: {
              ...this.state.name,
              value: `${ageGroup.value.label} ${division.value
                .label} ${newValue.label} ${gender.value.label}`
            }
          };
        }
        break;
      case "gender":
        if (
          ageGroup.value.key !== "none" &&
          division.value.key !== "none" &&
          sport.value.key !== "none"
        ) {
          update = {
            ...update,
            name: {
              ...this.state.name,
              value: `${ageGroup.value.label} ${division.value.label} ${sport
                .value.label} ${newValue.label}`
            }
          };
        }
        break;
      default:
        break;
    }

    this.setState(update);
  }

  validateForm(ageGroup, division, sport, gender, name) {
    let isValid = true;
    let newState = {};

    if (ageGroup.value.key === "none") {
      isValid = false;
      newState.type = {
        value: ageGroup.value,
        validation: "error",
        message: "Please select an age group"
      };
    } else {
      newState.type = {
        value: ageGroup.value,
        validation: "default",
        message: ""
      };
    }

    if (division.value.key === "none") {
      isValid = false;
      newState.type = {
        value: division.value,
        validation: "error",
        message: "Please select a division"
      };
    } else {
      newState.type = {
        value: division.value,
        validation: "default",
        message: ""
      };
    }

    if (sport.value.key === "none") {
      isValid = false;
      newState.type = {
        value: sport.value,
        validation: "error",
        message: "Please select a sport"
      };
    } else {
      newState.type = {
        value: sport.value,
        validation: "default",
        message: ""
      };
    }

    if (gender.value.key === "none") {
      isValid = false;
      newState.type = {
        value: gender.value,
        validation: "error",
        message: "Please select a gender"
      };
    } else {
      newState.type = {
        value: gender.value,
        validation: "default",
        message: ""
      };
    }

    if (name.value === "") {
      isValid = false;
      newState.name = {
        value: name.value,
        validation: "error",
        message: "Please give this team a name"
      };
    } else if (name.value.length > 64) {
      isValid = false;
      newState.name = {
        value: name.value,
        validation: "error",
        message: "Max. 64 characters allowed"
      };
    } else if (name.value !== _.startCase(name.value)) {
      newState.name = {
        value: name.value,
        validation: "warning",
        message: "Team names are usually capitalised"
      };
    } else {
      newState.name = {
        value: name.value,
        validation: "default",
        message: ""
      };
    }

    this.setState(newState);

    return isValid;
  }

  render() {
    const { classes, isOpen, isLoading, options } = this.props;
    const { closeModal, addTeam } = this.props.actions;
    const {
      ageGroup,
      division,
      sport,
      gender,
      name,
      genderOptions
    } = this.state;

    console.log(options);
    console.log(this.state);

    const actions = [
      <Button
        colour="primary"
        slim
        disabled={isLoading}
        handleClick={() => {
          closeModal();
          this.resetState();
        }}
      >
        Cancel
      </Button>,
      <Button
        slim
        filled
        colour="primary"
        loading={isLoading}
        handleClick={() => {
          const isValid = this.validateForm(
            ageGroup,
            division,
            sport,
            gender,
            name
          );

          if (isValid) {
            addTeam(
              ageGroup.value.key,
              division.value.key,
              sport.value.key,
              gender.value.key,
              name.value
            );
          }
        }}
      >
        Add
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading="Add New Team" actions={actions}>
        <div className={classes.contentWrapper}>
          <Select
            placeholder="Age group"
            items={options.ageGroups}
            selectedItem={ageGroup.value}
            validation={ageGroup.validation}
            helperText={ageGroup.message}
            handleChange={(key, label) =>
              this.handleChange("ageGroup", { key, label })}
          />
          <Select
            placeholder="Division"
            items={options.divisions}
            selectedItem={division.value}
            validation={division.validation}
            helperText={division.message}
            handleChange={(key, label) =>
              this.handleChange("division", { key, label })}
          />
          <Select
            placeholder="Sport"
            items={options.sports}
            selectedItem={sport.value}
            validation={sport.validation}
            helperText={sport.message}
            handleChange={(key, label) =>
              this.handleChange("sport", { key, label })}
          />
          {options.genders === "both" && (
            <Select
              placeholder="Gender"
              items={genderOptions}
              selectedItem={gender.value}
              validation={gender.validation}
              helperText={gender.message}
              handleChange={(key, label) =>
                this.handleChange("gender", { key, label })}
            />
          )}
          <TextField
            type="text"
            placeholder="Team name"
            value={name.value}
            validation={name.validation}
            helperText={name.message}
            handleChange={newValue => this.handleChange("name", newValue)}
          />
        </div>
      </Dialog>
    );
  }
}

export default injectStyles(styles)(AddTeamModal);
