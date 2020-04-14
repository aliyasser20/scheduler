import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

const interviewerList = props => {
  const interviewers = props.interviewers.map(inter => (
    <InterviewerListItem
      key={inter.id}
      {...inter}
      selected={inter.id === props.interviewer}
      setInterviewer={props.setInterviewer}
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
