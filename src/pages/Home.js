import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logUserVisit, fetchUserMetrics } from "../api";

export default function Home({ setMetrics, setEntered }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const astroLogo = process.env.PUBLIC_URL + "/Astro-Logo.png";

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;
        setLoading(true);
        try {
            await logUserVisit(name);
            const userMetrics = await fetchUserMetrics(name);
            setMetrics(userMetrics);
            setEntered(true);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error fetching metrics:", error);
            alert("Failed to load dashboard. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #FF512F, #DD2476, #FF9966)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff"
        }}>
            <div style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                textAlign: "center",
                maxWidth: "400px",
                width: "90%"
            }}>
                <img src={astroLogo} alt="Astro Logo" style={{ width: 100, borderRadius: "50%", marginBottom: 20, border: "4px solid rgba(255,255,255,0.2)" }} />
                <h1 style={{ fontWeight: "700", fontSize: "2rem", marginBottom: "10px" }}>Astro Dashboard</h1>
                <p style={{ marginBottom: "30px", opacity: 0.8 }}>Enter your name to view your performance metrics.</p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{
                            padding: "12px 20px",
                            borderRadius: "10px",
                            border: "none",
                            outline: "none",
                            fontSize: "1rem",
                            background: "rgba(255, 255, 255, 0.9)",
                            color: "#333"
                        }}
                        placeholder="Your Name"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "12px 20px",
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            background: "linear-gradient(90deg, #FF512F, #DD2476)",
                            color: "white",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "transform 0.2s",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                        }}
                    >
                        {loading ? "Loading..." : "View Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}
