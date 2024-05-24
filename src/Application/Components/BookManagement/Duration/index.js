import { useMemo, useState } from "react";

export const Duration = ({ getReadingDays = 0, startDay = 0 }) => {
  const [startDate, setStartDate] = useState("");

  const endDate = useMemo(() => {
    if (startDate && getReadingDays) {
      let dateFormat = new Date(startDate);

      let selectedDay = dateFormat.getDay();

      let dayAdded = 0;

      if (startDay === selectedDay) {
        dayAdded = 0 - 6;
      } else if (startDay > selectedDay) {
        dayAdded = 7 - startDay - selectedDay;
      } else dayAdded = 0 - selectedDay;

      dateFormat.setDate(dateFormat.getDate() + getReadingDays);

      return dateFormat.toISOString().slice(0, 10);
    }

    return "";
  }, [getReadingDays, startDay, startDate]);

  return (
    <div className="px-2 py-12 border-2 border-gray-200  mb-8">
      <div className="grid grid-cols-4 gap-4">
        <input
          type="date"
          className="border-2 border-black p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input type="date" value={endDate} disabled className="border-2 border-black p-2" />
      </div>
    </div>
  );
};
