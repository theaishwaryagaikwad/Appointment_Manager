import React, { useState } from "react";
import axios from "axios";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    doctorPhoneNumber: "",
    email: "",
    password: "",
    specialization: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5006/api/doctors/addDoctor",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Doctor Registration successful:", response.data);
      setFormData({
        doctorName: "",
        doctorPhoneNumber: "",
        email: "",
        password: "",
        specialization: "",
      });
      setSuccess("Doctor registration done successfully");
      setError("");
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
        <h1>Doctor Register page</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="doctorName">Full Name</label>
            <input
              type="text"
              name="doctorName"
              className="form-control"
              placeholder="Enter your Name"
              value={formData.doctorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              name="specialization"
              placeholder="specialization"
              className="form-control"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <label htmlFor="doctorPhoneNumber">Doctor Phone Number</label>
            <input
              type="number"
              name="doctorPhoneNumber"
              placeholder="Doctor Phone Number"
              className="form-control"
              value={formData.doctorPhoneNumber}
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

export default DoctorRegister;
