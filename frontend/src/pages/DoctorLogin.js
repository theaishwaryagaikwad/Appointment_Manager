import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5006/api/doctors/authenticateDoctor",
        { email, password }
      );
      console.log("Login successful:", response.data);

      // Save doctorId and token to localStorage
      const { doctorId, token } = response.data;
      localStorage.setItem("doctorId", doctorId);
      localStorage.setItem("accessedToken", token);
      console.log("success");
      navigate("/doctorHome");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login Failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 w-50%">
      <div className="card p-4" style={{ border: "1px solid black" }}>
        <h1>Doctor Login Page</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row mt-3 mb-3">
            <input
              type="email"
              placeholder="Enter your Email Id"
              value={email}
              className="w-50%"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group row mt-3 mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              className="w-50%"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
