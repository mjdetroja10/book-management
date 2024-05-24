import { Controller, useFormContext } from "react-hook-form";

export const InputController = (props) => {
  const { name, placeholder = "", ...rest } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="text"
            className="p-3 w-full border-blue border-2"
            name="password"
            {...field}
            {...rest}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name]?.message && <p className="text-red-400 my-2">{errors[name].message}</p>}
    </>
  );
};
