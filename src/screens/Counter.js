import React from "react";
import { createStore } from "redux";

const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.amount };
    case "DECREMENT":
      return { count: state.count - action.amount };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

const incrementAction = { type: "INCREMENT", amount: 1 };
const decrementAction = { type: "DECREMENT", amount: 1 };
const resetAction = { type: "RESET" };

const store = createStore(reducer, initialState);

class Counter extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  increment() {
    store.dispatch(incrementAction);
  }
  decrement() {
    store.dispatch(decrementAction);
  }
  reset() {
    store.dispatch(resetAction);
  }

  render() {
    const zalup = store.getState().count;

    return (
      <div className={"Container"}>
        <div className={"home"}>
          <button onClick={this.increment}>+</button>
          <div>{zalup}zalup</div>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Counter;
