import { useNavigate } from "react-router-dom"

export default function Handshake() {
    const navigate = useNavigate();

    return (
        <div className="content-center p-4">
            <h1 className="mb-5 font-mono">Welcome</h1>
            <button className="cursor-pointer font-mono p-4" onClick={() => navigate('/login')}>
                Get Started
            </button>
        </div>
    )
}