import React from "react";

interface ButtonProps {
  value: string;
  btnAction: () => void;
  isSelected: boolean;
}
const PillButton: React.FC<ButtonProps> = ({
  value,
  btnAction,
  isSelected,
}) => {
  return (
    <button
      type="button"
      className={`bg-gray-400 text-xs text-white py-1 px-2 rounded border-none focus:outline-none ${
        isSelected ? "bg-green-600" : ""
      }`}
      onClick={btnAction}
    >
      {value}
    </button>
  );
};

export default PillButton;
