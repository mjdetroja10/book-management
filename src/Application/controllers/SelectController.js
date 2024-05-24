import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export const SelectController = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { name, options } = props;

  const { control } = useFormContext();

  const id = Date.now().toString();

  useEffect(() => setIsMounted(true), []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) =>
        isMounted ? (
          <Select
            {...field}
            value={options.find((c) => c.value === field.value) || ""}
            onChange={(val) => field.onChange(val.value)}
            options={options}
            id={id}
          />
        ) : null
      }
    />
  );
};
