import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Modal,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const PatientDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patient, setPatient] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTarget, setTooltipTarget] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(null);

  const getPatientIdFromLocalStorage = () => {
    try {
      const storedPatient = localStorage.getItem("user");
      return storedPatient ? JSON.parse(storedPatient) : null;
    } catch (error) {
      console.error("Failed to parse patient data from localStorage: ", error);
      return null;
    }
  };

  const fetchDoctors = useCallback(async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(
        "http://localhost:5006/api/doctors/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.log("Error in fetching doctors", error.message);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      if (!patient) {
        throw new Error("Patient ID not found");
      }
      const response = await axios.get(
        `http://localhost:5006/api/appointments/appointmentsByPatientId/${patient}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("allAppointments", response.data);
      setAppointments(response.data);
    } catch (error) {
      console.log("Error in fetching appointments:", error.message);
    }
  }, [patient]);

  useEffect(() => {
    const storedPatient = getPatientIdFromLocalStorage();
    if (storedPatient) {
      setPatient(storedPatient);
      setPatientName(storedPatient.name);
    }
  }, []);

  useEffect(() => {
    const storedPatient = getPatientIdFromLocalStorage();
    if (storedPatient) {
      setPatient(storedPatient);
    } else {
      console.log("No patient ID found in localStorage");
    }
    fetchDoctors();
    fetchAppointments();
  }, [fetchDoctors, fetchAppointments]);

  useEffect(() => {
    if (patient && patient._id) {
      fetchDoctors();
      fetchAppointments();
    }
  }, [patient, fetchDoctors, fetchAppointments]);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setSelectedDoctor(appointment.doctorId);
    setSelectedDate(new Date(appointment.appointmentDate));
    setSelectedTime(new Date(appointment.appointmentDate));
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingAppointment(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleUpdateAppointment = async () => {
    if (
      !editingAppointment ||
      !selectedDoctor ||
      !selectedDate ||
      !selectedTime
    ) {
      alert("Please fill all fields");
      return;
    }

    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(selectedTime.getHours());
    appointmentDateTime.setMinutes(selectedTime.getMinutes());

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.put(
        `http://localhost:5006/api/appointments/appointments/${editingAppointment._id}`,
        {
          doctorId: selectedDoctor._id,
          appointmentDate: appointmentDateTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchAppointments();
        alert("Appointment updated successfully!");
        handleCloseEditModal();
      } else {
        alert("Error while updating appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.delete(
        `http://localhost:5006/api/appointments/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAppointments(appointments.filter((a) => a._id !== appointmentId));
        alert("Appointment deleted successfully!");
      } else {
        alert("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleDoctorSelect = (eventKey) => {
    const selected = doctors.find((doctor) => doctor._id === eventKey);
    setSelectedDoctor(selected);
  };

  const handleSaveAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !patientName) {
      alert("Please select a Doctor, Date, Time and Enter Patient Name");
      return;
    }

    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(selectedTime.getHours());
    appointmentDateTime.setMinutes(selectedTime.getMinutes());

    const patientId = getPatientIdFromLocalStorage();
    if (!patientId) {
      alert("Patient ID is not available.");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        "http://localhost:5006/api/appointments/appointments/appointment",
        {
          patientId: patientId,
          doctorId: selectedDoctor._id,
          appointmentDate: appointmentDateTime,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments([...appointments, response.data.task]);
      alert("Appointment saved successfully");
      handleCloseModal();
    } catch (error) {
      console.log("Error in saving appointment", error.message);
      alert("Failed to save appointment");
    }
  };

  const HandleSubmitLogout = async () => {
    navigate("/");
  };

  const handleDoctorHover = (event, doctor) => {
    setShowTooltip(true);
    setTooltipTarget(event.target);
    setTooltipContent(
      <div>
        <p>
          <strong>Name:</strong> {doctor.doctorName}
        </p>
        <p>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>
        <p>
          <strong>Email:</strong> {doctor.email}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {doctor.doctorPhoneNumber || doctor.doctorPhonenumber}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div
        className="container mt-4"
        style={{ border: "1px solid black", padding: "20px" }}
      >
        <h2 className="mb-4">Patient Dashboard</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Sr. No</th>
              <th>Doctor Name</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{index + 1}</td>
                <td>
                  <span
                    onMouseEnter={(e) =>
                      handleDoctorHover(e, appointment.doctorId)
                    }
                    onMouseLeave={() => setShowTooltip(false)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {appointment.doctorId
                      ? appointment.doctorId.doctorName
                      : "Unknown"}
                  </span>
                </td>
                <td>
                  {new Date(appointment.appointmentDate).toLocaleString()}
                </td>
                <td>{appointment.status}</td>
                <td>
                  <FaEdit
                    onClick={() => handleEditClick(appointment)}
                    style={{ cursor: "pointer", color: "#007bff" }}
                  />
                </td>
                <td>
                  <FaTrashCan
                    onClick={() => handleDeleteAppointment(appointment._id)}
                    style={{ cursor: "pointer", color: "#dc3545" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-dark" onClick={handleAddClick}>
            New Appointment
          </button>
          <button className="btn btn-dark" onClick={HandleSubmitLogout}>
            Logout
          </button>
        </div>

        <Overlay
          show={showTooltip}
          target={tooltipTarget}
          placement="right"
          container={document.body}
        >
          <Tooltip id="doctor-tooltip" className="doctor-info-tooltip">
            {tooltipContent}
          </Tooltip>
        </Overlay>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DropdownButton
              as={ButtonGroup}
              id="dropdown-doctors"
              title={
                selectedDoctor ? selectedDoctor.doctorName : "Select Doctor"
              }
              onSelect={handleDoctorSelect}
              variant="dark"
            >
              {doctors.map((doctor, index) => (
                <Dropdown.Item key={index} eventKey={doctor._id}>
                  {doctor.doctorName}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <div className="mt-3">
              <label>Enter Patient Name:</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="form-control"
                placeholder="Enter Patient Name"
              />
            </div>

            <div className="mt-3">
              <label>Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="form-control"
              />
            </div>

            <div className="mt-3">
              <label>Select Time:</label>
              <DatePicker
                selected={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="dark" onClick={handleSaveAppointment}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DropdownButton
              as={ButtonGroup}
              id="dropdown-doctors-edit"
              title={
                selectedDoctor ? selectedDoctor.doctorName : "Select Doctor"
              }
              onSelect={handleDoctorSelect}
              variant="dark"
            >
              {doctors.map((doctor, index) => (
                <Dropdown.Item key={index} eventKey={doctor._id}>
                  {doctor.doctorName}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <div className="mt-3">
              <label>Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="form-control"
              />
            </div>

            <div className="mt-3">
              <label>Select Time:</label>
              <DatePicker
                selected={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="dark" onClick={handleUpdateAppointment}>
              Update Appointment
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PatientDashboard;
