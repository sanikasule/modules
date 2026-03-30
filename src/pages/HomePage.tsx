import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useState } from "react";
import OrderForm from "../shared/components/OrderForm";
// import CheckboxSection from "../shared/components/checkbox/CheckboxSection";
// import EditSection from "../shared/components/edit/EditSection";

export default function Homepage() {
    const navigate = useNavigate();
    const logoutAction = useAuthStore((s) => s.logout);
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

    const handleLogout = async () => {
        await logoutAction();
        navigate("/");
    };

    return (
        <div className="p-8 space-x-5">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOrderFormOpen(true);
                }}
                className="bg-[#0F62FE] p-2 rounded-lg text-white shadow-lg cursor-pointer"
            >
                Place Trade
            </button>

            <button onClick={handleLogout} className="cursor-pointer">
                Logout
            </button>

            {/* <div className="flex flex-col w-md m-10 rounded-lg bg-white shadow-lg p-4">
                <CheckboxSection />
                <div className=" border-t border-gray-300"></div>
                <EditSection />
            </div> */}

            {isOrderFormOpen && (
                <OrderForm onClose={() => setIsOrderFormOpen(false)} />
            )}
        </div>
    );
}
