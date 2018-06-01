import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import CommunityLayout from "./CommunityLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const CommunityView = connect(mapStateToProps, mapDispatchToProps)(
  CommunityLayout
);

export default withRouter(CommunityView);
