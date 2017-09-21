// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import SettingsLayout from "./SettingsLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const SettingsView = connect(mapStateToProps, mapDispatchToProps)(
  SettingsLayout
);

export default withRouter(SettingsView);
