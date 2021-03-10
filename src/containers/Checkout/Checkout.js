import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { resetPurchaseState } from "../../store/actions/index";

import { connect } from "react-redux";

class Checkout extends React.Component {
  componentDidMount() {
    this.props.resetPurchaseSuccess();
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    if (!this.props.ingredients) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ingredients}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPurchaseSuccess: () => dispatch(resetPurchaseState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
