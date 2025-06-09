"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "email" | "password";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  name: string;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  name,
  className = "",
  ref = null,
  ...props
}: InputProps) {
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
}
