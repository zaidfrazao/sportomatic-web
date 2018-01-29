import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import DashboardLayout from "./DashboardLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const DashboardView = connect(mapStateToProps, mapDispatchToProps)(
  DashboardLayout
);

export default withRouter(DashboardView);
