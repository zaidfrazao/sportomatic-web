// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import TeamsLayout from "./TeamsLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const TeamsView = connect(mapStateToProps, mapDispatchToProps)(TeamsLayout);

export default withRouter(TeamsView);
