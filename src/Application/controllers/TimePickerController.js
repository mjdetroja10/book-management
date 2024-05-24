import { Controller, useFormContext } from "react-hook-form";

export const TimePickerController = (props) => {
  const { name, ...rest } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <input type="time" className="border-2 border-black p-2" {...field} {...rest} />}
    />
  );
};
