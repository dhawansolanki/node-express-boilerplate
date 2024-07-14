const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const authController = require("./controllers/authController");
const demoRoute = require("./routes/demo");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5050;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(logger); // Logging middleware

// Routes
app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.use("/demo", authController.verifyToken, demoRoute);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
