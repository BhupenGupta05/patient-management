import React, { useEffect, useState } from 'react'
import { physicians } from '../constants';
import CustomButton from './CustomButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAppointment, updateAppointment } from '../services/appointmentRequests';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomeDateTimePicker from './CustomeDateTimePicker';
import CustomInput from './CustomInput';

// ADD COMMENTS ON CANCELLED MODAL

const AppointmentForm = ({ type, patientData, onClose }) => {
    // console.log("PATIENT DATA IN FORM: ", patientData);

    const navigate = useNavigate()
    const location = useLocation()
    const patientId = location.state?.patientId || null

    const initialFormFields = {
        physician: "",
        appointmentDate: new Date(),
        reason: "",
        comments: "",
        patientId: type === 'schedule' ? patientData.patientId : patientId
    };

    // Based on status of the appointment we will change the buttonLabel
    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel appointment'
            break;
        case 'schedule':
            buttonLabel = 'Schedule appointment'
            break;
        case 'create':
            buttonLabel = 'Create appointment'
            break;
        default:
            break;
    }

    const isReadOnly = type === 'schedule'

    const [formFields, setFormFields] = useState(initialFormFields)
    const [cancellationReason, setCancellationReason] = useState("")


    useEffect(() => {
        setFormFields({
            ...initialFormFields,
            physician: patientData?.physician || "",
            appointmentDate: patientData?.appointments ? new Date(patientData.appointments) : new Date(),
            reason: patientData?.reason || "",
            comments: patientData?.comments || "",
        })
    }, [patientData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleDateChange = (date) => {
        setFormFields((prev) => ({
            ...prev,
            appointmentDate: date
        }));
    }

    const handleCancellationReasonChange = (e) => {
        setCancellationReason(e.target.value);
    };

    const queryClient = useQueryClient()

    const createAppointmentMutation = useMutation({
        mutationFn: createAppointment,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] }),
                navigate("/patient/success", { state: variables })
        },
        onError: (error) => {
            console.error("Error creating appointments:", error);
        }
    })

    const updateAppointmentStatus = useMutation({
        mutationFn: updateAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] }),
                navigate('/admin')
        },
        onError: (error) => {
            console.error("Error creating appointments:", error);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === 'cancel' && !cancellationReason) {
            alert('Please provide a cancellation reason');
            return;
        }

        const formattedData = {
            ...formFields,
            appointmentDate: formFields.appointmentDate.toISOString(),
            cancellationReason: type === 'cancel' ? cancellationReason : undefined,
        };

        if (type === 'create') {

            createAppointmentMutation.mutate(formattedData);
        } else if (patientData) {
            const appointmentId = patientData.appointmentId;
            const status = type === 'schedule' ? 'scheduled' : 'cancelled';


            updateAppointmentStatus.mutate({
                    appointmentId,
                    status,
                    cancellationReason: type === 'cancel' ? cancellationReason : undefined
                },
                {
                    onSuccess: () => {
                        setFormFields(initialFormFields);
                        setCancellationReason("");
                        onClose();
                    },
                }
            );
        }
    };


    return (
        <form onSubmit={handleSubmit} className='bg-opacity-50 backdrop-blur-sm z-50 max-w-lg relative w-[90%]'>
            {type !== 'cancel' && (
                <div className='flex flex-col gap-6 mb-6'>

                    <div className='flex flex-col'>

                        <CustomInput
                            name="physician"
                            label="Primary care physician"
                            value={formFields.physician}
                            onChange={handleChange}
                            type="select"
                            options={physicians}
                            placeholder="Select a physician"
                            disabled={isReadOnly} />

                        <CustomeDateTimePicker
                            selectedDate={formFields.appointmentDate}
                            onDateChange={handleDateChange}
                            label="Expected Appointment date"
                            disabled={isReadOnly} />
                    </div>

                    <div className='flex flex-row gap-4'>

                        <CustomInput
                            name="reason"
                            label="Appointment reason"
                            value={formFields.reason}
                            onChange={handleChange}
                            type="textarea"
                            placeholder="monthly check-up"
                            disabled={isReadOnly} />

                        <CustomInput
                            name="comments"
                            label="Comments/notes"
                            value={formFields.comments}
                            onChange={handleChange}
                            type="textarea"
                            placeholder="Would prefer afternoon slot"
                            disabled={isReadOnly}
                            required={false} />
                    </div>
                </div>
            )}

            {type === 'cancel' && (

                <CustomInput
                    name="cancellationReason"
                    label="Cancellation reason"
                    value={cancellationReason}
                    onChange={handleCancellationReasonChange}
                    type="textarea"
                    placeholder="Conflict in timings"
                    disabled={isReadOnly} />
            )}


            <div className="flex justify-center w-full mb-6">
                <CustomButton className="w-full" >{buttonLabel}</CustomButton>
            </div>
        </form>
    )
}

export default AppointmentForm