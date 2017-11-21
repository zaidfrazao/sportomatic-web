import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

class DecisionModal extends Component {
  props: {
    isOpen: boolean,
    handleYesClick: () => void,
    handleNoClick: () => void,
    message: string,
    heading: string
  };

  static defaultProps = {
    isOpen: false,
    handleYesClick: () => {
      console.log("Yes was clicked.");
    },
    handleNoClick: () => {
      console.log("No was clicked.");
    },
    message: "Default message.",
    heading: "Default Heading"
  };

  render() {
    const {
      isOpen,
      handleYesClick,
      handleNoClick,
      message,
      heading
    } = this.props;

    return (
      <Dialog open={isOpen}>
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <Typography type="body1" component="p">
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleNoClick()}>No</Button>
          <Button color="primary" onClick={() => handleYesClick()}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DecisionModal;
