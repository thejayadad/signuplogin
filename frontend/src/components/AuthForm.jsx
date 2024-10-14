
import React, { useState } from "react";

const AuthForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        // Clear error and proceed with signup logic (e.g., API call)
        setError("");
        console.log("Form submitted:", { name, email, password });

        // Reset form fields
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign Up</button>
    </form>
    )
}

export default AuthForm