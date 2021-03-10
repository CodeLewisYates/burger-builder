import React, { Component } from "react";
import axios from "../../axios-order";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    this.props.history.push({
      pathname: "/checkout",
    });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).reduce((acc, igKey) => {
      return acc + ingredients[igKey];
    }, 0);
    return sum > 0;
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Something went wrong!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientRemoved={(ingredientName) =>
              this.props.removeIngredient(ingredientName)
            }
            ingredientAdded={(ingredientName) =>
              this.props.addIngredient(ingredientName)
            }
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler.bind(this)}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          purchaseContinue={this.purchaseContinueHandler.bind(this)}
          purchaseCancelled={this.purchaseCancelHandler.bind(this)}
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler.bind(this)}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) =>
      dispatch(actionCreators.addIngredient(ingredient)),
    removeIngredient: (ingredient) =>
      dispatch(actionCreators.removeIngredient(ingredient)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
