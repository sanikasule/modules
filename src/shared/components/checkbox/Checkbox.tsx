import React from "react";

interface CheckboxProps {
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
    return (
        <div className="flex p-2 gap-4">
            <input type="checkbox" className="accent-[#555555] w-5 h-5" />
            <p className="text-md font-medium text-[#2A2A2B]">{label}</p>
        </div>
    );
};

export default Checkbox;
