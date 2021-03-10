import React from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-order";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
//import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../../store/actions/index";

import { connect } from "react-redux";
import order from "../../../components/Order/Order";
import { Redirect } from "react-router";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIPCODE",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    //this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const formData = { ...this.state.orderForm };
    const updatedFormEl = { ...formData[inputIdentifier] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;
    formData[inputIdentifier] = updatedFormEl;

    let formIsValid = false;
    for (let inputIdent in formData) {
      if (!formData[inputIdent].valid) break;
      formIsValid = true;
    }
    console.log(formIsValid);
    this.setState({ orderForm: formData, formIsValid: formIsValid });
  };

  render() {
    if (this.props.purchaseSuccess) return <Redirect to="/" />;
    if (this.props.loading) {
      return <Spinner />;
    }
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((formEl) => (
            <Input
              key={formEl.id}
              elementType={formEl.config.elementType}
              elementConfig={formEl.config.elementConfig}
              value={formEl.value}
              changed={(event) => this.inputChangedHandler(event, formEl.id)}
              invalid={!formEl.config.valid}
              shouldValidate={formEl.config.validation}
              touched={formEl.config.touched}
            />
          ))}
          <Button disabled={!this.state.formIsValid} btnType="Success">
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    purchaseSuccess: state.order.purchase_success,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(actionCreators.purchaseBurger(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
