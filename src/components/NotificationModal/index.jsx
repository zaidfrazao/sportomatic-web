import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

class NotificationModal extends Component {
  props: {
    isOpen: boolean,
    handleOkClick: () => void,
    message: string,
    heading: string
  };

  static defaultProps = {
    isOpen: false,
    handleOkClick: () => {
      console.log("Ok was clicked.");
    },
    message: "Default message.",
    heading: "Default Heading"
  };

  render() {
    const { isOpen, handleOkClick, message, heading } = this.props;

    return (
      <Dialog open={isOpen}>
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <Typography type="body1" component="p">
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleOkClick()}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NotificationModal;
