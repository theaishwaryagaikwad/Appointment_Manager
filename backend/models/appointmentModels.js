import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
    required: true,
  },
  appointmentDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Canceled"],
    default: "pending",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
