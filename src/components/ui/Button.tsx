"use client";

// TODO-5: props 타입을 정의하세요. interface 사용하세요.
// type 은 union type 으로 "button" | "submit" | "reset" 으로 정의하세요.
// variant 는 "primary" | "secondary" | "danger" 으로 정의하세요.

export default function Button({
  children,
  onClick = () => {},
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}: any) {
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
