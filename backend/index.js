const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const urlGetRoute = require("./routes/urlGetRoute");

dotenv.config({});

const app = express();
const port = process.env.PORT || 5000;

// Connect DB
connectDB(process.env.DB_URI);

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) =>
  res.send(`<h1 style="text-align:center;">Welcome to url shortner</h1>`)
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", urlRoutes);
app.use("/url", urlGetRoute);

//Connecting to DB
connectDB(process.env.DB_URI);

app.listen(port, () => console.log(`Running on ${port}!`));
