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
    width: 56,
    height: 56
  },
  button: {
    flex: 1
  },
  select: {
    width: "100%"
  },
  textWrapper: {
    margin: 16,
    "@media (max-width: 600px)": {
      margin: 8,
      textAlign: "center",
      width: "100%"
    }
  },
  wrapper: {
    padding: "16px 8px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column"
    }
  }
};

class RoleSelectCard extends Component {
  render() {
    const {
      classes,
      activeRole,
      isMobile,
      rolesAvailable,
      userID
    } = this.props;
    const { switchRole } = this.props.actions;

    let roleIcon = adminIcon;
    if (activeRole === "COACH") {
      roleIcon = coachIcon;
    } else if (activeRole === "MANAGER") {
      roleIcon = managerIcon;
    }

    return (
      <div className={classes.wrapper}>
        <Avatar
          src={roleIcon}
          className={classes.avatar}
          aria-label="role icon"
        />
        <div className={classes.textWrapper}>
          {!isMobile && (
            <Typography type="headline" component="h2">
              {"Role"}
            </Typography>
          )}
          <Select
            native
            className={classes.select}
            value={activeRole}
            onChange={e => switchRole(userID, e.target.value)}
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
