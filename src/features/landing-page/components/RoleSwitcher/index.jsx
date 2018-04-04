import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import adminAvatar from "./images/admin.jpg";
import athleteAvatar from "./images/athlete.jpg";
import coachAvatar from "./images/coach.jpg";
import managerAvatar from "./images/manager.jpg";
import parentAvatar from "./images/parent.jpg";
import supporterAvatar from "./images/supporter.jpg";

const styles = theme => ({
  avatar: {
    borderRadius: "50%",
    backgroundColor: "white",
    border: "4px solid white",
    marginBottom: 12
  },
  roleName: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    padding: 8
  },
  roleSwitchButton: {
    fontWeight: "bold",
    fontSize: 28,
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: 4,
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  roleSwitchWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 290
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

type Props = {
  classes: {
    avatar: string,
    roleName: string,
    roleSwitchButton: string,
    wrapper: string
  },
  actions: {
    updateRoleIndex: (newIndex: number) => null
  }
};

type State = {
  index: number
};

class RoleSwitcher extends Component<Props, State> {
  state = {
    index: 0
  };

  handleNextRole() {
    const { index } = this.state;
    const { updateRoleIndex } = this.props.actions;

    let nextRole = index + 1;
    nextRole > 5 && (nextRole = 0);

    updateRoleIndex(nextRole);

    this.setState({
      index: nextRole
    });
  }

  handlePrevRole() {
    const { index } = this.state;
    const { updateRoleIndex } = this.props.actions;

    let prevRole = index - 1;
    prevRole < 0 && (prevRole = 5);

    updateRoleIndex(prevRole);

    this.setState({
      index: prevRole
    });
  }

  getRoleAvatar(index) {
    const avatars = [
      adminAvatar,
      managerAvatar,
      coachAvatar,
      athleteAvatar,
      parentAvatar,
      supporterAvatar
    ];

    return avatars[index];
  }

  getRoleName(index) {
    const roles = [
      "Sports Director",
      "Team Manager",
      "Coach",
      "Athlete",
      "Parent",
      "Supporter"
    ];

    return roles[index];
  }

  render() {
    const { classes } = this.props;
    const { index } = this.state;

    const roleSelected = this.getRoleName(index);
    const avatar = this.getRoleAvatar(index);

    return (
      <div className={classes.wrapper}>
        <img
          className={classes.avatar}
          src={avatar}
          width={240}
          height={240}
          alt={roleSelected}
        />
        <div className={classes.roleSwitchWrapper}>
          <span
            className={classes.roleSwitchButton}
            onClick={() => this.handlePrevRole()}
          >
            <i className="fas fa-angle-left" />
          </span>
          <span className={classes.roleName}>{roleSelected}</span>
          <span
            className={classes.roleSwitchButton}
            onClick={() => this.handleNextRole()}
          >
            <i className="fas fa-angle-right" />
          </span>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RoleSwitcher);
