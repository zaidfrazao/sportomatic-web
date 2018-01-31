import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import SignUpLayout from "./SignUpLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const SignUpView = connect(mapStateToProps, mapDispatchToProps)(SignUpLayout);

export default withRouter(SignUpView);
