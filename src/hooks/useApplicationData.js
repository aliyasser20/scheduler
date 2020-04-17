import { useState, useEffect } from "react";
import axios from "axios";
import lo from "lodash";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/days")),
      Promise.resolve(axios.get("/appointments")),
      Promise.resolve(axios.get("/interviewers"))
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/appointments/${id}`, { interview }).then(resp => {
      const days = lo.cloneDeep(state.days);
      // eslint-disable-next-line no-restricted-syntax
      for (const day in days) {
        if (days[day].name === state.day && !state.appointments[id].interview) {
          days[day].spots -= 1;
        }
      }
      setState({
        ...state,
        appointments,
        days
      });
    });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/appointments/${id}`).then(resp => {
      const days = lo.cloneDeep(state.days);

      // eslint-disable-next-line no-restricted-syntax
      for (const day in days) {
        if (days[day].name === state.day) {
          days[day].spots += 1;
        }
      }
      setState({
        ...state,
        appointments,
        days
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;
