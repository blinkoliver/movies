import React from "react";
import "../App.css";
import logo from "../logo.svg";

function Loading() {
  return (
    <div className={"Container"}>
      <div className={"Loader"}>
        <img src={logo} width="200" height="200" alt="logo"></img>
        <h1>Fetching Data</h1>
      </div>
    </div>
  );
}

export default Loading;