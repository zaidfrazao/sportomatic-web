// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as duck from "./duck";
import PeopleLayout from "./PeopleLayout";

const mapStateToProps = state => {
  return duck.selector(state);
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(duck, dispatch) };
};

const PeopleView = connect(mapStateToProps, mapDispatchToProps)(PeopleLayout);

export default withRouter(PeopleView);
