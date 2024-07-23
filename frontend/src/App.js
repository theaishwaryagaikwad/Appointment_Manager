import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PatientLogin from './pages/PatientLogin';
import DoctorLogin from './pages/DoctorLogin';
import PatientRegister from './pages/PatientRegister';
import DoctorRegister from './pages/DoctorRegister';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path='/patientHome' element={<PatientDashboard/>}/>
          <Route path='/doctorHome' element={<DoctorDashboard/>}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/login/doctor" element={<DoctorLogin />} />
          <Route path="/register/patient" element={<PatientRegister />} />
          <Route path="/register/doctor" element={<DoctorRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// /patients/addPatient, /doctors/addDoctor, /patient/login, /doctor/login