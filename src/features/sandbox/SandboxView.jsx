import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import SandboxLayout from "./SandboxLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const SandboxView = connect(mapStateToProps, mapDispatchToProps)(SandboxLayout);

export default withRouter(SandboxView);
