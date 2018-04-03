import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import LandingPageLayout from "./LandingPageLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const LandingPageView = connect(mapStateToProps, mapDispatchToProps)(
  LandingPageLayout
);

export default withRouter(LandingPageView);
