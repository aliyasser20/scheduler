// Function the filters and returns appointments for passed day
export const getAppointmentsForDay = (state, dayInput) => {
  const { days, appointments } = state;

  const appointmentsForDay = [];

  // Loop through days and add appointment to results if day matches input day
  days.forEach(day => {
    if (day.name === dayInput) {
      day.appointments.forEach(app => {
        appointmentsForDay.push(appointments[app]);
      });
    }
  });

  return appointmentsForDay;
};

// Function the returns interview object or null if no interview
export const getInterview = (state, interview) => {
  const result = interview
    ? { ...interview, interviewer: state.interviewers[interview.interviewer] }
    : null;

  return result;
};

// Function that filters and returns interviewers for passed day
export const getInterviewersForDay = (state, dayInput) => {
  const { days, interviewers } = state;

  const interviewersForDay = [];

  // Loop through days and add interviewer to results if day matches input day
  days.forEach(day => {
    if (day.name === dayInput) {
      day.interviewers.forEach(app => {
        interviewersForDay.push(interviewers[app]);
      });
    }
  });

  return interviewersForDay;
};
