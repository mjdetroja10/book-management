import React, { useMemo, useState } from "react";
import { BookStore } from "./Books";
import { WeekTiming } from "./WeekTiming";
import { Duration } from "./Duration";

const readingSpeed = 50;

export const BookManagement = () => {
  const [books, setBooks] = useState({});
  const [weekHours, setWeekHours] = useState({ hours: 0, startDay: 0 });

  const getBookReadingHours = useMemo(() => {
    if (books?.books && Array.isArray(books?.books)) {
      let noOfWords = books?.books.flatMap((x) => x.bookChapters).reduce((acc, item) => acc + item, 0);
      let readingSpeedPerMin = noOfWords / readingSpeed;
      let readingSpeedPerHour = readingSpeedPerMin / 60;

      return readingSpeedPerHour || 0;
    }
    return 0;
  }, [books]);

  const getReadingDays = useMemo(() => {
    if (weekHours.hours && getBookReadingHours) {
      let perWeekReading = getBookReadingHours / weekHours.hours;

      let perDayReading = Math.ceil(perWeekReading * 7);

      return perDayReading;
    }
    return 0;
  }, [getBookReadingHours, weekHours]);

  return (
    <div className="border-2 border-black  p-5 m-2">
      <h2 className="text-md  font-normal my-2 text-end ">
        Info: <span className="text-yellow-600">User reading speed is {readingSpeed}</span>
      </h2>
      <BookStore setBooks={setBooks} />
      <WeekTiming setWeekHours={setWeekHours} />
      <Duration getReadingDays={getReadingDays} startDay={weekHours.startDay} />
    </div>
  );
};
