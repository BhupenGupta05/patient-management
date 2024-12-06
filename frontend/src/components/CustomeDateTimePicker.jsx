import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Calendar } from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css';

const CustomeDateTimePicker = ({ label, selectedDate, onDateChange, disabled }) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        if (!disabled) setOpen(!open)
    }

    return (
        <div className='mb-6'>
            <label className="block text-gray-700 text-xs sm:text-sm md:text-base font-bold mb-2">{label}</label>
            <div
                className='flex items-center w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                onClick={handleClick}
            >
                <Calendar
                    className='text-gray-500 mr-2 cursor-pointer w-[22px] h-[22px]'
                />
                <DatePicker
                    showTimeSelect
                    minTime={new Date(0, 0, 0, 10, 30)}
                    maxTime={new Date(0, 0, 0, 19, 30)}
                    selected={selectedDate}
                    onChange={(date) => {
                        onDateChange(date);
                        setOpen(false);
                    }}
                    dateFormat="MMMM d, yyyy h:mmaa"
                    className='outline-none text-xs sm:text-sm md:text-md w-[90%] '
                    open={open}
                    onClickOutside={() => setOpen(false)}
                    disabled={disabled}
                    readOnly={disabled}
                />
            </div>
        </div>

    )
}

export default CustomeDateTimePicker