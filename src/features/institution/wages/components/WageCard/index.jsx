/* eslint-disable array-callback-return */
import React, { Component } from "react";
import accounting from "accounting";
import { grey } from "material-ui/colors";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  amountText: {
    padding: 16,
    textAlign: "center"
  },
  amountWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`,
    "@media (max-width: 600px)": {
      width: "100%"
    }
  },
  coachNameText: {
    padding: 16,
    textAlign: "center",
    color: grey[600],
    backgroundColor: grey[50]
  },
  coachNameWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: grey[200],
    border: `1px solid ${grey[300]}`,
    "@media (max-width: 600px)": {
      width: "100%"
    }
  },
  explanationText: {
    padding: 16,
    textAlign: "left",
    "@media (max-width: 600px)": {
      textAlign: "center"
    }
  },
  explanationWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: grey[100]
  },
  hightlightText: {
    fontWeight: "bold"
  },
  wagesWrapper: {
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`
  },
  rootWrapper: {
    padding: 16
  }
};

class WageCard extends Component {
  renderCardContent() {
    const { classes } = this.props;
    const { wage, title, hours } = this.props.wageInfo;
    const { name, surname } = this.props.coachInfo;

    return (
      <div className={classes.wagesWrapper}>
        <div className={classes.coachNameWrapper}>
          <Typography
            type="title"
            component="h3"
            className={classes.coachNameText}
          >
            {`${name} ${surname}`}
          </Typography>
        </div>
        <div className={classes.explanationWrapper}>
          {hours.overtime > 0 ? (
            <Typography
              type="subheading"
              component="h3"
              className={classes.explanationText}
            >
              <span>{"Worked "}</span>
              <span
                className={classes.hightlightText}
              >{`${hours.standard} standard hour${hours.standard === 1
                ? ""
                : "s"}`}</span>
              <span>{" and "}</span>
              <span
                className={classes.hightlightText}
              >{`${hours.overtime} overtime hour${hours.overtime === 1
                ? ""
                : "s"}`}</span>
              <span>{" at "}</span>
              <span>{title}</span>
              <span>{"."}</span>
            </Typography>
          ) : (
            <Typography
              type="subheading"
              component="h3"
              className={classes.explanationText}
            >
              <span>{"Worked "}</span>
              <span
                className={classes.hightlightText}
              >{`${hours.standard} standard hour${hours.standard === 1
                ? ""
                : "s"}`}</span>
              <span>{" at "}</span>
              <span>{title}</span>
              <span>{"."}</span>
            </Typography>
          )}
        </div>
        <div className={classes.amountWrapper}>
          <Typography
            type="title"
            component="h3"
            className={classes.amountText}
          >
            {accounting.formatMoney(wage, "R")}
          </Typography>
        </div>
      </div>
    );
  }

  toggleOpen() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.rootWrapper}>
        <div className={classes.contentWrapper}>{this.renderCardContent()}</div>
      </div>
    );
  }
}

export default withStyles(styles)(WageCard);
