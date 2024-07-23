import Doctor from "../models/doctorModels.js";
import jwt from "jsonwebtoken";

async function addDoctor(req, res) {
  try {
    const newDoctor = new Doctor(req.body);
    const result = await newDoctor.save();
    res.status(200).send({ message: "Register Successful", task: result });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error adding doctor", error: error.message });
  }
}

async function getDoctor(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }
    res.status(200).send(doctor);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching doctor", error: error.message });
  }
}

async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find();
    res.status(200).send(doctors);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching doctors", error: error.message });
  }
}

async function authenticateDoctor(req, res) {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).send({ message: "doctor not found" });
    }

    const isMatch = await doctor.passwordCompare(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: doctor._id }, "aishwarya", {
      expiresIn: "1h",
    });
    res.status(200).send({
      message: "Authentication successful",
      accessedToken: token,
      doctorId: doctor._id,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error during authentication", error: error.message });
  }
}
export default { addDoctor, getDoctor, getAllDoctors, authenticateDoctor };
