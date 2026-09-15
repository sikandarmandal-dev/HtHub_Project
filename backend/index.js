require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./auth/login");
const registerRoute = require("./controllers/userRegister");
const tutorRoute = require("./controllers/tutorRegister");
const tutorFindRoute = require("./controllers/tutorFindRoute");
const bookingRoute = require("./controllers/booking");

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true }));

app.get("/health", (req, res) => res.json({ status: "ok", service: "hometutor-api" }));
app.use("/api/auth", authRoute);
app.use("/api/auth", registerRoute);
app.use("/api/tutor", tutorRoute);
app.use("/api/tutors", tutorFindRoute);
app.use("/api/bookings", bookingRoute);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((error, req, res, next) => {
    console.error(error);
    if (res.headersSent) return next(error);
    res.status(error.status || 500).json({
        message: process.env.NODE_ENV === "production" ? "Something went wrong" : error.message
    });
});

async function start() {
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
        throw new Error("MONGO_URI and JWT_SECRET must be configured");
    }
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`HomeTutor API listening on port ${port}`));
}

if (require.main === module) start().catch((error) => {
    console.error("Unable to start API:", error.message);
    process.exit(1);
});

module.exports = app;
