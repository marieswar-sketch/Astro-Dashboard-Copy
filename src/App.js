import React, { useState, useEffect } from "react";
import { logUserVisit, fetchUserMetrics, fetchMetricDefinitions } from "./api";

const astroLogo = "/astro-logo.png";
const astroDescription = "/astro-description.jpg";

export default function App() {
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [definitions, setDefinitions] = useState([]);
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
        <img src={astroLogo} alt="Astro Logo" style={{ width: 80, borderRadius: "50%" }} />
        <h1 style={{ fontWeight: "bold", color: "#fff", fontSize: 34, marginBottom: 4 }}>Astro Dashboard</h1>
      </header>
      <section style={{ textAlign: "center", marginBottom: 32 }}>
        <img src={astroDescription} alt="Astro Description" style={{ maxWidth: "92vw", borderRadius: 12, boxShadow: "0 8px 32px #2222" }} />
      </section>

      <section>
        <h2 style={{ textAlign: "center", color: "#fff", fontSize: 26 }}>Metric Definitions</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 24
        }}>
          {definitions.length > 0
            ? definitions.map(metric => (
              <div key={metric.name} style={{
                background: "white",
                margin: 12,
                padding: 18,
                borderRadius: 16,
                boxShadow: "0 4px 24px #4441",
                width: 270,
                minWidth: 200,
                maxWidth: "92vw"
              }}>
                <h3 style={{ color: "#4e54c8", fontWeight: "bold" }}>{metric.name}</h3>
                <p style={{ fontSize: 15 }}>{metric.def}</p>
              </div>
            ))
            : <div style={{ color: "#fff" }}>Loading definitions...</div>
          }
        </div>
      </section>

      <section style={{ textAlign: "center" }}>
        {!entered ? (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: 24,
              borderRadius: 16,
              boxShadow: "0 4px 20px #2221",
              display: "inline-block"
            }}
          >
            <label style={{ fontSize: 20, fontWeight: "bold" }}>Enter your name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                fontSize: 18,
                padding: 8,
                margin: "12px 0",
                borderRadius: 8,
                border: "1px solid #ccc"
              }}
              placeholder="Type your name..."
            />
            <br />
            <button
              type="submit"
              disabled={loading}
              style={{
                fontSize: 18,
                padding: "10px 28px",
                borderRadius: 8,
                background: "linear-gradient(90deg,#4e54c8,#8f94fb)",
                color: "white",
                border: "none",
                fontWeight: "bold",
                boxShadow: "0 2px 10px #2221"
              }}
            >
              {loading ? "Loading..." : "View Dashboard"}
            </button>
          </form>
        ) : (
          <>
            <h2 style={{ color: "#fff", marginTop: 24 }}>Your Metrics</h2>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 24
            }}>
              {metrics.length === 0 ? (
                <div style={{
                  background: "#fff",
                  borderRadius: 12,
                  color: "#4e54c8",
                  padding: 20,
                  fontSize: 20
                }}>
                  No metrics found for <strong>{name}</strong>.
                </div>
              ) : (
                metrics.map((row, i) => (
                  <div key={i} style={{
                    background: "white",
                    margin: 12,
                    padding: 22,
                    borderRadius: 16,
                    boxShadow: "0 4px 24px #4443",
                    minWidth: 220,
                    maxWidth: 400
                  }}>
                    <h3 style={{ color: "#8f94fb", marginBottom: 4 }}>{row.astro_name || name}</h3>
                    <ul style={{ fontSize: 15, paddingLeft: "0" }}>
                      {Object.entries(row).map(([key, val]) =>
                        key !== "astro_id" && key !== "astro_name"
                          ? <li key={key}><strong>{key}</strong>: {val}</li>
                          : null
                      )}
                    </ul>
                  </div>
                ))
              )}
            </div>
            <button
              style={{
                margin: "32px 0 0",
                fontSize: 16,
                padding: "8px 18px",
                borderRadius: 8,
                background: "#4e54c8",
                color: "white",
                border: "none",
                fontWeight: "bold",
                boxShadow: "0 1px 7px #2221",
              }}
              onClick={() => {
                setEntered(false);
                setName("");
                setMetrics([]);
              }}
            >
              Try another name
            </button>
          </>
        )}
      </section>
    </div>
  );
}
