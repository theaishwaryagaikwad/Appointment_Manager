import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking local storage for doctorId...");
    const storedDoctorId = localStorage.getItem("doctorId");
    if (storedDoctorId) {
      console.log("Doctor ID found:", storedDoctorId);
      setDoctorId(storedDoctorId);
    } else {
      console.log("No Doctor ID found in local storage.");
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      console.log("Fetching appointments...");
      const token = localStorage.getItem("accessedToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      if (!doctorId) {
        throw new Error("Doctor ID not found");
      }
      const response = await axios.get(
        `http://localhost:5006/api/appointments/appointmentsByDoctor/${doctorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Appointments fetched:", response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error in fetching appointments:", error.message);
    }
  }, [doctorId]);

  useEffect(() => {
    console.log("useEffect triggered. doctorId:", doctorId);
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId, fetchAppointments]);

  const handleStatusChange = useCallback(
    async (appointmentId, status) => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("No authentication token found");
        }
        await axios.put(
          `http://localhost:5006/api/appointments/appointments/${appointmentId}`,
          { status },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(`Appointment ${appointmentId} status updated to ${status}`);
        fetchAppointments();
      } catch (error) {
        console.error("Error updating appointment status:", error.message);
      }
    },
    [fetchAppointments]
  );

  const handleStatusSelect = async (status, appointmentId) => {
    setSelectedStatus(status);
    await handleStatusChange(appointmentId, status);
  };

  const handleSubmitLogout = () => {
    console.log("Logout successfully done!");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("doctorId");
    navigate("/");
  };

  return (
    <div className="container mt-4" style={{ border: "1px solid black" }}>
      <h2>Doctor Dashboard</h2>
      <button
        className="btn btn-dark m-3"
        style={{ textAlign: "end" }}
        type="button"
        onClick={handleSubmitLogout}
      >
        Logout
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Patient Name</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>{appointment.patientId.patientName}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                <DropdownButton
                  id={`dropdown-${appointment._id}`}
                  title={appointment.status || "Change Status"}
                  onSelect={(status) =>
                    handleStatusSelect(status, appointment._id)
                  }
                  className="status-dropdown"
                >
                  <Dropdown.Item eventKey="Accepted">Accepted</Dropdown.Item>
                  <Dropdown.Item eventKey="Canceled">Canceled</Dropdown.Item>
                  <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;
