import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import Input from "material-ui/Input";
import Select from "material-ui/Select";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblem from "../../image/default-emblem.jpg";

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
        {!isMobile && (
          <Avatar
            src={emblemURL === "" ? defaultEmblem : emblemURL}
            aria-label="institution emblem"
          />
        )}
        <div className={classes.textWrapper}>
          <Typography type="headline" component="h2">
            {"Institution"}
          </Typography>
          <Select
            native
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
              console.log(institutions[newInstitutionID]);
              switchInstitution(userID, newInstitutionID, newRole);
            }}
            input={<Input id="institution selection" />}
          >
            {_.toPairs(institutions).map(([id, info]) => (
              <option key={id} value={id}>
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
