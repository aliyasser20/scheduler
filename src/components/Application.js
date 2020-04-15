import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment/index";

import { getAppointmentsForDay } from "../helpers/selectors";

import "./Application.scss";

axios.defaults.baseURL = "http://localhost:8001/api";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/days")),
      Promise.resolve(axios.get("/appointments"))
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data
      }));
    });
  }, []);

  const appointmentEls = getAppointmentsForDay(state, state.day).map(app => (
    <Appointment key={app.id} {...app} />
  ));

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
