// @flow
import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { Route } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import DeleteIcon from "material-ui-icons/Delete";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import BlockAd from "../../../../../components/BlockAd";

const styles = {
  wrapper: {
    padding: 24
  },
  adWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    height: "100%",
    width: "100%"
  },
  heading: {
    fontWeight: "normal",
    fontSize: "1.2rem",
    padding: "20px 0",
    margin: 0,
    width: "100%",
    textAlign: "center",
    backgroundColor: grey[700],
    color: grey[50],
    borderBottom: `1px solid ${grey[200]}`
  },
  name: {
    width: "100%",
    textAlign: "center",
    margin: "40px 0"
  },
  pictureWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  picture: {
    backgroundColor: grey[300],
    width: 300,
    height: "auto",
    margin: 24
  },
  button: {
    "@media (max-width: 960px)": {
      width: "100%"
    }
  },
  pictureButtons: {
    width: "100%",
    display: "flex"
  },
  pictureButton: {
    width: "50%"
  },
  addButton: {
    width: "100%"
  }
};

class AccountInfo extends Component {
  render() {
    const { classes } = this.props;
    const {
      name,
      surname,
      email,
      phoneNumber,
      sports,
      profilePictureURL
    } = this.props.info;
    return (
      <div className={classes.wrapper}>
        <Route
          render={({ history }) => (
            <Button
              raised
              className={classes.button}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          )}
        />
        <Typography className={classes.name} type="display2" component="h2">
          Your Account Information
        </Typography>
        <Grid container direction="row" align="stretch">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.pictureWrapper}>
              <Avatar src={profilePictureURL} className={classes.picture} />
              <div className={classes.pictureButtons}>
                <Button raised className={classes.pictureButton}>
                  Change profile picture
                </Button>
                <Button raised className={classes.pictureButton}>
                  Change password
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.adWrapper}>
              <BlockAd />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Basic Info
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Name" secondary={name} />
                  <ListItemSecondaryAction>
                    <Tooltip label="Edit" placement="bottom">
                      <IconButton aria-label="change first name">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Surname" secondary={surname} />
                  <ListItemSecondaryAction>
                    <Tooltip label="Edit" placement="bottom">
                      <IconButton aria-label="change surname">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={email} />
                  <ListItemSecondaryAction>
                    <Tooltip label="Edit" placement="bottom">
                      <IconButton aria-label="change email address">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Phone number"
                    secondary={phoneNumber}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip label="Edit" placement="bottom">
                      <IconButton aria-label="change phone number">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Sports
              </Typography>
              <Button className={classes.addButton}>Add new sport</Button>
              <List>
                {sports &&
                  sports.map(sportInfo => (
                    <ListItem key={sportInfo.name}>
                      <ListItemText
                        primary={sportInfo.name}
                        secondary={`${sportInfo.numberOfTeams} teams`}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip label="Remove" placement="bottom">
                          <IconButton
                            disabled={sportInfo.numberOfTeams > 0}
                            aria-label="remove sport"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AccountInfo);
