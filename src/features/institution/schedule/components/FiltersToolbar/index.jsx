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
import { MenuItem } from "material-ui/Menu";
import SearchIcon from "material-ui-icons/Search";
import Select from "material-ui/Select";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  flexGrow: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
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
    confirmedEventType: "All",
    confirmedSport: "All",
    confirmedDivision: "All",
    confirmedAgeGroup: "All"
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
      confirmedAgeGroup: initialFilters.ageGroup
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
      confirmedAgeGroup: this.state.selectedAgeGroup
    });
  }

  toggleDialog() {
    this.setState({
      isOpen: !this.state.isOpen,
      selectedEventType: this.state.selectedEventType,
      selectedSport: this.state.selectedSport,
      selectedDivision: this.state.selectedDivision,
      selectedAgeGroup: this.state.selectedAgeGroup
    });
  }

  resetFilters() {
    this.setState({
      selectedEventType: "All",
      selectedSport: "All",
      selectedDivision: "All",
      selectedAgeGroup: "All"
    });
  }

  render() {
    const {
      classes,
      isMobile,
      eventTypes,
      sports,
      divisions,
      ageGroups,
      applyFilters,
      addEvent
    } = this.props;
    const {
      searchText,
      confirmedEventType,
      confirmedSport,
      confirmedDivision,
      confirmedAgeGroup,
      selectedEventType,
      selectedSport,
      selectedDivision,
      selectedAgeGroup,
      isOpen
    } = this.state;

    return (
      <div>
        <Toolbar className={classes.settings}>
          <FormControl className={classes.formControl}>
            <Input
              id="search"
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
          {!isMobile && (
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
                      confirmedAgeGroup
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
                      confirmedAgeGroup
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
                      confirmedAgeGroup
                    );
                  }}
                  className={classes.chip}
                />
              )}
              {confirmedAgeGroup !== "All" && (
                <Chip
                  label={confirmedAgeGroup}
                  onRequestDelete={() => {
                    this.handleDeleteFilter("AgeGroup");
                    applyFilters(
                      confirmedEventType,
                      confirmedSport,
                      confirmedDivision,
                      "All"
                    );
                  }}
                  className={classes.chip}
                />
              )}
            </div>
          )}
          <Tooltip title="Filter events" placement="bottom">
            <IconButton
              aria-label="filter events"
              onClick={() => this.toggleDialog()}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add new event" placement="bottom">
            <IconButton aria-label="add new event" onClick={() => addEvent()}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Dialog open={isOpen} onRequestClose={() => this.toggleDialog()}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <form className={classes.container} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Event Type</InputLabel>
                <Select
                  value={selectedEventType}
                  onChange={this.handleChange("selectedEventType")}
                  input={<Input id="type" />}
                >
                  <MenuItem value="All">All</MenuItem>
                  {eventTypes.map(item => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sport">Sport</InputLabel>
                <Select
                  value={selectedSport}
                  onChange={this.handleChange("selectedSport")}
                  input={<Input id="sport" />}
                >
                  <MenuItem value="All">All</MenuItem>
                  {sports.map(item => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="division">Division</InputLabel>
                <Select
                  value={selectedDivision}
                  onChange={this.handleChange("selectedDivision")}
                  input={<Input id="division" />}
                >
                  <MenuItem value="All">All</MenuItem>
                  {divisions.map(item => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="ageGroup">Age Group</InputLabel>
                <Select
                  value={selectedAgeGroup}
                  onChange={this.handleChange("selectedAgeGroup")}
                  input={<Input id="ageGroup" />}
                >
                  <MenuItem value="All">All</MenuItem>
                  {ageGroups.map(item => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.toggleDialog()}>Close</Button>
            <Button
              color="accent"
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
                  selectedAgeGroup
                );
                applyFilters(
                  selectedEventType,
                  selectedSport,
                  selectedDivision,
                  selectedAgeGroup
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
