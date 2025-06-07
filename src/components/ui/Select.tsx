"use client";

interface SelectProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: number; label: string }[];
  placeholder?: string;
  required?: boolean;
  name: string;
  className?: string;
  disabled?: boolean;
}
export default function Select({
  value,
  onChange,
  options,
  placeholder = "",
  required = false,
  name,
  disabled = false,
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
      disabled={disabled}
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
