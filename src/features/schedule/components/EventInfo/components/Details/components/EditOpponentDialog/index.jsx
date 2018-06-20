import React, { Component } from "react";
import injectSheet from "react-jss";
import Button from "../../../../../../../../components/Button";
import Dialog from "../../../../../../../../components/Dialog";
import TextField from "../../../../../../../../components/TextField";

const styles = {
  timeInputGroupWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  timeInputWrapper: {
    flexGrow: 1
  }
};

class EditOpponentDialog extends Component {
  state = {
    opponentName: ""
  };

  componentWillMount() {
    const { opponentName } = this.props;

    this.setState({
      opponentName
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, opponentName } = nextProps;

    if (
      opponentName !== this.props.opponentName ||
      (isOpen && isOpen !== this.props.isOpen)
    ) {
      const { opponentName } = nextProps;

      this.setState({
        opponentName
      });
    }
  }

  updateOpponentName(newValue) {
    this.setState({
      opponentName: newValue
    });
  }

  render() {
    const {
      classes,
      isOpen,
      closeDialog,
      editOpponents,
      isLoading
    } = this.props;
    const { opponentName } = this.state;

    const actions = [
      <Button
        disabled={isLoading}
        colour="primary"
        slim
        handleClick={() => closeDialog()}
      >
        Cancel
      </Button>,
      <Button
        loading={isLoading}
        colour="primary"
        filled
        slim
        handleClick={() => editOpponents(opponentName)}
      >
        Update
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading="Edit Opponent Name" actions={actions}>
        <div className={classes.timeInputGroupWrapper}>
          <div className={classes.timeInputWrapper}>
            <TextField
              value={opponentName}
              placeholder="Unknown opponent"
              handleChange={newValue => this.updateOpponentName(newValue)}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default injectSheet(styles)(EditOpponentDialog);
