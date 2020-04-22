import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = props => {
  // Initiate state using custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Function that saves appointment
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    // Transition to saving mode while request finishes
    transition(SAVING);

    // Book interview
    props
      .bookInterview(props.id, interview)
      .then(() => {
        // Transitions to show mode
        transition(SHOW);
      })
      .catch(err => {
        console.log(err);
        // Transitions to error saving mode
        transition(ERROR_SAVE, true);
      });
  };

  // Function that destroys appointment
  const destroy = () => {
    // Transition to deleting mode while request finishes
    transition(DELETING, true);

    // Cancel interview
    props
      .cancelInterview(props.id)
      .then(() => {
        // Transitions to empty mode
        transition(EMPTY);
      })
      .catch(() => {
        // Transitions error deleting mode
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
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
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={back} />
      )}
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
          onConfirm={destroy}
          onCancel={back}
          message="Are you sure you want to delete this appointment?"
        />
      )}
    </article>
  );
};

export default Appointment;
