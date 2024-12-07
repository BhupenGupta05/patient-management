import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkUserExistence } from "../services/patientRequests";
import CustomButton from "../components/CustomButton";
import useDebounce from "../hooks/Debounce";
import Copyright from "../components/Copyright";
import Title from "../components/Title";
import CustomInput from "../components/CustomInput";
import {login} from '../services/loginRequests'

const Home = () => {
    const initialFormFields = {
        name: "",
        email: "",
        phoneNumber: "",
    };

    const [formFields, setFormFields] = useState(initialFormFields);
    const [showPasscodeModal, setShowPasscodeModal] = useState(false); 
    const [passcode, setPasscode] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handlePhoneChange = (val) => {
        setFormFields({ ...formFields, phoneNumber: val });
    };

    const debouncedEmail = useDebounce(formFields.email, 1000);
    const { data, isLoading } = useQuery({
        queryKey: ['user', debouncedEmail],
        queryFn: () => checkUserExistence(debouncedEmail),
        enabled: !!debouncedEmail
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) {
            return;
        }

        if (data?.exists) {
            const patientId = data.id;
            navigate(`/patient/${patientId}/appointment`);
        } else {
            navigate("/patient/registration", { state: formFields });
        }
    };

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value)
    }

    const {mutate, isLoading: isPassCodeLoading} = useMutation({
        mutationFn: (passcode) => login(passcode),
        onSuccess: (data) => {
            console.log("DATA: ",data);
            
            localStorage.setItem("adminToken", data.token);
            navigate("/admin");
            setShowPasscodeModal(false);
        },
        onError: () => {
            setError("Invalid passcode");
        },
    })

    const handlePassCodeSubmit = async (e) => {
        e.preventDefault();
        mutate(passcode);
    }

    const handleAdminClick = () => {
        setShowPasscodeModal(true); 
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Title
                title="NurtureMed"
                heading="Hi there"
                subheading="Let's get started with signing you up!"
                className="text-center"
                titleClassName="text-md md:text-lg md:mb-4 lg:text-xl font-bold text-indigo-600 mb-2"
                headingClassName="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1"
                subheadingClassName="text-wrap text-xs sm:text-sm md:text-md mb-6"
                     />

                <form onSubmit={handleSubmit} className="w-full">
                    {/* Name Field */}
                    <CustomInput
                        icon={User}
                        label="Name"
                        name="name"
                        value={formFields.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="John Doe"
                    />

                    {/* Email Field */}
                    <CustomInput
                        icon={Mail}
                        label="Email"
                        name="email"
                        value={formFields.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="xyz@gmail.com"
                    />

                    {/* Phone Number Field */}
                    <CustomInput
                        label="Mobile Number"
                        name="phoneNumber"
                        value={formFields.phoneNumber}
                        onChange={handlePhoneChange}
                        type="phone"
                    />

                    {/* Submit Button */}
                    <div className="flex justify-center items-center w-full mb-8">
                        <CustomButton className="w-full mt-6 text-xs sm:text-sm md:text-md lg:text-lg">Get Started</CustomButton>
                    </div>
                </form>

                <div className="flex justify-between w-full">
                    <Copyright />
                    <Link onClick={handleAdminClick} className="text-xs md:text-sm mx-4 text-indigo-600">
                        Admin
                    </Link>
                </div>
            </div>

            {/* Admin Passcode Modal */}
            {showPasscodeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 mx-4">
                        <h3 className="font-semibold mb-4 text-sm sm:text-md md:text-lg">Enter Admin Passcode</h3>
                        <input
                            type="password"
                            value={passcode}
                            onChange={handlePasscodeChange}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-xs sm:text-sm lg:text-md placeholder:text-sm"
                            placeholder="Enter passcode"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handlePassCodeSubmit}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-xs sm:text-sm lg:text-md"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setShowPasscodeModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md text-xs sm:text-sm lg:text-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;




