import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const doctorSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  doctorPhoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true }
});

doctorSchema.pre('save', async function(next) {
  const doctor = this;
  if (doctor.isModified('password')) {
    doctor.password = await bcrypt.hash(doctor.password, 8);
  }
  next();
});

doctorSchema.methods.passwordCompare = async function(newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

const Doctor = mongoose.model("doctors", doctorSchema);

export default Doctor;
