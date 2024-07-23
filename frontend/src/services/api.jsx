import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5006/api', 
});

export const loginDoctor = async (userData) => {
  try {
    const response = await axios.post('/doctor/login', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export const loginPatient = async (userData) => {
  try {
    const response = await axios.post('/patient/login', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export const registerPatient = async (patientData) => {
  console.log(patientData);
  try {
    const response = await API.post('/patients/addPatient', patientData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerDoctor = async (doctorData) => {
  console.log(doctorData);
  try {
    const response = await API.post('/doctors/addDoctor', doctorData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const patientHomePage = async (patientData) => {
  console.log(patientData);
  try {
    const response = await API.post('/patientHome', patientData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const doctorHomePage = async (doctorData) => {
  console.log(doctorData);
  try {
    const response = await API.post('/doctorHome', doctorData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export default API;