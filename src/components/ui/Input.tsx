"use client";

import { forwardRef } from "react";
import { InputProps } from "@/types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder,
      required = false,
      name,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        name={name}
        className={`${baseStyles} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
