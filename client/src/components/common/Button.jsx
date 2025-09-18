import React from "react";

function Button({
  children,
  type = "button",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`w-full animated-gradient 
        text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 
        transition duration-200 ease-in-out ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
