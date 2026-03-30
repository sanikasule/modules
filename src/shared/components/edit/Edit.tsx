import React from "react";
import { PencilLine, Trash } from "lucide-react";

interface EditProps {
    label: string;
    scripsNumber: string;
}

const Edit: React.FC<EditProps> = ({ label, scripsNumber }) => {
    return (
        <div className="flex p-2 justify-between">
            <div className="text-md font-medium align-item-center text-[#2A2A2B]">
                {label}
            </div>
            <div className="flex gap-7">
                <p className="text-sm font-normal text-[#555555] align-item-center">
                    {scripsNumber} scrips
                </p>
                <PencilLine className="w-5 h-5 text-[#555555]" />
                <Trash className="w-5 h-5 text-[#555555]" />
            </div>
        </div>
    );
};

export default Edit;
