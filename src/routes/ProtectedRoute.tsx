import { Routes, Navigate, Route } from "react-router-dom";
import Homepage from "../pages/HomePage";
import OrdersPage from "../pages/OrdersPage";

export default function ProtectedRoute() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Homepage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
