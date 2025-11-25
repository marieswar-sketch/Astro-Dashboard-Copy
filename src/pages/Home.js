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
            background: "linear-gradient(135deg,#e0eafc,#cfdef3)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#222"
        }}>
            <div style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 8px 32px 0 rgba(160,180,230,0.18)",
                border: "1px solid #dde1e6",
                textAlign: "center",
                maxWidth: "400px",
                width: "90%"
            }}>
                <img src={astroLogo} alt="Astro Logo" style={{ width: 100, borderRadius: "50%", marginBottom: 20, border: "4px solid #e9eafc" }} />
                <h1 style={{ fontWeight: "700", fontSize: "2rem", marginBottom: "10px", color: "#222" }}>Astro Dashboard</h1>
                <p style={{ marginBottom: "30px", opacity: 0.85 }}>Enter your name to view your performance metrics.</p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{
                            padding: "12px 20px",
                            borderRadius: "10px",
                            border: "1px solid #cfdef3",
                            outline: "none",
                            fontSize: "1rem",
                            background: "#f5faff",
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
                            background: "linear-gradient(90deg,#71c8f8,#b6e2ff)",
                            color: "#222",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "transform 0.2s",
                            boxShadow: "0 4px 15px rgba(180,230,250,0.12)"
                        }}
                    >
                        {loading ? "Loading..." : "View Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}
