import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, MapPinHouse, BriefcaseBusiness, Contact } from "lucide-react";
import { physicians, identificationTypes, consentArray } from '../constants';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPatient } from '../services/patientRequests';

const RegistrationForm = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const prefilledData = location.state || {};

    const initialFormFields = {
        name: prefilledData.name || "",
        email: prefilledData.email || "",
        phoneNumber: prefilledData.phoneNumber || "",
        dob: "",
        gender: "male",
        occupation: "",
        address: "",
        emergencyContactName: "",
        emergencyContact: "",
        identificationType: "",
        identificationNumber: "",
        physician: "",
        allergies: "",
        medications: "",
        familyHistory: "",
        pastHistory: "",
        consents: new Array(consentArray.length).fill(false)
    };

    const [formFields, setFormFields] = useState(initialFormFields);
    const [errors, setErrors] = useState({ identificationNumber: '' });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormFields({ ...formFields, [name]: value });
        if (name === 'identificationType' || name === 'identificationNumber') {
            validateIdentificationNumber(
                name === 'identificationNumber' ? value : formFields.identificationNumber,
                name === 'identificationType' ? value : formFields.identificationType
            );
        }

        if (type === 'checkbox' && name === 'consents') {
            const updatedConsents = [...formFields.consents]
            updatedConsents[e.target.dataset.index] = checked
            setFormFields({ ...formFields, consents: updatedConsents })
        }
    };

    // Check if all consents are checked
    const allConsentsChecked = formFields.consents.every(Boolean);

    const validateIdentificationNumber = (IDNumber, IDType) => {
        let number;
        switch (IDType) {
            case 'Aadhar Card':
                number = /^\d{12}$/;
                break;
            case 'Driving License':
                number = /^[A-Z]{2}\d{2}\s\d{11}$/;
                break;
            case 'Passport':
                number = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;
                break;
            case 'VoterID Card':
                number = /^[A-Z]{3}\d{7}$/;
                break;
            case 'PAN Card':
                number = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
                break;
            default:
                number = null;
        }

        if (number && !number.test(IDNumber)) {
            setErrors({ ...errors, identificationNumber: 'Invalid ID number format' });
        } else {
            setErrors({ ...errors, identificationNumber: '' });
        }
    };

    const handlePhoneChange = (val) => {
        setFormFields({ ...formFields, phoneNumber: val });
    };

    const handleEmergencyPhoneChange = (val) => {
        setFormFields({ ...formFields, emergencyContact: val });
    };

    const queryClient = useQueryClient()
    const addPatietntMutation = useMutation({
        mutationFn: addPatient,
        onSuccess: (patientData) => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
            navigate(`/patient/${patientData.id}/appointment`, { state: { patientId: patientData.id } })
        },
        onError: (error) => {
            console.error("Error adding patient:", error);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.identificationNumber) {
            alert('Identification pending');
            return;
        }

        if (!allConsentsChecked) {
            alert("Please accept all consent statements before submitting.");
            return;
        }
        // console.log(formFields);
        setFormFields(initialFormFields);
        addPatietntMutation.mutate(formFields)
    };

    return (

        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex flex-col'>

                {/* PERSONAL INFO */}
                <h3 className="text-xl font-bold mb-4">Personal Information</h3>

                {/* NAME */}
                <CustomInput
                    icon={User}
                    label="Name"
                    name="name"
                    value={formFields.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="John Doe" />

                {/* Style the div with 2 columns each having 4 inputs */}
                <div className='grid grid-cols-2 gap-6'>

                    {/* EMAIL */}

                    <CustomInput
                        icon={Mail}
                        label="Email"
                        name="email"
                        value={formFields.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="xyz@gmail.com" />

                    {/* PHONE */}
                    <CustomInput
                        label="Mobile Number"
                        name="phoneNumber"
                        value={formFields.phoneNumber}
                        onChange={handlePhoneChange}
                        type="phone" />

                    {/* DOB */}
                    <CustomInput
                        label="Date of Birth"
                        name="dob"
                        value={formFields.dob}
                        onChange={handleChange}
                        type="date"
                    />

                    {/* GENDER */}

                    <CustomInput
                        label="Gender"
                        name="gender"
                        value={formFields.gender}
                        onChange={handleChange}
                        type="radio"
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]}
                    />

                    {/* ADDRESS */}
                    <CustomInput
                        icon={MapPinHouse}
                        label="Address"
                        name="address"
                        value={formFields.address}
                        onChange={handleChange}
                        type="text"
                        placeholder="11 Street, Toronto, Canada-5102"
                    />

                    {/* OCCUPATION */}
                    <CustomInput
                        icon={BriefcaseBusiness}
                        label={"Occupation"}
                        name="occupation"
                        value={formFields.occupation}
                        onChange={handleChange}
                        type="text"
                        placeholder="Data Analyst" />

                    {/* EMERGENCY CONTACT NAME */}
                    <CustomInput
                        icon={Contact}
                        label="Emergency Contact Name"
                        name="emergencyContactName"
                        value={formFields.emergencyContactName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Guardian's name" />

                    {/* EMERGENCY CONTACT NO. */}

                    <CustomInput
                        label="Emergency Contact Number"
                        name="emergencyContact"
                        value={formFields.emergencyContact}
                        onChange={handleEmergencyPhoneChange}
                        type="phone" />
                </div>
            </div>

            <div className='flex flex-col mb-4'>

                {/* MEDICAL INFO */}
                <h3 className="text-xl font-bold mb-4">Medical Information</h3>

                <CustomInput
                    label="Primary care physician"
                    name="physician"
                    type="select"
                    value={formFields.physician}
                    onChange={handleChange}
                    placeholder="Select a physician"
                    options={physicians.map(doctor => ({ label: doctor, value: doctor }))}
                />

                <div className='grid grid-cols-2 gap-6'>

                    {/* INSURANCE OR PANEL */}

                    {/* <div className='mb-[2px]'>
                        <label htmlFor="insuranceProvider" className="block text-gray-700 text-sm font-bold mb-2">
                            Insurance provider
                        </label>
                        <input
                            name="insuranceProvider"
                            type="text"
                            id="insuranceProvider"
                            className="w-full p-2 border outline-none border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                            value={formFields.emergencyContactName}
                            onChange={handleChange}
                        />
                    </div> */}

                    {/* ALLERGIES */}

                    <CustomInput
                        name="allergies"
                        label="Allergies (if any)"
                        value={formFields.allergies}
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Pollens, Sinus, Peanuts"
                        required={false}
                    />

                    <CustomInput
                        name="medications"
                        label="Current medications"
                        value={formFields.medications}
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Ibuprofen 200mg"
                        required={false}
                    />

                    {/* FAMILY MEDICAL HISTORY */}
                    <CustomInput
                        name="familyHistory"
                        label="Family medical history (if relevant)"
                        value={formFields.familyHistory}
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Mother has diabetes; Father has Asthma"
                        required={false}
                    />

                    {/* PAST MEDICAL HISTORY */}
                    <CustomInput
                        name="pastHistory"
                        label="Past medical history"
                        value={formFields.pastHistory}
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Asthma diagnosis in 2015"
                        required={false}
                    />
                </div>
            </div>

            <div className='flex flex-col'>

                {/* VERIFICATION */}
                <h3 className="text-xl font-bold mb-4">Identification and Verification</h3>

                <div className='flex flex-col'>

                    <CustomInput
                        label="Identification Type"
                        name="identificationType"
                        value={formFields.identificationType}
                        onChange={handleChange}
                        type="select"
                        placeholder="Select ID type"
                        options={identificationTypes.map(type => ({ label: type, value: type }))} />

                    {/* <div className='mb-[2px]'>
                        <label htmlFor="identificationNumber" className="block text-gray-700 text-sm font-bold mb-2">
                            Identification Number
                        </label>
                        <input
                            required
                            name="identificationNumber"
                            type="text"
                            id="identificationNumber"
                            className={`w-full p-2 border ${errors.identificationNumber ? 'border-red-500' : 'border-gray-300'} outline-none rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4`}
                            value={formFields.identificationNumber}
                            onChange={handleChange}
                        />
                        {errors.identificationNumber && (
                            <p className="text-red-500 text-xs italic">{errors.identificationNumber}</p>
                        )}

                    </div> */}


                    {/* NOT WORKING */}
                    <CustomInput
                        label="Identification Number"
                        name="identificationNumber"
                        type="text"
                        value={formFields.identificationNumber}
                        onChange={handleChange}
                        placeholder="Enter Identification Number"
                        error={errors.identificationNumber}
                    />

                </div>

            </div>

            <div className='flex flex-col mb-4'>
                <h3 className="text-xl font-bold mb-4">Consent and Privacy</h3>

                {/* <div className='flex flex-col'>
                    {consentArray.map((item, idx) => (
                        <div key={idx}>
                            <input
                                type="checkbox"
                                checked={formFields.consents[idx]}
                                id='consents'
                                name='consents'
                                data-index={idx}
                                value={item}
                                onChange={handleChange}
                                className='' />
                            <label className="ml-2 text-gray-700">
                                {item}
                            </label>
                        </div>
                    ))}
                </div> */}

                <CustomInput
    label="Consents"
    name="consents"
    type="checkbox"
    value={formFields.consents}
    onChange={handleChange}
    options={consentArray} 
/>
            </div>

            <div className="flex justify-center w-full mb-6">
                <CustomButton className="w-full">Submit and continue</CustomButton>
            </div>
        </form>
    );
};

export default RegistrationForm;
