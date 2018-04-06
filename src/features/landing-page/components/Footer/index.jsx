import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  content: {
    padding: "24px 0",
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  copyrightText: {
    flexGrow: 1,
    fontSize: 16,
    margin: "12px 0",
    color: grey[500],
    "@media (max-width: 800px)": {
      width: "100%",
      textAlign: "center"
    }
  },
  legalStuffLink: {
    width: 120,
    color: lightBlue[500],
    textDecoration: "none",
    fontWeight: "bold",
    margin: "12px 0",
    "&:hover": {
      color: lightBlue[700],
      cursor: "pointer"
    }
  },
  privacyPolicyLink: {
    width: 120,
    color: lightBlue[500],
    textDecoration: "none",
    fontWeight: "bold",
    margin: "12px 0",
    "&:hover": {
      color: lightBlue[700],
      cursor: "pointer"
    }
  },
  wrapper: {
    padding: "0 32px",
    backgroundColor: grey[50],
    borderTop: `2px solid ${grey[300]}`
  }
});

type Props = {
  classes: {
    content: string,
    copyrightText: string,
    legalStuffLink: string,
    privacyPolicyLink: string,
    wrapper: string
  }
};

class Banner extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <span className={classes.copyrightText}>
            Copyright © 2018 Sportomatic Pty Ltd
          </span>
          <a className={classes.legalStuffLink} href="/terms">
            Terms of Use
          </a>
          <a className={classes.privacyPolicyLink} href="/privacy-policy">
            Privacy Policy
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Banner);
