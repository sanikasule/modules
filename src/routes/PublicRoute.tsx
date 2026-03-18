import { Routes, Route } from "react-router-dom";
import Handshake from "../pages/Handshake";
import Login from "../pages/Login";
import ValidateOTP from "../pages/ValidateOTP";
import ForgotPage from "../pages/ForgotPage";
import ChangePasswordPage from "../pages/ChangePassword";


export default function PublicRoute() {
    return(
        <Routes>
            <Route path="/" element={<Handshake />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<ValidateOTP />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/changepassword" element={<ChangePasswordPage />} />
        </Routes>
    )
}