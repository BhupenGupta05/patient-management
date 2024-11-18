import React from 'react';
import { CalendarClock } from 'lucide-react';
import { format } from 'date-fns';

const AppointmentDetails = ({appointmentData}) => {
  
  return (
    <section className="w-full">
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-xl font-semibold text-gray-700">Requested Appointment Details</h3>
        <p className="text-gray-700">{appointmentData.physician}</p>
        <div className="flex items-center gap-2 text-gray-700">
          <CalendarClock size={20} className="text-blue-500" />
          <time dateTime="2024-11-12">{format(appointmentData.appointmentDate, "MMMM d, yyyy h:mmaa")}</time>
        </div>
      </div>
    </section>
  );
};

export default AppointmentDetails;
