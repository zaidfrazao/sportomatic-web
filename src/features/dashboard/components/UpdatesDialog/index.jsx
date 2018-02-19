import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  section: {
    margin: 16
  }
};

class UpdatesDialog extends Component {
  render() {
    const { isOpen, classes, isMobile } = this.props;
    const { handleClose } = this.props.actions;

    return (
      <Dialog open={isOpen} fullScreen={isMobile} onRequestClose={handleClose}>
        <DialogTitle>Software Updates</DialogTitle>
        <DialogContent>
          <Typography type="title" component="h2">
            {"v0.9.19 (Current) - Deployed 19/02/2018"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Admins can now log custom wages for coaches. They can log them
                based on hours given, add fixed amounts, and make wage
                deductions. (Issue #38)
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Fix bug preventing ads from showing.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.18 - Deployed 14/02/2018"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Fix known crashing bugs in hours and results. (Issue #118, #119)
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Correctly display unknown opponents on recent results dashboard
                widget. (Issue #115)
              </li>
              <li>
                Fix spacing around ad above hours table on mobile. (Issue #116)
              </li>
              <li>
                Fix loading indicator positioning in "Join Institution". (Issue
                #117)
              </li>
              <li>
                Remove extra "Sports Academy" from "Create Institution". (Issue
                #120)
              </li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.17 - Deployed 14/02/2018"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Fully implement coach absenteeism and substitution system.
                (Issue #12, #13)
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Fix "Load more..." buttons. (Issue #114)</li>
              <li>
                Only show hours and results on dashboard from events that are
                not canceled.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Disabled clicking of notifications until crashing bug is fixed.
              </li>
              <li>
                Add text under coach name in event info if coach is marked
                absent.
              </li>
              <li>Create dedicated updates slide.</li>
              <li>Sort hours and wage tables chronologically. (Issue #16)</li>
              <li>Adjust max width of results cards in the "Overview" tab.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.16"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Signing a coach out on the same day as the event always signs
                out at the current time to allow for overtime hours. (Issue #61)
              </li>
              <li>
                Hour logging disallows users from logging overtime hours that
                exceed the max overtime hours for the institution.
              </li>
              <li>
                Set coach payment fields to institution defaults when accepting
                or inviting coaches. (Issue #109)
              </li>
              <li>
                Enable "Sign up" button as soon as confirm password matches
                password when creating an account. (Issue #99)
              </li>
              <li>
                Fix crash caused by switching institutions. (Issue #111, #113)
              </li>
              <li>Fix blank phone number field. (Issue #107)</li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Fix minimum date on hours and wages tables to be in line with
                the institution's creation date. (Issue #28)
              </li>
              <li>Make table totals clearer. (Issue #52)</li>
              <li>
                Remove sport categorisation when selecting teams, managers and
                coaches for events and teams to remove confusion. (Issue #41)
              </li>
              <li>
                Change opponent name placeholder from "Currently unknown" to
                "Enter opponent name (Optional)" for improved clarity.
              </li>
              <li>
                Collapse hour and results cards when approved to avoid clutter.
                (Issue #82)
              </li>
              <li>
                Show default profile picture in staff requests when user has no
                profile picture.
              </li>
              <li>Lower tab height sligtly.</li>
              <li>Fix spacing around wage table ad on mobile.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.15"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Allow institution admins to accept and reject new members.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                When creating an institution, the default emblem would be
                selected even when a custom one was uploaded unless the user
                adjusted the zoom or image position. This has been fixed.
              </li>
              <li>
                Remove button in "Manage institutions" dialog now only
                disappears if a user's request to an institution is pending or
                if an institution is awaiting verification.
              </li>
              <li>
                Fix start and end time form validation when creating or editing
                events.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Institutions list in the home page of the "Manage institutions"
                dialog has been colour coded depending on approval status.
              </li>
              <li>
                Institutions list in the home page of the "Manage institutions"
                dialog has secondary text for each institution clarifying the
                status of the user at the institution or the verification status
                of the institution.
              </li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.14"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>All dialogs get reset when closed.</li>
              <li>Properly validate event adding / editing dialogs.</li>
              <li>
                Widen event title textfield in event adding / editing on
                desktop.
              </li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.13"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Disallow user from submitting negative scores and improve
                validation feedback when scores are invalid.
              </li>
              <li>
                Fix visual bug where event start time changes to sign in / out
                time when editing times as manager / admin.
              </li>
              <li>Add error-checking to hour logging.</li>
              <li>
                Include hours and results being logged for events in progress in
                dashboard widgets.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Make today indicator clearer on calendar.</li>
              <li>
                Improve usability issues with how opponents are added to teams.
              </li>
              <li>Update setup guide link.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.12"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Add link to season setup guide.</li>
              <li>Add link to user guide.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.11"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                User can change their profile picture and upload an emblem when
                creating an institution.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Disable unapproved institutions.</li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Widgets correctly show "None" when empty.</li>
              <li>
                Redundancy avatar on coach wages dashboard widget removed.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Notes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Updating profile picture updates personal institution emblem.
              </li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.10"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>Widgets added to the dashboard.</li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Added ad below slider to substitute for the slider one for
                usability and brand distinction.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Notes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                The way the widgets load info is not ideal at the moment.
                Basically, if the institution has enough events and wages,
                certain coaches and managers might not have their info displayed
                on their own accounts. I think I have a solution but it requires
                a bit more thought.
              </li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.9"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>Admins can edit their institution settings.</li>
              <li>Permissions have been implemented across app.</li>
            </Typography>
            <Typography type="subheading" component="h3">
              Bug Fix
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Overtime wage no longer exceed max overtime hours for
                institution.
              </li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.8"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>User can edit their personal settings.</li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Move settings navigation to side menu.</li>
              <li>Fix "Soccer / Footbal" typo.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.7"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                New user invited to an institution can complete the sign up
                process via the email sent to them.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Update Terms and Conditions.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.6"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Fix crash that occurs when reloading the team info page.</li>
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Make spacing around ads consistent.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.5"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Attempt to resolve time inconsistencies when scheduling events
                in Safari.
              </li>
              <li>Add software updates log to home.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.4"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Fix bug that caused crashed when user roles were changed.</li>
              <li>Fix schedule searching.</li>
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Make all empty lists in team info show "None".</li>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UpdatesDialog);
