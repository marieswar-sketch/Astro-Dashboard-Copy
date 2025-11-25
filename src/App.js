import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

// Define your light theme style once for reuse
const appBgStyle = {
  fontFamily: "Poppins, sans-serif",
  background: "linear-gradient(135deg,#e0eafc,#cfdef3)", // modern light blue
  minHeight: "100vh",
  color: "#222"
};

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [entered, setEntered] = useState(false);

  return (
    <BrowserRouter>
      <div style={appBgStyle}>
        <Routes>
          <Route
            path="/"
            element={<Home setMetrics={setMetrics} setEntered={setEntered} />}
          />
          <Route
            path="/dashboard"
            element={
              entered ? (
                <Dashboard
                  metrics={metrics}
                  setEntered={setEntered}
                  setMetrics={setMetrics}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
