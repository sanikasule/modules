import { Routes, Route } from "react-router-dom";
import Handshake from "../pages/Handshake";
import Login from "../pages/Login";
import ValidateOTP from "../pages/ValidateOTP";
import Homepage from "../pages/HomePage";

export default function PublicRouter() {
    return(
        <Routes>
            <Route path="/" element={<Handshake />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<ValidateOTP />} />
            <Route path="/dashboard" element={<Homepage />} />
        </Routes>
    )
}