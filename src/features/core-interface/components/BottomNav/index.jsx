/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import BottomNavigation, {
  BottomNavigationButton
} from "material-ui/BottomNavigation";
import DashboardIcon from "material-ui-icons/Dashboard";
import ProductsIcon from "material-ui-icons/ShoppingBasket";
import BusinessInfoIcon from "material-ui-icons/BusinessCenter";
import ContactInfoIcon from "material-ui-icons/Person";

const styles = {
  root: {
    width: "100%",
    margin: "0"
  }
};

class BottomNav extends React.Component {
  render() {
    const { classes, value } = this.props;
    const { updateAppBarTitle, updateBottomNavValue } = this.props.actions;

    return (
      <Route
        render={({ history }) => (
          <BottomNavigation
            value={value}
            onChange={(event, value) => {
              switch (value) {
                case "dashboard":
                  updateAppBarTitle("Dashboard");
                  updateBottomNavValue("dashboard");
                  history.push("/customer/dashboard");
                  break;
                case "products":
                  updateAppBarTitle("Products");
                  updateBottomNavValue("products");
                  history.push("/customer/products");
                  break;
                case "business-info":
                  updateAppBarTitle("Business Info");
                  updateBottomNavValue("business-info");
                  history.push("/customer/business-info");
                  break;
                case "contact-info":
                  updateAppBarTitle("Contact Info");
                  updateBottomNavValue("contact-info");
                  history.push("/customer/contact-info");
                  break;
                default:
                  updateAppBarTitle("Dashboard");
                  updateBottomNavValue("dashboard");
                  break;
              }
            }}
            className={classes.root}
          >
            <BottomNavigationButton
              value="dashboard"
              icon={<DashboardIcon />}
            />
            <BottomNavigationButton value="products" icon={<ProductsIcon />} />
            <BottomNavigationButton
              value="business-info"
              icon={<BusinessInfoIcon />}
            />
            <BottomNavigationButton
              value="contact-info"
              icon={<ContactInfoIcon />}
            />
          </BottomNavigation>
        )}
      />
    );
  }
}

export default withStyles(styles)(BottomNav);
