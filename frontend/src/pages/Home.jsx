import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useQuery } from "@tanstack/react-query";
import { checkUserExistence } from "../services/patientRequests";
import CustomButton from "../components/CustomButton";
import useDebounce from "../hooks/Debounce";
import Copyright from "../components/Copyright";
import Title from "../components/Title";
import CustomInput from "../components/CustomInput";

const Home = () => {
    const initialFormFields = {
        name: "",
        email: "",
        phoneNumber: "",
    };

    const [formFields, setFormFields] = useState(initialFormFields);
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
        if (data?.exists) {
            const patientId = data.id;
            navigate(`/patient/${patientId}/appointment`);
        } else {
            navigate("/patient/registration", { state: formFields });
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Title
                    className="text-center"
                    title="WeCare"
                    heading="Hi there"
                    subheading="Let's get started with signing you up!" />

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
                        required // added required for accessibility
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
                        required // added required for accessibility
                    />

                    {/* Phone Number Field */}
                    <div className="mb-6">
                        <label
                            htmlFor="mobileNumber"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Mobile Number
                        </label>
                        <PhoneInput
                            country={"us"}
                            value={formFields.phoneNumber}
                            onChange={handlePhoneChange}
                            enableSearch={true}
                            inputClass="bg-transparent w-full outline-none p-4" // adjusted padding for better spacing
                            containerClass="w-full"
                            buttonClass="border-none"
                            inputProps={{
                                name: "phoneNumber",
                                required: true,
                                style: { width: "100%" },
                            }}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center items-center w-full mb-8">
                        <CustomButton className="w-full">Get Started</CustomButton>
                    </div>
                </form>

                <div className="flex justify-between w-full">
                    <Copyright />
                    <Link to="/admin" className="text-sm mx-4 text-indigo-600">
                        Admin
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
