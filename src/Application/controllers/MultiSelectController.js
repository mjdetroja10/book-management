"use client";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

const handleOnChange =
  ({ onChange, value: fieldValue = [] }) =>
  (e) => {
    let value = e.map((x) => x.value);

    if (fieldValue.some((x) => !value.includes(x))) {
      onChange(value);
    } else {
      onChange(value);
    }
  };

export const MultiSelectController = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { name, options, ...rest } = props;
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
            value={options.filter((option) => (field?.value || []).includes(option.value)) || []}
            {...rest}
            onChange={handleOnChange(field)}
            isMulti={true}
            options={options}
            id={id}
          />
        ) : null
      }
    />
  );
};
