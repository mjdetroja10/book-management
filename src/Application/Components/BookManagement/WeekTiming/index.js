import { TimePickerController } from "@/Application/controllers/TimePickerController";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const days = [
  { id: 0, title: "sunday" },
  { id: 1, title: "monday" },
  { id: 2, title: "tuesday" },
  { id: 3, title: "wednesday" },
  { id: 4, title: "thursday" },
  { id: 5, title: "friday" },
  { id: 6, title: "saturday" },
];

const defaultValues = days
  .map(({ title }) => title)
  .reduce((acc, item) => ({ ...acc, [`${item}from`]: "", [`${item}to`]: "" }), {});

const hourDifference = (toHour, fromHour) => {
  if (toHour > 12 && fromHour < 12) {
    return (toHour === 23 ? 24 : toHour) - 12 + (12 - fromHour);
  }
  return toHour - fromHour;
};

const getHourMinDifference = (toTime, fromTime) => {
  const [fromHour, fromMin] = fromTime.split(":").map(Number);
  const [toHour, toMin] = toTime.split(":").map(Number);

  const hourDiff = hourDifference(toHour, fromHour);
  const minDiff = (toMin - fromMin) / 60;

  return hourDiff + minDiff || 0;
};

const handleWeekTiming = (setWeekHours) => (data) => {
  let startDay = null;
  let hours = 0;

  days.forEach(({ title, id }) => {
    if (data[`${title}from`] && data[`${title}to`]) {
      let timeDiff = getHourMinDifference(data[`${title}to`], data[`${title}from`]);

      if (!startDay && startDay !== 0) startDay = id;
      hours = hours + timeDiff;
    }
  });

  setWeekHours({ hours: hours, startDay });
};

export const WeekTiming = ({ setWeekHours }) => {
  const methods = useForm({ defaultValues });

  const { handleSubmit, watch, reset } = methods;
  return (
    <div className="px-2 py-12 border-2 border-gray-200 mb-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleWeekTiming(setWeekHours))}>
          <div className="grid grid-flow-col">
            {days.map(({ title, id }) => (
              <div key={id}>
                <h4 className="my-2">{title}</h4>
                <div className="mb-2">
                  <TimePickerController name={`${title}from`} max={watch(`${title}to`)} />
                </div>
                <div>
                  <TimePickerController name={`${title}to`} min={watch(`${title}from`)} />
                </div>
              </div>
            ))}
          </div>
          <div className="my-2">
            <button type="submit" className="px-2 py-1 bg-red-500 text-white rounded-md mr-2" onClick={reset}>
              Reset
            </button>
            <button type="submit" className="px-2 py-1 bg-blue-400 text-white rounded-md">
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
