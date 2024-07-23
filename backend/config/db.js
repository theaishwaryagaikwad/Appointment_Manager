import mongoose from "mongoose";

const connectDb = async () => {
  try {
    let connection = await mongoose.connect(
      "mongodb+srv://gaikwadaishwarya2002:lQMSUckkbXt5ogSf@cluster0.kymkgu6.mongodb.net/Appointment_management?retryWrites=true&w=majority&appName=Cluster"
    );
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error while connecting", error);
  }
};

export default connectDb;
