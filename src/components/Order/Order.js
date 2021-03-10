import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const style = {
    textTransform: "capitalize",
    display: "inline-block",
    border: "1px solid #ccc",
    padding: "5px",
    margin: "0 5px",
  };
  const ingredients = Object.entries(props.ingredients).map(([key, value]) => {
    return <span style={style} key={key}>{`${key}: ${value}`}</span>;
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>GBP {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
