/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import Button from "../../../../components/Button";
import { common, grey, lightBlue, red } from "../../../../utils/colours";
import Dialog from "../../../../components/Dialog";
import { isValidEmail } from "../../../../utils/validation";
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
  noParentsWrapper: {
    padding: 24,
    marginBottom: 12,
    border: `1px solid ${grey[500]}`,
    color: grey[500],
    borderRadius: 16,
    textAlign: "center",
    fontWeight: "bold"
  },
  rootWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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
  sectionWrapper: {
    maxWidth: 420,
    margin: "24px auto",
    textAlign: "center",
    borderRadius: 16,
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`
  },
  subSectionContent: {
    padding: 12,
    textAlign: "center",
    backgroundColor: common["white"],
    borderRadius: "0 0 16px 16px"
  },
  subSectionHeader: {
    borderRadius: "16px 16px 0 0",
    padding: "18px 24px",
    backgroundColor: grey[700],
    color: common["white"],
    border: `1px solid grey[300]`,
    fontWeight: "bold",
    fontSize: 16
  }
};

const initialState = {
  step: 1,
  athletes: [
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
      message: "",
      parents: []
    }
  ],
  peopleOptions: [],
  allowMeAthlete: true
};

class RosterSetupDialog extends Component {
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
      athletes: [
        {
          id: userID,
          type: {
            key: "NEW",
            label: "Invite new person"
          },
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          errorAt: "",
          validation: "default",
          message: "",
          parents: []
        }
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, people, userID } = nextProps;

    let stateUpdates = {};

    if (isOpen !== this.props.isOpen) {
      if (isOpen) {
        const peopleOptions = this.getPeopleOptions(people);

        stateUpdates = {
          peopleOptions,
          athletes: [
            {
              id: userID,
              type: {
                key: "NEW",
                label: "Invite new person"
              },
              firstName: "",
              lastName: "",
              email: "",
              errorAt: "",
              validation: "default",
              message: "",
              parents: []
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

  addAthlete() {
    const { athletes } = this.state;

    this.setState({
      athletes: [
        ...athletes,
        {
          id: "none",
          type: {
            key: "NEW",
            label: "Invite new person"
          },
          firstName: "",
          lastName: "",
          email: "",
          errorAt: "",
          validation: "default",
          message: "",
          parents: []
        }
      ]
    });
  }

  removeAthlete(removeIndex) {
    const { athletes } = this.state;

    let newAthletes = new Array(...athletes);
    _.pullAt(newAthletes, [removeIndex]);

    this.setState({
      athletes: newAthletes
    });
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

  updateAthleteType(changeIndex, newValue) {
    const { userID, userEmail, userFirstName, userLastName } = this.props;
    const { athletes } = this.state;

    if (newValue.key === "ME") {
      this.setState({
        athletes: athletes.map((value, index) => {
          if (index === changeIndex) {
            return {
              id: userID,
              type: newValue,
              firstName: userFirstName,
              lastName: userLastName,
              email: userEmail,
              errorAt: "",
              validation: "default",
              message: "",
              parents: []
            };
          } else {
            return value;
          }
        }),
        allowMeAthlete: false
      });
    } else {
      this.setState({
        athletes: athletes.map((value, index) => {
          if (index === changeIndex) {
            return {
              id: "none",
              type: newValue,
              firstName: "",
              lastName: "",
              email: "",
              errorAt: "",
              validation: "default",
              message: "",
              parents: []
            };
          } else {
            return value;
          }
        }),
        allowMeAthlete: true
      });
    }
  }

  selectNewAthlete(id, changeIndex) {
    const { people } = this.props;
    const { athletes } = this.state;

    this.setState({
      athletes: athletes.map((value, index) => {
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
            message: "",
            parents: []
          };
        } else {
          return value;
        }
      })
    });
  }

  updateAthleteInfo(changeIndex, type, newValue) {
    const { athletes } = this.state;

    this.setState({
      athletes: athletes.map((value, index) => {
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

  getAthletes() {
    const { classes } = this.props;
    const { athletes, allowMeAthlete, peopleOptions } = this.state;

    return athletes.map((info, index) => {
      const headerText = this.getNameHeaderText(info);
      const typeOptions = this.getPersonTypes(allowMeAthlete);

      return (
        <div key={`managers-${info.id}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            {athletes.length !== 1 && (
              <i
                className={`fas fa-times ${classes.sectionHeaderIcon}`}
                onClick={() => this.removeAthlete(index)}
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
                    this.updateAthleteType(index, { key, label })}
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
                      this.selectNewAthlete(key, index)}
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
                      this.updateAthleteInfo(index, "firstName", newValue)}
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
                      this.updateAthleteInfo(index, "lastName", newValue)}
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
                      this.updateAthleteInfo(index, "email", newValue)}
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

  renderAthletes() {
    const { classes } = this.props;

    const athletes = this.getAthletes();

    return (
      <div className={classes.rootWrapper}>
        <div className={classes.headingTime}>
          <i className={`fas fa-user ${classes.iconAdjacentText}`} />Athletes
        </div>
        {athletes}
        <div className={classes.addWrapper} onClick={() => this.addAthlete()}>
          <i className={`fas fa-plus ${classes.icon}`} />Add an athlete
        </div>
      </div>
    );
  }

  addParent(athleteIndex) {
    const { athletes } = this.state;

    let newAthletes = [];

    newAthletes = athletes.map((info, index) => {
      if (index === athleteIndex) {
        return {
          ...info,
          parents: [
            ...info.parents,
            {
              id: "none",
              type: {
                key: "NEW",
                label: "Invite new person"
              },
              firstName: "",
              lastName: "",
              email: "",
              errorAt: "",
              validation: "default",
              message: ""
            }
          ]
        };
      } else {
        return info;
      }
    });

    this.setState({
      athletes: newAthletes
    });
  }

  removeParent(athleteIndex, removeIndex) {
    const { athletes } = this.state;

    let newParents = new Array(...athletes[athleteIndex].parents);
    _.pullAt(newParents, [removeIndex]);

    let newAthletes = new Array(athletes);
    newAthletes[athleteIndex] = {
      ...athletes[athleteIndex],
      parents: newParents
    };

    this.setState({
      athletes: newAthletes
    });
  }

  updateParentType(athleteChangeIndex, parentChangeIndex, newValue) {
    const { userID, userEmail, userFirstName, userLastName } = this.props;
    const { athletes } = this.state;

    this.setState({
      athletes: athletes.map((athleteInfo, athleteIndex) => {
        if (athleteIndex === athleteChangeIndex) {
          let newParents = athleteInfo.parents.map(
            (parentInfo, parentIndex) => {
              if (parentIndex === parentChangeIndex) {
                if (newValue.key === "ME") {
                  return {
                    id: userID,
                    type: newValue,
                    firstName: userFirstName,
                    lastName: userLastName,
                    email: userEmail,
                    errorAt: "",
                    validation: "default",
                    message: ""
                  };
                } else {
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
                }
              } else {
                return parentInfo;
              }
            }
          );
          return {
            ...athleteInfo,
            parents: newParents
          };
        } else {
          return athleteInfo;
        }
      })
    });
  }

  selectNewParent(id, athleteChangeIndex, parentChangeIndex) {
    const { people } = this.props;
    const { athletes } = this.state;

    this.setState({
      athletes: athletes.map((athleteInfo, athleteIndex) => {
        if (athleteIndex === athleteChangeIndex) {
          return {
            ...athleteInfo,
            parents: athleteInfo.parents.map((parentInfo, parentIndex) => {
              if (parentIndex === parentChangeIndex) {
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
                return parentInfo;
              }
            })
          };
        } else {
          return athleteInfo;
        }
      })
    });
  }

  updateParentInfo(athleteChangeIndex, parentChangeIndex, type, newValue) {
    const { athletes } = this.state;

    this.setState({
      athletes: athletes.map((athleteInfo, athleteIndex) => {
        if (athleteIndex === athleteChangeIndex) {
          return {
            ...athleteInfo,
            parents: athleteInfo.parents.map((parentInfo, parentIndex) => {
              if (parentIndex === parentChangeIndex) {
                return {
                  ...parentInfo,
                  [type]: newValue
                };
              } else {
                return parentInfo;
              }
            })
          };
        } else {
          return athleteInfo;
        }
      })
    });
  }

  getParents(athleteInfo, athleteIndex) {
    const { classes } = this.props;
    const { peopleOptions } = this.state;

    return athleteInfo.parents.map((info, index) => {
      const headerText = this.getNameHeaderText(info);
      const typeOptions = this.getPersonTypes(info.type.key !== "ME");

      return (
        <div key={`managers-${info.id}`} className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <div>{headerText}</div>
            <i
              className={`fas fa-times ${classes.sectionHeaderIcon}`}
              onClick={() => this.removeParent(athleteIndex, index)}
            />
          </div>
          <div className={classes.subSectionContent}>
            <div className={classes.timeInputGroupWrapper}>
              <div className={classes.timeInputWrapper}>
                <Select
                  items={typeOptions}
                  selectedItem={info.type}
                  handleChange={(key, label) =>
                    this.updateParentType(athleteIndex, index, { key, label })}
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
                      this.selectNewParent(key, athleteIndex, index)}
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
                      this.updateParentInfo(
                        athleteIndex,
                        index,
                        "firstName",
                        newValue
                      )}
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
                      this.updateParentInfo(
                        athleteIndex,
                        index,
                        "lastName",
                        newValue
                      )}
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
                      this.updateParentInfo(
                        athleteIndex,
                        index,
                        "email",
                        newValue
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

  renderParents() {
    const { classes } = this.props;
    const { athletes } = this.state;

    return (
      <div className={classes.rootWrapper}>
        <div className={classes.headingTime}>
          <i className={`fas fa-user ${classes.iconAdjacentText}`} />Parents /
          Guardians
        </div>
        {athletes.map((athleteInfo, athleteIndex) => {
          const headerText = this.getNameHeaderText(athleteInfo);
          const parents = this.getParents(athleteInfo, athleteIndex);

          return (
            <div
              key={`athletes-${athleteInfo.id}`}
              className={classes.sectionWrapper}
            >
              <div className={classes.subSectionHeader}>
                <div>{`${headerText}'s Parents`}</div>
              </div>
              <div className={classes.sectionContent}>
                {parents.length === 0 ? (
                  <div className={classes.noParentsWrapper}>No parents</div>
                ) : (
                  parents
                )}
                <div
                  className={classes.addWrapper}
                  onClick={() => this.addParent(athleteIndex)}
                >
                  <i className={`fas fa-plus ${classes.icon}`} />Add a parent /
                  guardian
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  validateRoster() {
    const { athletes } = this.state;

    let isValid = true;

    const newAthletes = athletes.map(info => {
      const { type, firstName, lastName, email, id } = info;

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
      athletes: newAthletes
    });

    return isValid;
  }

  validateParents() {
    const { athletes } = this.state;

    let isValid = true;

    const newAthletes = athletes.map(athleteInfo => {
      return {
        ...athleteInfo,
        parents: athleteInfo.parents.map(parentInfo => {
          const { type, firstName, lastName, email, id } = parentInfo;

          switch (type.key) {
            case "CURRENT":
              if (id === "none") {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "personSelect",
                  validation: "error",
                  message: "Please select a person"
                };
              } else {
                return {
                  ...parentInfo,
                  errorAt: "",
                  validation: "default",
                  message: ""
                };
              }
            case "NEW":
              if (firstName === "") {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "firstName",
                  validation: "error",
                  message: "Please enter a first name"
                };
              } else if (firstName.length > 32) {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "firstName",
                  validation: "error",
                  message: "Max. 32 characters allowed"
                };
              } else if (lastName === "") {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "lastName",
                  validation: "error",
                  message: "Please enter a last name"
                };
              } else if (lastName.length > 32) {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "lastName",
                  validation: "error",
                  message: "Max. 32 characters allowed"
                };
              } else if (email === "") {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "email",
                  validation: "error",
                  message: "Please enter an email address"
                };
              } else if (email.length > 64) {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "email",
                  validation: "error",
                  message: "Max. 64 characters allowed"
                };
              } else if (!isValidEmail(email)) {
                isValid = false;
                return {
                  ...parentInfo,
                  errorAt: "email",
                  validation: "error",
                  message: "This email address is not valid"
                };
              } else {
                return {
                  ...parentInfo,
                  errorAt: "",
                  validation: "default",
                  message: ""
                };
              }
            default:
              return {
                ...parentInfo,
                errorAt: "",
                validation: "default",
                message: ""
              };
          }
        })
      };
    });

    this.setState({
      athletes: newAthletes
    });

    return isValid;
  }

  getRosterInfo() {
    const { athletes } = this.state;

    const reformattedAthletes = athletes.map(info => {
      return {
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        parents: info.parents.map(parentInfo => {
          return {
            email: parentInfo.email,
            firstName: parentInfo.firstName,
            lastName: parentInfo.lastName
          };
        })
      };
    });

    return {
      athletes: reformattedAthletes
    };
  }

  resetDialog() {
    const { people, userID } = this.props;

    let stateUpdates = {};
    const peopleOptions = this.getPeopleOptions(people);

    stateUpdates = {
      ...initialState,
      peopleOptions,
      athletes: [
        {
          id: userID,
          type: {
            key: "NEW",
            label: "Invite new person"
          },
          firstName: "",
          lastName: "",
          email: "",
          errorAt: "",
          validation: "default",
          message: "",
          parents: []
        }
      ]
    };

    this.setState(stateUpdates);
  }

  getActionButtons() {
    const { closeDialog, editRoster, isLoading, isUnderAge } = this.props;
    const { step } = this.state;

    switch (step) {
      case 1:
        if (isUnderAge) {
          return [
            <Button colour="primary" slim handleClick={() => closeDialog()}>
              Cancel
            </Button>,
            <Button
              colour="primary"
              slim
              handleClick={() => this.resetDialog()}
            >
              Reset
            </Button>,
            <Button
              colour="primary"
              filled
              slim
              handleClick={() => {
                const isValid = this.validateRoster();
                isValid && this.nextStep();
              }}
            >
              Next
            </Button>
          ];
        } else {
          return [
            <Button colour="primary" slim handleClick={() => closeDialog()}>
              Cancel
            </Button>,
            <Button
              colour="primary"
              slim
              handleClick={() => this.resetDialog()}
            >
              Reset
            </Button>,
            <Button
              colour="primary"
              filled
              slim
              handleClick={() => {
                const isValid = this.validateRoster();
                isValid && editRoster(this.getRosterInfo());
              }}
            >
              Add roster
            </Button>
          ];
        }
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
          <Button colour="primary" slim handleClick={() => this.resetDialog()}>
            Reset
          </Button>,
          <Button
            colour="primary"
            filled
            slim
            loading={isLoading}
            handleClick={() => {
              const isValid = this.validateParents();
              isValid && editRoster(this.getRosterInfo());
            }}
          >
            Add roster
          </Button>
        ];
      default:
        return [
          <Button colour="primary" slim handleClick={() => this.prevStep()}>
            Back
          </Button>,
          <Button colour="primary" slim handleClick={() => this.resetDialog()}>
            Reset
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
    const { isOpen, teamName, isUnderAge } = this.props;
    const { step } = this.state;

    const actions = this.getActionButtons();
    let content = <div />;

    switch (step) {
      case 1:
        content = this.renderAthletes();
        break;
      case 2:
        content = this.renderParents();
        break;
      default:
        content = this.renderAthletes();
        break;
    }

    return (
      <Dialog
        isOpen={isOpen}
        size="medium"
        heading={`Set Up Roster for ${teamName}`}
        actions={actions}
        hasSteps={isUnderAge}
        numberOfSteps={isUnderAge ? 2 : 1}
        currentStep={step}
      >
        {content}
      </Dialog>
    );
  }
}

export default injectSheet(styles)(RosterSetupDialog);
