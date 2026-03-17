import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function Handshake() {
  const navigate = useNavigate();
  const startHandshake = useAuthStore(
    (s) => s.startHandshake
  );

  const handleStart = async () => {
    try {
      await startHandshake();
      navigate("/login");
    } catch (err) {
      console.error("handshake failed", err);
    }
  };

  return (
    <div className="content-center p-4">
      <h1 className="mb-5 font-mono">Welcome</h1>
      <button
        className="cursor-pointer font-mono p-4"
        onClick={handleStart}
      >
        Get Started
      </button>
    </div>
  );
}