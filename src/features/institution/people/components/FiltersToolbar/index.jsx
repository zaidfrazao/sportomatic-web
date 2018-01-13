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
import { FormControl, FormControlLabel } from "material-ui/Form";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import SearchIcon from "material-ui-icons/Search";
import Select from "material-ui/Select";
import Switch from "material-ui/Switch";
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
    selectedShowDeletedTeams: false,
    confirmedShowDeletedTeams: false,
    selectedGender: "All",
    selectedSport: "All",
    selectedDivision: "All",
    selectedAgeGroup: "All",
    confirmedGender: "All",
    confirmedSport: "All",
    confirmedDivision: "All",
    confirmedAgeGroup: "All"
  };

  componentWillMount() {
    const { initialFilters } = this.props;
    this.setState({
      selectedShowRemovedPeople: initialFilters.showRemovedPeople,
      confirmedShowRemovedPeople: initialFilters.showRemovedPeople,
      searchText: initialFilters.searchText,
      selectedSport: initialFilters.sport,
      selectedType: initialFilters.type,
      confirmedSport: initialFilters.sport,
      confirmedType: initialFilters.type
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
      confirmedShowRemovedPeople: this.state.selectedShowRemovedPeople,
      confirmedSport: this.state.selectedSport,
      confirmedAgeGroup: this.state.selectedType
    });
  }

  toggleDialog() {
    this.setState({
      isOpen: !this.state.isOpen,
      selectedShowRemovedPeople: this.state.selectedShowRemovedPeople,
      selectedSport: this.state.selectedSport,
      selectedType: this.state.selectedType
    });
  }

  resetFilters() {
    this.setState({
      selectedSport: "All",
      selectedType: "All",
      selectedShowRemovedPeople: false
    });
  }

  render() {
    const {
      classes,
      isMobile,
      sports,
      types,
      applyFilters,
      addPerson
    } = this.props;
    const {
      searchText,
      confirmedSport,
      confirmedType,
      selectedSport,
      selectedType,
      isOpen,
      selectedShowRemovedPeople,
      confirmedShowRemovedPeople
    } = this.state;

    return (
      <div>
        <Toolbar className={classes.settings}>
          <FormControl className={classes.formControl}>
            <Input
              id="search"
              value={searchText}
              onChange={this.handleChange("searchText")}
              placeholder="Search by person or team"
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
              {confirmedSport !== "All" && (
                <Chip
                  label={confirmedSport}
                  onRequestDelete={() => {
                    this.handleDeleteFilter("Sport");
                    applyFilters(
                      confirmedShowRemovedPeople,
                      "All",
                      confirmedType
                    );
                  }}
                  className={classes.chip}
                />
              )}
              {confirmedType !== "All" && (
                <Chip
                  label={confirmedType}
                  onRequestDelete={() => {
                    this.handleDeleteFilter("Type");
                    applyFilters(
                      confirmedShowRemovedPeople,
                      confirmedSport,
                      "All"
                    );
                  }}
                  className={classes.chip}
                />
              )}
            </div>
          )}
          <Tooltip title="Filter people" placement="bottom">
            <IconButton
              aria-label="filter people"
              onClick={() => this.toggleDialog()}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add new person" placement="bottom">
            <IconButton aria-label="add new person" onClick={() => addPerson()}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Dialog open={isOpen} onRequestClose={() => this.toggleDialog()}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <form className={classes.container} autoComplete="off">
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
                <InputLabel htmlFor="type">Types</InputLabel>
                <Select
                  value={selectedType}
                  onChange={this.handleChange("selectedType")}
                  input={<Input id="type" />}
                >
                  <MenuItem value="All">All</MenuItem>
                  {types.map(item => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedShowRemovedPeople}
                    onChange={(event, checked) =>
                      this.setState({ selectedShowRemovedPeople: checked })}
                  />
                }
                label="Show Removed People"
              />
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
                  selectedShowRemovedPeople,
                  selectedSport,
                  selectedType
                );
                applyFilters(
                  selectedShowRemovedPeople,
                  selectedSport,
                  selectedType
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
