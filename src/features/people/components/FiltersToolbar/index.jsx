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
    selectedSport: "All",
    selectedType: "All",
    confirmedSport: "All",
    confirmedType: "All",
    Transition: props => <Slide direction="up" {...props} />
  };

  componentWillMount() {
    const { initialFilters } = this.props;
    this.setState({
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
      confirmedSport: this.state.selectedSport,
      confirmedType: this.state.selectedType
    });
  }

  toggleDialog() {
    this.setState({
      isOpen: !this.state.isOpen,
      selectedSport: this.state.selectedSport,
      selectedType: this.state.selectedType
    });
  }

  resetFilters() {
    this.setState({
      selectedSport: "All",
      selectedType: "All"
    });
  }

  render() {
    const {
      classes,
      isMobile,
      sports,
      types,
      applyFilters,
      addPerson,
      role
    } = this.props;
    const {
      searchText,
      confirmedSport,
      confirmedType,
      selectedSport,
      selectedType,
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
                    applyFilters("All", confirmedType);
                  }}
                  className={classes.chip}
                />
              )}
              {confirmedType !== "All" && (
                <Chip
                  label={confirmedType}
                  onRequestDelete={() => {
                    this.handleDeleteFilter("Type");
                    applyFilters(confirmedSport, "All");
                  }}
                  className={classes.chip}
                />
              )}
            </div>
          )}
          {isMobile ? (
            <Tooltip title="Filter events" placement="bottom">
              <IconButton
                aria-label="filter events"
                onClick={() => this.toggleDialog()}
              >
                <FilterIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              aria-label="filter events"
              onClick={() => this.toggleDialog()}
            >
              <FilterIcon className={classes.iconAdjacentText} /> Set filters
            </Button>
          )}
          {role === "admin" &&
            !isMobile && (
              <Button
                aria-label="invite new person"
                onClick={() => addPerson()}
              >
                <AddIcon className={classes.iconAdjacentText} /> Invite new
                person
              </Button>
            )}
        </Toolbar>
        {isMobile && (
          <div className={classes.settingChips}>
            {confirmedSport !== "All" && (
              <Chip
                label={confirmedSport}
                onRequestDelete={() => {
                  this.handleDeleteFilter("Sport");
                  applyFilters("All", confirmedType);
                }}
                className={classes.chip}
              />
            )}
            {confirmedType !== "All" && (
              <Chip
                label={confirmedType}
                onRequestDelete={() => {
                  this.handleDeleteFilter("Type");
                  applyFilters(confirmedSport, "All");
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
                <InputLabel htmlFor="type">Role</InputLabel>
                <Select
                  native
                  value={selectedType}
                  onChange={this.handleChange("selectedType")}
                  input={<Input id="type" />}
                >
                  <option value="All">All</option>
                  {types.map(item => {
                    return (
                      <option key={item} value={item}>
                        {item}
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
                this.handleUpdate(selectedSport, selectedType);
                applyFilters(selectedSport, selectedType);
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
