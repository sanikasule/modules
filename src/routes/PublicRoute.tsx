import { Routes, Route, Navigate } from "react-router-dom";
import Handshake from "../pages/Handshake";
import Login from "../pages/Login";
import ValidateOTP from "../pages/ValidateOTP";
import ForgotPage from "../pages/ForgotPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ForgotUserIDPage from "../pages/ForgotUserID";
import SetPasswordPage from "../pages/SetPassword";


export default function PublicRoute() {
    return(
        <Routes>
            <Route path="/" element={<Handshake />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<ValidateOTP />} />
            <Route path="/forgot" element={<ForgotPage />}>
                <Route index element={<Navigate to='forgotpassword' replace />} />
                <Route path='forgotpassword'    element={<ForgotPasswordPage />} />
                <Route path='forgotuserid'  element={<ForgotUserIDPage />} />
            </Route>
            <Route path="/setpassword" element={<SetPasswordPage />} />
        </Routes>
    )
}