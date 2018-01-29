/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { FormControl } from "material-ui/Form";
import Input from "material-ui/Input";
import Select from "material-ui/Select";

class ReplacementCoachModal extends Component {
  state = {
    selectedCoachID: ""
  };

  componentWillMount() {
    const { initialReplacementCoach } = this.props;

    this.setState({
      selectedCoachID: initialReplacementCoach
    });
  }

  componentWillReceiveProps(nextProps) {
    const { initialReplacementCoach } = nextProps;

    if (initialReplacementCoach !== this.props.initialReplacementCoach) {
      this.setState({
        selectedCoachID: initialReplacementCoach
      });
    }
  }

  updateSelectedCoach(newCoachID) {
    this.setState({
      selectedCoachID: newCoachID
    });
  }

  resetState() {
    const { initialReplacementCoach } = this.props;
    this.setState({
      selectedCoachID: initialReplacementCoach
    });
  }

  render() {
    const { isOpen, coaches, originalCoachID, coachName } = this.props;
    const { closeModal, updateReplacementCoach } = this.props.actions;
    const { selectedCoachID } = this.state;

    let coachesBySport = {};
    _.toPairs(coaches).map(([coachID, coachInfo]) => {
      _.keys(coachInfo.info.sports).map(sport => {
        if (coachesBySport[sport]) {
          coachesBySport[sport] = {
            ...coachesBySport[sport],
            [coachID]: `${coachInfo.info.name} ${coachInfo.info.surname}`
          };
        } else {
          coachesBySport[sport] = {
            [coachID]: `${coachInfo.info.name} ${coachInfo.info.surname}`
          };
        }
      });
    });

    return (
      <Dialog open={isOpen}>
        <DialogTitle>Select Replacement Coach</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Please select a replacement for ${coachName}:`}
          </DialogContentText>
          <FormControl>
            <Select
              native
              value={selectedCoachID}
              onChange={e => this.updateSelectedCoach(e.target.value)}
              input={<Input id="coach selection" />}
            >
              <option value={""}>No one selected</option>
              {_.toPairs(coachesBySport).map(([sport, sportCoaches]) => {
                return (
                  <optgroup label={sport} key={`replacementCoach${sport}`}>
                    {_.toPairs(sportCoaches).map(([coachID, coachName]) => {
                      return (
                        <option
                          key={`replacementCoach${sport}${coachID}`}
                          value={coachID}
                          disabled={coachID === originalCoachID}
                        >
                          {coachName}
                        </option>
                      );
                    })}
                  </optgroup>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeModal();
              this.resetState();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={selectedCoachID === ""}
            color="primary"
            onClick={() => {
              updateReplacementCoach(selectedCoachID);
              this.resetState();
            }}
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ReplacementCoachModal;
