const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend server is running"
    });
});




const loginRoutes = require("./routes/route_login");
app.use("/auth", loginRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});