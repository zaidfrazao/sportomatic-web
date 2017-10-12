// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BannerCarousel from "./components/BannerCarousel";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    width: "100%"
  },
  explanation: {
    margin: "80px auto",
    maxWidth: 600,
    "@media (max-width: 960px)": {
      margin: 40
    }
  },
  paragraph: {
    margin: "24px 0"
  }
});

class DashboardLayout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BannerCarousel />
        <div className={classes.explanation}>
          <Typography type="body1" component="p" className={classes.paragraph}>
            This is the first version of the Sportomatic Beta release. It is
            only intented to be used by St Stithians staff members. It contains
            very rudimentary versions of the final functionality of the
            software.
          </Typography>
          <Typography type="body1" component="p" className={classes.paragraph}>
            The mobile version of this Beta version of the app, while usable,
            needs a lot of work. There are quite a few layout issues.
          </Typography>
          <Typography type="body1" component="p" className={classes.paragraph}>
            This dashboard would not normally contain this type of explanatory
            text. In the future it will contain things like notices, alerts,
            scoreboards, and other useful information that you would want to see
            every time you open the app.
          </Typography>
          <Typography type="body1" component="p" className={classes.paragraph}>
            Certain features have been temporarily disabled or have not yet been
            implemented. Again, this is just a rudimentary version of the final
            product.
          </Typography>
          <Typography type="body1" component="p" className={classes.paragraph}>
            Hopefully you will find the functionality that has been implemented
            thus far useful :)
          </Typography>
          <Typography type="body1" component="p" className={classes.paragraph}>
            - The Sportomatic Team
          </Typography>
        </div>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardLayout);
