import Edit from "./Edit";

export default function EditSection() {
    return (
        <div className="flex flex-col mt-4">
            <Edit label="Recommended" scripsNumber="16" />
            <Edit label="Nifty 50" scripsNumber="20" />
            <Edit label="Best of BSE" scripsNumber="13" />
            <Edit label="Nest 50" scripsNumber="18" />
        </div>
    );
}
