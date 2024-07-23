// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
    
//     if (!token) {
//         return res.status(401).send({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Aishwarya');
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).send({ message: 'Invalid token.' });
//     }
// };

// export default auth;

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Patient from '../models/patientModels.js';
import Doctor from '../models/doctorModels.js';
import Appointment from '../models/appointmentModels.js';

const router = express.Router();

router.post('/login/patient', async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: patient._id }, 'aishwarya', { expiresIn: '1h' });
    res.status(200).send({ token, user: { patientId: patient._id, name: patient.name } });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
});


router.post('/login/doctor', async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: doctor._id }, 'aishwarya', { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
});


router.post('/appointments/appointment', async (req, res) => {
  const { patientId, doctorId, date, time, status } = req.body;
  try {
    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      status
    });
    await appointment.save();
    res.status(201).send({ message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
});

export default router;

