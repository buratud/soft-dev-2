// DO NOT MODIFY THIS FILE IF YOU ARE NOT IT OPERATIONS
const express = require('express');
const { BASE_SERVER_PATH, PORT } = require('./config');
const Sentry = require('@sentry/node')
const app = express();
const router = require('./server');

Sentry.init({
    dsn: "https://c37f397db0fbd5d8b2b76470ec16028c@o4507243238195200.ingest.de.sentry.io/4508396733595728",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(BASE_SERVER_PATH, router);

app.use(Sentry.Handlers.errorHandler());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
