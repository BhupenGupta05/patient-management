import React from 'react';
import FactCard from "../components/FactCard";
import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react';

const FactCards = ({ pendingCount, scheduledCount, cancelledCount }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center sm:justify-start items-center sm:items-start">
      <FactCard
        icon={<CalendarCheck2 />}
        text="Scheduled appointments"
        aggregate={scheduledCount}
      />
      <FactCard
        icon={<Hourglass />}
        text="Pending appointments"
        aggregate={pendingCount}
      />
      <FactCard
        icon={<TriangleAlert />}
        text="Cancelled appointments"
        aggregate={cancelledCount}
      />
    </div>
  );
};

export default FactCards;
