import { apiBaseUrl } from "../constants";
import axios from "axios";

export const login = async (passcode) => {
    const {data} = await axios.post(`${apiBaseUrl}/admin/login`, {passcode})
    return data
}