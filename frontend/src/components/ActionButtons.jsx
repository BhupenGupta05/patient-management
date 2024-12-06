import React from 'react'

const ActionButtons = ({ patientId, onSchedule, onCancel, disableActions }) => {
    const handleScheduleClick = (e) => {
        e.stopPropagation()
        onSchedule(patientId)
    }

    const handleCancelClick = (e) => {
        e.stopPropagation()
        onCancel(patientId)
    }
    return (
        <div className='flex gap-2 justify-center items-center w-full'>
            <button
                disabled={disableActions}
                className={`bg-[#5C8DFF] text-white text-xs border-none px-[6px] py-[2px] rounded-sm mr-1 
                    ${disableActions ? ' cursor-not-allowed' : ' cursor-pointer'}`}
                onClick={handleScheduleClick}>
                Schedule
            </button>

            <button
                disabled={disableActions}
                className={`bg-[#FF6F61] text-white text-xs border-none px-[6px] py-[2px] rounded-sm mr-1
                    ${disableActions ? ' cursor-not-allowed' : ' cursor-pointer'}`}
                onClick={handleCancelClick}>
                Cancel
            </button>
        </div>
    )
}

export default ActionButtons