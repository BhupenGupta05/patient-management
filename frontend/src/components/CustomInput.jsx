import React from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CustomInput = ({ icon: Icon, label, name, value, onChange, type, placeholder, required=true, options=[], disabled=false, error }) => {
    return (
        <div className="mb-2 sm:mb-4 md:mb-6">
            {type !== 'checkbox' && (
                <label htmlFor={name} className="block text-gray-700 text-xs sm:text-sm md:text-base font-semibold mb-2">
                    {label}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    required={required}
                    name={name}
                    id={name}
                    className="w-full h-[80%] p-2 border outline-none bg-transparent border-gray-300 text-xs sm:text-sm md:text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            ) : type === 'phone' ? ( // input styles not working
                <PhoneInput
                    country={"us"}
                    value={value}
                    onChange={(phone) => onChange(phone)}
                    enableSearch={true}
                    inputClass="bg-transparent w-full outline-none p-[16px] sm:p-[18px] md:p-[20px] text-xs sm:text-sm md:text-md lg:text-lg"
                    containerClass="w-full "
                    buttonClass="border-none "
                    inputProps={{
                        name: name,
                        required: required,
                        placeholder: placeholder,
                        style: { width: "100%" },
                    }}
                />
            ) : type === 'radio' ? (
                <div className="flex mb-2">
                    {options.map(option => (
                        <label className="mr-4 flex items-center" key={option.value}>
                            <input
                                checked={value === option.value}
                                type="radio"
                                id={option.value}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                name={name}
                                value={option.value}
                                onChange={onChange}
                                disabled={disabled}
                            />
                            <span className="ml-2 text-gray-700 text-xs sm:text-sm md:text-base">
                                {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
                            </span>
                        </label>
                    ))}
                </div>
            ) : type === 'checkbox' ? (
                <div className="flex flex-col">
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={value[index]} 
                                id={`${name}-${index}`}
                                name={name}
                                data-index={index} 
                                value={option}
                                onChange={onChange}
                                disabled={disabled}
                                className="mr-2"
                            />
                            <label htmlFor={`${name}-${index}`} className="text-gray-700 text-xs sm:text-sm md:text-base">
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                    {Icon && <Icon className="text-gray-500 mr-2" size={20} />}
                    {type === 'select' ? (
                        <select
                            required={required}
                            name={name}
                            id={name}
                            className="w-full outline-none bg-transparent text-xs sm:text-sm md:text-base"
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                        >
                            <option value="" hidden>
                                {placeholder || 'Select an option'}
                            </option>
                            {options.map((option, index) => (
                                <option key={index} value={option.value || option}>
                                    {option.label || option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            required={required}
                            name={name}
                            type={type}
                            id={name}
                            className="w-full outline-none bg-transparent text-xs sm:text-sm md:text-base"
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    )}
                </div>
            )}
            {error && (
                <p className="text-red-500 text-xs sm:text-sm md:text-base italic mt-1">{error}</p>
            )}
        </div>
    )
}

export default CustomInput
