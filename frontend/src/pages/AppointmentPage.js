import React, { useEffect, useState } from 'react';
import { getAppointments } from '../services/appointmentService';
import styles from '../assets/css/AppointmentPage.module.css';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAppointments();
      setAppointments(response.data);
    };

    fetchAppointments();
  }, []);

  return (
    <div className={styles.container}>
    <h1>Appointments</h1>
    {appointments.length === 0 ? (
      <p>No appointments found</p>
    ) : (
      <ul className={styles.appointmentList}>
        {appointments.map((appointment) => (
          <li key={appointment._id} className={styles.appointmentItem}>
            <h2>{appointment.title}</h2>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Doctor: {appointment.doctor}</p>
            <p>Reason: {appointment.reason}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default AppointmentPage;
