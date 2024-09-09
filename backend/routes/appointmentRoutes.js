import express from "express";
import { 
    homepage,
    addAppointment, 
    getAllAppointments, 
    getAppointmentByPatientId, 
    getAppointmentByDoctorId,
    updateAppointment,
    partialUpdateAppointment,
    deleteAppointment
} from "../controller/appointmentControllers.js";

const router = express.Router();

router.get("/", homepage);
router.post('/appointments/appointment', addAppointment);
router.get('/appointment/allAppointments', getAllAppointments);
router.get('/appointmentsByPatientId/:patientId', getAppointmentByPatientId);
router.get('/appointmentsByDoctor/:doctorId', getAppointmentByDoctorId);
router.put('/appointments/:id', updateAppointment);
router.patch('/appointments/:id', partialUpdateAppointment);
router.delete('/appointments/:id', deleteAppointment);

export default router;
