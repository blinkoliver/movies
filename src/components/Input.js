import React from "react";
import "../App.css";

// const Input = props => (
//   <input
//     id={"focus"}
//     onChange={props.onChange}
//     onBlur={props.onBlur}
//     onFocus={props.onFocus}
//     placeholder={"  Find Movies..."}
//   />
// );

const Input = ({ onChange, onBlur, onFocus }) => (
  <input
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    id={"focus"}
    placeholder={"  Find Movies..."}
  />
);

export default Input;
