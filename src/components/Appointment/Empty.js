import React from "react";

import "./styles.scss";

const empty = props => (
  <main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={props.onAdd}
    />
  </main>
);

export default empty;
