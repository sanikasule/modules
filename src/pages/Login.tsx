import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../api/auth.api";

//step 1:- define schema(parameters) for logging in
const schema = z.object({
    username: z.string(),
    password: z.string().regex(/^[A-Za-z0-9]+$/).min(8)
})

export default function Login() {
    //initial states in ui
    const [username, setUserame] = useState("");
    const [password, setPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(schema),
    });

    return (
        <h1>
            Login
        </h1>
    )
}