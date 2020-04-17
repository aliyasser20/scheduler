import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const Appointment = props => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  };

  const onDelete = () => {
    transition(DELETING);

    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onDelete}
          onCancel={back}
          message="Are you sure you want to delete this appointment?"
        />
      )}
    </article>
  );
};

export default Appointment;
