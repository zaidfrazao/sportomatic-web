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
import SearchIcon from "material-ui-icons/Search";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
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
    confirmedAgeGroup: "All",
    Transition: props => <Slide direction="up" {...props} />
  };

  componentWillMount() {
    const { initialFilters } = this.props;
    this.setState({
      selectedShowDeletedTeams: initialFilters.showDeletedTeams,
      searchText: initialFilters.searchText,
      selectedGender: initialFilters.gender,
      selectedSport: initialFilters.sport,
      selectedDivision: initialFilters.division,
      selectedAgeGroup: initialFilters.ageGroup,
      confirmedGender: initialFilters.gender,
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
      confirmedShowDeletedTeams: this.state.selectedShowDeletedTeams,
      confirmedGender: this.state.selectedGender,
      confirmedSport: this.state.selectedSport,
      confirmedDivision: this.state.selectedDivision,
      confirmedAgeGroup: this.state.selectedAgeGroup
    });
  }

  toggleDialog() {
    this.setState({
      isOpen: !this.state.isOpen,
      selectedShowDeletedTeams: this.state.selectedShowDeletedTeams,
      selectedGender: this.state.selectedGender,
      selectedSport: this.state.selectedSport,
      selectedDivision: this.state.selectedDivision,
      selectedAgeGroup: this.state.selectedAgeGroup
    });
  }

  resetFilters() {
    this.setState({
      selectedGender: "All",
      selectedSport: "All",
      selectedDivision: "All",
      selectedAgeGroup: "All",
      selectedShowDeletedTeams: false
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
      genders,
      sports,
      divisions,
      ageGroups,
      applyFilters,
      addTeam,
      isLoading,
      role
    } = this.props;
    const {
      searchText,
      confirmedGender,
      confirmedSport,
      confirmedDivision,
      confirmedAgeGroup,
      selectedGender,
      selectedSport,
      selectedDivision,
      selectedAgeGroup,
      isOpen,
      selectedShowDeletedTeams,
      confirmedShowDeletedTeams
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
              placeholder="Search by team name or person"
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
              {confirmedGender !== "All" && (
                <Chip
                  label={this.formatGender(confirmedGender)}
                  onRequestDelete={() => {
                    this.handleDeleteFilter("Gender");
                    applyFilters(
                      confirmedShowDeletedTeams,
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
                      confirmedShowDeletedTeams,
                      confirmedGender,
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
                      confirmedShowDeletedTeams,
                      confirmedGender,
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
                  label={this.formatAgeGroup(confirmedAgeGroup)}
                  onRequestDelete={() => {
                    this.handleDeleteFilter("AgeGroup");
                    applyFilters(
                      confirmedShowDeletedTeams,
                      confirmedGender,
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
          <Tooltip title="Filter teams" placement="bottom">
            <IconButton
              aria-label="filter teams"
              onClick={() => this.toggleDialog()}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
          {role === "admin" && (
            <Tooltip title="Add new team" placement="bottom">
              <IconButton
                disabled={isLoading}
                aria-label="add new team"
                onClick={() => addTeam()}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        {isMobile && (
          <div className={classes.settingChips}>
            {confirmedGender !== "All" && (
              <Chip
                label={this.formatGender(confirmedGender)}
                onRequestDelete={() => {
                  this.handleDeleteFilter("Gender");
                  applyFilters(
                    confirmedShowDeletedTeams,
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
                    confirmedShowDeletedTeams,
                    confirmedGender,
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
                    confirmedShowDeletedTeams,
                    confirmedGender,
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
                label={this.formatAgeGroup(confirmedAgeGroup)}
                onRequestDelete={() => {
                  this.handleDeleteFilter("AgeGroup");
                  applyFilters(
                    confirmedShowDeletedTeams,
                    confirmedGender,
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
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  native
                  value={selectedGender}
                  onChange={this.handleChange("selectedGender")}
                  input={<Input id="type" />}
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
              {role === "admin" && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedShowDeletedTeams}
                      onChange={(event, checked) =>
                        this.setState({ selectedShowDeletedTeams: checked })}
                    />
                  }
                  label="Show Deleted Teams"
                />
              )}
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
                  selectedShowDeletedTeams,
                  selectedGender,
                  selectedSport,
                  selectedDivision,
                  selectedAgeGroup
                );
                applyFilters(
                  selectedShowDeletedTeams,
                  selectedGender,
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
