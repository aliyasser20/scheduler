import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

const interviewerListItem = props => {
  // Classes for whether item is selected or not
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={classes} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.value}
      />
      {props.selected && props.value}
    </li>
  );
};

export default interviewerListItem;
