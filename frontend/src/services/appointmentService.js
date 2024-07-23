import API from './api';

export const getAppointments = async () => {
  return await API.get('/appointments');
};

export const createAppointment = async (appointmentData) => {
  return await API.post('/appointments/appointment', appointmentData);
};

// Add more functions as needed
