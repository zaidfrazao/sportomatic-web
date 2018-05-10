import React, { Component } from "react";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import Chip from "material-ui/Chip";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import FilterIcon from "material-ui-icons/FilterList";
import { FormControl } from "material-ui/Form";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import SearchIcon from "material-ui-icons/Search";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: 240,
    margin: "0 auto"
  },
  flexGrow: {
    flexGrow: 1
  },
  formControl: {
    width: "100%",
    margin: "8px 0"
  },
  iconAdjacentText: {
    marginRight: 8
  },
  searchIcon: {
    width: 18,
    height: 18
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  settings: {
    backgroundColor: grey[200]
  },
  settingChips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  }
});

class FiltersToolbar extends Component {
  state = {
    isOpen: false,
    searchText: "",
    selectedEventType: "All",
    selectedSport: "All",
    selectedDivision: "All",
    selectedAgeGroup: "All",
    selectedGender: "All",
    confirmedEventType: "All",
    confirmedSport: "All",
    confirmedDivision: "All",
    confirmedAgeGroup: "All",
    confirmedGender: "All",
    Transition: props => <Slide direction="up" {...props} />
  };

  componentWillMount() {
    const { initialFilters } = this.props;
    this.setState({
      searchText: initialFilters.searchText,
      selectedEventType: initialFilters.eventType,
      selectedSport: initialFilters.sport,
      selectedDivision: initialFilters.division,
      selectedAgeGroup: initialFilters.ageGroup,
      confirmedEventType: initialFilters.eventType,
      confirmedSport: initialFilters.sport,
      confirmedDivision: initialFilters.division,
      confirmedAgeGroup: initialFilters.ageGroup,
      confirmedGender: initialFilters.gender
    });
  }

  handleChange = name => event => {
    const { updateSearch } = this.props;
    this.setState({ [name]: event.target.value });
    if (name === "searchText") updateSearch(event.target.value);
  };

  handleDeleteFilter(name) {
    this.setState({
      [`selected${name}`]: "All",
      [`confirmed${name}`]: "All"
    });
  }

  handleUpdate() {
    this.setState({
      isOpen: false,
      confirmedEventType: this.state.selectedEventType,
      confirmedSport: this.state.selectedSport,
      confirmedDivision: this.state.selectedDivision,
      confirmedAgeGroup: this.state.selectedAgeGroup,
      confirmedGender: this.state.selectedGender
    });
  }

  toggleDialog() {
    this.setState({
      isOpen: !this.state.isOpen,
      selectedEventType: this.state.selectedEventType,
      selectedSport: this.state.selectedSport,
      selectedDivision: this.state.selectedDivision,
      selectedAgeGroup: this.state.selectedAgeGroup,
      selectedGender: this.state.selectedGender
    });
  }

  resetFilters() {
    this.setState({
      selectedEventType: "All",
      selectedSport: "All",
      selectedDivision: "All",
      selectedAgeGroup: "All",
      selectedGender: "All"
    });
  }

  formatGender(gender) {
    let formattedGender = "Mixed";
    if (gender === "MALE") {
      formattedGender = "Men / Boys";
    } else if (gender === "FEMALE") {
      formattedGender = "Women / Girls";
    }

    return formattedGender;
  }

  formatAgeGroup(ageGroup) {
    return ageGroup !== "Open" ? `U/${ageGroup}` : ageGroup;
  }

  render() {
    const {
      classes,
      isMobile,
      eventTypes,
      sports,
      divisions,
      ageGroups,
      genders,
      applyFilters,
      addEvent,
      canCreate
    } = this.props;
    const {
      searchText,
      confirmedEventType,
      confirmedSport,
      confirmedDivision,
      confirmedAgeGroup,
      confirmedGender,
      selectedEventType,
      selectedSport,
      selectedDivision,
      selectedAgeGroup,
      selectedGender,
      isOpen
    } = this.state;

    return (
      <div>
        <Toolbar className={classes.settings}>
          <FormControl>
            <Input
              id="search"
              type="search"
              value={searchText}
              onChange={this.handleChange("searchText")}
              placeholder="Search by event title or person"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.flexGrow} />
          {canCreate &&
            !isMobile && (
              <Button aria-label="add event" onClick={() => addEvent()}>
                <AddIcon className={classes.iconAdjacentText} /> Add new event
              </Button>
            )}
        </Toolbar>
        {isMobile && (
          <div className={classes.settingChips}>
            {confirmedEventType !== "All" && (
              <Chip
                label={confirmedEventType}
                onRequestDelete={() => {
                  this.handleDeleteFilter("EventType");
                  applyFilters(
                    "All",
                    confirmedSport,
                    confirmedDivision,
                    confirmedAgeGroup,
                    confirmedGender
                  );
                }}
                className={classes.chip}
              />
            )}
            {confirmedSport !== "All" && (
              <Chip
                label={confirmedSport}
                onRequestDelete={() => {
                  this.handleDeleteFilter("Sport");
                  applyFilters(
                    confirmedEventType,
                    "All",
                    confirmedDivision,
                    confirmedAgeGroup,
                    confirmedGender
                  );
                }}
                className={classes.chip}
              />
            )}
            {confirmedDivision !== "All" && (
              <Chip
                label={confirmedDivision}
                onRequestDelete={() => {
                  this.handleDeleteFilter("Division");
                  applyFilters(
                    confirmedEventType,
                    confirmedSport,
                    "All",
                    confirmedAgeGroup,
                    confirmedGender
                  );
                }}
                className={classes.chip}
              />
            )}
            {confirmedAgeGroup !== "All" && (
              <Chip
                label={this.formatAgeGroup(confirmedAgeGroup)}
                onRequestDelete={() => {
                  this.handleDeleteFilter("AgeGroup");
                  applyFilters(
                    confirmedEventType,
                    confirmedSport,
                    confirmedDivision,
                    "All",
                    confirmedGender
                  );
                }}
                className={classes.chip}
              />
            )}
            {confirmedGender !== "All" && (
              <Chip
                label={this.formatGender(confirmedGender)}
                onRequestDelete={() => {
                  this.handleDeleteFilter("Gender");
                  applyFilters(
                    confirmedEventType,
                    confirmedSport,
                    confirmedDivision,
                    confirmedAgeGroup,
                    "All"
                  );
                }}
                className={classes.chip}
              />
            )}
          </div>
        )}
        <Dialog
          open={isOpen}
          fullScreen={isMobile}
          transition={this.state.Transition}
          onRequestClose={() => this.toggleDialog()}
        >
          <DialogTitle>Set Filters</DialogTitle>
          <DialogContent>
            <form className={classes.container} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Event Type</InputLabel>
                <Select
                  native
                  value={selectedEventType}
                  onChange={this.handleChange("selectedEventType")}
                  input={<Input id="type" />}
                >
                  <option value="All">All</option>
                  {eventTypes.map(item => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sport">Sport</InputLabel>
                <Select
                  native
                  value={selectedSport}
                  onChange={this.handleChange("selectedSport")}
                  input={<Input id="sport" />}
                >
                  <option value="All">All</option>
                  {sports.map(item => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="division">Division</InputLabel>
                <Select
                  native
                  value={selectedDivision}
                  onChange={this.handleChange("selectedDivision")}
                  input={<Input id="division" />}
                >
                  <option value="All">All</option>
                  {divisions.map(item => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="ageGroup">Age Group</InputLabel>
                <Select
                  native
                  value={selectedAgeGroup}
                  onChange={this.handleChange("selectedAgeGroup")}
                  input={<Input id="ageGroup" />}
                >
                  <option value="All">All</option>
                  {ageGroups.map(item => {
                    return (
                      <option key={item} value={item}>
                        {this.formatAgeGroup(item)}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  native
                  value={selectedGender}
                  onChange={this.handleChange("selectedGender")}
                  input={<Input id="gender" />}
                >
                  <option value="All">All</option>
                  {genders.map(item => {
                    return (
                      <option key={item} value={item}>
                        {this.formatGender(item)}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.toggleDialog()}>Close</Button>
            <Button
              onClick={() => {
                this.resetFilters();
              }}
            >
              Reset
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.handleUpdate(
                  selectedEventType,
                  selectedSport,
                  selectedDivision,
                  selectedAgeGroup,
                  selectedGender
                );
                applyFilters(
                  selectedEventType,
                  selectedSport,
                  selectedDivision,
                  selectedAgeGroup,
                  selectedGender
                );
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FiltersToolbar);
