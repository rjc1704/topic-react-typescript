"use client";

import { SelectProps } from "@/types";

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  required = false,
  name,
  className = "",
  ...props
}: SelectProps) {
  const baseStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white";

  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
