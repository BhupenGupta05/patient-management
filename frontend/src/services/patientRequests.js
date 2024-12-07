import { apiBaseUrl } from "../constants";
import axios from "axios";

export const getAllPatients = async () => {
    const token = localStorage.getItem("adminToken");

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const {data} = await axios.get(`${apiBaseUrl}/admin`, config)
    return data
}

export const addPatient = async (newPatient) => {
    const {data} = await axios.post(`${apiBaseUrl}/patient/registration`, newPatient)
    return data
}

export const checkUserExistence = async (email) => {
    const {data} = await axios.get(`${apiBaseUrl}/patient/check-user?email=${email}`)
    return data
}