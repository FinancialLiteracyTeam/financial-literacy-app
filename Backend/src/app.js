const express = require("express");
const cors = require("cors");

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// ROUTES
// =========================

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {

    res.json({
        message: "Financial Literacy Backend is running"
    });

});


module.exports = app;