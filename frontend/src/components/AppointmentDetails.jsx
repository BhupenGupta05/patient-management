import React from 'react';
import { CalendarClock } from 'lucide-react';
import { format } from 'date-fns';

const AppointmentDetails = ({ appointmentData }) => {
  return (
    <section
      className="w-full"
      aria-labelledby="appointment-details-title"
    >
      <div className="flex flex-col gap-2 sm:gap-4 items-center">
        {/* Title */}
        <h3
          id="appointment-details-title"
          className="text-sm md:text-md lg:text-xl font-semibold text-gray-700"
          itemProp="name"
        >
          Requested Appointment Details
        </h3>

        {/* Physician Name */}
        <p className="text-xs sm:text-sm md:text-base text-gray-700" itemProp="performer" itemScope itemType="http://schema.org/Person">
          Physician: <span itemProp="name">{appointmentData.physician}</span>
        </p>

        {/* Appointment Date and Time */}
        <div
          className="flex items-center gap-2 text-gray-700"
          itemProp="startDate"
          content={appointmentData.appointmentDate}
        >
          <CalendarClock className="text-blue-500 w-4 h-4" />
          <time
            className="text-xs sm:text-sm md:text-base"
            dateTime={appointmentData.appointmentDate}
            aria-label={`Appointment on ${format(appointmentData.appointmentDate, "MMMM d, yyyy h:mmaa")}`}
          >
            {format(appointmentData.appointmentDate, "MMMM d, yyyy h:mmaa")}
          </time>
        </div>
      </div>
    </section>
  );
};

export default AppointmentDetails;
