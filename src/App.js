import React, { useState, useEffect } from "react";
import { logUserVisit, fetchUserMetrics, fetchMetricDefinitions } from "./api";

// Use correct public path for logo image
const astroLogo = process.env.PUBLIC_URL + "/Astro-Logo.jpg";

export default function App() {
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [metrics, setMetrics] = useState({});
  const [definitions, setDefinitions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMetricDefinitions().then(setDefinitions);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await logUserVisit(name);
    const userMetrics = await fetchUserMetrics(name);
    setMetrics(userMetrics);
    setEntered(true);
    setLoading(false);
  }

  return (
    <div style={{
      fontFamily: "Poppins, sans-serif",
      background: "linear-gradient(135deg,#4e54c8,#8f94fb)",
      minHeight: "100vh",
      color: "#222",
      paddingBottom: 50
    }}>
      <header style={{ textAlign: "center", padding: "32px 16px 8px" }}>
        <img
          src={astroLogo}
          alt="Astro Logo"
          style={{ width: 80, borderRadius: 50 }}
        />
        <h1 style={{
          fontWeight: "bold",
          color: "#fff",
          fontSize: 34,
          marginBottom: 4
        }}>
          Astro Dashboard
        </h1>
      </header>

      {/* Add your metrics cards below */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "32px 24px",
        margin: "28px 0 0 0"
      }}>
        {Object.keys(definitions).map(key => (
          <div key={key} style={{
            background: "#fff",
            borderRadius: 22,
            boxShadow: "0 4px 24px #4e54c855",
            padding: "30px 22px",
            margin: "0 10px 28px 10px",
            width: 280,
            maxWidth: "94vw"
          }}>
            <div style={{
              fontWeight: "bold",
              fontSize: 22,
              color: "#4e54c8",
              marginBottom: 10
            }}>
              {key}
            </div>
            <div style={{
              fontSize: 17,
              color: "#222"
            }}>
              {definitions[key]}
            </div>
          </div>
        ))}
      </div>

      {/* Name entry section */}
      <form onSubmit={handleSubmit} style={{ textAlign: "center", margin: "32px 0" }}>
        <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>Enter your name:</div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            padding: "14px 16px",
            fontSize: 15,
            borderRadius: 8,
            border: "2px solid #8f94fb",
            width: 240,
            marginBottom: 12
          }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 44px",
            fontSize: 17,
            background: "#4e54c8",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            marginTop: 12,
            boxShadow: "0 2px 14px #2222"
          }}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {/* Results Section: show user metrics if entered */}
      {entered && (
        <div style={{
          textAlign: "center",
          background: "#fff",
          borderRadius: 22,
          boxShadow: "0 4px 24px #4e54c855",
          padding: "30px 22px",
          margin: "0 10px 28px 10px",
          maxWidth: 480,
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          <div style={{
            fontWeight: "bold",
            color: "#4e54c8",
            fontSize: 22,
            marginBottom: 10
          }}>
            Results for {name}
          </div>
          <pre style={{ textAlign: "left", fontSize: 15 }}>
            {JSON.stringify(metrics, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
