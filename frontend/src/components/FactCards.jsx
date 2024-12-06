import React from 'react';
import FactCard from "../components/FactCard";
import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react';

const FactCards = ({ pendingCount, scheduledCount, cancelledCount }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center sm:justify-start items-center sm:items-start">
      <FactCard
        icon={<CalendarCheck2 className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[26px] lg:h-[26px]" />}
        text="Scheduled appointments"
        aggregate={scheduledCount}
      />
      <FactCard
        icon={<Hourglass className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[26px] lg:h-[26px]" />}
        text="Pending appointments"
        aggregate={pendingCount}
      />
      <FactCard
        icon={<TriangleAlert className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[26px] lg:h-[26px]" />}
        text="Cancelled appointments"
        aggregate={cancelledCount}
      />
    </div>
  );
};

export default FactCards;
