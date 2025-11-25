import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [entered, setEntered] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home setMetrics={setMetrics} setEntered={setEntered} />}
        />
        <Route
          path="/dashboard"
          element={
            entered ? (
              <Dashboard metrics={metrics} setEntered={setEntered} setMetrics={setMetrics} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
