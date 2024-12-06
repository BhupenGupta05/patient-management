import { apiBaseUrl } from "../constants";
import axios from "axios";

export const createAppointment = async (newAppointment) => {
  const { data } = await axios.post(`${apiBaseUrl}/appointments/${newAppointment.patientId}/appointment`, newAppointment)
  return data
}

export const updateAppointment = async (existingAppointment) => {
  const { appointmentId, status, cancellationReason } = existingAppointment

  let endpoint;

  if (status === 'scheduled') {
    endpoint = `${apiBaseUrl}/admin/${appointmentId}/schedule`;
  } else if (status === 'cancelled') {
    endpoint = `${apiBaseUrl}/admin/${appointmentId}/cancel`;
  }


  // Build the payload dynamically
  const payload = {
    appointmentId,
    status
  };

  if (cancellationReason) {
    payload.cancellationReason = cancellationReason; // Add reason only if they exist
  }


  const { data } = await axios.patch(endpoint, payload);

  return data;
};
