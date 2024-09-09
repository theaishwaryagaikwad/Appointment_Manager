import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import cors from "cors"; 

const app = express();
const PORT = 5006;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); 

connectDB();

//app.get("/", (req, res) => res.send("Hello world"));
app.get("/", appointmentRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
