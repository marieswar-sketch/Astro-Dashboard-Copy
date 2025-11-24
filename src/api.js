// Use your latest Google Apps Script Web App URL for both functions!
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzBrFgXEMOak7EUklFUBwOyS4n2R62sFaoM7nuuPcTJ-XJPDyLz8Wnq_q4Yker7C1HVjQ/exec";

// Logging user visit in "Logs" Sheet
export async function logUserVisit(name) {
  return fetch(WEBAPP_URL, {
    method: "POST",
    body: JSON.stringify({ name, timestamp: new Date().toISOString() }),
    headers: { "Content-Type": "application/json" }
  });
}

// Fetching user metrics from "Astro weekly performance" Sheet
export async function fetchUserMetrics(name) {
  const url = `${WEBAPP_URL}?name=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.metrics || [];
}

// Metric definitions (always exported for App.js)
export async function fetchMetricDefinitions() {
  // You can customize/add more definitions as needed
  return [
    { name: "daily_avg_available_hrs_7d", def: "Average available hours per day (last 7 days)" },
    { name: "astro_pickup_rate_7d", def: "Astro pickup rate over last 7 days" },
    { name: "users_loyal_pct_200", def: "Percent of loyal users (last 200)" },
    { name: "new_users_loyal_pct_200", def: "Percent of new loyal users (last 200)" },
    { name: "total_bookings_rated", def: "Total bookings that have been rated" },
    { name: "overall_avg_rating", def: "Overall average rating" },
    { name: "avg_rating_chat", def: "Average chat rating" },
    { name: "avg_rating_audio", def: "Average audio rating" },
    { name: "avg_rating_video", def: "Average video rating" },
    { name: "new_user_rating", def: "Rating from new users" },
    { name: "paid_user_rating", def: "Rating from paid users" }
    // Add more definitions as needed!
  ];
}

