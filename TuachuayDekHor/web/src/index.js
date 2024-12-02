import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { REACT_APP_BASE_WEB_PATH } from "./config";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://b91c553e5e66d7da9c452aadd21c0589@o4507243238195200.ingest.de.sentry.io/4508396756271184",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/linux-vm-southeastasia-2\.southeastasia\.cloudapp\.azure\.com/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById("root");
const root = createRoot(container);
console.log(REACT_APP_BASE_WEB_PATH);
root.render(
  <BrowserRouter basename={REACT_APP_BASE_WEB_PATH}> 
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

