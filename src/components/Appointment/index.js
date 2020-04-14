import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

const appointment = props => (
  <article className="appointment">
    <Header time={props.time} />
    {props.interview ? <Show {...props.interview} /> : <Empty />}
  </article>
);

export default appointment;
