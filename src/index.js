import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "./store.js";
import { addToCart, updateCart, deleteFromCart } from "./actions/cart-actions";

// const { Provider } = require("react-redux");
function App(props) {
  let shoppingCart = props.store.getState().shoppingCart;
  console.log(shoppingCart);
  let cart = shoppingCart.cart;
  const listItems = cart.map(v => (
    <li key={v.id}>
      {v.product},{v.quantity} ,{v.unitCost}
    </li>
  ));
  return <ul>{listItems}</ul>;
}
const renderIndex = () => {
  console.log("renderIndex");
  ReactDOM.render(
    // <ul store={store}>{App()}</ul>,
    <Provider>
      <App store={store} />
    </Provider>,
    document.getElementById("root")
  );
};
renderIndex();
console.log("initial state: ", store, store.getState());

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
  renderIndex();
});
console.log("unsubscribe", unsubscribe);

store.dispatch(addToCart("Coffee 500gm", 1, 250));
store.dispatch(addToCart("Flour 1kg", 2, 110));

setTimeout(() => {
  store.dispatch(addToCart("Juice 2L", 1, 250));
  //   unsubscribe();
}, 1000);

// Update Cart
setTimeout(() => {
  store.dispatch(updateCart("Flour 1kg", 5, 110));
  //   unsubscribe();
}, 2000);

// Delete from Cart
setTimeout(() => {
  store.dispatch(deleteFromCart("Coffee 500gm"));

  //   unsubscribe();
}, 3000);
// unsubscribe();
