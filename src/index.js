import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import WrappedAppComponent from "./screens/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  inputValue: "",
  selectedValue: "",
  results: [],
  inputIsFocused: true,
  error: true,
  loading: true,
  post: []
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <WrappedAppComponent />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
