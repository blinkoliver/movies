import React from "react";
import "../App.css";
import logo from "../logo.svg";

function Load() {
  return (
    <div className={"Loader"}>
      <img src={logo} width="200" height="200" alt="logo"></img>
    </div>
  );
}

export default Load;
