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
