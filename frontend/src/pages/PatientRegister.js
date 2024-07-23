import React, { useState } from "react";
import axios from "axios";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    password: "",
    patientPhoneNumber: "",
    DOB: "",
    bloodGroup: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5006/api/patients/addPatient",
        formData
      );
      console.log("Patient Registration successful:", response.data);
      setFormData({
        patientName: "",
        email: "",
        password: "",
        patientPhoneNumber: "",
        DOB: "",
        bloodGroup: "",
      });
      setError("");
      setSuccess("Patient registered successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error while registration");
      setSuccess("");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card p-4"
        style={{ width: "100%", maxWidth: "500px", border: "1px solid black" }}
      >
        <h1>Patient Register Page</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="patientName">Enter your Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Name"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="email">Enter your Email Id</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email Id"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="password">Enter valid Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="dateOfBirth">Enter Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="patientPhoneNumber">
              Enter Patient Mobile Number
            </label>
            <input
              type="number"
              placeholder="Patient Mobile Number"
              className="form-control"
              name="patientPhoneNumber"
              value={formData.patientPhoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="bloodGroup">Enter your Blood Group</label>
            <input
              type="text"
              placeholder="Blood Group"
              className="form-control"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
