import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  patientPhoneNumber: { type: Number, required: true },
  DOB: { type: Date, required: true },
  bloodGroup: { type: String, required: true }
});

patientSchema.pre('save', async function(next) {
  const patient = this;
  if (patient.isModified('password')) {
    patient.password = await bcrypt.hash(patient.password, 8);
  }
  next();
});

patientSchema.methods.passwordCompare = async function(newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

const Patient = mongoose.model("patients", patientSchema);

export default Patient;

