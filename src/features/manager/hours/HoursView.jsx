import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import HoursLayout from "./HoursLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const HoursView = connect(mapStateToProps, mapDispatchToProps)(HoursLayout);

export default withRouter(HoursView);
