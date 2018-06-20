import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import ReportsLayout from "./ReportsLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const ReportsView = connect(mapStateToProps, mapDispatchToProps)(ReportsLayout);

export default withRouter(ReportsView);
