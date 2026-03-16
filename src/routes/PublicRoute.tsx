import { Routes, Route } from "react-router-dom";
import Handshake from "../pages/Handshake";
import Login from "../pages/Login";

export default function PublicRouter() {
    return(
        <Routes>
            <Route path="/" element={<Handshake />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}