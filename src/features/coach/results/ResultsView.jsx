// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import ResultsLayout from "./ResultsLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const ResultsView = connect(mapStateToProps, mapDispatchToProps)(ResultsLayout);

export default withRouter(ResultsView);
