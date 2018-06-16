import React, { Component } from "react";
import injectStyles from "react-jss";
import moment from "moment";
import Button from "../../../../../../../../components/Button";
import { common, grey, lightBlue } from "../../../../../../../../utils/colours";

const styles = {
  buttonDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "0 12px",
    flexGrow: 1,
    padding: "14px 20px",
    borderRadius: 16,
    color: grey[800],
    backgroundColor: common["white"],
    border: `1px solid ${grey[300]}`
  },
  editButton: {
    transition: "0.25s",
    margin: "0 24px",
    color: common["black"],
    cursor: "pointer",
    fontSize: 20,
    "&:hover": {
      color: lightBlue[500]
    }
  },
  wrapper: {
    display: "flex",
    alignItems: "center"
  }
};

class DateSelector extends Component {
  render() {
    const {
      classes,
      isPrevDisabled,
      isNextDisabled,
      handleNextSeason,
      handlePrevSeason,
      seasons,
      selectedIndex,
      openEditDialog,
      isUserAdmin
    } = this.props;

    const showEditButton =
      isUserAdmin &&
      moment(seasons[selectedIndex].dates.end, "DD MMM YYYY").isAfter(moment());

    return (
      <div className={classes.wrapper}>
        <div className={classes.buttonNavigation}>
          <Button
            disabled={isPrevDisabled}
            type="dark"
            fullWidth
            filled
            handleClick={() => handlePrevSeason()}
          >
            <i className="fas fa-arrow-left" />
          </Button>
        </div>
        <div className={classes.buttonDate}>
          {`${seasons[selectedIndex].dates.start} - ${seasons[selectedIndex]
            .dates.end}`}
          {showEditButton && (
            <div
              className={classes.editButton}
              onClick={() => openEditDialog()}
            >
              <i className="fas fa-edit" />
            </div>
          )}
        </div>
        <div className={classes.buttonNavigation}>
          <Button
            type="dark"
            disabled={isNextDisabled}
            fullWidth
            filled
            handleClick={() => handleNextSeason()}
          >
            <i className="fas fa-arrow-right" />
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(DateSelector);
