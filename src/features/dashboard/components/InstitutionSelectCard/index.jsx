import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import { grey } from "material-ui/colors";
import Input from "material-ui/Input";
import Select from "material-ui/Select";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblem from "../../image/default-emblem.jpg";

const styles = {
  avatar: {
    width: 56,
    height: 56,
    backgroundColor: grey[300]
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
      userID,
      activeInstitution,
      emblemURL,
      isMobile,
      institutions
    } = this.props;
    const { switchInstitution } = this.props.actions;

    return (
      <div className={classes.wrapper}>
        <Avatar
          className={classes.avatar}
          src={emblemURL === "" ? defaultEmblem : emblemURL}
          aria-label="institution emblem"
        />
        <div className={classes.textWrapper}>
          {!isMobile && (
            <Typography type="headline" component="h2">
              {"Institution"}
            </Typography>
          )}
          <Select
            native
            className={classes.select}
            value={activeInstitution.id}
            onChange={e => {
              const newInstitutionID = e.target.value;
              let newRole = "ADMIN";
              if (institutions[newInstitutionID].rolesAvailable.admin) {
                newRole = "ADMIN";
              } else if (institutions[newInstitutionID].rolesAvailable.coach) {
                newRole = "COACH";
              } else if (
                institutions[newInstitutionID].rolesAvailable.manager
              ) {
                newRole = "MANAGER";
              }
              switchInstitution(userID, newInstitutionID, newRole);
            }}
            input={<Input id="institution selection" />}
          >
            {_.toPairs(institutions).map(([id, info]) => (
              <option key={id} value={id} disabled={!info.isActive}>
                {info.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RoleSelectCard);
