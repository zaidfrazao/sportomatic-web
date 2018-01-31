import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import LeaveIcon from "material-ui-icons/Clear";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import { withStyles } from "material-ui/styles";
import defaultEmblem from "../../images/default-emblem.jpg";

const styles = {
  button: {
    margin: 8
  },
  buttonsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 8,
    maring: 8,
    backgroundColor: grey[200]
  }
};

class ManageInstitutionsDialog extends Component {
  state = {
    page: "HOME"
  };

  updatePage(newPage) {
    this.setState({
      page: newPage
    });
  }

  renderHomePage() {
    const { classes, isOpen, isMobile, closeDialog, institutions } = this.props;

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        onRequestClose={() => closeDialog()}
      >
        <DialogTitle>Manage Institutions</DialogTitle>
        <DialogContent>
          <div className={classes.buttonsWrapper}>
            <Button
              className={classes.button}
              onClick={() => this.updatePage("JOIN")}
            >
              Join an institution
            </Button>
            <Button
              className={classes.button}
              onClick={() => this.updatePage("CREATE")}
            >
              Create an institution
            </Button>
          </div>
          <List>
            {_.toPairs(institutions).map(([id, info]) => {
              return (
                <ListItem key={id}>
                  <Avatar
                    src={info.emblemURL === "" ? defaultEmblem : info.emblemURL}
                  />
                  <ListItemText primary={info.name} />
                  {info.type !== "Personal" && (
                    <ListItemSecondaryAction>
                      <IconButton aria-label="leave institution">
                        <LeaveIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderJoinPage() {
    const { classes, isOpen, isMobile, closeDialog, institutions } = this.props;

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        onRequestClose={() => closeDialog()}
      >
        <DialogTitle>Join Institution</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={() => this.updatePage("HOME")}>Back</Button>
          <Button color="primary">Apply to institution</Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderCreatePage() {
    const { classes, isOpen, isMobile, closeDialog, institutions } = this.props;

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        onRequestClose={() => closeDialog()}
      >
        <DialogTitle>Create Institution</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={() => this.updatePage("HOME")}>Back</Button>
          <Button color="primary">Create institution</Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const { page } = this.state;

    switch (page) {
      case "HOME":
        return this.renderHomePage();
      case "JOIN":
        return this.renderJoinPage();
      case "CREATE":
        return this.renderCreatePage();
      default:
        return this.renderHomePage();
    }
  }
}

export default withStyles(styles)(ManageInstitutionsDialog);
