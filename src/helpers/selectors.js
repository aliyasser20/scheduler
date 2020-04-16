export const getAppointmentsForDay = (state, dayInput) => {
  const { days, appointments } = state;

  const appointmentsForDay = [];

  days.forEach(day => {
    if (day.name === dayInput) {
      day.appointments.forEach(app => {
        appointmentsForDay.push(appointments[app]);
      });
    }
  });

  return appointmentsForDay;
};

export const getInterview = (state, interview) => {
  const result = interview
    ? { ...interview, interviewer: state.interviewers[interview.interviewer] }
    : null;

  return result;
};
