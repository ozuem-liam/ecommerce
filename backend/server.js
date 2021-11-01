require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require('path');

connectDB();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  allowedHeaders: ["Access-Control-Allow-Headers", "Content-Type", "Authorization"],
  credentials: true,
};
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'frontend/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
