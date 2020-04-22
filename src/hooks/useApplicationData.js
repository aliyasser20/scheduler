import { useState, useEffect } from "react";
import axios from "axios";
import lo from "lodash";

// Custom hook that mages state of application
const useApplicationData = () => {
  // Initiate state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Function that sets day state
  const setDay = day => setState({ ...state, day });

  // Retrieve data from API in useEffect with side effects
  useEffect(() => {
    // Wait for all get requests to resolve
    Promise.all([
      // Get all days data
      Promise.resolve(axios.get("/days")),
      // Get all appointments data
      Promise.resolve(axios.get("/appointments")),
      // Get all interviewers data
      Promise.resolve(axios.get("/interviewers"))
    ]).then(all => {
      // Update state with retrieved data
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // Function that sends a put request then updates state based on response for booking an interview
  const bookInterview = (id, interview) => {
    // Create copy of state with added interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // AJAX Put request for booking interview
    return axios.put(`/appointments/${id}`, { interview }).then(resp => {
      const days = lo.cloneDeep(state.days);

      // If a new interview has been booked (not edited) decrease the remaining number of spots by 1
      // eslint-disable-next-line no-restricted-syntax
      for (const day in days) {
        if (days[day].name === state.day && !state.appointments[id].interview) {
          days[day].spots -= 1;
        }
      }
      // Update state
      setState({
        ...state,
        appointments,
        days
      });
    });
  };

  // Function that sends a delete request then updates state based on response for deleting an interview
  const cancelInterview = id => {
    // Create copy of state with deleted interview
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // AJAX Delete request for deleting interview
    return axios.delete(`/appointments/${id}`).then(resp => {
      const days = lo.cloneDeep(state.days);

      // If a new interview has been deleted increase the remaining number of spots by 1
      // eslint-disable-next-line no-restricted-syntax
      for (const day in days) {
        if (days[day].name === state.day) {
          days[day].spots += 1;
        }
      }
      // Update state
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
