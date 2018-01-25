import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Input from "material-ui/Input";
import Select from "material-ui/Select";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import adminIcon from "./image/admin-icon.png";
import coachIcon from "./image/coach-icon.png";
import managerIcon from "./image/manager-icon.png";

const styles = {
  avatar: {
    width: 40,
    height: 40
  },
  button: {
    flex: 1
  },
  textWrapper: {
    margin: 16,
    "@media (max-width: 600px)": {
      textAlign: "center"
    }
  },
  wrapper: {
    padding: 8,
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
};

class RoleSelectCard extends Component {
  render() {
    const { classes, activeRole, isMobile, rolesAvailable } = this.props;

    let roleIcon = adminIcon;
    if (activeRole === "COACH") {
      roleIcon = coachIcon;
    } else if (activeRole === "MANAGER") {
      roleIcon = managerIcon;
    }

    return (
      <div className={classes.wrapper}>
        {!isMobile && (
          <Avatar
            src={roleIcon}
            className={classes.avatar}
            aria-label="role icon"
          />
        )}
        <div className={classes.textWrapper}>
          <Typography type="headline" component="h2">
            {"Role"}
          </Typography>
          <Select
            native
            value={activeRole}
            onChange={() => {}}
            input={<Input id="institution selection" />}
          >
            <option disabled={!rolesAvailable.admin} value="ADMIN">
              {"Admin"}
            </option>
            <option disabled={!rolesAvailable.coach} value="COACH">
              {"Coach"}
            </option>
            <option disabled={!rolesAvailable.manager} value="MANAGER">
              {"Manager"}
            </option>
          </Select>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RoleSelectCard);
