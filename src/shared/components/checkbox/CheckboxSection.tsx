import Checkbox from "./Checkbox";

export default function CheckboxSection() {
    return (
        <div className="flex flex-col mb-4">
            <Checkbox label="Show holdings" />
            <Checkbox label="Show tags" />
        </div>
    );
}
