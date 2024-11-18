import { apiBaseUrl } from "../constants";
import axios from "axios";

export const getAllPatients = async () => {
    const {data} = await axios.get(`${apiBaseUrl}/admin`)
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