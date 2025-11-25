import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMetricDefinitions } from "../api";

export default function Dashboard({ metrics, setEntered, setMetrics }) {
    const navigate = useNavigate();
    const [definitions, setDefinitions] = useState([]);

    useEffect(() => {
        fetchMetricDefinitions().then(setDefinitions);
    }, []);

    const handleLogout = () => {
        setEntered(false);
        setMetrics([]);
        navigate("/");
    };

    return (
        <div style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #FF512F, #DD2476, #FF9966)",
            minHeight: "100vh",
            color: "#fff",
            padding: "40px 20px"
        }}>
            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
                maxWidth: "1200px",
                margin: "0 auto 40px"
            }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                    Your Performance
                </h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "8px 20px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    Exit
                </button>
            </header>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {metrics.length === 0 ? (
                    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "16px" }}>
                        <h3>No metrics found.</h3>
                    </div>
                ) : (
                    metrics.map((row, i) => (
                        <div key={i} style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            padding: "24px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)"
                        }}>
                            <h3 style={{ color: "#FFD700", marginBottom: "16px", fontSize: "1.5rem", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{row.astro_name}</h3>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {Object.entries(row).map(([key, val]) =>
                                    key !== "astro_id" && key !== "astro_name" ? (
                                        <li key={key} style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "12px 0",
                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                            fontSize: "0.95rem"
                                        }}>
                                            <span style={{ opacity: 0.7, textTransform: "capitalize" }}>{key.replace(/_/g, " ")}</span>
                                            <span style={{ fontWeight: "600" }}>{val}</span>
                                        </li>
                                    ) : null
                                )}
                            </ul>
                        </div>
                    ))
                )}
            </div>

            <section style={{ maxWidth: "1200px", margin: "60px auto 0" }}>
                <h2 style={{ textAlign: "center", color: "#fff", fontSize: "1.8rem", marginBottom: "30px", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>Metric Definitions</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px"
                }}>
                    {definitions.length > 0 ? (
                        definitions.map(metric => (
                            <div key={metric.name} style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(10px)",
                                padding: "20px",
                                borderRadius: "16px",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                            }}>
                                <h3 style={{ color: "#FFD700", fontWeight: "bold", marginBottom: "10px", fontSize: "1.1rem" }}>{metric.name}</h3>
                                <p style={{ fontSize: "0.9rem", lineHeight: "1.5", opacity: 0.9 }}>{metric.def}</p>
                            </div>
                        ))
                    ) : (
                        <div style={{ color: "#fff", textAlign: "center", gridColumn: "1 / -1" }}>Loading definitions...</div>
                    )}
                </div>
            </section>
        </div>
    );
}
