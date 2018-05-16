import React, { Component } from "react";
import Dialog, { DialogContent } from "material-ui/Dialog";
import injectSheet from "react-jss";
import Button from "../../../../../../../../../../components/Button";
import {
  common,
  green,
  red
} from "../../../../../../../../../../utils/colours";

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
  absentButtonsWrapper: {
    margin: "24px 0"
  },
  absentIcon: {
    marginRight: 12
  },
  actionButton: {
    margin: "0 12px",
    flexGrow: 1
  },
  actionButtonsWrapper: {
    display: "flex"
  },
  headingMain: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    lineHeight: "32px"
  },
  wrapper: {
    width: 260,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
};

class MarkAbsentDialog extends Component {
  render() {
    const { classes, isOpen, closeDialog, name, updateAbsent } = this.props;

    return (
      <Dialog open={isOpen} fullScreen>
        <DialogContent className={classes.wrapper}>
          <div className={classes.headingMain}>Mark {name} Absent</div>
          <div className={classes.absentButtonsWrapper}>
            <div
              className={classes.absentButtonPositive}
              onClick={() => updateAbsent("GOOD")}
            >
              <i className={`fas fa-thumbs-up ${classes.absentIcon}`} />Absent
              with excuse
            </div>
            <div
              className={classes.absentButtonNegative}
              onClick={() => updateAbsent("BAD")}
            >
              <i className={`fas fa-thumbs-down ${classes.absentIcon}`} />
              Absent without excuse
            </div>
          </div>
          <div className={classes.actionButtonsWrapper}>
            <Button
              colour="primary"
              slim
              fullWidth
              handleClick={() => closeDialog()}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default injectSheet(styles)(MarkAbsentDialog);
