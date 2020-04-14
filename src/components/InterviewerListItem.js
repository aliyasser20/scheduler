import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

const interviewerListItem = props => {
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={classes} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
};

export default interviewerListItem;
