import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label1: string;
  label2: string;
  isValid?: boolean;
  isSubmitting?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label1, 
  label2,
  isValid = true, //to enable style based on field states
  isSubmitting = false, 
  className = "", 
  ...props 
}) => {
  // Logic for styling based on state
  const buttonStyles = isValid
    ? "bg-[#0F62FE] text-white shadow-lg cursor-pointer"
    : "bg-[#EAECEF] text-[#9EA3AE] cursor-not-allowed";

  return (
    <button
      {...props}
      disabled={isSubmitting}
      className={`w-full rounded-lg p-4 font-semibold text-[16px] transition-colors ${buttonStyles} ${className}`}
    >
      {isSubmitting ? label1 : label2}
    </button>
  );
};

export default Button;