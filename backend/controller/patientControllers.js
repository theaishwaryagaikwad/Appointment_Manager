// import Patient from "../models/patientModels.js";
// import jwt from 'jsonwebtoken';

// async function addPatient(req, res) {
//     try {
//         const newPatient = new Patient(req.body);
//         const result = await newPatient.save();
//         res.status(200).send({ message: "Register Successful", task: result });
//     } catch (error) {
//         res.status(500).send({ message: "Error adding patient", error: error.message });
//     }
// }

// async function getPatient(req, res) {
//     try {
//         const patient = await Patient.findById(req.params.id);
//         if (!patient) {
//             return res.status(404).send({ message: "Patient not found" });
//         }
//         res.status(200).send(patient);
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching patient", error: error.message });
//     }
// }

// async function getAllPatients(req, res) {
//     try {
//         console.log('Authenticated user:', req.user);
//         const patients = await Patient.find();
//         res.status(200).send(patients);
//     } catch (error) {
//         console.error('Error fetching patients:', error); 
//         res.status(500).send({ message: "Error fetching patients", error: error.message });
//     }
// }

// async function getPatientById(req, res) {
//     try {
//         const patient = await Patient.findById(req.params.id);
//         if (!patient) {
//             return res.status(404).send({ message: "Patient not found" });
//         }
//         res.status(200).send(patient);
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching patient", error: error.message });
//     }
// }

// async function authenticatePatient(req, res) {
//     try {
//         const { email, password } = req.body;
//         const patient = await Patient.findOne({ email });
//         if (!patient) {
//             return res.status(404).send({ message: "Patient not found" });
//         }

//         const isMatch = await patient.passwordCompare(password);
//         if (!isMatch) {
//             return res.status(401).send({ message: "Invalid password" });
//         }

//         const token = jwt.sign({_id: patient._id}, process.env.JWT_SECRET || 'aishwarya', {expiresIn:'1h'});
//         res.status(200).send({ message: "Authentication successful", accessedToken: token, patientName: patient.patientName });
//     } catch (error) {
//         res.status(500).send({ message: "Error during authentication", error: error.message });
//     }
// }

// export default { addPatient, 
//                  getPatient, 
//                  getAllPatients, 
//                  getPatientById, 
//                  authenticatePatient };



import Patient from "../models/patientModels.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function addPatient(req, res) {
    try {
        const { patientName, email, password, patientPhoneNumber, DOB, bloodGroup } = req.body;

        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).send({ message: "Patient already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = new Patient({
            patientName,
            email,
            password: hashedPassword,
            patientPhoneNumber,
            DOB,
            bloodGroup
        });

        const result = await newPatient.save();
        res.status(200).send({ message: "Register Successful", task: result });
    } catch (error) {
        res.status(500).send({ message: "Error adding patient", error: error.message });
    }
}

async function getPatient(req, res) {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send({ message: "Error fetching patient", error: error.message });
    }
}

async function getAllPatients(req, res) {
    try {
        console.log('Authenticated user:', req.user);
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (error) {
        console.error('Error fetching patients:', error); 
        res.status(500).send({ message: "Error fetching patients", error: error.message });
    }
}

async function getPatientById(req, res) {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send({ message: "Error fetching patient", error: error.message });
    }
}

async function authenticatePatient(req, res) {
    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }

        const isMatch = await patient.passwordCompare(password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const token = jwt.sign({_id: patient._id}, process.env.JWT_SECRET || 'aishwarya', {expiresIn:'1h'});
        res.status(200).send({ message: "Authentication successful", accessedToken: token,patientId: patient._id, patientName: patient.patientName });
    } catch (error) {
        res.status(500).send({ message: "Error during authentication", error: error.message });
    }
}

export default { addPatient, 
                  getPatient, 
                  getAllPatients, 
                  getPatientById, 
                  authenticatePatient  };

