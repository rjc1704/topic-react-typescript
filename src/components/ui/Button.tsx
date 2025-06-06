"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}
export default function Button({
  children,
  onClick = () => {},
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonClass = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${disabled ? disabledStyles : ""} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
}
