import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import * as Sentry from "@sentry/react";
import { REACT_APP_BASE_WEB_PATH} from "./config";

Sentry.init({
  dsn: "https://2bf6076f971eb7fcd40dda63cf927481@o4507243238195200.ingest.de.sentry.io/4508396743819344",
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

root.render(
  <BrowserRouter basename = {REACT_APP_BASE_WEB_PATH}>
    <App />
  </BrowserRouter>
);

reportWebVitals();
