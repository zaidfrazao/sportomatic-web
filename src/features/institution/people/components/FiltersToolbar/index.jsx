import React, { Component } from "react";
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
    selectedType: "All",
    selectedSport: "All",
    confirmedType: "All",
    confirmedSport: "All"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDeleteFilter(name) {
    this.setState({ [name]: "All" });
  }

  handleUpdate() {
    this.setState({
      isOpen: false,
      confirmedType: this.state.selectedType,
      confirmedSport: this.state.selectedSport
    });
  }

  toggleDialog() {
    this.setState({
      isOpen: !this.state.isOpen,
      selectedType: this.state.selectedType,
      selectedSport: this.state.selectedSport
    });
  }

  resetFilters() {
    this.setState({
      selectedType: "All",
      selectedSport: "All"
    });
  }

  render() {
    const { classes, isMobile, types, sports, applyFilter } = this.props;
    const {
      searchText,
      confirmedType,
      confirmedSport,
      selectedType,
      selectedSport,
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
              {confirmedType !== "All" && (
                <Chip
                  label={confirmedType}
                  onRequestDelete={() =>
                    this.handleDeleteFilter("confirmedType")}
                  className={classes.chip}
                />
              )}
              {confirmedSport !== "All" && (
                <Chip
                  label={confirmedSport}
                  onRequestDelete={() =>
                    this.handleDeleteFilter("confirmedSport")}
                  className={classes.chip}
                />
              )}
            </div>
          )}
          <Tooltip title="Filter report" placement="bottom">
            <IconButton
              aria-label="filter report"
              onClick={() => this.toggleDialog()}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Dialog open={isOpen} onRequestClose={() => this.toggleDialog()}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <form className={classes.container} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Type</InputLabel>
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
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sport">Sports</InputLabel>
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
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.toggleDialog()}>Close</Button>
            <Button
              color="accent"
              onClick={() => {
                this.resetFilters();
                applyFilter("All", "All");
              }}
            >
              Reset
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.handleUpdate(selectedType, selectedSport);
                applyFilter(selectedType, selectedSport);
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
