import React from "react";
import classNames from "classnames";

import "./Button.scss";

const Button = props => {
  // Classes for different button states
  const buttonClass = classNames(
    "button",
    { "button--confirm": props.confirm },
    { "button--danger": props.danger }
  );

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
