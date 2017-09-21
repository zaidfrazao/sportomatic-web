// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import WagesLayout from "./WagesLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const WagesView = connect(mapStateToProps, mapDispatchToProps)(WagesLayout);

export default withRouter(WagesView);
