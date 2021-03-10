import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";
import { withRouter } from "react-router-dom";

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((ing) => Array(props.ingredients[ing]).fill(ing))
    .flat()
    .map((ing, i) => <BurgerIngredient key={ing + i} type={ing} />);
  if (ingredients.length === 0)
    ingredients = <p>Please start adding ingredients!</p>;
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
