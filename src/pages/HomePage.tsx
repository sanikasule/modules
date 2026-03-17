import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate('/login');
    }
    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}