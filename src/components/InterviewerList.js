import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

const interviewerList = props => {
  const interviewers = props.interviewers.map(inter => (
    <InterviewerListItem
      key={inter.id}
      value={inter.name}
      avatar={inter.avatar}
      selected={inter.id === props.interviewer}
      onChange={() => props.setInterviewer(inter.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};

export default interviewerList;
