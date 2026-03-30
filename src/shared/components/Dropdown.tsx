import React from "react";
import type { DropdownOption } from "../../types/orders.types";

interface DropdownProps<T> {
  label: string;
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

function Dropdown<T extends string>({
  label,
  options,
  value,
  onChange,
}: DropdownProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="
          border rounded-md px-3 py-2
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
        "
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;