import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import CoreInterfaceLayout from "./CoreInterfaceLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const CoreInterfaceView = connect(mapStateToProps, mapDispatchToProps)(
  CoreInterfaceLayout
);

export default withRouter(CoreInterfaceView);
