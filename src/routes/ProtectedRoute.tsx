import { Routes, Navigate, Route } from "react-router-dom";
import Homepage from "../pages/HomePage";

export default function ProtectedRoute() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Homepage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    )
}