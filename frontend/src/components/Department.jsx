import React from 'react'
import { User } from 'lucide-react';

const Department = ({ department }) => {
    return (
        <>
            <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">
                    {<User />}
                </span>
            </div>
            <label className="text-xs mt-2 text-center text-gray-800">{department}</label>
        </>

    )
}

export default Department