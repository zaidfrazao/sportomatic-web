import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import ScheduleLayout from "./ScheduleLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const ScheduleView = connect(mapStateToProps, mapDispatchToProps)(
  ScheduleLayout
);

export default withRouter(ScheduleView);
