const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ tambahkan ini
const app = express();

const PORT = 5000;

const db = require("./config/db");

const heroRoute = require("./routes/heroRoute");
const projectRoute = require("./routes/projectRoute");
const messageRoute = require("./routes/messageRoute");
const skillRoute = require("./routes/skillRoute");
const certificateRoute = require("./routes/certificateRoutes");
const testimonialRoute = require("./routes/testimonialRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoute = require("./routes/uploadRoutes"); // ✅ tambahkan ini

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

// ✅ Serve folder uploads sebagai file statis
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(heroRoute);
app.use(projectRoute);
app.use(messageRoute);
app.use(skillRoute);
app.use("/api/certificates", certificateRoute);
app.use(testimonialRoute);
app.use(dashboardRoutes);
app.use("/api/upload", uploadRoute); // ✅ tambahkan ini

app.get("/", (req, res) => {
  res.send("Selamat Datang di Backend Portfolio");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});