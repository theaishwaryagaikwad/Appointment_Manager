import Appointment from "../models/appointmentModels.js";

export async function homepage(req,res) {
  try {
    res.status(200).send("Welcome to the Appointment Management API");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

export async function addAppointment(req, res) {
  try {
    console.log("Request Body: ", req.body);
    const newAppointment = new Appointment(req.body);
    const result = await newAppointment.save();
    res
      .status(200)
      .send({ message: "Appointment added successfully", task: result });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res
      .status(500)
      .send({ message: "Error adding appointment", error: error.message });
  }
}

export async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate("patientId")
      .populate("doctorId");
    res.status(200).send(appointments);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching appointments", error: error.message });
  }
}

export async function getAppointmentByPatientId(req, res) {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).populate(
      "doctorId"
    );
    res.status(200).send(appointments);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching appointments", error: error.message });
  }
}

export async function getAppointmentByDoctorId(req, res) {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId }).populate(
      "patientId"
    );
    res.status(200).send(appointments);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching appointments", error: error.message });
  }
}

export async function updateAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appointment) {
      console.log("Appointment not found");
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.status(200).send(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res
      .status(500)
      .send({ message: "Error updating appointment", error: error.message });
  }
}

export async function partialUpdateAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.status(200).send(appointment);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating appointment", error: error.message });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.status(200).send({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting appointment", error: error.message });
  }
}
