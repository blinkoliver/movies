import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./screens/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));
// console.log(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();