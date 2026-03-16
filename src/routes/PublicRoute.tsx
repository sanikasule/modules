import { Routes, Route } from "react-router-dom";
import Handshake from "../pages/Handshake";

export default function PublicRouter() {
    return(
        <Routes>
            <Route path="/" element={<Handshake />} />
        </Routes>
    )
}