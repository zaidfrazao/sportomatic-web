import React, { Component } from "react";
import { FormControl } from "material-ui/Form";
import { grey } from "material-ui/colors";
import Input, { InputAdornment } from "material-ui/Input";
import SearchIcon from "material-ui-icons/Search";
import Slide from "material-ui/transitions/Slide";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  searchIcon: {
    width: 18,
    height: 18
  },
  settings: {
    backgroundColor: grey[200]
  }
});

class FiltersToolbar extends Component {
  state = {
    isOpen: false,
    searchText: "",
    Transition: props => <Slide direction="up" {...props} />
  };

  handleChange = name => event => {
    const { updateSearch } = this.props;
    this.setState({ [name]: event.target.value });
    if (name === "searchText") updateSearch(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { searchText } = this.state;

    return (
      <div>
        <Toolbar className={classes.settings}>
          <FormControl>
            <Input
              id="search"
              value={searchText}
              onChange={this.handleChange("searchText")}
              placeholder="Search by person"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              }
            />
          </FormControl>
        </Toolbar>
      </div>
    );
  }
}

export default withStyles(styles)(FiltersToolbar);
