import React, { Component } from "react";
import injectStyles from "react-jss";
import {
  common,
  green,
  grey,
  lightBlue,
  orange,
  red
} from "../../../../../../../../../../utils/colours";
import Tabs from "../Tabs";
import TextField from "../../../../../../../../../../components/TextField";

const styles = {
  commentaryIcon: {
    marginRight: 12
  },
  commentaryHeading: {
    color: grey[800],
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12
  },
  commentaryWrapper: {
    margin: 24
  },
  confirmButton: {
    transition: "0.25s",
    padding: 24,
    color: common["white"],
    backgroundColor: orange["A400"],
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: "0 0 16px 16px",
    "&:hover": {
      backgroundColor: orange["A200"]
    }
  },
  emblem: {
    margin: "0 12px",
    borderRadius: "50%",
    backgroundColor: grey[300],
    padding: 4,
    width: 32,
    height: 32
  },
  homeAwayIndicator: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 4
  },
  pointsColumn: {
    padding: "24px 0",
    height: "100%",
    backgroundColor: grey[100],
    width: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  pointsLabelColumn: {
    flex: 1,
    padding: 24,
    height: "100%",
    fontWeight: "bold",
    color: grey[800]
  },
  resultDraw: {
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
    color: common["white"],
    backgroundColor: lightBlue[500],
    padding: "8px 12px"
  },
  resultLoss: {
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
    color: common["white"],
    backgroundColor: red[500],
    padding: "8px 12px"
  },
  resultWin: {
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
    color: common["white"],
    backgroundColor: green[500],
    padding: "8px 12px"
  },
  score: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  scoreWrapper: {
    padding: "24px 0",
    height: "100%",
    backgroundColor: grey[100],
    width: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  scoresWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  statsRow: {
    display: "flex",
    alignItems: "center"
  },
  statsOptionalWrapper: {
    borderBottom: `1px solid ${grey[300]}`,
    backgroundColor: grey[50]
  },
  statsRequiredWrapper: {
    borderBottom: `1px solid ${grey[300]}`,
    backgroundColor: grey[50]
  },
  switchWrapper: {
    margin: "0 24px",
    display: "flex",
    justifyContent: "center"
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    lineHeight: "20px",
    marginRight: 12
  },
  teamScoreInfo: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${grey[300]}`
  },
  wrapper: {
    backgroundColor: common["white"],
    borderRadius: 16,
    border: `1px solid ${grey[300]}`
  }
};

class Custom extends Component {
  render() {
    const { classes, teamInfo, toggleHomeAway, homeAway } = this.props;

    return (
      <div className={classes.wrapper}>
        <Tabs
          selected={homeAway}
          toggleHomeAway={newSelection => toggleHomeAway(newSelection)}
        />
        <div className={classes.statsRequiredWrapper}>
          <div className={classes.statsRow}>
            <div className={classes.pointsLabelColumn}>Points</div>
            <div className={classes.pointsColumn}>
              <TextField type="number" value={teamInfo.requiredStats.goals} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(Custom);
