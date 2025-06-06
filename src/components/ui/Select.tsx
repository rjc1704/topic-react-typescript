"use client";

// TODO-7: props 타입을 정의하세요. interface 사용하세요.
// options 는 { value: number; label: string }[] 으로 정의하세요.

export default function Select({
  value,
  onChange,
  options,
  placeholder = "",
  required = false,
  name,
  className = "",
  disabled = false,
  ...props
}: any) {
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
