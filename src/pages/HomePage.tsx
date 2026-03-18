import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store"

export default function Homepage() {
    const navigate = useNavigate()
    const logoutAction = useAuthStore((s) => s.logout);

    const handleLogout = async () => {
        await logoutAction();
        navigate('/');
    }
 
    return (
        <button onClick={handleLogout} className="cursor-pointer">
            Logout
        </button>
    )
}