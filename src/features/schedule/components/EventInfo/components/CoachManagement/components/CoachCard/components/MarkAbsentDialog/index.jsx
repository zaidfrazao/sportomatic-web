import React, { Component } from "react";
import injectSheet from "react-jss";
import Button from "../../../../../../../../../../components/Button";
import {
  common,
  green,
  red
} from "../../../../../../../../../../utils/colours";
import Dialog from "../../../../../../../../../../components/Dialog";

const styles = {
  absentButtonPositive: {
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 16,
    margin: "12px 0",
    padding: 24,
    backgroundColor: green[500],
    color: common["white"],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: green[600]
    }
  },
  absentButtonNegative: {
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 16,
    margin: "12px 0",
    padding: 24,
    backgroundColor: red[500],
    color: common["white"],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: red[600]
    }
  },
  absentIcon: {
    marginRight: 12
  }
};

class MarkAbsentDialog extends Component {
  render() {
    const { classes, isOpen, closeDialog, name, updateAbsent } = this.props;

    const actions = [
      <Button colour="primary" slim handleClick={() => closeDialog()}>
        Cancel
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading={`Mark ${name} Absent`} actions={actions}>
        <div
          className={classes.absentButtonPositive}
          onClick={() => updateAbsent("GOOD")}
        >
          <i className={`fas fa-thumbs-up ${classes.absentIcon}`} />Absent with
          excuse
        </div>
        <div
          className={classes.absentButtonNegative}
          onClick={() => updateAbsent("BAD")}
        >
          <i className={`fas fa-thumbs-down ${classes.absentIcon}`} />
          Absent without excuse
        </div>
      </Dialog>
    );
  }
}

export default injectSheet(styles)(MarkAbsentDialog);
