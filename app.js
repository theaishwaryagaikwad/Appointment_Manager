import express from "express";
import bodyParser from "body-parser";
import connectDB from "./backend/config/db.js";
import patientRoutes from "./backend/routes/patientRoutes.js";
import doctorRoutes from "./backend/routes/doctorRoutes.js";
import appointmentRoutes from "./backend/routes/appointmentRoutes.js";
import cors from "cors"; 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); 

connectDB();

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
