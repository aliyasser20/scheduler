import React from "react";

import DayListItem from "./DayListItem";

const dayList = props => {
  // Day list items on sidebar
  const dayListItems = props.days.map(day => (
    <DayListItem
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      key={day.id}
    />
  ));

  return <ul>{dayListItems}</ul>;
};

export default dayList;
