import React from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment/index";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

import "./Application.scss";

// Set API url for axios in development mode
axios.defaults.baseURL = "http://localhost:8001/api";

export default function Application() {
  // State from custom useApplicationData hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Appointment elements
  const appointmentEls = getAppointmentsForDay(state, state.day).map(app => {
    // Interview for appointment
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        {...app}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentEls}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
