import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import DateSelector from "./components/DateSelector";
import EmptyState from "../../../../../../components/EmptyState";
import { common, grey } from "../../../../../../utils/colours";
import Select from "../../../../../../components/Select";
import defaultProfilePicture from "./images/default-profile-picture.png";

const tabletBreakpoint = 1080;

const styles = {
  column: {
    width: "100%",
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      padding: "0 24px",
      width: "calc(50% - 48px)"
    }
  },
  dateSelectorWrapper: {
    width: "100%",
    marginBottom: 12
  },
  infoItemText: {
    flex: 1,
    padding: 12,
    color: grey[700]
  },
  infoItemWrapper: {
    display: "flex",
    alignItems: "center"
  },
  lastInfoItemText: {
    flex: 1,
    padding: 12,
    color: grey[700]
  },
  lastInfoItemWrapper: {
    display: "flex",
    alignItems: "center"
  },
  listItemInactiveWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 24,
    margin: "0 24px"
  },
  listItemWrapper: {
    transition: "0.25s",
    display: "flex",
    alignItems: "center",
    borderRadius: 12,
    padding: 24,
    margin: 24,
    backgroundColor: grey[200],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  noItems: {
    backgroundColor: grey[100],
    color: grey[500],
    borderRadius: 12,
    padding: 24,
    margin: 24,
    textAlign: "center"
  },
  profilePicture: {
    borderRadius: "50%",
    backgroundColor: grey[300],
    width: 40,
    height: 40,
    marginRight: 24
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
    color: grey[800],
    backgroundColor: grey[100]
  },
  selectWrapper: {
    marginBottom: 12
  },
  separator: {
    height: 12
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 24
  }
};

class Seasons extends Component {
  state = {
    selectedIndex: 0,
    sortedSeasons: [],
    section: {
      key: "people",
      label: "People"
    }
  };

  componentWillMount() {
    const { seasons } = this.props;

    let selectedIndex = 0;
    let sortedSeasons = _.toPairs(seasons)
      .map(([id, info]) => {
        return { id, ...info };
      })
      .sort((infoA, infoB) => {
        const startDateA = moment(infoA.dates.start, "DD MMM YYYY");
        const startDateB = moment(infoB.dates.start, "DD MMM YYYY");
        if (startDateA.isBefore(startDateB)) return +1;
        if (startDateA.isAfter(startDateB)) return -1;
        return 0;
      });
    selectedIndex = sortedSeasons.length - 1;

    this.setState({
      selectedIndex,
      sortedSeasons
    });
  }

  componentWillReceiveProps(nextProps) {
    const { seasons } = nextProps;

    if (seasons !== this.props.seasons) {
      let selectedIndex = 0;
      let sortedSeasons = _.toPairs(seasons)
        .map(([id, info]) => {
          return { id, ...info };
        })
        .sort((infoA, infoB) => {
          const startDateA = moment(infoA.dates.start, "DD MMM YYYY");
          const startDateB = moment(infoB.dates.start, "DD MMM YYYY");
          if (startDateA.isBefore(startDateB)) return +1;
          if (startDateA.isAfter(startDateB)) return -1;
          return 0;
        });
      selectedIndex = sortedSeasons.length - 1;

      this.setState({
        selectedIndex,
        sortedSeasons
      });
    }
  }

  prevSeason() {
    const { selectedIndex } = this.state;

    this.setState({
      selectedIndex: selectedIndex - 1
    });
  }

  nextSeason() {
    const { selectedIndex } = this.state;

    this.setState({
      selectedIndex: selectedIndex + 1
    });
  }

  checkIfPrevDisabled() {
    const { selectedIndex } = this.state;

    if (selectedIndex === 0) return true;
    return false;
  }

  checkIfNextDisabled() {
    const { selectedIndex, sortedSeasons } = this.state;

    if (selectedIndex === sortedSeasons.length - 1) return true;
    return false;
  }

  getNonCompetitiveItems() {
    const { classes } = this.props;
    const { sortedSeasons, selectedIndex } = this.state;

    if (sortedSeasons[selectedIndex]) {
      let lastIndex = 0;
      lastIndex = sortedSeasons[selectedIndex].nonCompetitiveEvents.length - 1;

      return sortedSeasons[
        selectedIndex
      ].nonCompetitiveEvents.map((details, index) => {
        const display = `${details.day}, ${details.times.start} - ${details
          .times.end}`;
        if (index !== lastIndex) {
          return (
            <div key={display} className={classes.infoItemWrapper}>
              <span className={classes.infoItemText}>{display}</span>
            </div>
          );
        } else {
          return (
            <div key={display} className={classes.lastInfoItemWrapper}>
              <span className={classes.lastInfoItemText}>{display}</span>
            </div>
          );
        }
      });
    } else {
      return [];
    }
  }

  getCompetitiveItems() {
    const { classes } = this.props;
    const { sortedSeasons, selectedIndex } = this.state;

    if (sortedSeasons[selectedIndex]) {
      let lastIndex = 0;
      lastIndex = sortedSeasons[selectedIndex].competitiveEvents.length - 1;

      return sortedSeasons[
        selectedIndex
      ].competitiveEvents.map((details, index) => {
        const display = `${details.day}, ${details.times.start} - ${details
          .times.end}`;
        if (index !== lastIndex) {
          return (
            <div key={display} className={classes.infoItemWrapper}>
              <span className={classes.infoItemText}>{display}</span>
            </div>
          );
        } else {
          return (
            <div key={display} className={classes.lastInfoItemWrapper}>
              <span className={classes.lastInfoItemText}>{display}</span>
            </div>
          );
        }
      });
    } else {
      return [];
    }
  }

  getCoachItems() {
    const { selectedIndex, sortedSeasons } = this.state;
    const { classes, staff, navigateTo } = this.props;

    if (sortedSeasons[selectedIndex]) {
      const coaches = _.toPairs(staff)
        .filter(([id, info]) => {
          return (
            sortedSeasons[selectedIndex].coaches &&
            sortedSeasons[selectedIndex].coaches[id]
          );
        })
        .map(([id, info]) => {
          return { id, ...info };
        });
      const lastIndex = coaches.length - 1;

      return coaches
        .filter(info => {
          return (
            sortedSeasons[selectedIndex].coaches &&
            sortedSeasons[selectedIndex].coaches[info.id]
          );
        })
        .map((info, index) => {
          if (index !== lastIndex) {
            return (
              <div>
                <div
                  key={info.id}
                  className={classes.listItemWrapper}
                  onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
                >
                  <img
                    alt={info.info.name}
                    className={classes.profilePicture}
                    src={
                      info.info.profilePictureURL === ""
                        ? defaultProfilePicture
                        : info.info.profilePictureURL
                    }
                  />
                  {`${info.info.name} ${info.info.surname}`}
                </div>
                <div className={classes.listItemSeparator} />
              </div>
            );
          } else {
            return (
              <div
                key={info.id}
                className={classes.listItemWrapper}
                onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
              >
                <img
                  alt={info.info.name}
                  className={classes.profilePicture}
                  src={
                    info.info.profilePictureURL === ""
                      ? defaultProfilePicture
                      : info.info.profilePictureURL
                  }
                />
                {`${info.info.name} ${info.info.surname}`}
              </div>
            );
          }
        });
    }
  }

  getManagerItems() {
    const { selectedIndex, sortedSeasons } = this.state;
    const { classes, staff, navigateTo } = this.props;

    if (sortedSeasons[selectedIndex]) {
      const managers = _.toPairs(staff)
        .filter(([id, info]) => {
          return (
            sortedSeasons[selectedIndex].managers &&
            sortedSeasons[selectedIndex].managers[id]
          );
        })
        .map(([id, info]) => {
          return { id, ...info };
        });
      const lastIndex = managers.length - 1;

      return managers
        .filter(info => {
          return (
            sortedSeasons[selectedIndex].managers &&
            sortedSeasons[selectedIndex].managers[info.id]
          );
        })
        .map((info, index) => {
          if (index !== lastIndex) {
            return (
              <div key={info.id}>
                <div
                  className={classes.listItemWrapper}
                  onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
                >
                  <img
                    alt={info.name}
                    className={classes.profilePicture}
                    src={
                      info.info.profilePictureURL === ""
                        ? defaultProfilePicture
                        : info.info.profilePictureURL
                    }
                  />
                  {`${info.info.name} ${info.info.surname}`}
                </div>
                <div className={classes.listItemSeparator} />
              </div>
            );
          } else {
            return (
              <div
                key={info.id}
                className={classes.listItemWrapper}
                onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
              >
                <img
                  alt={info.name}
                  className={classes.profilePicture}
                  src={
                    info.info.profilePictureURL === ""
                      ? defaultProfilePicture
                      : info.info.profilePictureURL
                  }
                />
                {`${info.info.name} ${info.info.surname}`}
              </div>
            );
          }
        });
    } else {
      return [];
    }
  }

  updateSection(newSection) {
    this.setState({
      section: newSection
    });
  }

  render() {
    const { classes } = this.props;
    const { selectedIndex, sortedSeasons, section } = this.state;

    const isPrevDisabled = this.checkIfPrevDisabled();
    const isNextDisabled = this.checkIfNextDisabled();

    const nonCompetitiveItems = this.getNonCompetitiveItems();
    const competitiveItems = this.getCompetitiveItems();
    const managerItems = this.getManagerItems();
    const coachItems = this.getCoachItems();

    return (
      <div className={classes.wrapper}>
        {sortedSeasons.length !== 0 && (
          <div className={classes.dateSelectorWrapper}>
            <DateSelector
              isPrevDisabled={isPrevDisabled}
              isNextDisabled={isNextDisabled}
              seasons={sortedSeasons}
              selectedIndex={selectedIndex}
              handlePrevSeason={() => this.prevSeason()}
              handleNextSeason={() => this.nextSeason()}
            />
          </div>
        )}
        {sortedSeasons.length === 0 && <EmptyState message="No seasons" />}
        {sortedSeasons.length !== 0 && (
          <div className={classes.column}>
            <div className={classes.section}>
              <div className={classes.sectionHeading}>Practice</div>
              {nonCompetitiveItems.length === 0 ? (
                <div className={classes.noItems}>
                  No practice times allocated
                </div>
              ) : (
                <div className={classes.listItemInactiveWrapper}>
                  {nonCompetitiveItems}
                </div>
              )}
            </div>
            <div className={classes.section}>
              <div className={classes.sectionHeading}>Match</div>
              {competitiveItems.length === 0 ? (
                <div className={classes.noItems}>No match times allocated</div>
              ) : (
                <div className={classes.listItemInactiveWrapper}>
                  {competitiveItems}
                </div>
              )}
            </div>
          </div>
        )}
        {sortedSeasons.length !== 0 && (
          <div className={classes.column}>
            <div className={classes.selectWrapper}>
              <Select
                selectedItem={section}
                items={[{ key: "people", label: "People" }]}
                handleChange={(key, label) =>
                  this.updateSection({ key, label })}
              />
            </div>
            <div className={classes.section}>
              <div className={classes.sectionHeading}>Coaches</div>
              {coachItems.length === 0 ? (
                <div className={classes.noItems}>
                  No coaches on current roster
                </div>
              ) : (
                coachItems
              )}
            </div>
            <div className={classes.section}>
              <div className={classes.sectionHeading}>Managers</div>
              {managerItems.length === 0 ? (
                <div className={classes.noItems}>
                  No managers on current roster
                </div>
              ) : (
                managerItems
              )}
            </div>
            <div className={classes.section}>
              <div className={classes.sectionHeading}>Athletes</div>
              <div className={classes.noItems}>Coming soon</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(Seasons);
